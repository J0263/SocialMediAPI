import User from '../models/User.js';
import mongoose from 'mongoose';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {  // Ensure this is exported
  const { userId } = req.params;
  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: 'Invalid ObjectId format' });
  }
  const user = await User.findById(userId);
  res.status(200).json(user);
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required.' });
    }

    const newUser = await User.create({ username, email });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};