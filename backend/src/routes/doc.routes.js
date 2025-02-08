const express = require('express');
const Doc = require('../models/doc.model');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

// Create doc
router.post('/', auth, async (req, res) => {
  try {
    const doc = new Doc({
      ...req.body,
      userId: req.userId
    });
    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ message: 'Could not create doc' });
  }
});

// Get all docs for user
router.get('/', auth, async (req, res) => {
  try {
    const docs = await Doc.find({ userId: req.userId });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch docs' });
  }
});

// Get single doc
router.get('/:id', auth, async (req, res) => {
  try {
    const doc = await Doc.findOne({ _id: req.params.id, userId: req.userId });
    if (!doc) {
      return res.status(404).json({ message: 'Doc not found' });
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch doc' });
  }
});

// Update doc
router.put('/:id', auth, async (req, res) => {
  try {
    const doc = await Doc.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!doc) {
      return res.status(404).json({ message: 'Doc not found' });
    }
    res.json(doc);
  } catch (error) {
    res.status(400).json({ message: 'Could not update doc' });
  }
});

// Delete doc
router.delete('/:id', auth, async (req, res) => {
  try {
    const doc = await Doc.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!doc) {
      return res.status(404).json({ message: 'Doc not found' });
    }
    res.json({ message: 'Doc deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Could not delete doc' });
  }
});

module.exports = router;
