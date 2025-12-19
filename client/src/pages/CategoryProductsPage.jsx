import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

export default function CategoryProductsPage() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ category: decodedCategory }));
  }, [dispatch, decodedCategory]);

  return (
    <Box sx={{ pt: "90px", px: { xs: 2, md: 4 }, pb: 4 }}>
      {/* CATEGORY TITLE */}
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 600,
          textTransform: "capitalize",
        }}
      >
        {decodedCategory}
      </Typography>

      {/* LOADING */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {/* EMPTY STATE */}
      {!loading && items.length === 0 && (
        <Typography sx={{ textAlign: "center", mt: 6 }}>
          No products found
        </Typography>
      )}

      {/* PRODUCT GRID */}
      <Grid container spacing={3}>
        {items.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                  transform: "translateY(-4px)",
                },
              }}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <Box
                sx={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  background: "#fafafa",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              <CardContent sx={{ pb: 2 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    mb: 0.5,
                  }}
                  noWrap
                >
                  {product.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#388e3c",
                  }}
                >
                  ₹{product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
