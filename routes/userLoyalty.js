import express from 'express';
import UserModel from '../models/UserModel.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Earn Points
router.post('/earn-points', auth, async (req, res) => {
  const { uid } = req.user;
  const { amountSpent } = req.body;

  try {
    const user = await UserModel.findOne({ uid: uid });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const pointsEarned = Math.floor(amountSpent / 100); // 1 point for every ₹100 spent
    user.loyaltyPoints += pointsEarned;
    await user.save();

    res.status(200).json({ pointsEarned, totalPoints: user.loyaltyPoints });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Redeem Points for User
router.post('/redeem-points', auth, async (req, res) => {
  const { uid } = req.user;
  const { pointsToRedeem } = req.body;

  try {
    const user = await UserModel.findOne({ uid: uid });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.loyaltyPoints < pointsToRedeem) {
      return res.status(400).json({ msg: 'Not enough points' });
    }

    const discount = pointsToRedeem / 10; // 10 Points = ₹1 Discount
    user.loyaltyPoints -= pointsToRedeem;
    await user.save();

    res.status(200).json({ discount, remainingPoints: user.loyaltyPoints });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

//to get points
router.get('/points', auth, async (req, res) => {
  const { uid } = req.user;

  try {
    const user = await UserModel.findOne({ uid: uid });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ loyaltyPoints: user.loyaltyPoints });
  } catch (error) {
    res.status(500).send('Server error');
  }
});


export default router;
