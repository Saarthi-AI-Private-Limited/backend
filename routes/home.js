import express from "express";
import UserModel from "../models/UserModel.js";
import ProductModel, { FeaturedProducts } from "../models/ProductModel.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/order-again", auth, async (req, res) => {
  try {
    const user = await UserModel.findOne({
      firebaseUID: req.user.id,
    }).populate("orders");
    const orders = user.orders;
    const order = orders.orders[orders.orders.length - 1]; // Get the last order
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/featured-products", async (req, res) => {
  try {
    const products = await FeaturedProducts.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const products = await ProductModel.find({
      name: { $regex: query, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Server error");
  }
});



export default router;
