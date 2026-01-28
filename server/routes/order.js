import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// CREATE ORDER
router.post("/", protect, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, platformFee } =
      req.body;

    const itemsTotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const totalPrice = itemsTotal + (platformFee || 0);

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    // CLEAR CART IN USER MODEL
    await User.findByIdAndUpdate(req.user._id, {
      $set: { cart: [] },
    });

    res.status(201).json({
      orderId: order._id,
      totalPrice: order.totalPrice,
    });
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

export default router;
