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

## Need More Help?

See the detailed guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**That's all! The fix is just setting the root directory. 🚀**
