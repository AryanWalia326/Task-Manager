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

### Option A: Using Railway Dashboard (RECOMMENDED)

1. Go to https://railway.app/dashboard
2. Click "New Project" → "Deploy from GitHub repo"
3. Authorize GitHub and select your repository
4. Select the **task-manager** repository
5. Once deployed, click on the service
6. Go to **Settings** tab
7. **Important:** Set Root Directory to `backend/`
   - Click "Edit" next to "Root Directory"
   - Enter: `backend`
   - Click Save
8. Go to **Deploy** tab and click "Redeploy"
9. Wait for build to complete, then go to **Variables** tab
10. Add environment variables:
    ```
    MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/task-manager
    JWT_SECRET=generate_a_random_secret_key_here
    NODE_ENV=production
    FRONTEND_URL=https://your-frontend-railway-domain.up.railway.app
    PORT=5000
    ```
11. The deployment will auto-redeploy with variables
12. Go to **Deployments** tab and wait for "Succeeded" status
13. Copy the Service URL (your backend URL)

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

### ❌ Error: "No start command detected"

**This is the error you likely got. Here's the fix:**

1. Go to Railway dashboard → Your project → Backend service
2. Click **Settings** tab
3. Look for **Root Directory** setting
4. **Click Edit** and set it to: `backend/`
5. Go to **Deploy** tab
6. Click **Redeploy**
7. Wait for build to complete

**Why this happens:** Railway deploys from repo root by default, but your package.json with the start script is in the `backend/` folder.

---

### Backend not connecting to MongoDB
- Check MongoDB connection string in `MONGODB_URI`
- Verify IP whitelist in MongoDB Atlas (should be 0.0.0.0/0 for Railway)
- Ensure credentials are correct
- Make sure the database name is in the URL: `/task-manager`

### CORS errors
- Verify `FRONTEND_URL` in backend environment variables matches deployed frontend URL
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for exact error

### Frontend can't reach backend
- Verify `VITE_API_URL` points to correct backend URL (should be the Railway service URL)
- Check network tab in browser dev tools (F12)
- Verify backend is running on Railway (check Deployments tab for "Succeeded" status)

### Build failures on Railway
- Check Railway logs (click on deployment and view logs)
- Ensure root directory is set to `backend/` for backend service
- Verify package.json has "start" script: `"start": "node server.js"`
- Check Node version compatibility

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
