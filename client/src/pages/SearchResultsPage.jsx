import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (keyword) {
      dispatch(fetchProducts({ search: keyword }));
    }
  }, [dispatch, keyword]);

  return (
    <Box sx={{ pt: "90px", px: { xs: 2, md: 4 } }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Search results for “{keyword}”
      </Typography>

      {!loading && items.length === 0 && (
        <Typography>No products found</Typography>
      )}

      

      {/* LIST LAYOUT */}
      {items.map((product, index) => (
        <Box key={product._id}>
          <Card
            sx={{
              display: "flex",
              p: 2,
              cursor: "pointer",
              "&:hover": { background: "#f9f9f9" },
            }}
            onClick={() => navigate(`/product/${product._id}`)}
          >
            {/* IMAGE */}
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{
                width: 140,
                height: 140,
                objectFit: "contain",
              }}
            />

            {/* DETAILS */}
            <CardContent sx={{ flex: 1 }}>
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                {product.name}
              </Typography>

              <Typography
                sx={{ fontSize: 14, color: "#757575", mb: 1 }}
              >
                Category: {product.category}
              </Typography>

              <Typography
                sx={{ fontWeight: 600, color: "#388e3c" }}
              >
                ₹{product.price}
              </Typography>
            </CardContent>
          </Card>

          {/* Divider between items */}
          {index !== items.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
}
