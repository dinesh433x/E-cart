import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Link,
  TextField,
  InputAdornment,
  Tooltip,
  Checkbox,
  Grid,
  List,
  ListItem,
  Breadcrumbs,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Stack,
} from "@mui/material";

import {
  FavoriteBorder,
  ShoppingCart,
  FlashOn,
  Star,
  LocalOffer,
  NavigateNext,
  LocationOnOutlined,
  HelpOutline,
  Share,
} from "@mui/icons-material";

const theme = createTheme({
  palette: {
    background: { default: "#f1f3f6" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(data);
        } catch (err) {
              console.error(err);
              setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Typography sx={{ p: 5 }}>Loading product...</Typography>;
  }

  if (error || !product) {
    return <Typography sx={{ p: 5 }}>{error}</Typography>;
  }

  const highlights = [
    product.brand,
    product.category,
    `${product.countInStock} items in stock`,
  ];

  const offers = [
    { type: "Bank Offer", description: "5% cashback on Axis Bank Debit Card" },
    { type: "Bank Offer", description: "5% cashback on SBI Credit Card" },
    { type: "Special Price", description: "Extra discount on this product" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          {/* Breadcrumb */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
              <Link underline="hover" color="text.secondary" href="/">
                Home
              </Link>
              <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Checkbox size="small" />
              <Typography variant="body2" color="text.secondary">
                Compare
              </Typography>
              <Share sx={{ fontSize: 18, color: "#878787" }} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            {/* LEFT IMAGE */}
            <Box sx={{ width: 450, position: "sticky", top: 16 }}>
              <Paper sx={{ border: "1px solid #e0e0e0", p: 2 }}>
                <IconButton sx={{ position: "absolute", top: 8, right: 8 }}>
                  <FavoriteBorder />
                </IconButton>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    minHeight: 400,
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: 400,
                      objectFit: "contain",
                    }}
                  />
                </Box>

                <Stack direction="row" spacing={2} mt={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    sx={{ bgcolor: "#ff9f00", py: 1.5 }}
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<FlashOn />}
                    sx={{ bgcolor: "#fb641b", py: 1.5 }}
                  >
                    BUY NOW
                  </Button>
                </Stack>
              </Paper>
            </Box>

            {/* RIGHT DETAILS */}
            <Box sx={{ flex: 1, bgcolor: "#fff", p: 3 }}>
              <Typography variant="h6">{product.name}</Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <Chip
                  label="4.3"
                  icon={<Star sx={{ color: "#fff" }} />}
                  size="small"
                  sx={{ bgcolor: "#388e3c", color: "#fff" }}
                />
                <Typography color="text.secondary">
                  Ratings & Reviews
                </Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="h4">₹{product.price}</Typography>
              </Box>

              {/* OFFERS */}
              <Box sx={{ mt: 3 }}>
                <Typography fontWeight={600}>Available offers</Typography>
                {offers.map((offer, i) => (
                  <Box key={i} sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <LocalOffer sx={{ fontSize: 16, color: "#388e3c" }} />
                    <Typography variant="body2">
                      <strong>{offer.type}</strong> {offer.description}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* HIGHLIGHTS */}
              <Box sx={{ mt: 3 }}>
                <Typography fontWeight={600}>Highlights</Typography>
                <List>
                  {highlights.map((item, index) => (
                    <ListItem key={index} sx={{ p: 0 }}>
                      <Typography variant="body2">• {item}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* DELIVERY */}
              <Box sx={{ mt: 3 }}>
                <Typography fontWeight={600}>Delivery</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Enter Pincode"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button>Check</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ProductDetails;
