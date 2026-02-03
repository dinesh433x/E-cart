import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// create order
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

    // clear cart in user model
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

  // get orders for orderspage
  router.get("/my", protect, async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id }).sort({
        createdAt: -1,
      });

      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });
});

export default router;
