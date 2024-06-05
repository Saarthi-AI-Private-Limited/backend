import mongoose from "mongoose";
const { Schema } = mongoose;

const productModel = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  category: {
    type: String,
  },
  barcode: {
    type: Number,
  },
});

const ProductSet = new mongoose.model("Products", productModel);

export default ProductSet;
