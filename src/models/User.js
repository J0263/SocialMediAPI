import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trimmed: true },
    email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

export default User; // Ensure the model is exported only once