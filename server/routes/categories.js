import express from 'express';
import Product from '../models/product.js';
import Category from '../models/category.js';

const router = express.Router();

// Get products in a specific category
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const foundCategory = await Category.findOne({ name });
    const response = await Product.find({ category: foundCategory._id }).sort({ title: 1 });
    if (response) res.status(200).send(response);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

export default router;
