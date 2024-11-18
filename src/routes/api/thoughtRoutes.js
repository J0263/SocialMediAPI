import { getThoughts, createThought, updateThought, deleteThought, addReaction, removeReaction } from '../../controllers/thoughtController.js';

import express from 'express';
const router = express.Router();

router.route('/')
  .get(getThoughts) // This replaces getAllThoughts
  .post(createThought);

router.route('/:thoughtId')
  .get(getThoughts) // This replaces getAllThoughts for single thought retrieval
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions')
  .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

export default router;