# 🚀 Complete Railway Deployment Guide
## From Local Setup to Production (Step-by-Step)

This guide takes you through the **entire process** of deploying the Task Manager app to Railway, starting from the basics.

---

## 📋 What You'll Do

1. ✅ Set up the project locally
2. ✅ Create MongoDB Atlas database
3. ✅ Create GitHub repository
4. ✅ Deploy backend to Railway
5. ✅ Deploy frontend to Railway
6. ✅ Connect them and test

---

## PHASE 1: LOCAL SETUP (15 minutes)

### Step 1.1: Install Required Software

Make sure you have these installed:
- **Node.js** (v16+): https://nodejs.org/
- **Git**: https://git-scm.com/
- **VS Code** (optional): https://code.visualstudio.com/

Check installation:
```bash
node --version
npm --version
git --version
```

### Step 1.2: Install Project Dependencies

Open PowerShell/Terminal in the project root folder:

```bash
cd "c:\Users\aryan\OneDrive\Desktop\Task Manager"
```

Install dependencies:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

**Or use the shortcut:**
```bash
./setup.bat
```

### Step 1.3: Test Locally (Without MongoDB)

Try running the backend:
```bash
cd backend
npm run dev
```

You should see:
```
Server is running on http://localhost:5000
```

If it works, stop it (Ctrl+C).

---

## PHASE 2: MONGODB ATLAS SETUP (10 minutes)

MongoDB Atlas is where your data will live in the cloud.

### Step 2.1: Create MongoDB Account

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **"Register"** or **"Sign In"**
3. Create a free account using email

### Step 2.2: Create a Cluster

1. Click **"Create"** button
2. Choose **"Free"** tier (M0)
3. Cloud Provider: **AWS**
4. Region: Choose closest to you (e.g., **us-east-1**)
5. Click **"Create Cluster"**
6. Wait 3-5 minutes for creation

### Step 2.3: Create Database User

1. On the left, click **"Database Access"**
2. Click **"Add New Database User"**
3. **Username**: `taskmanager`
4. **Password**: Create strong password (copy it!)
5. **Permissions**: `Built-in Role: Atlas admin`
6. Click **"Add User"**

### Step 2.4: Get Connection String

1. Click **"Clusters"** on the left
2. Click **"Connect"** button on your cluster
3. Choose **"Connect with MongoDB Compass or command line"**
4. Copy the connection string
5. It looks like:
```
mongodb+srv://taskmanager:PASSWORD@cluster.mongodb.net/task-manager?retryWrites=true
```

Replace `PASSWORD` with your actual password.

### Step 2.5: Whitelist IP Addresses

1. Click **"Security"** → **"Network Access"** on left
2. Click **"Add IP Address"**
3. Add `0.0.0.0/0` (allows all IPs - fine for development/demo)
4. Click **"Confirm"**

---

## PHASE 3: GITHUB REPOSITORY (10 minutes)

Railway deploys from GitHub, so we need to push our code there.

### Step 3.1: Create GitHub Account

If you don't have one:
1. Go to: https://github.com
2. Click **"Sign up"**
3. Create account

### Step 3.2: Create New Repository

1. Click **"+"** icon (top right) → **"New repository"**
2. **Repository name**: `task-manager`
3. **Description**: `Team Task Manager - Full Stack Application`
4. **Visibility**: **Public** (Railway works better with public)
5. Click **"Create repository"**

### Step 3.3: Initialize Git Locally

In PowerShell, in your project root:

```bash
git init
git add .
git commit -m "Initial commit: Task Manager full-stack application"
```

### Step 3.4: Push to GitHub

Copy-paste these commands one by one:

```bash
git remote add origin https://github.com/YOUR_USERNAME/task-manager.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username!

Check it worked:
- Go to your GitHub repo URL
- You should see all your files there

---

## PHASE 4: RAILWAY BACKEND DEPLOYMENT (15 minutes)

Now we deploy the backend server to Railway.

### Step 4.1: Create Railway Account

1. Go to: https://railway.app
2. Click **"Sign up"**
3. Sign up with GitHub (easiest)
4. Authorize Railway to access GitHub

### Step 4.2: Create New Project

1. Click **"New Project"** button
2. Click **"Deploy from GitHub repo"**
3. Find and select your **`task-manager`** repository
4. Click **"Add"**

Railway will auto-detect the monorepo structure.

### Step 4.3: Configure Backend Service

The root `server.js` will be detected. We need to verify it's set correctly:

1. Click on the **"server"** service (the detected service)
2. Click **Settings** (gear icon) on right
3. Find **"Root Directory"** field
4. Click **"Edit"** and set it to: `backend`
5. Click **"Save"**

### Step 4.4: Add Environment Variables

Still in Settings:

1. Scroll down to **"Variables"** section
2. Click **"New Variable"**
3. Add these variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGODB_URI` | `mongodb+srv://taskmanager:PASSWORD@cluster.mongodb.net/task-manager?retryWrites=true` | Use your connection string from MongoDB |
| `JWT_SECRET` | `your_random_secret_123!@#xyz` | Create any random string (keep it safe) |
| `{"message":"Route not found"}` | `production` | - |
| `PORT` | `5000` | - |

**Click "Save" after each variable.**

### Step 4.5: Trigger Deployment

1. Click **"Deploy"** tab
2. Click **"Redeploy"** button
3. Watch the logs - they show the build progress
4. Wait for status to show **"Succeeded"** (usually 2-3 minutes)

### Step 4.6: Get Backend URL

1. When deployment succeeds, go to the **"Settings"** tab
2. Look for **"Service URL"** - it looks like:
```
https://task-manager-production-xyz.up.railway.app
```

**Copy this URL** - you'll need it for the frontend!

### Test Backend

1. Open a new browser tab
2. Go to: `https://YOUR_BACKEND_URL/api/health` 
   - OR: `https://YOUR_BACKEND_URL/health` (both work)
3. You should see: `{"message":"Server is running"}`

   **If you see `{"message":"Route not found"}`:**
   - Make sure Root Directory is set to `backend` in Railway Settings
   - Try the `/health` endpoint instead
   - Wait 2-3 minutes for deployment to complete

✅ **Backend is deployed!**

---

## PHASE 5: RAILWAY FRONTEND DEPLOYMENT (15 minutes)

Now we deploy the React frontend.

### Step 5.1: Add New Service

1. Go to your Railway project dashboard
2. Click **"New"** button (usually top right area)
3. Click **"GitHub Repo"**
4. Select your **`task-manager`** repo again

### Step 5.2: Configure Frontend Service

1. Railway will create a new service
2. Click **Settings** (gear icon)
3. Set **"Root Directory"** to: `frontend`
4. **Click "Save"**

### Step 5.3: Add Build Commands

Still in Settings:

1. Scroll to find **"Build Command"**
2. Set it to: `npm run build`
3. Find **"Start Command"**
4. Set it to: `npm run preview`
5. **Click "Save"** for each

### Step 5.4: Add Environment Variables

1. Scroll to **"Variables"** section
2. Click **"New Variable"**
3. Add:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://YOUR_BACKEND_URL/api` |

**Replace `YOUR_BACKEND_URL`** with the URL from Step 4.6!

### Step 5.5: Trigger Deployment

1. Click **"Deploy"** tab
2. Click **"Redeploy"**
3. Watch logs for completion
4. Wait for **"Succeeded"** status (2-3 minutes)

### Step 5.6: Get Frontend URL

When deployment succeeds:
1. Find **"Service URL"** (looks like: `https://task-manager-frontend-production-xyz.up.railway.app`)
2. **Copy this URL**

### Test Frontend

1. Open new browser tab
2. Go to your **Frontend URL**
3. You should see the **Login page**

✅ **Frontend is deployed!**

---

## PHASE 6: FINAL TESTING (5 minutes)

### Test 1: Sign Up

1. On the frontend, click **"Sign Up"**
2. Create a test account:
   - Email: `test@example.com`
   - Password: `Test123!@`
3. Click **"Sign Up"**

You should be logged in!

### Test 2: Create Project

1. Click **"+ New Project"** (or similar button)
2. Enter: `Test Project`
3. Click create

You should see it in your project list.

### Test 3: Add Task

1. Click on the project
2. Click **"+ Add Task"**
3. Enter: `Test Task`
4. Click create

Task appears in the list!

### Test 4: Logout & Login

1. Click logout
2. Try logging in with your test account
3. You should see your project and task still there

✅ **Everything works!**

---

## TROUBLESHOOTING

### Backend Deployment Failed

**Problem**: "No start command detected"
**Solution**: Make sure Root Directory is set to `backend` in Settings

**Problem**: "Failed to compile"
**Solution**: 
1. Check your `.env` file in backend folder
2. Make sure `package.json` in backend has `"start": "node server.js"`

### Frontend Won't Load

**Problem**: "Cannot find modules"
**Solution**: Make sure Root Directory is `frontend` and Build Command is `npm run build`

**Problem**: "API calls failing"
**Solution**: 
1. Check `VITE_API_URL` environment variable
2. Make sure it points to correct backend URL
3. Backend must be deployed first

### Blank Page on Frontend

**Problem**: Frontend loads but is blank
**Solution**:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Make sure `VITE_API_URL` is set correctly

---

## IMPORTANT NOTES

### Security

1. **Never** push `.env` files to GitHub
2. **Always** use environment variables in Railway for secrets
3. Change your MongoDB password from default
4. Use strong JWT_SECRET

### Costs

- **Railway**: $5/month for hobby tier (free while in trial)
- **MongoDB Atlas**: Always free for development (M0)
- **GitHub**: Free for public repos

### After Deployment

1. Save your URLs:
   - Backend: `https://...`
   - Frontend: `https://...`
   - MongoDB Connection String

2. Your app is now live 24/7!

3. For updates:
   - Make code changes locally
   - Commit and push to GitHub
   - Railway auto-redeploys

---

## NEXT STEPS

1. **Customize** the app (colors, features, etc.)
2. **Add users** by sharing your frontend URL
3. **Monitor** your Railway dashboard for logs
4. **Update** code and push to auto-redeploy

---

## HELP & SUPPORT

- **Railway Docs**: https://docs.railway.app
- **MongoDB Docs**: https://docs.mongodb.com
- **React Docs**: https://react.dev
- **Node.js Docs**: https://nodejs.org/docs

---

**Congratulations! Your full-stack app is live on Railway! 🎉**
