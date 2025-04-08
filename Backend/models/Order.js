const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true }, // Unique identifier for the order
  customerName: { type: String, required: true }, // Name of the customer
  items: [
    {
      dishName: { type: String, required: true }, // Name of the dish
      quantity: { type: Number, required: true }, // Quantity ordered
      price: { type: Number, required: true }, // Price per item
    }
  ], // List of items in the order
  totalAmount: { type: Number, required: true }, // Total cost of the order
  orderStatus: { type: String, default: "Pending" }, // E.g., Pending, Preparing, Completed
  timestamp: { type: Date, default: Date.now }, // Time of order placement
  deliveryAddress: { type: String, required: false }, // Address for delivery, if applicable
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;