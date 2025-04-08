// orderRoutes.js
const express = require('express');
const Order = require('../models/Order'); // Assuming you have an Order model defined
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

// Create a new order
router.post('/create', async (req, res) => {
  const { orderId, customerName, items, totalAmount, deliveryAddress } = req.body;

  try {
    const newOrder = new Order({ orderId, customerName, items, totalAmount, deliveryAddress });
    await newOrder.save();
    res.json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific order by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an order by ID
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { orderId, customerName, items, totalAmount, deliveryAddress, orderStatus } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderId, customerName, items, totalAmount, deliveryAddress, orderStatus },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an order by ID
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;