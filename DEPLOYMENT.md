# Railway Deployment Guide

This guide walks through deploying the Task Manager application to Railway.

## Prerequisites

1. Railway account (https://railway.app)
2. GitHub account with repository
3. MongoDB Atlas account
4. Git installed locally

## Step 1: Prepare Repository

1. Initialize git if not done:
```bash
git init
git add .
git commit -m "Initial commit: Task Manager application"
```

2. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/task-manager.git
git branch -M main
git push -u origin main
```

## Step 2: MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account or login
3. Create a new cluster
4. Create a database user:
   - Username: `task-manager-user`
   - Generate a secure password
5. Whitelist IP: Add `0.0.0.0/0` (allows all IPs for simplicity, or add Railway's IP)
6. Copy the connection string: `mongodb+srv://username:password@cluster.mongodb.net/task-manager`

## Step 3: Backend Deployment on Railway

### Option A: Using Railway Dashboard

1. Go to https://railway.app/dashboard
2. Create a new project
3. Click "Deploy from GitHub repo"
4. Authorize GitHub and select your repository
5. Select the Task Manager repository
6. Wait for detection, then select the backend folder (configure root directory as `backend/` if needed)
7. Railway will auto-detect the Node.js application
8. Add environment variables:
   - Go to Variables tab
   - Add:
     ```
     MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/task-manager
     JWT_SECRET=generate_a_random_secret_key_here
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend-railway-domain.up.railway.app
     PORT=5000
     ```
9. Click Deploy
10. Copy the deployed backend URL (e.g., `https://task-manager-backend.up.railway.app`)

### Option B: Using Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project
cd backend
railway init

# Set environment variables
railway variables set MONGODB_URI="mongodb+srv://..."
railway variables set JWT_SECRET="your_secret_key"
railway variables set NODE_ENV="production"

# Deploy
railway up
```

## Step 4: Frontend Deployment on Railway

1. Create a new service in the same Railway project
2. Connect the same GitHub repository
3. Configure:
   - Service name: `task-manager-frontend`
   - Root directory: `frontend/`
4. Add environment variables:
   - `VITE_API_URL=https://your-backend-url/api` (use the backend URL from Step 3)
5. Add build command: `npm run build`
6. Add start command: `npm run preview`
7. Click Deploy
8. Copy the deployed frontend URL

## Step 5: Update Backend Environment

After frontend deployment, update the backend's `FRONTEND_URL` environment variable:

1. Go to backend service settings on Railway
2. Update `FRONTEND_URL` to your deployed frontend URL
3. Redeploy

## Step 6: Testing

1. Open your deployed frontend URL
2. Test signup: Create a new account
3. Test login: Login with the account
4. Test project creation: Create a new project
5. Test task management: Create and update tasks

## Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB connection string
- Verify IP whitelist in MongoDB Atlas
- Ensure credentials are correct
- Check `MONGODB_URI` environment variable

### CORS errors
- Verify `FRONTEND_URL` in backend matches deployed frontend URL
- Clear browser cache
- Check browser console for exact error

### Frontend can't reach backend
- Verify `VITE_API_URL` points to correct backend URL
- Check network tab in browser dev tools
- Verify backend is running on Railway

### Build failures
- Check Railway logs
- Ensure all dependencies are in package.json
- Verify node version compatibility

## Environment Variables Summary

### Backend (.env)
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/task-manager
JWT_SECRET=random_secret_key_minimum_32_chars
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://deployed-frontend-url.up.railway.app
```

### Frontend (.env)
```
VITE_API_URL=https://deployed-backend-url.up.railway.app/api
```

## Monitoring & Logs

On Railway Dashboard:
1. Click on your service
2. Go to "Logs" tab to see deployment logs
3. Go to "Metrics" to monitor performance
4. Go to "Settings" to manage environment and restart service

## Custom Domain (Optional)

1. Go to your service on Railway
2. Click "Environment"
3. Add a custom domain under "Domains"
4. Point your DNS records to Railway's domain
5. Update environment variables with custom domain URLs

## Cost Considerations

- Railway offers $5 free credit per month
- Frontend (Vite build): ~1-5 GB storage
- Backend (Node): Variable, typically 512MB RAM needed
- MongoDB Atlas: Free tier available

## Next Steps

After deployment:
1. Share the live URL
2. Create demo video
3. Document the deployment process
4. Set up CI/CD (optional)

---

For more help, visit: https://docs.railway.app
