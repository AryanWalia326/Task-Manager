# Task Manager - Backend

RESTful API for the Team Task Manager application built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Project management (create, read, update, delete)
- Team member management
- Task management with status tracking
- Dashboard statistics
- Role-based access control (Admin, Member)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string and JWT secret:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Running Locally

```bash
npm run dev
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all user's projects
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/members/add` - Add member (Admin only)
- `POST /api/projects/members/remove` - Remove member (Admin only)

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get tasks (with filters)
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task (Admin only)
- `GET /api/tasks/stats/dashboard` - Get dashboard statistics

## Authentication

All protected routes require the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Project Structure

```
backend/
├── config/
│   └── db.js           # MongoDB connection
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   └── taskController.js
├── middleware/
│   └── auth.js         # JWT verification
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
├── server.js           # Express app
├── package.json
└── .env.example
```

## Deployment

The backend is deployed on Railway. See the main README for deployment instructions.
