import mongoose from "mongoose";
const { Schema } = mongoose;
const imageSchema = new Schema(
  {
    alt: { type: String, required: true },
    caption: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
  },
  { timestamps: true }
);
const videoSchema = new Schema(
  {
    alt: { type: String, required: true },
    caption: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
  },
  { timestamps: true }
);
const storeSchema = new Schema(
  {
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    store_name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },

    gst_no: { type: String, required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    pan_no: { type: String, required: true },
    images: [imageSchema],
    videos: [videoSchema],
  },
  { timestamps: true }
);

const StoreModel = new mongoose.model("Store", storeSchema);

export default StoreModel;
