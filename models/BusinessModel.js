import mongoose from "mongoose";
const { Schema } = mongoose;

const businessSchema = Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const BusinessSet = model("BusinessSet", businessSchema);

export default BusinessSet;
