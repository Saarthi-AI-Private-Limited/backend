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

const productSchema = new Schema(
  {
    product_id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    sku: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    prices: [priceSchema],
    stock_quantity: Number,
  },
  { timestamps: true }
);

const featuredProductSchema = new Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
});

const FeaturedProducts = new mongoose.model("FeaturedProducts", featuredProductSchema);

const ProductModel = new mongoose.model("Product", productSchema);

export default ProductModel;
export { FeaturedProducts };
