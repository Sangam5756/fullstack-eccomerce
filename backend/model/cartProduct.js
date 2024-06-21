import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    productId: String,
    quantity: Number,
    userId: String,
  },
  {
    timestamps: true,
  }
);
const Cart = new mongoose.model("cart", cartSchema);

export default Cart;
