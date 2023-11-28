import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// Import routes
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import userRoutes from './routes/users.js';

const app = express();
const PORT = 5000;
const DATABASE_URL = 'mongodb+srv://douglas:csis3380@cluster.zr7rmfn.mongodb.net/storedb?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
// Product routes
app.use('/products', productRoutes);
// Category routes
app.use('/categories', categoryRoutes);
// User routes
app.use('/users', userRoutes);

mongoose
  .connect(DATABASE_URL)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`The server is listening on port ${PORT}!`);
    })
  });