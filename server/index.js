import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import multer from 'multer';
import Product from './models/product.js';
import Category from './models/category.js';

const app = express();
const PORT = 5000;
const DATABASE_URL = 'mongodb+srv://douglas:csis3380@cluster.zr7rmfn.mongodb.net/storedb?retryWrites=true&w=majority';

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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Get products in a specific category
app.get('/products/category/:category', async (req, res) => {
  const { category } = req.params;
  const foundCategory = await Category.findOne({ name: category });
  const response = await Product.find({ category: foundCategory._id }).sort({ title: 1 });
  if (response) res.status(200).send(response);
  else res.status(500).send('Internal server error');
});

// Add new product
app.post('/products', upload.single('file'), async (req, res) => {
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
app.delete('/products/:_id', async (req, res) => {
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
app.put('/products/:_id', upload.single('file'), async (req, res) => {
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

mongoose
  .connect(DATABASE_URL)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`The server is listening on port ${PORT}!`);
    })
  });