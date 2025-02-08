const express = require('express');
const Flash = require('../models/flash.model');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

// Create flash card
router.post('/', auth, async (req, res) => {
  try {
    const flash = new Flash({
      ...req.body,
      userId: req.userId
    });
    await flash.save();
    res.status(201).json(flash);
  } catch (error) {
    res.status(400).json({ message: 'Could not create flash card' });
  }
});

// Get all flash cards for user
router.get('/', auth, async (req, res) => {
  try {
    const flashCards = await Flash.find({ userId: req.userId });
    res.json(flashCards);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch flash cards' });
  }
});

// Get single flash card
router.get('/:id', auth, async (req, res) => {
  try {
    const flash = await Flash.findOne({ _id: req.params.id, userId: req.userId });
    if (!flash) {
      return res.status(404).json({ message: 'Flash card not found' });
    }
    res.json(flash);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch flash card' });
  }
});

// Update flash card
router.put('/:id', auth, async (req, res) => {
  try {
    const flash = await Flash.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!flash) {
      return res.status(404).json({ message: 'Flash card not found' });
    }
    res.json(flash);
  } catch (error) {
    res.status(400).json({ message: 'Could not update flash card' });
  }
});

// Delete flash card
router.delete('/:id', auth, async (req, res) => {
  try {
    const flash = await Flash.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!flash) {
      return res.status(404).json({ message: 'Flash card not found' });
    }
    res.json({ message: 'Flash card deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Could not delete flash card' });
  }
});

module.exports = router;
