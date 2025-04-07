// importing all required external modules after installation
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const authRoutes = require('./routes/authRoutes'); // Import the router

// Middleware
const PORT = 3000;
const app = express();
// Use the CORS middleware
app.use(cors());


app.use(express.json());

// Connection to MongoDB Atlas
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected Successfully..."))
  .catch((err) => console.log(err));

// API Landing Page
app.get('/', async (req, res) => {
  try {
    res.send("<h1 align=center>Welcome to the backend and week 2</h1>");
  } catch (err) {
    console.log(err);
  }
});

// Attach the authentication router
app.use('/api/auth', authRoutes);

// Server running and testing
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port | This is Vivek :" + PORT);
});