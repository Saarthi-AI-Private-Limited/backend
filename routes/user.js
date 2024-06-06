import express from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, address, phoneNumber, password } = req.body;

  try {
    // Check if user already exists
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new UserModel({
      firstname,
      lastname,
      email,
      address,
      phoneNumber,
      password
    });

    // Hash password
    // TODO: Add password strength validation and hashing on the frontend 

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// User login (Firebase handles this, so we just return a success message)
router.post('/login', async (req, res) => {
  res.send('Login handled by Firebase');
});

// Fetch user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  const { firstname, lastname, email, address, phoneNumber } = req.body;

  const profileFields = {};
  if (firstname) profileFields.firstname = firstname;
  if (lastname) profileFields.lastname = lastname;
  if (email) profileFields.email = email;
  if (address) profileFields.address = address;
  if (phoneNumber) profileFields.phoneNumber = phoneNumber;

  try {
    let user = await UserModel.findOne({ email: req.user.email });
    if (user) {
      // Update user profile
      user = await UserModel.findByIdAndUpdate(
        user.id,
        { $set: profileFields },
        { new: true }
      );
      return res.json(user);
    }
    res.status(404).json({ msg: 'User not found' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;
