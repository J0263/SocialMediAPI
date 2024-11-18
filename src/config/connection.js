const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// MongoDB connection string
const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialMediaDB';

// Function to establish a connection with MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true, // Ensures support for modern connection string features
      useUnifiedTopology: true, // Uses the new Server Discovery and Monitoring engine
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit the process with a failure code
  }
};

// Event listeners for the MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('Mongoose successfully connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose encountered a connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

// Graceful shutdown on app termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed due to application termination');
  process.exit(0);
});

// Initialize the connection
connectDB();

// Export the connection for use in other modules
module.exports = mongoose.connection;