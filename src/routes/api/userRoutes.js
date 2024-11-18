import express from 'express';
import {
  getAllUsers, // This matches the export in userController.js
  createUser,
  getUserById, // This should match the export in userController.js
} from '../../controllers/userController.js';

const router = express.Router();

// Define routes
router.get('/', getAllUsers);  // GET /api/users to fetch all users
router.post('/', createUser);  // POST /api/users to create a new user
router.get('/:id', getUserById);  // GET /api/users/:id to fetch a user by ID

export default router;