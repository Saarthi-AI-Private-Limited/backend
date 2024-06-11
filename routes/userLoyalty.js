import express from 'express';
import UserModel from '../models/User';
import auth from '../middleware/auth';

const router = express.Router();

// Earn Points
router.post('/earnPoints', auth, async (req, res) => {
  const { userID, amountSpent } = req.body;

  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Earn 1 point for every ₹100 spent
    const pointsEarned = Math.floor(amountSpent / 100);
    user.loyaltyPoints += pointsEarned;

    await user.save();

    res.status(200).json({
      pointsEarned,
      totalPoints: user.loyaltyPoints,
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Redeem Points
router.post('/redeemPoints', auth, async (req, res) => {
  const { userID, pointsToRedeem } = req.body;

  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.loyaltyPoints < pointsToRedeem) {
      return res.status(400).json({ msg: 'Insufficient points' });
    }

    // 10 points = ₹1 discount
    const discount = pointsToRedeem / 10;
    user.loyaltyPoints -= pointsToRedeem;

    await user.save();

    res.status(200).json({
      discount,
      remainingPoints: user.loyaltyPoints,
    });
  } catch (error) {
    res.status  .500).send('Server error');
  }
});

export default router;
