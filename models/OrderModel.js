import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = Schema({
  id: {
    type: String,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
  },
  products: {
    type: Array,
  },
  user: {
    type: String,
  },
});