import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Link,
  Radio,
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
  Stack
} from '@mui/material';
import {
  FavoriteBorder,
  ShoppingCart,
  FlashOn,
  Star,
  LocalOffer,
  NavigateNext,
  LocationOnOutlined,
  HelpOutline,
  Share
} from '@mui/icons-material';
const smartphoneImage = "/img/vivo.webp";

const theme = createTheme({
  palette: {
    background: { default: '#f1f3f6' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState('marine-blue');


  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Mobiles & Accessories', href: '#' },
    { label: 'Mobiles', href: '#' },
    { label: 'vivo Mobiles', href: '#' },
    { label: 'vivo T4x 5G...' },
  ];

  const offers = [
    { type: 'Bank Offer', description: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750' },
    { type: 'Bank Offer', description: '5% cashback on Flipkart SBI Credit Card upto ₹4,000 per calendar quarter' },
    { type: 'Bank Offer', description: '5% cashback on Flipkart Axis Bank Credit Card upto ₹4,000 per statement quarter' },
    { type: 'Special Price', description: 'Get extra ₹2500 off' },
  ];

  const colorVariants = [
    { id: 'silver', label: 'Silver', image: smartphoneImage },
    { id: 'marine-blue', label: 'Marine Blue', image: smartphoneImage },
    { id: 'black', label: 'Black', image: smartphoneImage },
  ];

  // const storageVariants = [
  //   { id: '128gb', label: '128 GB' },
  //   { id: '256gb', label: '256 GB' },
  // ];

  // const ramVariants = [
  //   { id: '6gb', label: '6 GB' },
  //   { id: '8gb', label: '8 GB' },
  // ];

  const highlights = [
    '6 GB RAM | 128 GB ROM',
    '17.07 cm (6.72 inch) Display',
    '50MP + 2MP | 8MP Front Camera',
    '6500 mAh Battery',
    'Dimensity 7300 5G Processor',
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          {/* Breadcrumb */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ fontSize: 12 }}>
              {breadcrumbItems.map((item, index) => (
                index < breadcrumbItems.length - 1 ? (
                  <Link key={index} href={item.href} underline="hover" color="text.secondary" sx={{ fontSize: 12 }}>
                    {item.label}
                  </Link>
                ) : (
                  <Typography key={index} color="text.primary" sx={{ fontSize: 12 }}>{item.label}</Typography>
                )
              ))}
            </Breadcrumbs>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox size="small" />
                <Typography variant="body2" color="text.secondary">Compare</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
                <Share sx={{ fontSize: 18, color: '#878787' }} />
                <Typography variant="body2" color="text.secondary">Share</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* Left - Product Image */}
            <Box sx={{ width: 450, flexShrink: 0, position: 'sticky', top: 16, alignSelf: 'flex-start' }}>
              <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', p: 2 }}>
                <Box sx={{ position: 'relative' }}>
                  <IconButton sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <FavoriteBorder sx={{ color: '#878787' }} />
                  </IconButton>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
                    <img src={smartphoneImage} alt="vivo T4x 5G" style={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain' }} />
                  </Box>
                </Box>
                <Stack direction="row" spacing={2} sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                  <Button variant="contained" startIcon={<ShoppingCart />}
                    sx={{ flex: 1, bgcolor: '#ff9f00', '&:hover': { bgcolor: '#e68f00' }, py: 1.5, fontWeight: 600, fontSize: 16 }}>
                    ADD TO CART
                  </Button>
                  <Button variant="contained" startIcon={<FlashOn />}
                    sx={{ flex: 1, bgcolor: '#fb641b', '&:hover': { bgcolor: '#e55a18' }, py: 1.5, fontWeight: 600, fontSize: 16 }}>
                    BUY NOW
                  </Button>
                </Stack>
              </Paper>
            </Box>

            {/* Right - Product Details */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, bgcolor: 'white', p: 3, borderRadius: 1 }}>
              {/* Title & Rating */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
                  vivo T4x 5G (Marine Blue, 128 GB) (6 GB RAM)
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip icon={<Star sx={{ fontSize: 14, color: 'white !important' }} />} label="4.4" size="small"
                    sx={{ bgcolor: '#388e3c', color: 'white', fontWeight: 600 }} />
                  <Typography variant="body2" color="text.secondary">1,90,437 Ratings & 8,462 Reviews</Typography>
                  <Box component="img" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" sx={{ height: 20 }} />
                </Box>
              </Box>

              {/* Price */}
              <Box>
                <Typography sx={{ color: '#388e3c', fontWeight: 500, fontSize: 14 }}>Extra ₹2,500 off</Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mt: 0.5 }}>
                  <Typography variant="h4" sx={{ fontWeight: 500 }}>₹15,499</Typography>
                  <Typography sx={{ textDecoration: 'line-through', color: '#878787' }}>₹17,999</Typography>
                  <Typography sx={{ color: '#388e3c', fontWeight: 500 }}>13% off</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  + ₹79 Protect Promise Fee <Link href="#" underline="hover" sx={{ color: '#2874f0' }}>Learn more</Link>
                </Typography>
              </Box>

              {/* Offers */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>Available offers</Typography>
                {offers.map((offer, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                    <LocalOffer sx={{ fontSize: 16, color: '#388e3c', mt: 0.3 }} />
                    <Typography variant="body2">
                      <strong>{offer.type}</strong> {offer.description} <Link href="#" underline="hover" sx={{ color: '#2874f0' }}>T&C</Link>
                    </Typography>
                  </Box>
                ))}
                <Link href="#" underline="hover" sx={{ color: '#2874f0', fontSize: 14, fontWeight: 500 }}>View 10 more offers</Link>
              </Box>



              {/* Warranty */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ width: 48, height: 32, bgcolor: '#e3f2fd', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ color: '#2874f0', fontWeight: 700, fontSize: 12 }}>vivo</Typography>
                </Box>
                <Typography variant="body2">
                  1 Year Warranty for Device and 6 Months Warranty for Accessories <Link href="#" underline="hover" sx={{ color: '#2874f0' }}>Know More</Link>
                </Typography>
              </Box>

              {/* Color Selector */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                <Typography color="text.secondary" sx={{ minWidth: 80, pt: 1, fontSize: 14 }}>Color</Typography>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  {colorVariants.map((v) => (
                    <Button key={v.id} onClick={() => setSelectedColor(v.id)} variant="outlined"
                      sx={{ borderColor: selectedColor === v.id ? '#2874f0' : '#e0e0e0', borderWidth: 2, p: 0.5, minWidth: 70 }}>
                      <img src={v.image} alt={v.label} style={{ width: 56, height: 56, objectFit: 'contain' }} />
                    </Button>
                  ))}
                </Box>
              </Box>



              {/* Delivery */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                <Typography color="text.secondary" sx={{ minWidth: 80, fontSize: 14 }}>Delivery</Typography>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <TextField placeholder="Enter Delivery Pincode" size="small" sx={{ maxWidth: 200 }}
                      InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnOutlined sx={{ fontSize: 18, color: '#878787' }} /></InputAdornment> }} />
                    <Button sx={{ color: '#2874f0', fontWeight: 600 }}>Check</Button>
                  </Box>
                  <Typography sx={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Delivery by 13 Dec, Saturday
                    <Tooltip title="Delivery info"><HelpOutline sx={{ fontSize: 16, color: '#878787' }} /></Tooltip>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">if ordered before 1 PM</Typography>
                  <Link href="#" underline="hover" sx={{ color: '#2874f0', fontSize: 14, fontWeight: 500, mt: 1, display: 'inline-block' }}>View Details</Link>
                </Box>
              </Box>

              {/* Highlights & Payment Options */}
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                    <Typography color="text.secondary" sx={{ minWidth: 80, fontSize: 14 }}>Highlights</Typography>
                    <List sx={{ p: 0, listStyleType: 'disc', pl: 2 }}>
                      {highlights.map((h, i) => (
                        <ListItem key={i} sx={{ display: 'list-item', p: 0, pb: 0.5 }}>
                          <Typography variant="body2">{h}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                    <Typography color="text.secondary" sx={{ minWidth: 100, fontSize: 14 }}>Easy Payment Options</Typography>
                    <Box>
                      <List sx={{ p: 0, listStyleType: 'disc', pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', p: 0, pb: 0.5 }}>
                          <Typography variant="body2">No cost EMI starting from <strong>₹5,167/month</strong></Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', p: 0, pb: 0.5 }}>
                          <Typography variant="body2">Cash on Delivery</Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', p: 0, pb: 0.5 }}>
                          <Typography variant="body2">Net banking & Credit/ Debit/ ATM card</Typography>
                        </ListItem>
                      </List>
                      <Link href="#" underline="hover" sx={{ color: '#2874f0', fontSize: 14, fontWeight: 500, ml: 2 }}>View Details</Link>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Seller */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                <Typography color="text.secondary" sx={{ minWidth: 80, fontSize: 14 }}>Seller</Typography>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Link href="#" underline="hover" sx={{ color: '#2874f0', fontWeight: 500 }}>MYTHANGLORYRetail</Link>
                    <Chip icon={<Star sx={{ fontSize: 12, color: 'white !important' }} />} label="4.3" size="small"
                      sx={{ bgcolor: '#2874f0', color: 'white', height: 20, fontSize: 12 }} />
                  </Box>
                  <List sx={{ p: 0, listStyleType: 'disc', pl: 2 }}>
                    <ListItem sx={{ display: 'list-item', p: 0 }}>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        7 Days Brand Support
                        <Tooltip title="Warranty info"><HelpOutline sx={{ fontSize: 14, color: '#878787' }} /></Tooltip>
                      </Typography>
                    </ListItem>
                  </List>
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