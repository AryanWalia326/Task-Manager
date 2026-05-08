# Team Task Manager

A modern full-stack web application for managing team projects and tasks collaboratively. Users can create projects, assign tasks, track progress, and monitor team productivity with role-based access control.

## 🎯 Features

### User Management
- User signup and login with secure JWT authentication
- Role-based access control (Admin, Member)
- User profile management

### Project Management
- Create and manage projects
- Add/remove team members
- Project descriptions and metadata
- View assigned projects

### Task Management
- Create tasks with title, description, priority, and due dates
- Assign tasks to team members
- Track task status (To Do, In Progress, Done)
- Update task details
- Delete tasks (admin only)

### Dashboard
- Total tasks overview
- Tasks grouped by status
- Overdue tasks tracking
- Per-user task assignments
- Real-time statistics

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Task\ Manager
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=5000
# FRONTEND_URL=http://localhost:5173

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env if needed
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📡 API Documentation

### Authentication
```
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/profile
```

### Projects
```
POST /api/projects              # Create project
GET /api/projects               # Get user's projects
GET /api/projects/:id           # Get project details
PUT /api/projects/:id           # Update project
DELETE /api/projects/:id        # Delete project
POST /api/projects/members/add       # Add member
POST /api/projects/members/remove    # Remove member
```

### Tasks
```
POST /api/tasks                 # Create task
GET /api/tasks                  # Get tasks (with filters)
GET /api/tasks/:id              # Get task details
PUT /api/tasks/:id              # Update task
DELETE /api/tasks/:id           # Delete task
GET /api/tasks/stats/dashboard  # Get dashboard stats
```

## 🌐 Deployment on Railway

### Prerequisites
- Railway account (https://railway.app)
- GitHub repository with project code

### Backend Deployment

1. Push your code to GitHub
2. Go to [Railway Dashboard](https://railway.app/dashboard)
3. Create a new project and select "Deploy from GitHub repo"
4. Connect your GitHub account and select the repository
5. Configure the backend service:
   - Set environment variables in Railway dashboard:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_secret_key
     PORT=5000
     FRONTEND_URL=your_deployed_frontend_url
     NODE_ENV=production
     ```
   - Railway will automatically detect `package.json` and build/run the app

### Frontend Deployment

1. Create a new service in the same Railway project
2. Select "Deploy from GitHub repo"
3. Configure the frontend service:
   - Set environment variables:
     ```
     VITE_API_URL=your_deployed_backend_url/api
     ```
   - Add build command: `npm run build`
   - Add start command: `npm run preview`

### Database Setup

1. In Railway, add a MongoDB plugin to your project
2. The connection string will be automatically available as `DATABASE_URL`
3. Update your backend `.env` to use this connection string

### Connecting Services

1. Both services are in the same Railway project
2. Get the deployed backend URL and use it in frontend's `VITE_API_URL`
3. Test the connection by logging in

## 📸 Screenshots

### Login Page
Clean, modern authentication interface with gradient background.

### Dashboard
Overview of all projects with the ability to create new projects.

### Project View
Task management interface with status tracking and filters.

### Statistics
Real-time dashboard showing task metrics and team productivity.

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- CORS protection
- Input validation and sanitization
- Protected API routes
- Secure session management

## 🤝 User Roles

### Admin
- Create and delete projects
- Add/remove team members
- Manage all tasks in the project
- View all project statistics

### Member
- View assigned tasks
- Update task status
- View project information
- Cannot modify project settings or create tasks

## 📝 Database Schema

### User
- id (ObjectId)
- name (String)
- email (String, unique)
- password (String, hashed)
- createdAt, updatedAt

### Project
- id (ObjectId)
- name (String)
- description (String)
- admin (User ref)
- members (Array of User refs with roles)
- createdAt, updatedAt

### Task
- id (ObjectId)
- title (String)
- description (String)
- project (Project ref)
- assignedTo (User ref, optional)
- status (String: "To Do", "In Progress", "Done")
- priority (String: "Low", "Medium", "High")
- dueDate (Date, optional)
- createdBy (User ref)
- createdAt, updatedAt

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify connection string in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure network connectivity

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env`
- Check `VITE_API_URL` in frontend `.env`
- Ensure both URLs are correct

### Authentication Issues
- Clear browser localStorage
- Verify JWT_SECRET is set
- Check token expiration (7 days)

## 📚 Project Structure

```
Task Manager/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack web development with MERN stack
- RESTful API design and implementation
- Database design and relationships
- Authentication and authorization
- Frontend state management
- Component-based architecture
- Production deployment

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a full-stack development assessment project.

## 🤝 Support

For issues or questions, please create an issue in the repository.

---

**Live Application**: [Add your deployed URL here]
**GitHub Repository**: [Add your repository URL here]
