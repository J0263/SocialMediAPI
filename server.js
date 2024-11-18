import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './src/routes/api/userRoutes.js'; // Update path if needed

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes); // Add the route for user endpoints

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media API!');
});

// Connect to MongoDB and Start Server
const startServer = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/socialmedia_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

startServer();