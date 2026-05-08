import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css';
import Login from './components/Login';
import Signup from './components/Signup';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentView, setCurrentView] = useState('projects');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('projects');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSelectedProject(null);
    setCurrentView('projects');
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setCurrentView('tasks');
  };

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>📋 Task Manager</h1>
          <div className="header-actions">
            <span>Welcome, {user.name}!</span>
            <a onClick={() => setCurrentView('projects')}>Projects</a>
            <a onClick={() => handleLogout()}>Logout</a>
          </div>
        </div>
      </header>

      <main className="container">
        {currentView === 'projects' && (
          <ProjectList onProjectSelect={handleProjectSelect} />
        )}

        {currentView === 'tasks' && selectedProject && (
          <>
            <div style={{ marginBottom: '30px' }}>
              <button onClick={() => setCurrentView('projects')} className="btn-secondary">
                ← Back to Projects
              </button>
            </div>
            <Dashboard projectId={selectedProject._id} />
            <TaskList projectId={selectedProject._id} projectName={selectedProject.name} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
