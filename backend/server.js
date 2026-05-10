require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Debug logging
console.log('🚀 Step 1: Starting backend server...');
console.log('📝 MONGODB_URI:', process.env.MONGODB_URI ? '✅ SET' : '❌ NOT SET');
console.log('📝 NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('📝 PORT:', process.env.PORT || 5000);

// Middleware
console.log('🚀 Step 2: Setting up middleware...');
app.use(cors());
app.use(express.json());
console.log('✅ Middleware setup complete');

// Connect to database (with error handling)
console.log('🚀 Step 3: Connecting to MongoDB...');
connectDB().catch(err => {
  console.error('❌ Failed to connect to MongoDB on startup:', err.message);
  // Continue running even if DB fails, so we can still access health endpoint
});

// Health check (at root level for quick verification)
console.log('🚀 Step 4: Registering routes...');
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Health check (under /api for consistency)
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
console.log('✅ All routes registered');

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

console.log('🚀 Step 5: Starting server listener...');
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ ========================================`);
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ API ready at http://localhost:${PORT}/api`);
  console.log(`✅ Health check at http://localhost:${PORT}/health`);
  console.log(`✅ ========================================\n`);
});
