const mongoose = require('mongoose');
const { User, Thought } = require('../models');

// MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/socialmediapi';

// Sample data
const userData = [
  {
    username: 'user1',
    email: 'user1@example.com',
  },
  {
    username: 'user2',
    email: 'user2@example.com',
  },
];

const thoughtData = [
  {
    thoughtText: 'This is the first thought.',
    username: 'user1',
  },
  {
    thoughtText: 'This is the second thought.',
    username: 'user2',
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Existing data cleared');

    // Insert users
    const users = await User.insertMany(userData);
    console.log('Users seeded:', users);

    // Map thoughts to users
    const thoughts = await Thought.insertMany(
      thoughtData.map((thought) => ({
        ...thought,
        userId: users.find((user) => user.username === thought.username)._id,
      }))
    );
    console.log('Thoughts seeded:', thoughts);

    // Associate thoughts with users
    for (const thought of thoughts) {
      await User.findOneAndUpdate(
        { _id: thought.userId },
        { $push: { thoughts: thought._id } }
      );
    }

    console.log('Thoughts linked to users');
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding the database:', err);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

seedDatabase();