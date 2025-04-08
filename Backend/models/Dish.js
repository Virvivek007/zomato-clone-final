const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // E.g., Starter, Main Course, Dessert
  isVegetarian: { type: Boolean, default: false },
  availability: { type: Boolean, default: true },
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;