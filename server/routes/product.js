// server/routes/product.js
import express from "express";
import Product from "../models/Product.js";

const router = express.Router();
/**
 * GET /api/products/:id
 * Returns single product by id
 */
router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};    
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }    
    if (category) {
      query.category = category;
    }
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



// suggest?search=gal
router.get("/suggest", async (req, res) => {
  try {
    const search = req.query.search;
    if (!search) return res.json([]);

    const products = await Product.find({
      name: { $regex: search, $options: "i" },
    }).select("name _id").limit(5);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// GET all unique categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});


// prod by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





// router.delete("/", async (req, res) => {
//   try {
//     await Product.deleteMany({});
//     res.json({ message: "All products deleted" });
//   } catch (err) {
//     console.error("Delete products error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });




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



export default router;
