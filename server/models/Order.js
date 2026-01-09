import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      address: String,
      city: String,
      pincode: String,
    },
    paymentMethod: {
      type: String,
      default: "COD",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
