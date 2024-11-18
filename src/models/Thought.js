import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => timestamp.toISOString(),
    },
    reactions: [
      {
        reactionBody: { type: String, required: true },
        username: { type: String, required: true },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => timestamp.toISOString(),
        },
      },
    ],
  },
  {
    toJSON: { getters: true },
    id: false,
  }
);

const Thought = model('Thought', thoughtSchema);

export default Thought; // Default export