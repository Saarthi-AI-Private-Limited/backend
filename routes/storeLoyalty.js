import express from 'express';
import StoreModel from '../models/StoreModel.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Earn Points
router.post('/business/earn-points', auth, async (req, res) => {
  const { uid } = req.user;
  const { amountSold } = req.body;

  try {
    const store = await StoreModel.findOne({ store_id: uid });
    if (!store) {
      return res.status(404).json({ msg: 'Store not found' });
    }

    const pointsEarned = Math.floor(amountSold / 1000); // 1 point for every ₹1000 in sales
    store.loyaltyPoints += pointsEarned;
    await store.save();

    res.status(200).json({ pointsEarned, totalPoints: store.loyaltyPoints });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Utilize Points for Store
router.post('/business/utilize-points', auth, async (req, res) => {
  const { uid } = req.user;
  const { pointsToUtilize } = req.body;

  try {
    const store = await StoreModel.findOne({ store_id: uid });
    if (!store) {
      return res.status(404).json({ msg: 'Store not found' });
    }

    if (store.loyaltyPoints < pointsToUtilize) {
      return res.status(400).json({ msg: 'Not enough points' });
    }

    // Assuming utilization gives access to a premium feature
    const serviceAccess = 'Premium Feature';
    store.loyaltyPoints -= pointsToUtilize;

    // Set premium access expiry (e.g., 1 month)
    const premiumAccessDuration = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    store.premiumAccessUntil = new Date(Date.now() + premiumAccessDuration);
    await store.save();

    res.status(200).json({ serviceAccess, remainingPoints: store.loyaltyPoints });
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.get('/business/points', auth, async (req, res) => {
  const { uid } = req.user;

  try {
    const store = await StoreModel.findOne({ store_id: uid });
    if (!store) {
      return res.status(404).json({ msg: 'Store not found' });
    }

    res.status(200).json({ loyaltyPoints: store.loyaltyPoints });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;
