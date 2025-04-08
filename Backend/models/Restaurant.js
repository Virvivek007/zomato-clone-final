const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the restaurant
  description: { type: String, required: true }, // Brief description of the restaurant
  address: { type: String, required: true }, // Full address of the restaurant
  phoneNumber: { type: String, required: true }, // Contact number for inquiries or reservations
  cuisineType: { type: String, required: true }, // Type of cuisine served, e.g., Italian, Indian
  averageCostForTwo: { type: Number, required: true }, // Average cost for two people
  isVegetarianFriendly: { type: Boolean, default: false }, // Indicates if vegetarian options are available
  hasDeliveryOption: { type: Boolean, default: false }, // Indicates if delivery services are provided
  openingHours: { 
    type: String, 
    required: true 
  }, // Example: "9:00 AM - 10:00 PM"
  ratings: { type: Number, default: 0 }, // Average rating
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;