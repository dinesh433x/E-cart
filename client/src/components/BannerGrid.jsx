
import { Box, Typography, Container, styled } from '@mui/material';

const GridContainer = styled(Box)({
  backgroundColor: '#F5F5F5',
  padding: '20px 0',
  minHeight: 'auto',
});

const StyledContainer = styled(Container)({
   maxWidth: '100% !important',
  paddingLeft: '5px !important',
  paddingRight: '5px !important',
  paddingBottom: '0px !important',
});

const GridWrapper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '14px',
  
});

const CardContainer = styled(Box)({
  position: 'relative',
  backgroundColor: '#FF6B00',
  borderRadius: '8px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
  },
});

const CheckeredFloor = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '40%',
  background: `repeating-conic-gradient(#E85D00 0% 25%, #FF6B00 0% 50%)`,
  backgroundSize: '30px 30px',
  transform: 'perspective(100px) rotateX(20deg)',
  transformOrigin: 'bottom',
});

const CardboardBox = styled(Box)({
  position: 'relative',
  zIndex: 1,
  margin: '40px 20px 30px',
  backgroundColor: '#D4A574',
  borderRadius: '4px',
  padding: '20px',
  minHeight: '140px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `inset 0 0 30px rgba(139, 90, 43, 0.3), 0 8px 16px rgba(0,0,0,0.2)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-20px',
    left: '10%',
    right: '10%',
    height: '30px',
    background: 'linear-gradient(to bottom, #C49A6C, #D4A574)',
    borderRadius: '4px 4px 0 0',
    transform: 'perspective(50px) rotateX(-15deg)',
    transformOrigin: 'bottom',
  },
});

const ProductImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '120px',
  objectFit: 'contain',
  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
});

const ContentArea = styled(Box)({
  position: 'absolute',
  bottom: '30px',
  left: '21px',
  zIndex: 2,
});


//categories
const deals = [
  {
    brandLabel: 'Bajaj, Havells & more',
    title: 'Heating appliances',
    price: 'From ₹299',
    image: '/bann/heater.png',
  },
  {
    brandLabel: 'Samsung, IFB, LG, Whirlpool...',
    title: 'Washing machines',
    price: 'From ₹6,790*',
    image: '/bann/washingmachine.png',
  },
  {
    brandLabel: "India's Most Wanted Deal",
    title: 'Galaxy S24 Snapdragon',
    price: 'From ₹40,999',
    originalPrice: '₹74,999',
    image: '/bann/phone.png',
    
  },
  {
    brandLabel: 'Top rated earphones',
    title: 'realme, GOBOULT & more',
    price: 'From ₹699',
    image: '/bann/earphones.png',
    
  },
  {
    brandLabel: 'Lowest price ever!',
    title: 'HP i3 & Core 3',
    price: 'From ₹34,499*',
    image: '/bann/laptop.png',
  },
  {
    brandLabel: 'Too comfy to miss!',
    title: 'Kurta sets',
    price: 'Min. 70% Off',
    image: '/bann/kurta.png',
  },
];

// Banner Card Component
const BannerCard = ({ brandLabel, title, price, originalPrice, image, brandLogo }) => {
  return (
    <CardContainer>
      <CheckeredFloor />

      
      {brandLogo && (
        <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 3 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            
          </Typography>
        </Box>
      )}
      
      <CardboardBox>
        <ProductImage src={image} alt={title} />
      </CardboardBox>
      
      <ContentArea>
        {brandLabel && (
          <Typography sx={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.9)', mb: 0.5 }}>
            {brandLabel}
          </Typography>
        )}
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#fff', mb: 0.5, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            {price}
          </Typography>
          {originalPrice && (
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.7)', textDecoration: 'line-through' }}>
              {originalPrice}
            </Typography>
          )}
        </Box>
      </ContentArea>
    </CardContainer>
  );
};

// Main BannerGrid Component
const BannerGrid = () => {
  return (
    <GridContainer>
      <StyledContainer>
        <GridWrapper>
          {deals.map((deal, index) => (
            <BannerCard
              key={index}
              brandLabel={deal.brandLabel}
              title={deal.title}
              price={deal.price}
              originalPrice={deal.originalPrice}
              image={deal.image}
              brandLogo={deal.brandLogo}
            />
          ))}
        </GridWrapper>
      </StyledContainer>
    </GridContainer>
  );
};

export default BannerGrid;
