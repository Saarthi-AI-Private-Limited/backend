import express from "express";
import StoreModel, { imageSchema, reelSchema } from "../models/StoreModel.js";

const router = express.Router();

// Create a new store
router.post("/", async (req, res) => {
  const { store_name, address, phoneNumber, email, password, gst_no, pan_no } =
    req.body;

  try {
    const newStore = new StoreModel({
      store_name,
      address,
      phoneNumber,
      email,
      password,
      gst_no,
      pan_no,
    });

    const store = await newStore.save();
    res.status(201).json(store);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get list of stores
router.get("/", async (req, res) => {
  try {
    const stores = await StoreModel.find();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get store details by ID
router.get("/:id", async (req, res) => {
  try {
    const store = await StoreModel.findById(req.params.id);
    if (!store) return res.status(404).json({ msg: "Store not found" });
    res.status(200).json(store);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Update store information
router.put("/:id", async (req, res) => {
  const { store_name, address, phoneNumber, email, password, gst_no, pan_no } =
    req.body;

  const updatedStore = {};
  if (store_name) updatedStore.store_name = store_name;
  if (address) updatedStore.address = address;
  if (phoneNumber) updatedStore.phoneNumber = phoneNumber;
  if (email) updatedStore.email = email;
  if (password) updatedStore.password = password;
  if (gst_no) updatedStore.gst_no = gst_no;
  if (pan_no) updatedStore.pan_no = pan_no;

  try {
    let store = await StoreModel.findById(req.params.id);
    if (!store) return res.status(404).json({ msg: "Store not found" });

    store = await StoreModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedStore },
      { new: true }
    );

    res.status(200).json(store);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Add photos and videos
router.post("/:id/photos", async (req, res) => {
  try {
    const store = await StoreModel.findById(req.params.id);
    if (!store) return res.status(404).json({ msg: "Store not found" });

    const { images, videos } = req.body;

    for (const image of images) {
      const newImage = new imageSchema({
        alt: image.alt,
        caption: image.caption,
        description: image.description,
        url: image.url,
        store_id: store._id,
      });
      store.images.push(newImage);
    }
    for (const video of videos) {
      const newReel = new reelSchema({
        alt: video.alt,
        caption: video.caption,
        description: video.description,
        url: video.url,
        store_id: store._id,
      });
      store.reels.push(newReel);
    }

    await store.save();
    res.status(200).json(store);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Delete a store
router.delete("/:id", async (req, res) => {
  try {
    const store = await StoreModel.findById(req.params.id);
    if (!store) return res.status(404).json({ msg: "Store not found" });

    await store.remove();
    res.status(200).json({ msg: "Store removed" });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
