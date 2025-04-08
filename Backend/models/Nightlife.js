const mongoose = require("mongoose");

const nightlifeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the nightlife venue
  description: { type: String, required: true }, // Brief description of the venue
  address: { type: String, required: true }, // Location or address
  type: { type: String, required: true }, // E.g., Club, Bar, Lounge
  priceRange: { type: String, required: true }, // E.g., $, $$, $$$
  ageRestriction: { type: Number, required: false }, // Minimum age for entry, if applicable
  openingHours: { type: String, required: true }, // Example: "8:00 PM - 3:00 AM"
  isVegetarianFriendly: { type: Boolean, default: false }, // Vegetarian options available
  hasLiveMusic: { type: Boolean, default: false }, // Whether live music is available
  ratings: { type: Number, default: 0 }, // Average rating
  availability: { type: Boolean, default: true }, // Whether the venue is currently operational
});

const Nightlife = mongoose.model("Nightlife", nightlifeSchema);

module.exports = Nightlife;