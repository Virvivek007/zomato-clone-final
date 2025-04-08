const mongoose = require("mongoose");

const diningOutSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the dining place
  description: { type: String, required: true }, // Description of the dining experience
  priceRange: { type: String, required: true }, // E.g., $, $$, $$$
  cuisine: { type: String, required: true }, // E.g., Italian, Indian, Chinese
  location: { type: String, required: true }, // Address or area
  isFamilyFriendly: { type: Boolean, default: false }, // Family-friendly dining or not
  availability: { type: Boolean, default: true }, // Open or closed status
});

const DiningOut = mongoose.model("DiningOut", diningOutSchema);

module.exports = DiningOut;