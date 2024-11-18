const router = require('express').Router();
const apiRoutes = require('./api');

// Mount API routes
router.use('/api', apiRoutes);

// API documentation route (optional)
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Social Media API',
    routes: {
      api: '/api',
    },
  });
});

// Fallback for undefined routes
router.use((req, res) => {
  console.error(`404 Error: Route not found - ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

module.exports = router;