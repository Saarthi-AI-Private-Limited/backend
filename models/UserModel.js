import mongoose from "mongoose";
const { Schema } = mongoose;

//for signup schema
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    orders: {
      type: Array,
      default: [],
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    premiumAccess: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
  },
  { timestamps: true }
);

const UserModel = new mongoose.model("User", userSchema); //collection name in database: user
export default UserModel;

// chirag
