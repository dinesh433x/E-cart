import "./navbar.css";
import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import Badge from "@mui/material/Badge";


export default function Navbar() {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  // Load user from localStorage
  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }

      const fetchCategories = async () => {
        const res = await fetch(
          "http://localhost:5000/api/products/categories"
        );
        const data = await res.json();
        setCategories(data);
      };
      fetchCategories();
    };

    loadUser();

    // Listen for login/signup/logout changes
    const handler = () => loadUser();
    window.addEventListener("authChanged", handler);

    return () => window.removeEventListener("authChanged", handler);
  }, []);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // LOGOUT FUNCTION
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    dispatch(clearCart());

    setUser(null);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        background: "#fff",
        color: "#212121",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1200,

          mx: "auto",
          width: "100%",
        }}
      >
        {/* LOGO */}
        <Box
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Main Logo */}
          <Typography
            sx={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: "1.6rem",
              color: "#1d4e9cff",
              lineHeight: 1.1,
            }}
          >
            E-cart
          </Typography>

          {/*  Tagline BELOW the logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.3,
              mt: 0.2,
            }}
          >
            <Typography sx={{ fontSize: "12px", color: "#878787" }}>
              Anything
            </Typography>

            <Typography
              sx={{ fontSize: "12px", color: "#f5c500", fontWeight: 600 }}
            >
              Anytime
            </Typography>
          </Box>
        </Box>

        {/*search box*/}
        <Box sx={{ flexGrow: 1, maxWidth: 550, position: "relative" }}>
          <TextField
            size="small"
            fullWidth
            value={searchTerm}
            placeholder="Search for Products, Brands and More"
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            onChange={async (e) => {
              const value = e.target.value;
              setSearchTerm(value);

              if (value.length < 2) {
                setSuggestions([]);
                setShowSuggestions(false);
                setActiveIndex(-1);
                return;
              }

              // partial category search
              const matchedCategory = categories.find((cat) =>
                cat.toLowerCase().includes(value.toLowerCase())
              );

              if (matchedCategory) {
                const categoryItem = {
                  type: "category",
                  name: matchedCategory,
                };

                const res = await fetch(
                  `http://localhost:5000/api/products?category=${matchedCategory}`
                );
                const categoryProducts = await res.json();

                const productItems = categoryProducts.map((p) => ({
                  type: "product",
                  _id: p._id,
                  name: p.name,
                }));

                setSuggestions([categoryItem, ...productItems]);
                setShowSuggestions(true);
                setActiveIndex(-1);
                return;
              }

              // prod search
              const res = await fetch(
                `http://localhost:5000/api/products/suggest?search=${value}`
              );
              const products = await res.json();

              setSuggestions(
                products.map((p) => ({
                  type: "product",
                  _id: p._id,
                  name: p.name,
                }))
              );
              setShowSuggestions(true);
              setActiveIndex(-1);
            }}
            onKeyDown={(e) => {
              if (!showSuggestions || suggestions.length === 0) return;

              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((prev) =>
                  prev < suggestions.length - 1 ? prev + 1 : prev
                );
              }

              if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
              }

              if (e.key === "Enter" && activeIndex >= 0) {
                e.preventDefault();
                const item = suggestions[activeIndex];

                setSearchTerm(item.name);
                setShowSuggestions(false);

                if (item.type === "category") {
                  navigate(`/category/${item.name}`);
                } else {
                  navigate(`/product/${item._id}`);
                }
              }

              //forr enter key 
              if (e.key === "Enter" && activeIndex === -1) {
                e.preventDefault();
                setShowSuggestions(false);

                // 🔥 check FULL category match (case-insensitive)
                const exactCategory = categories.find(
                  (cat) => cat.toLowerCase() === searchTerm.toLowerCase()
                );

                if (exactCategory) {
                  // 👉 full category search
                  navigate(`/search?category=${encodeURIComponent(exactCategory)}`);
                } else {
                  // 👉 normal keyword search
                  navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
                }
              }

            }
            }

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#878787" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#f5f5f6",
                borderRadius: "4px",
              },
            }}
          />

          {showSuggestions && suggestions.length > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 1300,
                borderRadius: 1,
                maxHeight: 350,
                overflowY: "auto",
              }}
            >
              {suggestions.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    px: 2,
                    py: 1,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background:
                      activeIndex === index ? "#f0f7ff" : "transparent",
                    "&:hover": { background: "#f5f5f5" },
                  }}
                  onMouseDown={() => {
                    setSearchTerm(item.name);
                    setShowSuggestions(false);

                    if (item.type === "category") {
                      navigate(`/category/${item.name}`);
                    } else {
                      navigate(`/product/${item._id}`);
                    }
                  }}
                >
                  <span>{item.name}</span>
                  <span style={{ fontSize: 12, color: "#888" }}>
                    {item.type === "category" ? "Category" : "Product"}
                  </span>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* login*/}
        <Box
          onClick={user ? handleMenuOpen : () => navigate("/login")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
            color: "#212121",
            "&:hover": { color: "#2874f0" },
          }}
        >
          {user ? (
            <>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "#2874f0",
                  fontSize: 14,
                }}
              >
                {user.name ? user.name[0].toUpperCase() : "U"}
              </Avatar>
              <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                Hi, {user.name.split(" ")[0]}
              </Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
            </>
          ) : (
            <>
              <PersonOutlineIcon sx={{ fontSize: 26 }} />
              <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                Login
              </Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
            </>
          )}
        </Box>

        {/* DROPDOWN MENU */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>

        {/* CART */}
        <Box
          onClick={() => navigate("/cart")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
        >
          <Badge
            badgeContent={items?.length || 0}
            color="primary"
            overlap="circular"
          >
            <ShoppingCartOutlinedIcon sx={{ fontSize: 26 }} />
          </Badge>

          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            Cart
          </Typography>
        </Box>

        {/* CATEGORIES */}
        <Box
          onClick={() => navigate("/categories")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
        >
          <CategoryOutlinedIcon sx={{ fontSize: 26 }} />
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            Categories
          </Typography>
        </Box>

        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
