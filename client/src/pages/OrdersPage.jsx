import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Chip,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo?.token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/orders/my", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        const data = await res.json();
        setOrders(data);
      } catch {
        alert("Failed to load orders");
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <Box
      sx={{
        pt: "80px",
        px: 3,
        minHeight: "100vh",
        bgcolor: "#f1f3f6",
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={3}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography color="text.secondary">
          You haven't placed any orders yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  minHeight: 240,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                  bgcolor: "#fff",

                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                    borderColor: "#d0d0d0",
                  },
                }}
              >
                {/* TOP SECTION */}
                <Box sx={{ p: 2.5 }}>
                  <Typography fontWeight={600} gutterBottom>
                    Order #{order._id.slice(-6)}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Ordered on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </Typography>

                  <Divider sx={{ my: 1.5 }} />

                  <Typography variant="body2" color="text.secondary">
                    Total Amount
                  </Typography>

                  <Typography fontWeight={700} fontSize={18}>
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </Typography>
                </Box>

                {/* BOTTOM SECTION */}
                <Box
                  sx={{
                    px: 2.5,
                    py: 2,
                    borderTop: "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Chip
                    label="Order Placed"
                    color="success"
                    size="small"
                    variant="outlined"
                  />

                  <Button
                    size="small"
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "rgba(25,118,210,0.08)",
                      },
                    }}
                    onClick={() => navigate(`/order/${order._id}`)}
                  >
                    View Details
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
