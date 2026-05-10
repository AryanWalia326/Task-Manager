# 🔍 PRE-DEPLOYMENT VERIFICATION CHECKLIST

Run through this checklist BEFORE deploying to Railway to catch any issues early.

---

## ✅ PROJECT STRUCTURE

- [ ] Root folder has `backend/` and `frontend/` directories
- [ ] Root `package.json` exists with correct scripts
- [ ] Root `server.js` exists (points to backend)
- [ ] `backend/server.js` exists and starts Express app
- [ ] `frontend/vite.config.js` exists
- [ ] `frontend/package.json` has build script

---

## ✅ BACKEND SETUP

Check the `backend/` folder:

- [ ] `package.json` has `"start": "node server.js"`
- [ ] `server.js` requires dotenv and connects to MongoDB
- [ ] `config/db.js` exists (database connection file)
- [ ] Routes folder has `authRoutes.js`, `projectRoutes.js`, `taskRoutes.js`
- [ ] Models folder has `User.js`, `Project.js`, `Task.js`
- [ ] Middleware folder has `auth.js`
- [ ] `.env` file is in `.gitignore` (not pushed to GitHub)
- [ ] `server.js` has CORS configuration

---

## ✅ FRONTEND SETUP

Check the `frontend/` folder:

- [ ] `package.json` has `"build": "vite build"` script
- [ ] `package.json` has `"preview": "vite preview"` script
- [ ] `src/App.jsx` exists (main React component)
- [ ] `src/main.jsx` exists (entry point)
- [ ] `src/api/endpoints.js` exists (defines API routes)
- [ ] `src/api/client.js` exists (axios instance)
- [ ] `src/components/` folder has Login, Signup, Dashboard, etc.
- [ ] `index.html` exists in root

---

## ✅ ENVIRONMENT FILES

- [ ] `backend/.env` is created locally (NOT in GitHub)
  - [ ] Has `MONGODB_URI=...`
  - [ ] Has `JWT_SECRET=...`
- [ ] `.gitignore` at root includes:
  ```
  node_modules/
  .env
  .DS_Store
  ```
- [ ] `.gitignore` in backend folder includes `.env`
- [ ] `.gitignore` in frontend folder includes `node_modules/` and `dist/`

---

## ✅ GIT SETUP (Before pushing to GitHub)

```bash
# Check git is initialized
git status

# Should see:
# - All project files
# - NO node_modules folders (should be in .gitignore)
# - NO .env files (should be in .gitignore)
```

Run this to verify:
```bash
git check-ignore node_modules
git check-ignore .env
git check-ignore backend/.env
```

Both should return the paths if properly ignored.

---

## ✅ LOCAL TESTING

Test everything locally FIRST before pushing to GitHub:

```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev
# Should start on http://localhost:5000
# Should show: "Server is running"
```

```bash
# Terminal 2: Frontend
cd frontend
npm install
npm run dev
# Should start on http://localhost:5173
# Should show the login page
```

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:5173 in browser
- [ ] Login page displays correctly
- [ ] (Optional) Can sign up and create projects

---

## ✅ GITHUB READY

- [ ] GitHub repository created and public
- [ ] All code pushed to GitHub (`git push` successful)
- [ ] Verify on GitHub: all files visible except `node_modules/` and `.env`
- [ ] GitHub shows the latest commit with your code

Check:
```bash
# See what will be committed
git status

# Should show: "nothing to commit, working tree clean"
```

---

## ✅ MONGODB READY

- [ ] MongoDB Atlas account created
- [ ] Cluster created (M0 free tier is fine)
- [ ] Database user created (username: `taskmanager`)
- [ ] Connection string copied with password
- [ ] IP whitelist includes `0.0.0.0/0`

Test connection string format:
```
mongodb+srv://taskmanager:PASSWORD@cluster.mongodb.net/task-manager
```

- [ ] Connection string has YOUR actual password (not literal "PASSWORD")

---

## ✅ RAILWAY READY

- [ ] Railway account created
- [ ] Can access https://railway.app dashboard
- [ ] GitHub authorized with Railway

---

## 🚨 COMMON ISSUES TO CHECK

### Issue: "Cannot find module"
**Check:**
- [ ] All dependencies are in `package.json`
- [ ] Ran `npm install` in correct folder
- [ ] No typos in require/import statements

### Issue: "Module not found: .../api/endpoints"
**Check:**
- [ ] File path in import is correct
- [ ] File exists in the exact location
- [ ] File name matches case-sensitivity

### Issue: "Cannot connect to MongoDB"
**Check:**
- [ ] `MONGODB_URI` is in `.env` file in backend folder
- [ ] Connection string has correct password
- [ ] IP whitelist includes your IP (0.0.0.0/0 is safe)
- [ ] MongoDB cluster is running (check Atlas dashboard)

### Issue: "Port already in use"
**Check:**
- [ ] No other process on port 5000 (backend)
- [ ] No other process on port 5173 (frontend)
- [ ] Kill any previous node processes or restart terminal

---

## 🎯 DEPLOYMENT ORDER

Once all checks pass:

1. **MongoDB Atlas**: ✅ Created and verified
2. **GitHub**: ✅ Code pushed
3. **Railway Backend**: ✅ Deployed first
4. **Railway Frontend**: ✅ Deployed second (needs backend URL)
5. **Integration**: ✅ Frontend connects to backend
6. **Testing**: ✅ Full end-to-end test

---

## 📋 BEFORE CLICKING "DEPLOY" ON RAILWAY

Final checklist:

- [ ] Logged into Railway with GitHub account
- [ ] Selected correct GitHub repository
- [ ] Backend service: Root Directory = `backend`
- [ ] Frontend service: Root Directory = `frontend`
- [ ] Frontend service: Build Command = `npm run build`
- [ ] Frontend service: Start Command = `npm run preview`
- [ ] Backend environment variables set correctly
- [ ] Frontend `VITE_API_URL` points to backend URL
- [ ] All variables saved

---

## ✅ READY TO DEPLOY!

If all boxes are checked, you're ready!

**Next step**: Follow [FULL_RAILWAY_SETUP.md](./FULL_RAILWAY_SETUP.md) starting from **PHASE 4: RAILWAY BACKEND DEPLOYMENT**

---

**Status**: Ready for deployment ✅
