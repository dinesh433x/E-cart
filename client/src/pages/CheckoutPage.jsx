import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const buyNowItem = location.state?.buyNowItem;

  const items = buyNowItem
    ? [
        {
          product: buyNowItem.product._id,
          name: buyNowItem.product.name,
          image: buyNowItem.product.image,
          price: buyNowItem.product.price,
          quantity: buyNowItem.quantity,
        },
      ]
    : cartItems;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const placeOrderHandler = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        orderItems: items,
        shippingAddress: {
          address: "Bangalore",
          city: "Bangalore",
          pincode: "560001",
        },
        totalPrice,
      }),
    });

    dispatch(clearCart());
    navigate("/order-success");
  };

  return (
    <Box sx={{ pt: "90px", px: 3 }}>
      <Typography variant="h6" mb={2}>
        Checkout
      </Typography>

      {items.map((item) => (
        <Typography key={item.product}>
          {item.name} × {item.quantity} — ₹{item.price}
        </Typography>
      ))}

      <Typography fontWeight={600} mt={2}>
        Total: ₹{totalPrice}
      </Typography>

      <Button
        variant="contained"
        color="success"
        sx={{ mt: 3 }}
        onClick={placeOrderHandler}
      >
        Place Order
      </Button>
    </Box>
  );
}
