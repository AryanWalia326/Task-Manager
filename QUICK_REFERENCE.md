# 📍 RAILWAY DEPLOYMENT - QUICK REFERENCE CARD

## THE 6 PHASES IN 1 PAGE

### 🔵 PHASE 1: LOCAL SETUP (15 min)
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd backend && npm run dev  # Test: localhost:5000 should work
```

---

### 🟣 PHASE 2: MONGODB ATLAS (10 min)

**What to do:**
1. https://www.mongodb.com/cloud/atlas → Sign up
2. Create FREE M0 cluster
3. Create user: `taskmanager` / strong password
4. Whitelist IP: `0.0.0.0/0`
5. Copy connection string with password

**Connection String Format:**
```
mongodb+srv://taskmanager:PASSWORD@cluster.mongodb.net/task-manager
```

---

### 🟠 PHASE 3: GITHUB (10 min)

**What to do:**
```bash
git init
git add .
git commit -m "Initial commit: Task Manager"
git remote add origin https://github.com/YOUR_USERNAME/task-manager.git
git branch -M main
git push -u origin main
```

---

### 🟢 PHASE 4: RAILWAY BACKEND (15 min)

**What to do:**
1. https://railway.app → Sign up with GitHub
2. New Project → Deploy from GitHub repo → Select `task-manager`
3. Click Settings on the service
4. Set **Root Directory**: `backend`
5. Add Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Random string like `secret123!@#`
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
6. Click Deploy → Redeploy
7. Wait for "Succeeded"
8. Copy **Service URL** (your backend URL)

**Backend URL format:**
```
https://something.up.railway.app
```

---

### 🔴 PHASE 5: RAILWAY FRONTEND (15 min)

**What to do:**
1. In same Railway project, click **New**
2. Deploy from GitHub → Select `task-manager`
3. Click Settings
4. Set **Root Directory**: `frontend`
5. Set **Build Command**: `npm run build`
6. Set **Start Command**: `npm run preview`
7. Add Variable:
   - `VITE_API_URL`: `https://YOUR_BACKEND_URL/api`
8. Click Deploy → Redeploy
9. Wait for "Succeeded"
10. Copy **Service URL** (your frontend URL)

---

### 🟡 PHASE 6: TEST (5 min)

1. Open frontend URL in browser → Should see Login page
2. Sign up with test account
3. Create project
4. Add task
5. Logout → Login → Should still see everything

---

## ⚠️ COMMON ISSUES & FIXES

| Problem | Solution |
|---------|----------|
| Backend: "No start command detected" | Set Root Directory to `backend` in Settings |
| Frontend: "Cannot find modules" | Set Root Directory to `frontend`, Build Command: `npm run build` |
| "API calls failing" / blank page | Check `VITE_API_URL` points to correct backend URL |
| MongoDB connection error | Check `MONGODB_URI` with correct PASSWORD |
| Build takes forever | This is normal first time (~3 min), don't worry |

---

## 📝 SAVE THIS INFO IMMEDIATELY

```
GitHub Username: _________________________
GitHub Repo: https://github.com/YOUR_USERNAME/task-manager
MongoDB Password: _________________________
JWT Secret: _________________________
Backend URL: https://___.up.railway.app
Frontend URL: https://___.up.railway.app
```

---

## ✅ WHEN YOU'RE DONE

- [ ] Can access frontend URL in browser
- [ ] Can sign up and create account
- [ ] Can create projects and tasks
- [ ] Can logout and login
- [ ] Data persists across sessions

**If all checked: YOU'RE LIVE! 🎉**

---

## 📚 FULL GUIDES

- **Complete Guide**: See `FULL_RAILWAY_SETUP.md`
- **Checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **Documentation**: See `DEPLOYMENT.md`

---

## 🆘 GET HELP

- Railway Docs: https://docs.railway.app
- MongoDB Docs: https://docs.mongodb.com
- GitHub Help: https://docs.github.com
