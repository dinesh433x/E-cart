import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  removeFromCart,
  updateCartQuantity,
} from "../redux/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [updatingId, setUpdatingId] = useState(null);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const platformFee = 7;
  const totalAmount = subtotal + platformFee;

  return (
    <Box sx={{ pt: "90px", pb: 4, bgcolor: "#f1f3f6", width: "100%" }}>
      <Grid container spacing={2} sx={{ px: 2 }}>
        {/* LEFT SIDE */}
        <Grid item xs={12} md={9}>
          <Box sx={{  mx: "auto"}}>
            {items.map((item) => {
              const deliveryDate = new Date();
              deliveryDate.setDate(deliveryDate.getDate() + 5);
              const formattedDate = deliveryDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });

              const isUpdating = updatingId === item.product;

              return (
                <Card key={item.product} sx={{ mb: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item md={3}>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{ height: 140, objectFit: "contain" }}
                        />
                      </Grid>

                      <Grid item md={6}>
                        <Typography fontWeight={500}>
                          {item.name}
                        </Typography>

                        <Typography fontSize={14} color="text.secondary">
                          {item.description}
                        </Typography>

                        <Typography fontSize={14}>
                          Seller: {item.seller} <Chip size="small" label="Assured" />
                        </Typography>

                        <Typography mt={1}>
                          Price: <strong>₹{item.price}</strong>
                        </Typography>

                        {item.quantity > 1 && (
                          <Typography fontWeight={600}>
                            Total: ₹{item.price * item.quantity}
                          </Typography>
                        )}

                        <Box mt={2} display="flex" gap={2}>
                          <Button
                            disabled={item.quantity <= 1 || isUpdating}
                            onClick={() => {
                              setUpdatingId(item.product);
                              dispatch(
                                updateCartQuantity({
                                  productId: item.product,
                                  quantity: item.quantity - 1,
                                })
                              ).finally(() => setUpdatingId(null));
                            }}
                          >
                            
                          </Button>

                          <Typography>{item.quantity}</Typography>

                          <Button
                            disabled={isUpdating}
                            onClick={() => {
                              setUpdatingId(item.product);
                              dispatch(
                                updateCartQuantity({
                                  productId: item.product,
                                  quantity: item.quantity + 1,
                                })
                              ).finally(() => setUpdatingId(null));
                            }}
                          >
                            +
                          </Button>

                          <Button
                            onClick={() => dispatch(removeFromCart(item.product))}
                          >
                            REMOVE
                          </Button>
                        </Box>
                      </Grid>

                      <Grid item md={3} textAlign="right">
                        Delivery by {formattedDate}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Grid>

        {/* RIGHT SIDE  */}
        <Grid item xs={12} md={3}>
          <Card sx={{ position: "sticky", top: 100, width: "100%",}}>
            <CardContent>
              <Typography fontWeight={600}>Price details</Typography>

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography>Subtotal</Typography>
                <Typography>₹{subtotal}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography>Platform Fee</Typography>
                <Typography>₹{platformFee}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight={600}>Total</Typography>
                <Typography fontWeight={600}>₹{totalAmount}</Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: "#fb641b" }}
              >
                PLACE ORDER
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
