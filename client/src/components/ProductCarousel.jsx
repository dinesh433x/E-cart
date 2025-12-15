import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data.slice(0, 8)); 
      } catch (err) {
        console.error("Product carousel error", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Best Deals For You
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
        }}
      >
        {products.map((product) => (
          <Card
            key={product._id}
            sx={{ minWidth: 200, cursor: "pointer" }}
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <CardMedia
              component="img"
              height="160"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography fontSize={14} fontWeight={600} noWrap>
                {product.name}
              </Typography>
              <Typography color="primary">
                ₹{product.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProductCarousel;
