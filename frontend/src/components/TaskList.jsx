import React, { useState, useEffect } from 'react';
import '../styles/Tasks.css';
import * as api from '../api/endpoints';

export default function TaskList({ projectId, projectName }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    loadTasks();
  }, [projectId, filterStatus]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await api.getTasks(projectId, filterStatus);
      setTasks(response.data.tasks);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.createTask(
        formData.title,
        formData.description,
        projectId,
        formData.priority,
        formData.dueDate || null
      );
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
      });
      setShowForm(false);
      loadTasks();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.updateTask(taskId, { status: newStatus });
      loadTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.deleteTask(taskId);
        loadTasks();
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2>{projectName}</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          + New Task
        </button>
      </div>

      {showForm && (
        <form className="task-form" onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Task title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
          <div className="form-row">
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Create</button>
            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {error && <div className="error">{error}</div>}

      <div className="filter-bar">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Tasks</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="tasks-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-header">
              <h3>{task.title}</h3>
              <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-meta">
              <span className="status">{task.status}</span>
              {task.dueDate && (
                <span className="due-date">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="task-actions">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
              <button
                className="btn-danger"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && <p className="empty-state">No tasks yet</p>}
    </div>
  );
}
