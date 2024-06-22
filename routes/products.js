import express from "express";
import ProductModel from "../models/ProductModel.js";
import auth from "../middleware/auth.js"; // Assuming you are using the same auth middleware for Firebase

const router = express.Router();

// Add a new product
router.post("/", auth, async (req, res) => {
  const { name, category, sku, image, description, prices, stock_quantity } =
    req.body;

  try {
    const newProduct = new ProductModel({
      name,
      category,
      sku,
      image,
      description,
      prices,
      stock_quantity,
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get list of products
router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get product details by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Update product information
router.put("/:id", auth, async (req, res) => {
  const { name, category, sku, image, description, prices, stock_quantity } =
    req.body;

  const updatedProduct = {};
  if (name) updatedProduct.name = name;
  if (category) updatedProduct.category = category;
  if (sku) updatedProduct.sku = sku;
  if (image) updatedProduct.image = image;
  if (description) updatedProduct.description = description;
  if (prices) updatedProduct.prices = prices;
  if (stock_quantity) updatedProduct.stock_quantity = stock_quantity;

  try {
    let product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedProduct },
      { new: true }
    );

    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Delete a product
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    await product.remove();
    res.status(200).json({ msg: "Product removed" });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.post("/featured-products", async (req, res) => {
  try {
    const { product_id, store_id } = req.body;
    const newFeaturedProduct = new FeaturedProducts({
      product_id,
      store_id,
    });

    const product = await newFeaturedProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
