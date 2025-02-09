const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();

// Validate user token and return user info
router.get('/', async (req, res) => {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    // Extract token from Bearer header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token format' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user and exclude password
    const user = await User.findById(decoded.userId)
      .select('-password')
      .lean();

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Return success with user info
    res.json({ 
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        darkMode: user.darkMode
      }
    });
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired' 
      });
    }

    // Handle other errors
    res.status(500).json({ 
      success: false, 
      message: 'Server error during authentication'
    });
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
    const { username, email, password, confirmPassword, themeSwitch } = req.body;

    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await User.findById(decoded.userId);

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Update user preferences
    user.username = username;

    // save user
    await user.save();
    console.log(user);

  } catch (error) {
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
});

module.exports = router;
