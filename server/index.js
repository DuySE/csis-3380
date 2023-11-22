import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
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

// Get products in a specific category
app.get('/products/category/:category', async (req, res) => {
  const { category } = req.params;
  const foundCategory = await Category.findOne({ name: category });
  const response = await Product.find({ category: foundCategory._id }).sort({ title: 1 });
  if (response) res.status(200).send(response);
  else res.status(500).send('Internal server error');
});

// Add new product
app.post('/products', async (req, res) => {
  try {
    const { title, price, category } = req.body;
    const image = req.file.buffer;
    const foundCategory = await Category.findOne({ name: category });
    const result = await new Product({ title, price, image, category: foundCategory._id }).save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Edit a product
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { title, price } = req.body;
  const image = req.file.path;
  const product = await Product.findOneAndUpdate({ id }, {
    title,
    price,
    image
  }, { new: true, upsert: true });
});


mongoose
  .connect(DATABASE_URL)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`The server is listening on port ${PORT}!`);
    })
  });