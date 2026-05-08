# Task Manager - Frontend

Modern React frontend for the Team Task Manager application built with Vite.

## Features

- User authentication (signup/login)
- Project management dashboard
- Task creation and tracking
- Status updates with drag-and-drop
- Priority levels and due dates
- Dashboard with task statistics
- Responsive design

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your API URL:
```
VITE_API_URL=http://localhost:5000/api
```

## Running Locally

```bash
npm run dev
```

Application will start on `http://localhost:5173`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── api/
│   │   ├── client.js   # Axios instance with interceptors
│   │   └── endpoints.js # API endpoint functions
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ProjectList.jsx
│   │   ├── TaskList.jsx
│   │   └── Dashboard.jsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── Auth.css
│   │   ├── Projects.css
│   │   ├── Tasks.css
│   │   └── Dashboard.css
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Environment Variables

- `VITE_API_URL` - Backend API base URL (default: http://localhost:5000/api)

## Routing

- `/login` - Login page
- `/signup` - Signup page
- `/` - Projects dashboard (redirects to login if not authenticated)

## Authentication

Token is stored in localStorage and automatically added to all API requests via axios interceptors.

## Deployment

The frontend is deployed on Railway. See the main README for deployment instructions.
