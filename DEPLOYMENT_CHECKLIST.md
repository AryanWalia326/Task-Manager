# ✅ Railway Deployment Progress Checklist

Track your progress through the deployment process. Check off each step as you complete it.

---

## PHASE 1: LOCAL SETUP ✅/❌

- [ ] **1.1** Installed Node.js, Git, and VS Code
- [ ] **1.2** Installed project dependencies (`npm install` in all folders)
- [ ] **1.3** Backend runs locally with `npm run dev`

---

## PHASE 2: MONGODB ATLAS ✅/❌

- [ ] **2.1** Created MongoDB Atlas account (https://mongodb.com/cloud/atlas)
- [ ] **2.2** Created free M0 cluster
- [ ] **2.3** Created database user (`taskmanager` / password saved)
- [ ] **2.4** Got connection string (format: `mongodb+srv://...`)
- [ ] **2.5** Whitelisted IP addresses (`0.0.0.0/0`)

**MongoDB Connection String**: 
```
[Paste your connection string here after replacing PASSWORD]
```

---

## PHASE 3: GITHUB REPOSITORY ✅/❌

- [ ] **3.1** Created GitHub account (https://github.com)
- [ ] **3.2** Created new public repository named `task-manager`
- [ ] **3.3** Ran `git init` and `git add .` and `git commit`
- [ ] **3.4** Pushed code to GitHub (`git push`)

**GitHub Repository URL**: 
```
https://github.com/YOUR_USERNAME/task-manager
```

---

## PHASE 4: RAILWAY BACKEND DEPLOYMENT ✅/❌

- [ ] **4.1** Created Railway account (https://railway.app)
- [ ] **4.2** Created new project from GitHub repo
- [ ] **4.3** Set Root Directory to `backend`
- [ ] **4.4** Added environment variables:
  - [ ] `MONGODB_URI` → your MongoDB connection string
  - [ ] `JWT_SECRET` → random secret (e.g., `secret123!@#`)
  - [ ] `NODE_ENV` → `production`
  - [ ] `PORT` → `5000`
- [ ] **4.5** Clicked "Redeploy" and saw "Succeeded" status
- [ ] **4.6** Tested backend URL in browser (should show `{"message":"Server is running"}`)

**Backend URL (from Railway Service URL)**:
```
https://[YOUR_BACKEND_URL].up.railway.app
```

---

## PHASE 5: RAILWAY FRONTEND DEPLOYMENT ✅/❌

- [ ] **5.1** Added new service in Railway project
- [ ] **5.2** Set Root Directory to `frontend`
- [ ] **5.3** Set Build Command: `npm run build`
- [ ] **5.3** Set Start Command: `npm run preview`
- [ ] **5.4** Added environment variable:
  - [ ] `VITE_API_URL` → `https://[YOUR_BACKEND_URL]/api`
- [ ] **5.5** Clicked "Redeploy" and saw "Succeeded" status
- [ ] **5.6** Opened frontend URL in browser (should show login page)

**Frontend URL (from Railway Service URL)**:
```
https://[YOUR_FRONTEND_URL].up.railway.app
```

---

## PHASE 6: FINAL TESTING ✅/❌

- [ ] **Test 1** - Sign up with test account
- [ ] **Test 2** - Create a project
- [ ] **Test 3** - Add a task to project
- [ ] **Test 4** - Logout and login again
- [ ] **Test 5** - Data persists after login

---

## SAVE YOUR IMPORTANT INFO HERE

```
GitHub Username: ___________________________

MongoDB Connection String: 
mongodb+srv://taskmanager:_______________@cluster.mongodb.net/task-manager

MongoDB Password: ___________________________

JWT Secret: ___________________________

Backend URL: 
https://___________________________________.up.railway.app

Frontend URL: 
https://___________________________________.up.railway.app
```

---

## DEPLOYMENT COMPLETE! 🎉

If all boxes are checked, your Task Manager app is live on Railway!

**Next Steps:**
1. Share your frontend URL with friends to test
2. Keep all URLs and credentials safe
3. Monitor your Railway dashboard
4. For updates, just push to GitHub and Railway auto-deploys

---

## QUICK COMMAND REFERENCE

```bash
# Check Node/npm installed
node --version
npm --version

# Install all dependencies
npm install
cd backend && npm install
cd ../frontend && npm install

# Run backend locally
cd backend && npm run dev

# Git commands
git init
git add .
git commit -m "Initial commit"
git push -u origin main

# View Git logs
git log

# Check git status
git status
```

---

**Status: In Progress** ⏳ → Complete ✅
