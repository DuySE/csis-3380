import express from 'express';
import fs from 'fs';
import multer from 'multer';
import Product from '../models/product.js';
import Category from '../models/category.js';

const router = express.Router();
const storage = multer.diskStorage({
  limit: {
    fileSize: 1024 * 1024 * 5 // 5MB Limit
  },
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(new Error('Please upload an image file (jpg, jpeg, or png).'));
    cb(undefined, true);
  }
});
const upload = multer({ storage });

// Add new product
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, price, category } = req.body;
    const image = req.file.path;
    const foundCategory = await Category.findOne({ name: category });
    const result = await new Product({ title, price, image, category: foundCategory._id }).save();
    if (result) res.status(201).send(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a product
router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await Product.findOneAndDelete({ _id });
    if (result) {
      if (fs.existsSync(result.image)) fs.unlink(result.image, err => {
        if (err) res.status(404).send('File not found!');
      });
    }
    res.status(201).send(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Edit a product
router.put('/:_id', upload.single('file'), async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, price, category } = req.body;
    const foundCategory = await Category.findOne({ name: category });
    const result = await Product.findOneAndUpdate({ _id }, {
      title,
      price,
      category: foundCategory._id
    }, { new: true, upsert: true });
    if (result) res.status(201).send(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
