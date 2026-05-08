import api from './client';

export const signup = (name, email, password) =>
  api.post('/auth/signup', { name, email, password });

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

export const getProfile = () =>
  api.get('/auth/profile');

export const createProject = (name, description) =>
  api.post('/projects', { name, description });

export const getProjects = () =>
  api.get('/projects');

export const getProjectById = (id) =>
  api.get(`/projects/${id}`);

export const updateProject = (id, name, description) =>
  api.put(`/projects/${id}`, { name, description });

export const deleteProject = (id) =>
  api.delete(`/projects/${id}`);

export const addMember = (projectId, userId) =>
  api.post('/projects/members/add', { projectId, userId });

export const removeMember = (projectId, userId) =>
  api.post('/projects/members/remove', { projectId, userId });

export const createTask = (title, description, projectId, priority, dueDate) =>
  api.post('/tasks', { title, description, projectId, priority, dueDate });

export const getTasks = (projectId, status) => {
  const params = {};
  if (projectId) params.projectId = projectId;
  if (status) params.status = status;
  return api.get('/tasks', { params });
};

export const getTaskById = (id) =>
  api.get(`/tasks/${id}`);

export const updateTask = (id, updates) =>
  api.put(`/tasks/${id}`, updates);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`);

export const getDashboardStats = (projectId) => {
  const params = {};
  if (projectId) params.projectId = projectId;
  return api.get('/tasks/stats/dashboard', { params });
};
