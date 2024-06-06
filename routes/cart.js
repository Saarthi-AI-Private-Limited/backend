import express from "express";
import CartModel from "../models/Cart";
import auth from "../middleware/auth";

const router = express.Router();

// Add item to cart
router.post("/add", auth, async (req, res) => {
  const { product_id, quantity, price } = req.body;
  const { token } = req.headers;

  try {
    const cart = await CartModel.findOneAndUpdate(
      { token, user_id: req.user.id },
      {
        $push: { items: { product_id, quantity, price } },
        $inc: { total_amount: quantity * price },
      },
      { upsert: true, new: true }
    );

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Remove item from cart
router.delete("/remove", auth, async (req, res) => {
  const { product_id } = req.body;
  const { token } = req.headers;

  try {
    const cart = await CartModel.findOneAndUpdate(
      { token, user_id: req.user.id },
      { $pull: { items: { product_id } } },
      { new: true }
    );

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Update cart item
router.put("/update", auth, async (req, res) => {
  const { product_id, quantity, price } = req.body;
  const { token } = req.headers;

  try {
    const cart = await CartModel.findOne({ token, user_id: req.user.id });

    // Find the index of the item to be updated
    const index = cart.items.findIndex(
      (item) => item.product_id === product_id
    );
    if (index === -1)
      return res.status(404).json({ msg: "Item not found in cart" });

    // Update the quantity and price of the item and recalculate the total amount
    const prevQuantity = cart.items[index].quantity;
    const prevPrice = cart.items[index].price;
    cart.items[index].quantity = quantity;
    cart.items[index].price = price;
    cart.total_amount -= prevQuantity * prevPrice;
    cart.total_amount += quantity * price;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
