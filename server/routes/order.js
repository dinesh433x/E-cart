import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE ORDER
router.post("/", protect, async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

export default router;
