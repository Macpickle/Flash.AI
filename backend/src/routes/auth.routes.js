const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Doc = require("../models/doc.model");
const Flash = require("../models/flash.model");
const auth = require("../middleware/auth.middleware");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Validate user token and return user info
router.get("/", async (req, res) => {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Extract token from Bearer header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and exclude password
    const user = await User.findById(decoded.userId).select("-password").lean();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Return success with user info
    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        darkMode: user.darkMode,
      },
    });
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: "Server error during authentication",
    });
  }
});

// register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ message: "Invalid Username Length" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Invalid Password Length" });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === email
            ? "Email already exists"
            : "Username already exists",
      });
    }

    // create new user
    const user = new User({
      username,
      email,
      password,
      darkMode: false,
      docs: [],
    });
    await user.save();

    // Generate token, expires in 1 day by default
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: "1d" }    
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        theme: user.darkMode,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, keepLoggedIn} = req.body;
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid Login Credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Login Credentials" });
    }

    // Generate token, expires in 1 day by default
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: keepLoggedIn ? "7d" : "1d" }
    );

    // Return token and user information
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        theme: user.darkMode,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Login failed" });
  }
});

router.patch("/theme", auth, async (req, res) => {
  try {
    const { darkMode } = req.body;

    // Find user
    const user = await User.findById(req.userId);

    // error checking for user
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user theme
    user.darkMode = darkMode;
    await user.save();

    res.json({
      success: true,
      message: "User theme updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user theme",
      error: error.message,
    });
  }
});

// Update user settings
router.patch("/settings", auth, async (req, res) => {
  try {
    const { 
      username,
      email,
      privacy,
      dataCollection,
      thirdPartyData,
      analytics,
      currentPassword,
      newPassword,
      confirmPassword
    } = req.body;

    // Find user
    const user = await User.findById(req.userId);
    
    // error checking for user
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user settings
    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }


    /* not added yet
    if (privacy) {
      user.privacy = privacy;
    }

    if (dataCollection) {
      user.dataCollection = dataCollection;
    }

    if (thirdPartyData) {
      user.thirdPartyData = thirdPartyData;
    }

    if (analytics) {
      user.analytics = analytics;
    }
    */

    // Update password
    if (currentPassword && newPassword && confirmPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "New passwords do not match",
        });
      }

      user.password = newPassword;
    }

    await user.save();  

    res.json({
      success: true,
      message: "User information updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        privacy: user.privacy,
        dataCollection: user.dataCollection,
        thirdPartyData: user.thirdPartyData,
        analytics: user.analytics,
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user information",
      error: error.message,
    });
  }
});

// Delete user account and all associated data
router.delete("/delete", auth, async (req, res) => {
  try {
    // Find user's documents
    const docs = await Doc.find({ userId: req.userId });

    // Delete all flash cards associated with user's documents
    for (const doc of docs) {
      await Flash.deleteMany({ docId: doc._id });
    }

    // Delete all user's documents
    await Doc.deleteMany({ userId: req.userId });

    // Delete the user
    const user = await User.findByIdAndDelete(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User account and all associated data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user account",
      error: error.message,
    });
  }
});

module.exports = router;
