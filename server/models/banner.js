import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    brandLabel: String,
    title: { type: String, required: true },
    price: String,
    originalPrice: String,
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
