import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

//add
router.post("/", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.user._id);
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const existingItem = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({
      product: product._id,
      price: product.price,
      quantity,
    });
  }

  await user.save();
  res.json(user.cart);
});

//get
router.get("/", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.cart);
});


//remove
router.delete("/:productId", protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  await user.save();
  res.json(user.cart);
});

export default router;