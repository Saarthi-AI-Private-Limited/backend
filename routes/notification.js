import express from 'express';
import NotificationModel from '../models/Notification';
import auth from '../middleware/auth';

const router = express.Router();

// Send a notification
router.post('/send', auth, async (req, res) => {
  const { notification, date, status, user } = req.body;

  try {
    const newNotification = new NotificationModel({
      notification,
      date,
      status,
      user,
    });

    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get notification status
router.get('/status', auth, async (req, res) => {
  const { user } = req.query;

  try {
    const notifications = await NotificationModel.find({ user });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;
