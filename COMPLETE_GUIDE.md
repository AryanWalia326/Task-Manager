# Complete Guide: Start Locally & Deploy to Railway

Follow these steps in order to get your Task Manager running locally, then deployed to Railway.

---

## 📋 PART 1: LOCAL DEVELOPMENT (30 minutes)

### Step 1: Verify Prerequisites
Make sure you have:
- ✅ Node.js installed (check: `node --version`)
- ✅ Git installed (check: `git --version`)
- ✅ MongoDB Atlas account (free tier)
- ✅ GitHub account

### Step 2: Get MongoDB Connection String
1. Go to https://www.mongodb.com/cloud/atlas
2. Login to your account
3. Click on your cluster
4. Click "Connect" button
5. Click "Drivers" → "Node.js"
6. Copy the connection string that looks like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/TaskManager
   ```
7. Make sure the database name is `/TaskManager` at the end

### Step 3: Update Backend Configuration
1. Open `backend/.env` file
2. Update the MONGODB_URI:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/TaskManager
   JWT_SECRET=your_random_secret_key_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```
3. Save the file

### Step 4: Install Dependencies
Open PowerShell and run:

```powershell
# Navigate to project
cd "c:\Users\aryan\OneDrive\Desktop\Task Manager"

# Install root dependencies
npm install

# Install backend dependencies (done by postinstall, but verify)
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 5: Start Backend Server

**Open Terminal 1 (PowerShell):**
```powershell
cd "c:\Users\aryan\OneDrive\Desktop\Task Manager\backend"
npm run dev
```

**You should see:**
```
MongoDB Connected: your-cluster.mongodb.net
Server running on port 5000
```

✅ If you see this, backend is working!

### Step 6: Start Frontend Server

**Open Terminal 2 (PowerShell):**
```powershell
cd "c:\Users\aryan\OneDrive\Desktop\Task Manager\frontend"
npm run dev
```

**You should see:**
```
Local:   http://localhost:5173/
```

✅ If you see this, frontend is working!

### Step 7: Test Locally

**Open browser:** http://localhost:5173

1. **Test Signup:**
   - Click "Sign up here" link
   - Enter:
     - Name: Test User
     - Email: test@example.com
     - Password: password123
   - Click "Sign Up"
   - You should be logged in

2. **Test Project Creation:**
   - Click "+ New Project" button
   - Enter:
     - Project name: My Test Project
     - Description: Testing the app
   - Click "Create"
   - You should see the project in the list

3. **Test Task Creation:**
   - Click on the project
   - Click "+ New Task"
   - Enter:
     - Title: Write Documentation
     - Description: Update README
     - Priority: High
     - Due Date: May 15, 2026
   - Click "Create"

4. **Test Dashboard:**
   - You should see stats:
     - Total Tasks: 1
     - To Do: 1
     - In Progress: 0
     - Done: 0

5. **Test Update Task:**
   - Find the task
   - Click the status dropdown
   - Change from "To Do" to "In Progress"
   - Dashboard should update to: To Do: 0, In Progress: 1

6. **Test Logout:**
   - Click "Logout" in header
   - You should go back to login page

✅ **If all tests pass, local development is working!**

---

## 🚀 PART 2: DEPLOY TO RAILWAY (20 minutes)

### Step 1: Push Latest Code to GitHub

```powershell
cd "c:\Users\aryan\OneDrive\Desktop\Task Manager"
git status
```

You should see: `nothing to commit, working tree clean`

If not, commit first:
```powershell
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### Step 2: Create/Go to Railway Project

1. Go to https://railway.app/dashboard
2. If you don't have an account, create one
3. Click "New Project"
4. Click "Deploy from GitHub repo"
5. Authorize GitHub (if first time)
6. Select your **task-manager** repository
7. Wait for detection

### Step 3: Configure Backend Service

After deployment starts:

1. **Set Environment Variables:**
   - Click on "backend" service (if multiple services)
   - Go to **Variables** tab
   - Click **Add Variable** and add these:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/TaskManager
     JWT_SECRET=your_super_secret_key_here
     NODE_ENV=production
     PORT=5000
     FRONTEND_URL=https://your-frontend-url.up.railway.app
     ```
   - **For MONGODB_URI**, use your real MongoDB connection string
   - **For JWT_SECRET**, use something random and long

2. **Save Variables:**
   - Changes auto-save
   - Service will auto-redeploy

3. **Wait for Deployment:**
   - Go to **Deployments** tab
   - Wait for status to show "Succeeded" ✅
   - If you see "Failed", click on deployment to see error logs

### Step 4: Get Backend URL

1. Once deployment shows "Succeeded"
2. Go to **Environment** tab
3. Look for "Domains" section
4. Copy the **Service URL** (something like: `https://task-manager-backend-xxxx.up.railway.app`)
5. **Save this URL**, you need it for frontend

### Step 5: Test Backend

1. Open browser to: `https://your-backend-url/health`
2. You should see: `{"message":"Server is running"}`

✅ **Backend is working!**

### Step 6: Deploy Frontend Service

1. Go back to Railway dashboard
2. Click your project
3. Click "New" button
4. Click "Deploy from GitHub repo"
5. Select same **task-manager** repository
6. This time select the **frontend** service

### Step 7: Configure Frontend Service

After frontend deployment starts:

1. **Set Build & Start Commands:**
   - Go to **Settings** tab
   - Find **Build Command**: `npm run build`
   - Find **Start Command**: `npm run preview`

2. **Set Environment Variables:**
   - Go to **Variables** tab
   - Add:
     ```
     VITE_API_URL=https://your-backend-url/api
     ```
   - **Replace** `your-backend-url` with the actual backend URL from Step 4

3. **Save and Wait:**
   - Changes auto-save
   - Service will build and deploy
   - Wait for "Succeeded" ✅

### Step 8: Get Frontend URL

1. Once frontend deployment shows "Succeeded"
2. Go to **Environment** tab
3. Copy the **Service URL** (your live app URL!)
4. **Save this URL**, this is what you submit

### Step 9: Update Backend FRONTEND_URL (if different)

1. If your frontend URL is different from what you entered:
2. Go to backend service → **Variables** tab
3. Update **FRONTEND_URL** to the actual frontend URL
4. Redeploy backend

---

## ✅ PART 3: VERIFY DEPLOYMENT (10 minutes)

### Test 1: Frontend Loads

1. Open your frontend URL in browser
2. You should see login page
3. No errors in browser console (F12 → Console tab)

### Test 2: Signup on Production

1. Click "Sign up here"
2. Create account with:
   - Name: Production Test
   - Email: prod@example.com
   - Password: password123
3. Click Sign Up
4. You should be logged in

### Test 3: Create Project

1. Click "+ New Project"
2. Name: Production Test
3. Click Create
4. Project should appear in list

### Test 4: Create Task

1. Click on the project
2. Click "+ New Task"
3. Add a task with title and details
4. Click Create
5. Task should appear in list

### Test 5: Check Dashboard

1. Look at dashboard statistics
2. Should show:
   - Total Tasks: 1
   - To Do: 1
   - In Progress: 0
   - Done: 0
   - Overdue: 0

### Test 6: Update Task Status

1. Change task status from "To Do" to "In Progress"
2. Dashboard should update immediately

✅ **If all tests pass, deployment is successful!**

---

## 🐛 TROUBLESHOOTING

### Frontend Won't Load

**Error:** Page shows blank or error

**Fix:**
1. Open browser console (F12)
2. Look for API errors
3. Check VITE_API_URL in frontend variables
4. Make sure backend URL is correct (with `/api` at end)
5. Redeploy frontend

### Can't Login on Production

**Error:** Login fails but works locally

**Fix:**
1. Check MONGODB_URI in backend variables
2. Make sure database name is at end: `/TaskManager`
3. Check MongoDB Atlas IP whitelist: Add `0.0.0.0/0`
4. Redeploy backend

### Backend Showing Errors

**Error:** 500 errors or crashes

**Fix:**
1. Go to backend deployment → View logs
2. Look for error messages
3. Common issues:
   - Missing MONGODB_URI
   - Wrong JWT_SECRET
   - Database connection issue
4. Fix variable and redeploy

### Deployment Keeps Failing

**Error:** Build fails repeatedly

**Fix:**
1. Check Railway logs
2. Ensure:
   - Code is pushed to GitHub
   - Dependencies are in package.json
   - postinstall script is present for backend deps
3. Try deleting service and redeploying

---

## 📋 FINAL CHECKLIST

Before considering it done:

- [ ] Backend running locally (`npm run dev` in backend folder)
- [ ] Frontend running locally (`npm run dev` in frontend folder)
- [ ] Can signup/login locally
- [ ] Can create project locally
- [ ] Can create tasks locally
- [ ] Dashboard shows correct stats locally
- [ ] Backend deployed to Railway (Succeeded status)
- [ ] Frontend deployed to Railway (Succeeded status)
- [ ] Can access frontend URL in browser
- [ ] Can signup/login on production
- [ ] Can create project on production
- [ ] Can create tasks on production
- [ ] Dashboard works on production
- [ ] Code is pushed to GitHub

---

## 🎯 NEXT STEPS

Once everything is working:

1. **Record Demo Video** (2-5 minutes)
   - Show signup
   - Create project
   - Add tasks
   - Change status
   - Show dashboard
   - Upload to YouTube

2. **Submit:**
   - Live frontend URL
   - GitHub repository link
   - README with instructions
   - Demo video link

---

## 💡 QUICK COMMANDS REFERENCE

**Local Development:**
```powershell
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev

# Browser
http://localhost:5173
```

**Push to GitHub:**
```powershell
git add .
git commit -m "Your message"
git push origin main
```

**Check Logs Locally:**
```powershell
# Look at terminal output where you ran npm run dev
# For backend: check MongoDB connection
# For frontend: check API errors
```

---

**Follow these steps in order and you'll have a working app! 🚀**

Need help? Check your terminal output for error messages first.
