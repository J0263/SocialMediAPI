import express from 'express';
import {
  getThoughts, // Ensure the correct controller function is imported
  createThought, // Function to handle POST request for creating a new thought
  getThoughtById,
  updateThought,
  deleteThought,
} from '../../controllers/thoughtController.js';

const router = express.Router();

// POST route to create a new thought
router.post('/', createThought); // Ensure this route is correctly defined

// Other routes for GET, PUT, DELETE, etc.
router.get('/', getThoughts);
router.get('/:id', getThoughtById);
router.put('/:id', updateThought);
router.delete('/:id', deleteThought);

export default router;