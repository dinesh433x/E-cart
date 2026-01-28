import { Box, Typography, Button, Paper, Stack, Divider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useMemo, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const orderId = state?.orderId;
  const totalAmount = state?.totalAmount;

  //  Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Estimated delivery date
  const deliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 8);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, []);

  //  Prevent direct access
  useEffect(() => {
    if (!orderId || !totalAmount) {
      navigate("/");
    }
  }, [orderId, totalAmount, navigate]);

  if (!orderId || !totalAmount) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, rgb(90, 146, 235) 0%, #ffffff 50%)",
        pt: 8,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 480, mx: "auto", textAlign: "center" }}>
        {/* Success Icon */}
        <Box
          sx={{
            display: "inline-flex",
            p: 2,
            borderRadius: "50%",
            bgcolor: "primary.light",
            mb: 3,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 64, color: "success.main" }} />
        </Box>

        <Typography variant="h4" fontWeight={700} gutterBottom>
          Order Confirmed! 🎉
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Thank you for your purchase. Your order is on its way!
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography color="text.secondary">Order Number</Typography>
              <Typography fontWeight={600} fontFamily="monospace">
                #{orderId}
              </Typography>
            </Box>

            <Divider />

            <Box display="flex" justifyContent="space-between">
              <Typography color="text.secondary">Estimated Delivery</Typography>
              <Typography fontWeight={600}>{deliveryDate}</Typography>
            </Box>

            <Divider />

            <Box display="flex" justifyContent="space-between">
              <Typography color="text.secondary">Total Amount</Typography>
              <Typography fontWeight={700}>
                ₹{totalAmount.toLocaleString("en-IN")}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Stack spacing={2} mt={4}>
          <Button
            variant="contained"
            startIcon={<ShoppingBagIcon />}
            sx={{
              bgcolor: "primary.light",
              "&:hover": {
                bgcolor: "primary.main",
              },
            }}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
