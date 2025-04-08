// dishRoutes.js
const express = require('express');
const Dish = require('../models/Dish'); // Assuming you have a Dish model defined
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

// Create a new dish
router.post('/create', async (req, res) => {
  const { name, ingredients, price, description , category } = req.body;

  try {
    const newDish = new Dish({ name, ingredients, price, description , category });
    await newDish.save();
    res.json({ message: 'Dish created successfully', dish: newDish });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific dish by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const dish = await Dish.findById(id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.json(dish);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a dish by ID
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, price, description } = req.body;

  try {
    const updatedDish = await Dish.findByIdAndUpdate(
      id,
      { name, ingredients, price, description },
      { new: true }
    );
    if (!updatedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.json({ message: 'Dish updated successfully', dish: updatedDish });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a dish by ID
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDish = await Dish.findByIdAndDelete(id);
    if (!deletedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.json({ message: 'Dish deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;