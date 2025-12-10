
import React, { useRef } from "react";


import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Container,
  useTheme,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const defaultItems = [
  {
    id: "p1",
    subtitle: "Tablet Cases & Covers",
    title: "Flat ₹299",
    image: "/bannersproduct/a.webp",
  },
  {
    id: "p2",
    subtitle: "Premium Monitors",
    title: "From ₹1,717/M*",
    image: "/bannersproduct/b.webp",
  },
  {
    id: "p3",
    subtitle: "Premium Smartwatch",
    title: "From ₹3,099",
    image: "/bannersproduct/c.webp",
  },
  {
    id: "p4",
    subtitle: "Best Deals on Printers",
    title: "From ₹3,500/M*",
    image: "/bannersproduct/d.webp",
  },
  {
    id: "p5",
    subtitle: "Ink Tank Printers",
    title: "From ₹7,739*",
    image: "/bannersproduct/e.webp",
  },
  {
    id: "p6",
    subtitle: "Designer Cases & Covers",
    title: "Under ₹199",
    image: "/bannersproduct/f.webp",
  },
];

const ProductCarousel = ({ items = defaultItems }) => {
  const scrollRef = useRef(null);
  const theme = useTheme();

  const scrollBy = (distance) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Electronics
        </Typography>

        <Box>
          <IconButton
            onClick={() => scrollBy(-320)}
            aria-label="scroll left"
            size="small"
            sx={{
              bgcolor: "background.paper",
              mr: 1,
              boxShadow: 1,
            }}
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={() => scrollBy(320)}
            aria-label="scroll right"
            size="small"
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

     
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          p: 1,
          boxSizing: "border-box",
          width: "100%",
          
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor:
              theme.palette.mode === "dark" ? "#555" : "rgba(0,0,0,0.12)",
            borderRadius: 4,
          },
        }}
        role="list"
      >
        {items.map((item) => (
          <Card
            key={item.id}
            sx={{
              width: { xs: 170, sm: 190, md: 210, lg: 230 }, // responsive fixed width
              flex: "0 0 auto",
              borderRadius: 2,
              boxShadow: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
            role="listitem"
          >
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 140,
                bgcolor: "#fff",
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.subtitle}
                sx={{
                  maxHeight: 120,
                  objectFit: "contain",
                  width: "auto",
                }}
                loading="lazy"
              />
            </Box>

            <CardContent sx={{ pt: 1, pb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {item.subtitle}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {item.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ProductCarousel;
