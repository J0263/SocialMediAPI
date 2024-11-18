import Thought from '../models/Thought.js';
import User from '../models/User.js';

// Get all thoughts
const getThoughts = async (req, res) => { 
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve thoughts', error: err.message });
  }
};

// Get a single thought by ID
const getThoughtById = async (req, res) => {
  const { thoughtId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
    return res.status(400).json({ message: 'Invalid thought ID' });
  }
  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve thought', error: err.message });
  }
};

// Create a new thought and add to user's thought list
const createThought = async (req, res) => {
  const { userId, thoughtText } = req.body;
  if (!userId || !thoughtText) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });
    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create thought', error: err.message });
  }
};

// Update a thought by ID
const updateThought = async (req, res) => {
  const { thoughtId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
    return res.status(400).json({ message: 'Invalid thought ID' });
  }
  try {
    const thought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true, runValidators: true });
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update thought', error: err.message });
  }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
  const { thoughtId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
    return res.status(400).json({ message: 'Invalid thought ID' });
  }
  try {
    const thought = await Thought.findByIdAndDelete(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with that ID' });
    }
    await User.updateMany({ thoughts: thoughtId }, { $pull: { thoughts: thoughtId } });
    res.json({ message: 'Thought deleted!', thoughtId: thought._id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete thought', error: err.message });
  }
};

// Add a reaction to a thought
const addReaction = async (req, res) => {
  const { thoughtId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
    return res.status(400).json({ message: 'Invalid thought ID' });
  }
  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add reaction', error: err.message });
  }
};

// Remove a reaction from a thought
const removeReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(thoughtId) || !mongoose.Types.ObjectId.isValid(reactionId)) {
    return res.status(400).json({ message: 'Invalid ID(s)' });
  }
  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove reaction', error: err.message });
  }
};

export {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};