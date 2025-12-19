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
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productSlice"; 



export default function Navbar() {
  const navigate = useNavigate();


  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [categories, setCategories] = useState([]);
  

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  


  

  const open = Boolean(anchorEl);

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
            const res = await fetch("http://localhost:5000/api/products/categories");
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

    // Notify navbar to update
    window.dispatchEvent(new Event("authChanged"));

    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      color="default" 
      sx={{ background: "#fff",color: "#212121", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
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

        {/* ✅ Tagline BELOW the logo */}
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

          <Typography sx={{ fontSize: "12px", color: "#f5c500", fontWeight: 600 }}>
            Anytime
          </Typography>
        </Box>
      </Box>


        {/* SEARCH BAR */}
        <Box sx={{ flexGrow: 1, maxWidth: 550, position: "relative" }}>

           <TextField
                  size="small"
                  fullWidth
                  value={searchTerm}
                  onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 2000);
                  }}
                 onChange={async (e) => {
                            const value = e.target.value;
                            setSearchTerm(value);

                            if (value.length < 2) {
                              setSuggestions([]);
                              setShowSuggestions(false);
                              return;
                            }

                            // 🔥 CATEGORY MATCH (partial)
                            const matchedCategory = categories.find(cat =>
                              cat.toLowerCase().includes(value.toLowerCase())
                            );

                            if (matchedCategory) {
                              // 👉 fetch ALL products of that category for dropdown
                              const res = await fetch(
                                `http://localhost:5000/api/products?category=${matchedCategory}`
                              );
                              const categoryProducts = await res.json();

                              setSuggestions(categoryProducts);
                              setShowSuggestions(true);
                              return;
                            }

                            // 🔍 PRODUCT SEARCH (existing logic)
                            const res = await fetch(
                              `http://localhost:5000/api/products/suggest?search=${value}`
                            );
                            const products = await res.json();

                            setSuggestions(products);
                            setShowSuggestions(true);
                          }}




                  placeholder="Search for Products, Brands and More"
                  onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setShowSuggestions(false);
                              dispatch(fetchProducts({ search: searchTerm }));
                              navigate("/");
                            }
                          }}

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
                        }}
                      >
                        {suggestions.map((item) => (
                          <Box
                            key={item._id}
                            sx={{
                              px: 2,
                              py: 1,
                              cursor: "pointer",
                              "&:hover": { background: "#f5f5f5" },
                            }}
                            onMouseDown={() => {
  setSearchTerm(item.name);
  setShowSuggestions(false);
  navigate(`/product/${item._id}`);
}}


                          >
                            {item.name}
                          </Box>
                        ))}
                      </Box>
                    )}


        </Box>

        {/* LOGIN / USER */}
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
          <ShoppingCartOutlinedIcon sx={{ fontSize: 26 }} />
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
