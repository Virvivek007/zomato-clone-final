// authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

// Registration Route
router.post('/signup', async (req, res) => {
  const { user, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ user, email, password: hashPassword });
    await newUser.save();
    console.log("New user is registered successfully...");
    res.json({ message: 'User Created....' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ message: 'Login Successful', username: user.user, token:token }); // In
    //res.json({ message: 'Login Successful', username: user.user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/verifyToken', authenticate ,async (req, res) => {

    if(req.user){
        res.status(200).json({'auth':'successfull'})
    }


});

module.exports = router;