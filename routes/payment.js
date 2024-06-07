import express from "express";
import PaymentModel from "../models/PaymentModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Process a payment
router.post("/", auth, async (req, res) => {
  const { order_id, amount, payment_method, payment_status, transaction_id } =
    req.body;

  try {
    const newPayment = new PaymentModel({
      order_id,
      user_id: req.user.id,
      amount,
      payment_method,
      payment_status,
      transaction_id,
    });

    const payment = await newPayment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get payment details by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const payment = await PaymentModel.findById(req.params.id);
    if (!payment) return res.status(404).json({ msg: "Payment not found" });

    // Ensure that the user can only access their own payments
    if (payment.user_id.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
