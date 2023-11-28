import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

// Authenticate a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && user.password === password) res.status(200).send(user);
  else res.status(401).send('Unauthorized user');
});

export default router;
