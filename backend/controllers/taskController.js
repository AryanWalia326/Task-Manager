const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, priority, dueDate } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: 'Title and project ID are required' });
    }

    // Check if user is a member of the project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isMember = project.members.some((m) => m.user.toString() === req.userId);
    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this project' });
    }

    const task = new Task({
      title,
      description,
      project: projectId,
      priority,
      dueDate,
      createdBy: req.userId,
    });

    await task.save();
    await task.populate(['project', 'assignedTo', 'createdBy']);

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { projectId, status } = req.query;
    const filter = {};

    if (projectId) {
      filter.project = projectId;
    }

    if (status) {
      filter.status = status;
    }

    const tasks = await Task.find(filter)
      .populate('project', 'name')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project', 'name')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status, priority, dueDate } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Get the project to check permissions
    const project = await Project.findById(task.project);
    const isAdmin = project.admin.toString() === req.userId;
    const isMember = project.members.some((m) => m.user.toString() === req.userId);

    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this project' });
    }

    // Members can only update status of their assigned tasks
    if (!isAdmin && task.assignedTo?.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only update your assigned tasks' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;

    await task.save();
    await task.populate(['project', 'assignedTo', 'createdBy']);

    res.status(200).json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is admin of the project
    const project = await Project.findById(task.project);
    if (project.admin.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only project admin can delete tasks' });
    }

    await Task.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const { projectId } = req.query;

    // Get all tasks for the project
    const filter = projectId ? { project: projectId } : {};
    const tasks = await Task.find(filter);

    // Calculate stats
    const totalTasks = tasks.length;
    const tasksByStatus = {
      'To Do': tasks.filter((t) => t.status === 'To Do').length,
      'In Progress': tasks.filter((t) => t.status === 'In Progress').length,
      'Done': tasks.filter((t) => t.status === 'Done').length,
    };

    const now = new Date();
    const overdueTasks = tasks.filter((t) => t.dueDate && t.dueDate < now && t.status !== 'Done').length;

    // Tasks per user (for assigned tasks)
    const tasksPerUser = {};
    tasks.forEach((t) => {
      if (t.assignedTo) {
        const userId = t.assignedTo.toString();
        tasksPerUser[userId] = (tasksPerUser[userId] || 0) + 1;
      }
    });

    res.status(200).json({
      totalTasks,
      tasksByStatus,
      overdueTasks,
      tasksPerUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
