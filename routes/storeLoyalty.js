import express from 'express';
import StoreModel from '../models/Store';
import auth from '../middleware/auth';

const router = express.Router();

// Earn Points
router.post('/business/earnPoints', auth, async (req, res) => {
  const { businessID, amountSold } = req.body;

  try {
    const store = await StoreModel.findById(businessID);
    if (!store) {
      return res.status(404).json({ msg: 'Store not found' });
    }

    // Earn 1 point for every ₹1000 in sales
    const pointsEarned = Math.floor(amountSold / 1000);
    store.loyaltyPoints += pointsEarned;

    // Add sale to sales history
    const sale = {
      saleID: new mongoose.Types.ObjectId().toString(),
      totalAmount: amountSold,
      pointsEarned,
    };
    store.sales.push(sale);

    await store.save();

    res.status(200).json({
      pointsEarned,
      totalPoints: store.loyaltyPoints,
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Utilize Points
router.post('/business/utilizePoints', auth, async (req, res) => {
  const { businessID, pointsToUtilize } = req.body;

  try {
    const store = await StoreModel.findById(businessID);
    if (!store) {
      return res.status(404).json({ msg: 'Store not found' });
    }

    if (store.loyaltyPoints < pointsToUtilize) {
      return res.status(400).json({ msg: 'Insufficient points' });
    }

    // 100 points = 1 month premium feature access
    const monthsAccess = Math.floor(pointsToUtilize / 100);
    if (monthsAccess === 0) {
      return res.status(400).json({ msg: 'Not enough points for premium access' });
    }

    // Update premium access date
    const currentAccessUntil = store.premiumAccessUntil || new Date();
    const newAccessUntil = new Date(currentAccessUntil.setMonth(currentAccessUntil.getMonth() + monthsAccess));
    store.premiumAccessUntil = newAccessUntil;
    store.loyaltyPoints -= pointsToUtilize;

    await store.save();

    res.status(200).json({
      serviceAccess: `Premium access until ${store.premiumAccessUntil}`,
      remainingPoints: store.loyaltyPoints,
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;
