import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const CartSet = mongoose.model("CartSet", cartSchema);

if (!CartSet) {
  throw new Error("Failed to create CartSet model");
}

export default CartSet; //export postschema with the name posts
//this the name saved on the db as collection ------------ posts
