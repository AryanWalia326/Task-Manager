# 🔍 DIAGNOSTIC: "Route not found" Error - Step-by-Step

Getting `{"message":"Route not found"}` after deployment? Follow this guide to identify the exact problem.

---

## 🚨 ISSUE: Backend returns "Route not found" for all endpoints

```
Request: https://your-backend.up.railway.app/api/health
Response: {"message":"Route not found"}
```

---

## 🔧 STEP 1: CHECK RAILWAY SETTINGS

### A. Verify Root Directory

1. Go to: https://railway.app/dashboard
2. Click your **Task Manager project**
3. Click the **backend service**
4. Click **Settings** (gear icon)
5. Look for **Root Directory** field
6. It should be: `backend` ✅

**If it's empty or says something else:**
- Click **Edit**
- Change to: `backend`
- Click **Save**
- Wait 1 minute

**Then come back to Step 2**

### B. Verify Environment Variables

Still in Settings, scroll to **Variables** section.

Check these are set:
- [ ] `MONGODB_URI` - Should look like `mongodb+srv://...`
- [ ] `JWT_SECRET` - Should have some value
- [ ] `NODE_ENV` - Should be `production`
- [ ] `PORT` - Should be `5000` or empty (Railway sets it)

**If any are missing or wrong:**
- Add/edit them
- Click **Save**
- Redeploy (see Step 2)

---

## 🔧 STEP 2: REDEPLOY THE BACKEND

1. In Railway dashboard, click **Deploy** tab
2. Click **Redeploy** button
3. Watch the logs scroll by
4. Wait for status to show **Succeeded** (green checkmark)
5. Wait 30 seconds more for app to fully start

⏱️ **This takes 2-3 minutes**

---

## 🔧 STEP 3: CHECK THE LOGS

1. Click **Logs** tab in Railway backend service
2. Scroll to the bottom (newest logs first)
3. Look for these messages:

### ✅ Good Signs

```
Starting backend server...
MONGODB_URI: SET
NODE_ENV: production
PORT: 5000
✅ MongoDB Connected: cluster0.abc123.mongodb.net
Server running on port 5000
```

**If you see all these = Backend is working!** Go to Step 4.

### ⚠️ Warning Signs

```
MONGODB_URI: NOT SET
```
Your environment variable wasn't set. See Step 1B.

```
❌ MongoDB Connection Error: connect ECONNREFUSED
```
MongoDB connection string is wrong or IP not whitelisted. See Step 5.

```
Cannot find module...
```
Dependencies not installed. See Step 6.

---

## 🔧 STEP 4: TEST THE HEALTH ENDPOINT

Now try accessing your backend:

### Test 1: Root Health Check
```
https://YOUR_BACKEND_URL/health
```

**Should return:**
```json
{"message":"Server is running"}
```

### Test 2: API Health Check
```
https://YOUR_BACKEND_URL/api/health
```

**Should also return:**
```json
{"message":"Server is running"}
```

### Test 3: Sign Up Endpoint (requires MongoDB)
```
POST https://YOUR_BACKEND_URL/api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test123!@"
}
```

**Should return:**
- Success: `{"token": "...", "user": {...}}`
- OR Error: `{"message": "Error message"}`

**NOT** `{"message":"Route not found"}`

---

## 🔧 STEP 5: FIX MONGODB CONNECTION

### Problem: Can't connect to MongoDB

#### A. Check Connection String Format

Your `MONGODB_URI` should look like:
```
mongodb+srv://taskmanager:YOUR_PASSWORD@cluster.mongodb.net/task-manager
```

**NOT:**
```
mongodb+srv://taskmanager:PASSWORD@cluster.mongodb.net/task-manager  ← Wrong! Still has "PASSWORD"
```

1. Go to MongoDB Atlas: https://www.mongodb.com/cloud/atlas
2. Click **Clusters** → **Connect**
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `PASSWORD` with your actual MongoDB password
6. Add to Railway as `MONGODB_URI` variable

#### B. Check IP Whitelist

1. In MongoDB Atlas, click **Network Access** (left sidebar)
2. You should see `0.0.0.0/0` or your IP listed
3. If not, click **Add IP Address** → `0.0.0.0/0` → **Confirm**

#### C. Redeploy

1. Go back to Railway
2. Click **Deploy** → **Redeploy**
3. Check logs again (Step 3)

---

## 🔧 STEP 6: FIX MISSING DEPENDENCIES

### Problem: Cannot find module

In Railway logs, you see:
```
Error: Cannot find module 'express'
```

#### Solution A: Re-push Code

```bash
# In project root
git add .
git commit -m "Fix: Update dependencies"
git push
```

Railway will auto-rebuild.

#### Solution B: Manual Install on Railway

1. In Railway, click **Settings**
2. Scroll to find **"Build Command"**
3. Set it to: `npm install && npm start`
4. Click **Save**
5. Click **Redeploy**

---

## ✅ CHECKLIST: Working Backend

If ALL of these are true, your backend works:

- [ ] Root Directory is set to `backend`
- [ ] `MONGODB_URI` is set in Environment Variables
- [ ] Status shows **Succeeded** (green)
- [ ] Logs show `Server running on port 5000`
- [ ] Logs show `✅ MongoDB Connected`
- [ ] `/health` endpoint returns `{"message":"Server is running"}`
- [ ] `/api/health` endpoint returns `{"message":"Server is running"}`
- [ ] No errors in Logs tab

---

## 🆘 STILL NOT WORKING?

### Get Full Error Message

1. In Railway, click **Logs**
2. Click the red **error** lines to expand
3. Copy the full error message

### Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `listen EADDRINUSE: address already in use :::5000` | Port conflict, wait 2 min and retry |
| `MongoParseError: invalid connection string` | `MONGODB_URI` has wrong format |
| `connect ECONNREFUSED 127.0.0.1:27017` | Using localhost connection string, need MongoDB Atlas |
| `connect ETIMEDOUT` | IP not whitelisted in MongoDB Atlas |
| `Cannot find module 'express'` | Dependencies not installed, push code again |

---

## 📝 FORM: SAVE YOUR DEBUG INFO

Fill this out for reference:

```
Backend URL: https://______________________.up.railway.app

Root Directory: ___________________________

MONGODB_URI Set?: YES / NO
Connection String: mongodb+srv://taskmanager:_______@__________/task-manager

Last Redeploy Time: ___________________________

Last Error Seen: ___________________________

Status: ✅ Working / ⚠️ Partially Working / ❌ Not Working
```

---

## 📋 NEXT STEPS

- ✅ If working: Proceed to deploy frontend
- ⚠️ If partially working: Fix remaining issues using steps above
- ❌ If not working: Go through checklist again

---

**Still stuck? Check the Railway logs tab - that's where the real answers are!** 🔍

