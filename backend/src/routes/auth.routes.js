const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();

// check user token
router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    res.json({ success: true });
  } catch (error) {
    res.status(401).json({ success: false });
  }
});

// register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === email ? 'Email already exists' : 'Username already exists'
      });
    }

    const user = new User({
      username,
      email,
      password,
      darkMode: false,
      docs: []
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        darkMode: user.darkMode
      }
    });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        darkMode: user.darkMode
      }
    });
  } catch (error) {
    res.status(400).json({ message: 'Login failed' });
  }
});

// Update user preferences
router.patch('/preferences', async (req, res) => {
  try {
    const { darkMode } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { darkMode },
      { new: true }
    );

    res.json({
      darkMode: user.darkMode
    });
  } catch (error) {
    res.status(400).json({ message: 'Could not update preferences' });
  }
});

module.exports = router;
