import React, { useState, useEffect } from 'react';
import '../styles/Projects.css';
import * as api from '../api/endpoints';

export default function ProjectList({ onProjectSelect }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await api.getProjects();
      setProjects(response.data.projects);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await api.createProject(formData.name, formData.description);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      loadProjects();
    } catch (err) {
      setError('Failed to create project');
    }
  };

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2>My Projects</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          + New Project
        </button>
      </div>

      {showForm && (
        <form className="project-form" onSubmit={handleCreateProject}>
          <input
            type="text"
            placeholder="Project name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Create</button>
            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {error && <div className="error">{error}</div>}

      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project._id}
            className="project-card"
            onClick={() => onProjectSelect(project)}
          >
            <h3>{project.name}</h3>
            <p>{project.description || 'No description'}</p>
            <div className="project-meta">
              <span>{project.members.length} members</span>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && <p className="empty-state">No projects yet. Create one to get started!</p>}
    </div>
  );
}
