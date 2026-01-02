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

  // prevents black screen
  const [updatingId, setUpdatingId] = useState(null);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const platformFee = 7;
  const totalAmount = subtotal + platformFee;

  return (
    <Box sx={{ pt: "90px", px: { xs: 2, md: 4 }, pb: 4, bgcolor: "#f1f3f6" }}>
      {items.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6">Your cart is empty</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {/* LEFT - CART ITEMS */}
          <Grid item xs={12} md={8}>
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
                      {/* IMAGE */}
                      <Grid item xs={12} sm={3}>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{ height: 140, objectFit: "contain" }}
                        />
                      </Grid>

                      {/* DETAILS */}
                      <Grid item xs={12} sm={6}>
                        <Typography fontSize={16} fontWeight={500}>
                          {item.name}
                        </Typography>

                        <Typography
                          fontSize={14}
                          color="text.secondary"
                          mb={0.5}
                        >
                          {item.description}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Typography fontSize={14} color="text.secondary">
                            Seller: {item.seller}
                          </Typography>
                          <Chip
                            label="Assured"
                            size="small"
                            sx={{ ml: 1, height: 18, fontSize: 11 }}
                          />
                        </Box>

                        {/* PRICE */}
                          <Box sx={{ mb: 2 }}>
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: "text.secondary",
                              }}
                            >
                              Price:
                              <strong style={{ marginLeft: 6 }}>
                                ₹{item.price}
                              </strong>
                            </Typography>

                            {item.quantity > 1 && (
                              <Typography
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: 600,
                                  mt: 0.5,
                                }}
                              >
                                Total Price:
                                <strong style={{ marginLeft: 6 }}>
                                  ₹{item.price * item.quantity}
                                </strong>
                              </Typography>
                            )}
                          </Box>


                        {/* QUANTITY CONTROLS */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid #e0e0e0",
                              borderRadius: 50,
                              opacity: isUpdating ? 0.6 : 1,
                            }}
                          >
                            <Button
                              size="small"
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
                              −
                            </Button>

                            <Typography mx={2}>{item.quantity}</Typography>

                            <Button
                              size="small"
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
                          </Box>

                          <Button
                            variant="text"
                            disabled={isUpdating}
                            onClick={() => {
                              setUpdatingId(item.product);
                              dispatch(removeFromCart(item.product)).finally(
                                () => setUpdatingId(null)
                              );
                            }}
                          >
                            {isUpdating ? "Updating..." : "REMOVE"}
                          </Button>
                        </Box>
                      </Grid>

                      {/* DELIVERY */}
                      <Grid item xs={12} sm={3}>
                        <Typography
                          fontSize={14}
                          fontWeight={500}
                          textAlign={{ xs: "left", sm: "right" }}
                        >
                          Delivery by {formattedDate}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}
          </Grid>

          {/* RIGHT - PRICE SUMMARY */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: "sticky", top: 100 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography fontWeight={600} mb={2}>
                  Price details
                </Typography>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Subtotal</Typography>
                  <Typography>₹{subtotal}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography>Platform Fee</Typography>
                  <Typography>₹{platformFee}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Typography fontWeight={600}>Total Amount</Typography>
                  <Typography fontWeight={600}>
                    ₹{totalAmount}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    bgcolor: "#fb641b",
                    "&:hover": { bgcolor: "#e85d1a" },
                  }}
                >
                  PLACE ORDER
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
