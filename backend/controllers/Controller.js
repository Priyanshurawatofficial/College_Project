const express = require('express');
const router = express.Router();

const Sell = require('../models/Sell');
const FoundItem = require('../models/FoundItem');
const Buy = require('../models/Buy'); // Require Buy model if you have it
const LostItem = require('../models/LostItem'); // Require LostItem model if you have it

// --- SELL ROUTES ---

// Get all sell items
router.get('/sell', async (req, res) => {
  try {
    const items = await Sell.find({ type: 'sell' }).sort({ posted_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new sell item
router.post('/sell', async (req, res) => {
  try {
    const newItem = new Sell({ ...req.body, type: 'sell' });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a sell item
router.delete('/sell/:id', async (req, res) => {
  try {
    await Sell.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sell item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- BUY ROUTES ---

// Get all buy items
router.get('/buy', async (req, res) => {
  try {
    const items = await Buy.find({ type: 'buy' }).sort({ posted_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new buy item
router.post('/buy', async (req, res) => {
  try {
    const newItem = new Buy({ ...req.body, type: 'buy' });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a buy item
router.delete('/buy/:id', async (req, res) => {
  try {
    await Buy.findByIdAndDelete(req.params.id);
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
router.post('/found', async (req, res) => {
  try {
    const newItem = new FoundItem(req.body);
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
router.post('/lost', async (req, res) => {
  try {
    const newItem = new LostItem(req.body);
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