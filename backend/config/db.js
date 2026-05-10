const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', process.env.MONGODB_URI ? 'Provided' : 'Using default');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected:', conn.connection.host);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    // Don't exit - let the app continue running
    // This allows the health endpoint to still work
    console.warn('⚠️ App running without database connection. API routes will fail until MongoDB is connected.');
    return null;
  }
};

module.exports = connectDB;
