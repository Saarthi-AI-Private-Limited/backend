import express from 'express';
import OrderModel from '../models/Order';
import auth from '../middleware/auth';

const router = express.Router();

// Place a new order
router.post('/', auth, async (req, res) => {
  const { user_id, store_id, products, total_amount, order_status } = req.body;

  try {
    const newOrder = new OrderModel({
      user_id,
      store_id,
      products,
      total_amount,
      order_status,
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get list of orders
router.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get order details by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update order status
router.put('/:id', auth, async (req, res) => {
  const { order_status } = req.body;

  try {
    let order = await OrderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { $set: { order_status } },
      { new: true }
    );

    res.status(200).json(order);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Cancel an order
router.delete('/:id', auth, async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    await order.remove();
    res.status(200).json({ msg: 'Order cancelled' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;
