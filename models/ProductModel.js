import mongoose from "mongoose";
const { Schema } = mongoose;

const priceSchema = new Schema({
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  sku: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  prices: [priceSchema],
  stock_quantity: Number,
});

const ProductModel = new mongoose.model("Product", productSchema);

export default ProductModel;
