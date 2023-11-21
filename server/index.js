import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import Product from './models/product.js';
import Category from './models/category.js';

const app = express();
const PORT = 5000;
const DATABASE_URL = 'mongodb+srv://douglas:csis3380@cluster.zr7rmfn.mongodb.net/storedb?retryWrites=true&w=majority';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get products in a specific category
app.get('/:category', async (req, res) => {
  const { category } = req.params;
  console.log(category);
  const response = await Product.find({ category }).sort({ title: 1 });
  if (response) res.status(200).send(response);
  else res.status(500).send('Internal server error');
});

// Add new product
app.post('/add', upload.single('file'), async (req, res) => {
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

mongoose
  .connect(DATABASE_URL)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`The server is listening on port ${PORT}!`);
    })
  });