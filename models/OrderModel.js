import mongoose from "mongoose";
const { Schema } = mongoose;

const productOrderSchema = new Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    products: [productOrderSchema],
    total_amount: { type: Number, required: true },
    order_status: {
      type: String,
      enum: ["done", "pending", "in progress", "cancelled"],
      required: true,
    },
    order_type: {
      type: String,
      enum: [
        "pickup",
        "standard delivery",
        "scheduled delivery",
        "express delivery",
      ],
      required: true,
    },
    delivery_address: { type: String, required: true },
    delivery_date: { type: Date, required: true },
    delivery_time: { type: String, required: true },
    payment_method: { type: String, required: true },
  },
  { timestamps: true }
);
const OrderModel = new mongoose.model("Order", orderSchema);
export default OrderModel;
