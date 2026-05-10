# 🔧 Railway Deployment Fix - Quick Guide

## Your Error (What We're Fixing)

```
✖ No start command detected
```

This happened because Railway is trying to deploy from the **monorepo root** instead of the **backend folder**.

---

## ✅ FIX (Do This Right Now)

### Step 1: Open Railway Dashboard
Go to: https://railway.app/dashboard

### Step 2: Find Your Backend Service
- Click on your project
- Click on "backend" service

### Step 3: Fix the Root Directory
1. Click **Settings** (gear icon)
2. Scroll to find **Root Directory** option
3. Click **Edit** button next to it
4. Change it from empty to: `backend`
5. Click **Save**

### Step 4: Trigger Redeploy
1. Go to **Deploy** tab
2. Click the **Redeploy** button
3. Wait for build to complete (should take 1-2 minutes)
4. You should see "Succeeded" status

---

## 🎯 That's It!

Once the deploy succeeds:
- Railway will find `backend/package.json`
- It will find the `"start": "node server.js"` script
- Your backend will start correctly

---

## Verify It Worked

1. Wait for "Succeeded" in deployments
2. Click on the **Service URL** to test
3. You should see: `{"message":"Server is running"}`
4. Copy this URL for the frontend configuration

---

## Next: Deploy Frontend

Once backend is deployed, follow these steps:

1. Create a **new service** in the same Railway project
2. Select the same GitHub repository
3. **Set Root Directory to: `frontend`**
4. Add **Build Command**: `npm run build`
5. Add **Start Command**: `npm run preview`
6. Add **Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url/api
   ```
   (Replace with the backend URL from Step 1)
7. Deploy

---

## 🚨 ERROR: "Route not found" or "Cannot GET /api/health"

### The Problem

After deploying, when you test the backend at `https://YOUR_BACKEND_URL/api/health`, you get:
```json
{"message":"Route not found"}
```

### The Causes

1. ❌ Root Directory is not set to `backend`
2. ❌ You're hitting the root domain without a route (e.g., just `https://YOUR_BACKEND_URL/`)
3. ❌ Backend hasn't fully started yet

### The Solution

**Step 1**: Verify Root Directory

1. Go to Railway dashboard
2. Click on your backend service
3. Click **Settings**
4. Check **Root Directory** = `backend` ✅
5. If not, change it and click **Save**

**Step 2**: Test Correct Endpoints

Test these URLs (they should both work):

```
https://YOUR_BACKEND_URL/health
https://YOUR_BACKEND_URL/api/health
```

Both should return:
```json
{"message":"Server is running"}
```

**Step 3**: If Still Not Working

1. Go to **Deploy** tab
2. Click **Redeploy** (full rebuild)
3. Wait for "Succeeded" status
4. Wait 1-2 more minutes for startup
5. Try again

**Step 4**: Check Backend is Actually Running

1. In Railway, click **Logs** tab
2. Look for: `Server running on port 5000`
3. If you don't see this, check for errors in logs

### Why This Happens

- **Root Directory was empty**: Railway tries to run from monorepo root instead of backend folder
- **Timing issue**: Sometimes takes a few seconds to start after deployment succeeds
- **CORS/Network**: Check your backend URL is correct (don't add `/api` twice)

✅ **This is now fixed in the code!**

---

## Need More Help?

See the detailed guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**That's all! The fix is just setting the root directory. 🚀**
