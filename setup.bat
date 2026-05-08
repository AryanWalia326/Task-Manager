@echo off
echo.
echo 🚀 Setting up Task Manager Application
echo ================================
echo.

REM Backend setup
echo Setting up Backend...
cd backend

echo Installing dependencies...
call npm install

echo Creating .env file...
if not exist .env (
    copy .env.example .env
    echo ✓ .env file created. Please update with your MongoDB URI and JWT secret.
) else (
    echo ✓ .env file already exists
)

cd ..

REM Frontend setup
echo.
echo Setting up Frontend...
cd frontend

echo Installing dependencies...
call npm install

echo Creating .env file...
if not exist .env (
    copy .env.example .env
    echo ✓ .env file created
) else (
    echo ✓ .env file already exists
)

cd ..

echo.
echo ================================
echo ✓ Setup Complete!
echo ================================
echo.
echo Next steps:
echo 1. Update backend\.env with your MongoDB connection string
echo 2. Generate a JWT secret and add to backend\.env
echo 3. Run 'npm run backend:dev' to start the backend
echo 4. Run 'npm run frontend:dev' to start the frontend
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
pause
