import mongoose from "mongoose";
const { Schema } = mongoose;
const cartItemSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const cartSchema = new Schema(
  {
    token: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    total_amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const CartModel = new mongoose.model("Cart", cartSchema);

if (!CartModel) {
  throw new Error("Failed to create CartSet model");
}

export default CartModel;

// chirag
