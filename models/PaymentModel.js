import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    payment_method: {
      type: String,
      enum: ["credit_card", "debit_card", "paypal", "net_banking", "upi"],
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      required: true,
    },
    transaction_id: { type: String, required: true, unique: true },
    payment_date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const PaymentSet = new mongoose.model("Payment", paymentSchema);

export default PaymentSet;
