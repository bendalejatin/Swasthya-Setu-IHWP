const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const assessmentRoutes = require('./Routes/assessmentRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const todoRoutes = require('./Routes/todoRoutes');

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/SwasthyaSetu', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  });

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/api', assessmentRoutes);
app.use('/admin', adminRoutes);
app.use('/api', todoRoutes);

console.log('Routes registered:');
console.log('- Auth routes: /');
console.log('- Assessment routes: /api');
console.log('- Admin routes: /admin');
console.log('- Todo routes: /api');

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
