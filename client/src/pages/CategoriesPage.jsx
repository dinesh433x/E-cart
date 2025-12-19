import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  Container,
  Fade,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/categories"
        );
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  
  const gradients = [
    "linear-gradient(135deg, hsl(222, 47%, 11%) 0%, hsl(222, 47%, 25%) 100%)",
    "linear-gradient(135deg, hsl(210, 40%, 20%) 0%, hsl(210, 60%, 35%) 100%)",
    "linear-gradient(135deg, hsl(240, 30%, 15%) 0%, hsl(260, 40%, 30%) 100%)",
    "linear-gradient(135deg, hsl(200, 50%, 15%) 0%, hsl(190, 60%, 30%) 100%)",
    "linear-gradient(135deg, hsl(280, 40%, 15%) 0%, hsl(300, 50%, 30%) 100%)",
    "linear-gradient(135deg, hsl(150, 40%, 15%) 0%, hsl(160, 50%, 30%) 100%)",
  ];

  return (
    <Box
      sx={{
        background: "#hsl(0, 0%, 100%)",
        pt: 9,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={600}>
          <Box sx={{ mb: 4.5 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 500,
                color: "#1D4E96",
              }}
            >
              Shop by Category
            </Typography>
          </Box>
        </Fade>

        {loading ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton
                key={item}
                variant="rounded"
                height={180}
                sx={{
                  borderRadius: 3,
                  bgcolor: "hsl(210, 40%, 96%)",
                }}
              />
            ))}
          </Box>
        )  : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {categories.map((category, index) => (
              <Fade in timeout={400 + index * 100} key={category}>
                <Card
                  elevation={0}
                  sx={{
                    height: 180,
                    borderRadius: 3,
                    background: gradients[index % gradients.length],
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 20px 40px -15px hsla(222, 47%, 11%, 0.3)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "radial-gradient(circle at 30% 20%, hsla(0, 0%, 100%, 0.1) 0%, transparent 50%)",
                      pointerEvents: "none",
                    },
                  }}
                >
                  <CardActionArea
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-end",
                      p: 3,
                    }}
                    onClick={() => navigate(`/category/${category}`)}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: "hsl(0, 0%, 100%)",
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    >
                      {category}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "hsla(0, 0%, 100%, 0.7)",
                        mt: 0.5,
                      }}
                    >
                      Explore collection →
                    </Typography>
                  </CardActionArea>
                </Card>
              </Fade>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}