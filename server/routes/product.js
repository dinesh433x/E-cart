// server/routes/product.js
import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// /**
//  * DEV ONLY: POST /api/products/seed
//  * Body: array of product objects
//  */
// router.post("/seed", async (req, res) => {
//   try {
//     const productsArray = req.body;
//     if (!Array.isArray(productsArray) || productsArray.length === 0) {
//       return res.status(400).json({ message: "Send a non-empty array in request body" });
//     }

//     ;

//     const created = await Product.insertMany(productsArray);
//     return res.status(201).json({ insertedCount: created.length, created });
//   } catch (err) {
//     console.error("Seed error:", err);
//     return res.status(500).json({ message: "Seed failed", error: err.message });
//   }
// });

/**
 * GET /api/products
 * Returns all products (no search)
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (err) {
    console.error("GET Products Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/products/:id
 * Returns single product by id
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (err) {
    console.error("GET Product by ID error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
