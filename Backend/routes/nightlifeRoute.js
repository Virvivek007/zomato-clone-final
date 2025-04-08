// nightlifeRoutes.js
const express = require('express');
const Nightlife = require('../models/Nightlife'); // Assuming you have a Nightlife model defined
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

// Create a new nightlife venue
router.post('/create', async (req, res) => {
  const { name, description, address, type, priceRange, ageRestriction, openingHours, isVegetarianFriendly, hasLiveMusic, ratings, availability } = req.body;

  try {
    const newNightlife = new Nightlife({ name, description, address, type, priceRange, ageRestriction, openingHours, isVegetarianFriendly, hasLiveMusic, ratings, availability });
    await newNightlife.save();
    res.json({ message: 'Nightlife venue created successfully', nightlife: newNightlife });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all nightlife venues
router.get('/', async (req, res) => {
  try {
    const nightlifeVenues = await Nightlife.find();
    res.json(nightlifeVenues);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific nightlife venue by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const nightlife = await Nightlife.findById(id);
    if (!nightlife) {
      return res.status(404).json({ message: 'Nightlife venue not found' });
    }
    res.json(nightlife);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a nightlife venue by ID
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, description, address, type, priceRange, ageRestriction, openingHours, isVegetarianFriendly, hasLiveMusic, ratings, availability } = req.body;

  try {
    const updatedNightlife = await Nightlife.findByIdAndUpdate(
      id,
      { name, description, address, type, priceRange, ageRestriction, openingHours, isVegetarianFriendly, hasLiveMusic, ratings, availability },
      { new: true }
    );
    if (!updatedNightlife) {
      return res.status(404).json({ message: 'Nightlife venue not found' });
    }
    res.json({ message: 'Nightlife venue updated successfully', nightlife: updatedNightlife });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a nightlife venue by ID
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNightlife = await Nightlife.findByIdAndDelete(id);
    if (!deletedNightlife) {
      return res.status(404).json({ message: 'Nightlife venue not found' });
    }
    res.json({ message: 'Nightlife venue deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;