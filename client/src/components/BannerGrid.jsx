import { Box, Typography, Container, styled } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";



const GridContainer = styled(Box)({
  backgroundColor: "#F5F5F5",
  padding: "20px 0",
});

const StyledContainer = styled(Container)({
  maxWidth: "100% !important",
  paddingLeft: "5px !important",
  paddingRight: "5px !important",
});

const GridWrapper = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "14px",
});

const CardContainer = styled(Box)({
  position: "relative",
  backgroundColor: "#FF6B00",
  borderRadius: "8px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
  },
});

const CheckeredFloor = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "40%",
  background:
    "repeating-conic-gradient(#E85D00 0% 25%, #FF6B00 0% 50%)",
  backgroundSize: "30px 30px",
  transform: "perspective(100px) rotateX(20deg)",
  transformOrigin: "bottom",
});

const CardboardBox = styled(Box)({
  position: "relative",
  zIndex: 1,
  margin: "40px 20px 30px",
  backgroundColor: "#D4A574",
  borderRadius: "4px",
  padding: "20px",
  minHeight: "140px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ProductImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "120px",
  objectFit: "contain",
});

const ContentArea = styled(Box)({
  position: "absolute",
  bottom: "30px",
  left: "21px",
  zIndex: 2,
});



const BannerCard = ({ brandLabel, title, price, originalPrice, image }) => (
  <CardContainer>
    <CheckeredFloor />

    <CardboardBox>
      <ProductImage src={image} alt={title} />
    </CardboardBox>

    <ContentArea>
      <Typography sx={{ fontSize: 11, color: "#fff" }}>
        {brandLabel}
      </Typography>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
        {title}
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
          {price}
        </Typography>
        {originalPrice && (
          <Typography
            sx={{
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              textDecoration: "line-through",
            }}
          >
            {originalPrice}
          </Typography>
        )}
      </Box>
    </ContentArea>
  </CardContainer>
);



const BannerGrid = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/banners"
        );
        setDeals(data);
      } catch (err) {
        console.error("Banner fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return <Typography sx={{ p: 3 }}>Loading banners...</Typography>;
  }

  return (
    <GridContainer>
      <StyledContainer>
        <GridWrapper>
          {deals.map((deal) => (
            <BannerCard
              key={deal._id}
              brandLabel={deal.brandLabel}
              title={deal.title}
              price={deal.price}
              originalPrice={deal.originalPrice}
              image={deal.image}
            />
          ))}
        </GridWrapper>
      </StyledContainer>
    </GridContainer>
  );
};

export default BannerGrid;
