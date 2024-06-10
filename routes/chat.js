import express from "express";
import ChatModel from "../models/ChatModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get chat history
router.get("/history", auth, async (req, res) => {
  const { sender_id, receiver_id } = req.query;

  try {
    const chat = await ChatModel.findOne({
      $or: [{ sender_id, receiver_id }, { sender_id: receiver_id, receiver_id: sender_id }],
    });
    res.status(200).json(chat); // Return the chat history
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Send a message
router.post("/send", auth, async (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  try {
    const chat = await ChatModel.findOneAndUpdate(
      {
        $or: [{ sender_id, receiver_id }, { sender_id: receiver_id, receiver_id: sender_id }],
      },
      {
        $push: {
          messages: {
            sender_id,
            receiver_id,
            message,
          },
        },
      },
      { upsert: true, new: true }
    );
    res.status(200).json(chat); // Return the chat history
  } catch (error) {
    res.status(500).send("Server error");
  }
});



export default router;

