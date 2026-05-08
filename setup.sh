#!/bin/bash

echo "🚀 Setting up Task Manager Application"
echo "================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Backend setup
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend

echo "Installing dependencies..."
npm install

echo "Creating .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created. Please update with your MongoDB URI and JWT secret.${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

cd ..

# Frontend setup
echo -e "${BLUE}Setting up Frontend...${NC}"
cd frontend

echo "Installing dependencies..."
npm install

echo "Creating .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

cd ..

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB connection string"
echo "2. Generate a JWT secret and add to backend/.env"
echo "3. Run 'npm run backend:dev' to start the backend"
echo "4. Run 'npm run frontend:dev' to start the frontend"
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:5173"
