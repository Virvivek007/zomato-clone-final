// diningOutRoutes.js
const express = require('express');
const DiningOut = require('../models/DiningOut'); // Assuming you have a DiningOut model defined
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

// Create a new dining place
router.post('/create', async (req, res) => {
  const { name, description, priceRange, cuisine, location, isFamilyFriendly, availability } = req.body;

  try {
    const newDiningOut = new DiningOut({ name, description, priceRange, cuisine, location, isFamilyFriendly, availability });
    await newDiningOut.save();
    res.json({ message: 'Dining place created successfully', diningPlace: newDiningOut });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all dining places
router.get('/', async (req, res) => {
  try {
    const diningPlaces = await DiningOut.find();
    res.json(diningPlaces);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific dining place by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const diningPlace = await DiningOut.findById(id);
    if (!diningPlace) {
      return res.status(404).json({ message: 'Dining place not found' });
    }
    res.json(diningPlace);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a dining place by ID
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, description, priceRange, cuisine, location, isFamilyFriendly, availability } = req.body;

  try {
    const updatedDiningPlace = await DiningOut.findByIdAndUpdate(
      id,
      { name, description, priceRange, cuisine, location, isFamilyFriendly, availability },
      { new: true }
    );
    if (!updatedDiningPlace) {
      return res.status(404).json({ message: 'Dining place not found' });
    }
    res.json({ message: 'Dining place updated successfully', diningPlace: updatedDiningPlace });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a dining place by ID
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDiningPlace = await DiningOut.findByIdAndDelete(id);
    if (!deletedDiningPlace) {
      return res.status(404).json({ message: 'Dining place not found' });
    }
    res.json({ message: 'Dining place deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;