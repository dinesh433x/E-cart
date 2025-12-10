import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true                 
}));
app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
