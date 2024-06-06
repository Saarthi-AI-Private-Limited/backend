import mongoose from "mongoose";
const { Schema } = mongoose;

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
  },
  { timestamps: true }
);

const StoreModel = model("Store", storeSchema);

export default StoreModel;
