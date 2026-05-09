/**
 * Entry point for Railway deployment
 * This file wraps the actual backend server located in the backend folder
 */

require('dotenv').config({ path: './backend/.env' });

// Load and start the backend server
require('./backend/server.js');
const cors = require('cors');
app.use(cors({
  origin: 'https://task-manager-production-18e8.up.railway.app'
}));
