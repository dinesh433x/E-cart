
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

const file = path.join(process.cwd(), "data", "products.json");

const seed = async () => {
  try {
    await connectDB();

    const raw = fs.readFileSync(file, "utf-8");
    const data = JSON.parse(raw);

   

    const created = await Product.insertMany(data);
    console.log("Inserted:", created.length);
    process.exit(0);
  } catch (err) {
    console.error("Seed script error:", err);
    process.exit(1);
  }
};

seed();
