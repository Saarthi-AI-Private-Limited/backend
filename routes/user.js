import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const {
    uid,
    firstname,
    lastname,
    gender,
    dob,
    email,
    addresses,
    typeOfProducts,
    budgetRange,
    modeOfShopping,
    interestInEcofriendly,
    locations,
    shops,
    restaurants,
    phoneNumber,
    password,
    orders,
    loyaltyPoints,
    salt,
  } = req.body;

  try {
    // Check if user already exists

    let user = await UserModel.findOne({ phoneNumber });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = await UserModel.findOne({ uid });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    // TODO: Add password strength validation and hashing on the frontend

    // Create user
    user = new UserModel({
      uid,
      firstname,
      lastname,
      gender,
      dob,
      email,
      addresses,
      typeOfProducts,
      budgetRange,
      modeOfShopping,
      interestInEcofriendly,
      locations,
      shops,
      restaurants,
      phoneNumber,
      password,
      orders,
      loyaltyPoints,
      salt,
    });
    // Save user
    await user.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// User login (Firebase handles this, so we just return a success message)
router.post("/login", async (req, res) => {
  res.send("Login handled by Firebase");
});

// Fetch user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await UserModel.findOne({ uid: req.user.uid }).select(
      "-password"
    );
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
  const { firstname, lastname, email, address, phoneNumber } = req.body;

  const profileFields = {};
  if (firstname) profileFields.firstname = firstname;
  if (lastname) profileFields.lastname = lastname;
  if (email) profileFields.email = email;
  if (address) profileFields.address = address;
  if (phoneNumber) profileFields.phoneNumber = phoneNumber;

  try {
    let user = await UserModel.findOne({ uid: req.user.uid });
    if (user) {
      // Update user profile
      user = await UserModel.findByIdAndUpdate(
        user.id,
        { $set: profileFields },
        { new: true }
      );
      return res.json(user);
    }
    res.status(404).json({ msg: "User not found" });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Delete user profile
router.delete("/profile", auth, async (req, res) => {
  try {
    let user = await UserModel.findOne({ uid: req.user.uid });
    if (user) {
      // Delete user profile
      await UserModel.findByIdAndDelete(user.id);
      return res.json({ msg: "User deleted successfully" });
    }
    res.status(404).json({ msg: "User not found" });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
