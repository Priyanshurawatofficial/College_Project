const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');

const Market = require('../models/Marketplace');
const FoundItem = require('../models/FoundItem');
const LostItem = require('../models/LostItem');

// --- SELL ROUTES ---

// Get all sell items
router.get('/sell', async (req, res) => {
  try {
    const items = await Market.find({ type: 'sell' }).sort({ posted_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new sell item
router.post('/sell', upload.single('image'), async (req, res) => {
  try {
    const itemData = {
      ...req.body,
      type: 'sell',
      image: req.file ? req.file.path : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFs4xa_05ZRIvnlM2c7cVV43td4VHNubEuWw&s' // Default image if none uploaded
    };
    
    const newItem = new Market(itemData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a sell item
router.delete('/sell/:id', async (req, res) => {
  try {
    await Market.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sell item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- BUY ROUTES ---

// Get all buy items
router.get('/buy', async (req, res) => {
  try {
    const items = await Market.find({ type: 'buy' }).sort({ posted_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new buy item
router.post('/buy', upload.single('image'), async (req, res) => {
  try {
    const itemData = {
      ...req.body,
      type: 'buy',
      image: req.file ? req.file.path : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFs4xa_05ZRIvnlM2c7cVV43td4VHNubEuWw&s' // Default image if none uploaded
    };
    
    const newItem = new Market(itemData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a buy item
router.delete('/buy/:id', async (req, res) => {
  try {
    await Market.findByIdAndDelete(req.params.id);
    res.json({ message: 'Buy item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- FOUND ITEM ROUTES ---

// Get all found items
router.get('/found', async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ posted_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new found item
router.post('/found', upload.single('image'), async (req, res) => {
  try {
    const itemData = {
      ...req.body,
      image: req.file ? req.file.path : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYpXHekZ71OwHAvzt648mNklj8YvCD7DV3g&s' // Default image if none uploaded
    };
    
    const newItem = new FoundItem(itemData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a found item
router.delete('/found/:id', async (req, res) => {
  try {
    await FoundItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Found item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- LOST ITEM ROUTES (if you have LostItem model) ---

// Get all lost items
router.get('/lost', async (req, res) => {
  try {
    const items = await LostItem.find().sort({ posted_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new lost item
router.post('/lost', upload.single('image'), async (req, res) => {
  try {
    const itemData = {
      ...req.body,
      image: req.file ? req.file.path : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYpXHekZ71OwHAvzt648mNklj8YvCD7DV3g&s' // Default image if none uploaded
    };
    
    const newItem = new LostItem(itemData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a lost item
router.delete('/lost/:id', async (req, res) => {
  try {
    await LostItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lost item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;