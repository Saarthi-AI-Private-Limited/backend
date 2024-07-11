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

const reelSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
      enum: ["Fabric", "Eatables", "Toiletries", "Electronics", "Furniture"],
    },
    reactions: {
      type: [String], // Array of emoji reactions
      default: [],
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store", // Assuming you have a Store model
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    messages: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        message: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
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
    reels: [reelSchema],
    premiumAccess: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
  },
  { timestamps: true }
);

const StoreModel = new mongoose.model("Store", storeSchema);

export default StoreModel;
export { imageSchema, reelSchema };
