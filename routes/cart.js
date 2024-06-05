import { Router } from "express";
import CartSet from "../models/CartModel.js";

const router = Router();

router.get("/cart/cartDetails", async (req, res) => {
  try {
    const result = await CartSet.find();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/cart/addnewcart", async (req, res) => {
  try {
    const { cartName } = req.body;
    if (!cartName) {
      return res.status(400).json({ error: "Missing cartName" });
    }
    const cartUser = "NaN";
    const cartAvailable = "free";
    const cartDate = new Date();

    const cartAdd = new CartSet({
      name: cartName,
      date: cartDate,
      status: cartAvailable,
      user: cartUser,
    });
    const data = await cartAdd.save();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/cart/delete/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;
    if (!cartId) {
      return res.status(400).json({ error: "Missing cartId" });
    }
    const cartdata = CartSet.remove({ _id: cartId });
    const result = await Promise.all([cartdata]);
    res.status(200).json({
      message: "deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
