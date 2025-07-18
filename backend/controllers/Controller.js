const express = require('express');
const router = express.Router();
const { upload, cloudinary } = require('../config/cloudinary');

const Market = require('../models/Marketplace');
const FoundItem = require('../models/FoundItem');
const LostItem = require('../models/LostItem');

// --- SELL ROUTES ---

router.get('/sell', async (req, res) => {
  try {
    const items = await Market.find({ type: 'sell' }).sort({ posted_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/sell', upload.single('image'), async (req, res) => {
  try {
    let image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFs4xa_05ZRIvnlM2c7cVV43td4VHNubEuWw&s';
    let imagePublicId = null;

      if (req.file) {
  image = req.file.path; 
  imagePublicId = req.file.filename; 
}


    const newItem = new Market({
      ...req.body,
      type: 'sell',
      image,
      imagePublicId,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/sell/:id', upload.single('image'), async (req, res) => {
  try {
    const item = await Market.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Handle image update
    if (req.file) {
      // 1. Delete old image from Cloudinary
      if (item.imagePublicId) {
        await cloudinary.uploader.destroy(item.imagePublicId);
      }

      // 2. Use new image info from multer-cloudinary
      req.body.image = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    // 3. Update fields
    const updatedItem = await Market.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

router.delete('/sell/:id', async (req, res) => {
  try {
    const item = await Market.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId)
      .then("console.log('Image deleted from Cloudinary')") // Log success message
      .catch(err => console.error('Error deleting image from Cloudinary:', err)); // Log
    }

    await Market.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sell item and image deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch('/lost/:id', upload.single('image'), async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Handle image update
    if (req.file) {
      // 1. Delete old image from Cloudinary
      if (item.imagePublicId) {
        await cloudinary.uploader.destroy(item.imagePublicId);
      }

      // 2. Use new image info from multer-cloudinary
      req.body.image = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    // 3. Update fields
    const updatedItem = await LostItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});



// --- BUY ROUTES ---

router.get('/buy', async (req, res) => {
  try {
    const items = await Market.find({ type: 'buy' }).sort({ posted_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/buy', upload.single('image'), async (req, res) => {
  try {
    let image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFs4xa_05ZRIvnlM2c7cVV43td4VHNubEuWw&s';
    let imagePublicId = null;

       if (req.file) {
  image = req.file.path; 
  imagePublicId = req.file.filename; 
}


    const newItem = new Market({
      ...req.body,
      type: 'buy',
      image,
      imagePublicId,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/buy/:id', upload.single('image'), async (req, res) => {
  try {
    const item = await Market.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Handle image update
    if (req.file) {
      // 1. Delete old image from Cloudinary
      if (item.imagePublicId) {
        await cloudinary.uploader.destroy(item.imagePublicId);
      }

      // 2. Use new image info from multer-cloudinary
      req.body.image = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    // 3. Update fields
    const updatedItem = await Market.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

router.delete('/buy/:id', async (req, res) => {
  try {
    const item = await Market.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

     if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId)
      .then("console.log('Image deleted from Cloudinary')") // Log success message
      .catch(err => console.error('Error deleting image from Cloudinary:', err)); // Log
    }

    await Market.findByIdAndDelete(req.params.id);
    res.json({ message: 'Buy item and image deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- FOUND ITEM ROUTES ---

router.get('/found', async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ posted_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/found', upload.single('image'), async (req, res) => {
  try {
    let image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYpXHekZ71OwHAvzt648mNklj8YvCD7DV3g&s';
    let imagePublicId = null;

     if (req.file) {
  image = req.file.path; 
  imagePublicId = req.file.filename; 
}


    const newItem = new FoundItem({
      ...req.body,
      image,
      imagePublicId,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/found/:id', upload.single('image'), async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Handle image update
    if (req.file) {
      // 1. Delete old image from Cloudinary
      if (item.imagePublicId) {
        await cloudinary.uploader.destroy(item.imagePublicId);
      }

      // 2. Use new image info from multer-cloudinary
      req.body.image = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    // 3. Update fields
    const updatedItem = await FoundItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

router.delete('/found/:id', async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId)
      .then("console.log('Image deleted from Cloudinary')") // Log success message
      .catch(err => console.error('Error deleting image from Cloudinary:', err)); // Log
    }

    await FoundItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Found item and image deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- LOST ITEM ROUTES ---

router.get('/lost', async (req, res) => {
  try {
    const items = await LostItem.find().sort({ posted_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/lost', upload.single('image'), async (req, res) => {
  try {
    let image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYpXHekZ71OwHAvzt648mNklj8YvCD7DV3g&s';
    let imagePublicId = null;

    if (req.file) {
  image = req.file.path; 
  imagePublicId = req.file.filename; 
}

    const newItem = new LostItem({
      ...req.body,
      image,
      imagePublicId,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/lost/:id', async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Only delete from Cloudinary if it's an uploaded image
    if (item.imagePublicId) {
      console.log("Deleting from Cloudinary:", item.imagePublicId);
      const result = await cloudinary.uploader.destroy(item.imagePublicId);
      console.log("Cloudinary response:", result);
    }

    await LostItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lost item and image deleted' });
  } catch (err) {
    console.error('Deletion error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
