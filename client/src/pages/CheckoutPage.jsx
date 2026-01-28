import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CheckoutPage() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const PLATFORM_FEE = 21;

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const finalTotal = itemsTotal + PLATFORM_FEE;

  const handlePlaceOrder = async () => {
    if (!address.address || !address.city || !address.pincode) {
      alert("Please fill delivery address");
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo?.token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          orderItems: items,
          shippingAddress: address,
          paymentMethod,
          platformFee: PLATFORM_FEE,
        }),
      });

      if (!res.ok) {
        throw new Error("Order creation failed");
      }

      const data = await res.json();

      dispatch(clearCart());

      navigate("/order-success", {
        state: {
          orderId: data.orderId || data._id,
          totalAmount: data.totalPrice,
        },
      });
    } catch {
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        pt: "75px",
        px: 3,
        pb: 4,
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={2}>
        Checkout
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        {/* LEFT SIDE */}
        <Box sx={{ flex: 1 }}>
          {/* Cart Items */}
          <Paper sx={{ p: 2.5, mb: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Order Items
            </Typography>

            {items.length === 0 ? (
              <Typography color="text.secondary">Your cart is empty</Typography>
            ) : (
              items.map((item, index) => (
                <Box key={item.product}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1.5,
                    }}
                  >
                    <Box>
                      <Typography fontWeight={600} mb={0.5}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{item.price} × {item.quantity}
                      </Typography>
                    </Box>
                    <Typography fontWeight={700} fontSize={18}>
                      ₹{item.price * item.quantity}
                    </Typography>
                  </Box>
                  {index < items.length - 1 && <Divider />}
                </Box>
              ))
            )}
          </Paper>

          {/* Delivery Address */}
          <Paper sx={{ p: 2.5, mb: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Delivery Address
            </Typography>

            <TextField
              fullWidth
              label="Address"
              multiline
              rows={3}
              sx={{ mb: 2 }}
              value={address.address}
              onChange={(e) =>
                setAddress({ ...address, address: e.target.value })
              }
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Pincode"
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
              />
            </Box>
          </Paper>

          {/* Payment Method */}
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Payment Method
            </Typography>

            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="COD"
                control={<Radio />}
                label="Cash on Delivery"
              />
              <FormControlLabel
                value="CARD"
                control={<Radio />}
                label="Credit / Debit Card"
              />
              <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
            </RadioGroup>
          </Paper>
        </Box>

        {/* RIGHT SIDE - Order Summary */}
        <Box
          sx={{
            width: "35%",
            minWidth: 320,
            position: "sticky",
            top: 90, // height of navbar
            alignSelf: "flex-start",
          }}
        >
          <Paper sx={{ p: 2.5, top: 110 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Order Summary
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={1.5}>
              <Typography>Subtotal ({items.length} items)</Typography>
              <Typography fontWeight={600}>₹{itemsTotal}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1.5}>
              <Typography>Platform Fee</Typography>
              <Typography fontWeight={600}>₹{PLATFORM_FEE}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Delivery Charges</Typography>
              <Typography fontWeight={600} color="success.main">
                FREE
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              mb={3}
              sx={{
                p: 1.5,
                bgcolor: "#f5f5f5",
                borderRadius: 1,
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Total Amount
              </Typography>
              <Typography variant="h6" fontWeight={700} color="primary">
                ₹{finalTotal}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handlePlaceOrder}
              disabled={items.length === 0}
              sx={{
                py: 1.5,
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Place Order
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
