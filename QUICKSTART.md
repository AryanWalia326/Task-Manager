# Quick Start Guide

Get the Task Manager application running in minutes!

## Prerequisites

- Node.js v14+ installed
- MongoDB Atlas account (or local MongoDB)
- A code editor (VS Code recommended)

## Step 1: Clone/Download Repository

```bash
# If you have the files already, navigate to the project directory
cd "Task Manager"
```

## Step 2: Quick Setup

### On Windows:
```bash
setup.bat
```

### On macOS/Linux:
```bash
bash setup.sh
```

### Manual Setup:
```bash
# Backend
cd backend
npm install
cp .env.example .env

# Frontend
cd ../frontend
npm install
cp .env.example .env
```

## Step 3: Configure Environment

### Backend Configuration

Edit `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
JWT_SECRET=your_random_secret_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Get MongoDB Connection String

1. Visit https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (free tier)
4. Create database user
5. Copy connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/task-manager`)
6. Replace `<password>` in the string with your actual password

### Generate JWT Secret

```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Maximum 256}))
```

Or simply use any random string of at least 32 characters.

## Step 4: Start Development Servers

### Terminal 1: Start Backend

```bash
cd backend
npm run dev
```

You should see:
```
MongoDB Connected: cluster.mongodb.net
Server running on port 5000
```

### Terminal 2: Start Frontend

```bash
cd frontend
npm run dev
```

You should see:
```
Local:   http://localhost:5173/
```

## Step 5: Access Application

1. Open browser to: `http://localhost:5173`
2. Sign up with a test account:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Login with your credentials
4. Create a project
5. Add tasks and manage your team!

## Common Tasks

### Create a New Project

1. Click "+ New Project" button
2. Enter project name
3. Add optional description
4. Click "Create"

### Create a Task

1. Select a project
2. Click "+ New Task"
3. Fill in:
   - Title (required)
   - Description
   - Priority (Low/Medium/High)
   - Due Date (optional)
4. Click "Create"

### Update Task Status

1. Find task in the list
2. Use status dropdown to change:
   - To Do
   - In Progress
   - Done

### View Dashboard

- Dashboard shows:
  - Total tasks
  - Tasks by status
  - Overdue tasks
  - Tasks per person

## Troubleshooting

### Backend won't start
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- MongoDB is not running locally
- Solution: Update MONGODB_URI to use MongoDB Atlas

### Frontend can't connect to backend
```
Failed to fetch /api/auth/login
```
- Check if backend is running on port 5000
- Check VITE_API_URL in frontend/.env
- Solution: Restart backend and frontend

### Blank login page
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)

### JWT token expired
- Clear localStorage:
  ```javascript
  localStorage.clear()
  ```
- Login again

## Project Structure

```
Task Manager/
├── backend/
│   ├── models/       - Database schemas
│   ├── routes/       - API endpoints
│   ├── controllers/  - Business logic
│   ├── middleware/   - Auth, error handling
│   ├── server.js     - Express app entry
│   └── .env          - Configuration
│
└── frontend/
    ├── src/
    │   ├── components/  - React components
    │   ├── pages/       - Page components
    │   ├── api/         - API client
    │   └── styles/      - CSS files
    ├── index.html       - HTML entry
    └── .env             - Configuration
```

## Available Scripts

### Backend
```bash
npm run dev      # Start with hot reload
npm start        # Start production
npm test         # Run tests (if configured)
```

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Default Test User

After first signup, you can use:
- Email: test@example.com
- Password: password123

## API Documentation

Full API docs available in `backend/README.md`

## Next Steps

1. ✅ Application running locally
2. 📦 Build for production: `npm run build`
3. 🚀 Deploy to Railway (see DEPLOYMENT.md)
4. 📹 Record demo video
5. 📝 Share your GitHub repository

## Getting Help

### For Backend Issues
- Check `backend/README.md`
- Review MongoDB connection string
- Check environment variables with `echo $MONGODB_URI`

### For Frontend Issues
- Check `frontend/README.md`
- Open browser dev tools (F12)
- Check Network tab for API errors
- Check Console tab for JavaScript errors

### For Deployment Issues
- See `DEPLOYMENT.md`
- Check Railway logs
- Verify all environment variables

## Security Notes

⚠️ Remember:
- Never commit `.env` files to git
- Use strong JWT secret in production
- Enable password reset functionality later
- Use HTTPS in production
- Add rate limiting for API
- Implement proper session timeout

---

Happy Task Managing! 🎉
