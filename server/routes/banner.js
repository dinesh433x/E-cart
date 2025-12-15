import express from "express";
import Banner from "../models/banner.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch banners" });
  }
});

export default router;
// POST 
router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body); 
    const banners = await Banner.insertMany(req.body);
    res.status(201).json(banners);
  } catch (err) {
    res.status(500).json({ message: "Failed to seed banners" });
  }
});


