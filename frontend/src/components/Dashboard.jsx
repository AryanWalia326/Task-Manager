import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import * as api from '../api/endpoints';

export default function Dashboard({ projectId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, [projectId]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await api.getDashboardStats(projectId);
      setStats(response.data);
    } catch (err) {
      setError('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!stats) return null;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <div className="stat-value">{stats.totalTasks}</div>
        </div>
        <div className="stat-card">
          <h3>To Do</h3>
          <div className="stat-value">{stats.tasksByStatus['To Do']}</div>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <div className="stat-value">{stats.tasksByStatus['In Progress']}</div>
        </div>
        <div className="stat-card">
          <h3>Done</h3>
          <div className="stat-value">{stats.tasksByStatus.Done}</div>
        </div>
        <div className="stat-card error-card">
          <h3>Overdue</h3>
          <div className="stat-value">{stats.overdueTasks}</div>
        </div>
      </div>
    </div>
  );
}
