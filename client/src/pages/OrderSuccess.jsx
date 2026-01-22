import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <Box sx={{ pt: "100px", textAlign: "center" }}>
      <Typography variant="h5" color="success.main">
        Order Placed Successfully 🎉
      </Typography>

      <Button sx={{ mt: 3 }} onClick={() => navigate("/")}>
        Continue Shopping
      </Button>
    </Box>
  );
}
