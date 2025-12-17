import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    category: String,
    description: String,
    category: {
      type: String,
      required: true,
      index: true, 
    },
    price: { type: Number, required: true },
    image: String,
    countInStock: { type: Number, default: 0 }
    
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
