import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './src/routes/api/userRoutes.js';
import thoughtRoutes from './src/routes/api/thoughtRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json()); // This should be before your routes

// Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes); // Ensure this is included

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media API!');
});

// MongoDB Connection and Server Start
const startServer = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/socialmedia_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

startServer();