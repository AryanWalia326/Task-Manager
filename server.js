/**
 * Entry point for Railway deployment
 * This file wraps the actual backend server located in the backend folder
 */

require('dotenv').config({ path: './backend/.env' });

// Load and start the backend server
require('./backend/server.js');
const cors = require('cors');
app.use(cors({
  origin: 'https://your-frontend-domain.up.railway.app'
}));
