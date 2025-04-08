// restaurantRoutes.js
const express = require('express');
const Restaurant = require('../models/Restaurant'); // Assuming you have a Restaurant model defined
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

// Create a new restaurant
router.post('/create', async (req, res) => {
  const { name, description, address, phoneNumber, cuisineType, averageCostForTwo, isVegetarianFriendly, hasDeliveryOption, openingHours, ratings } = req.body;

  try {
    const newRestaurant = new Restaurant({ name, description, address, phoneNumber, cuisineType, averageCostForTwo, isVegetarianFriendly, hasDeliveryOption, openingHours, ratings });
    await newRestaurant.save();
    res.json({ message: 'Restaurant created successfully', restaurant: newRestaurant });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific restaurant by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a restaurant by ID
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, description, address, phoneNumber, cuisineType, averageCostForTwo, isVegetarianFriendly, hasDeliveryOption, openingHours, ratings } = req.body;

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, description, address, phoneNumber, cuisineType, averageCostForTwo, isVegetarianFriendly, hasDeliveryOption, openingHours, ratings },
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant updated successfully', restaurant: updatedRestaurant });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a restaurant by ID
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;