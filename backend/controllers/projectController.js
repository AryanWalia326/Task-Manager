const Project = require('../models/Project');
const User = require('../models/User');

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const project = new Project({
      name,
      description,
      admin: req.userId,
      members: [{ user: req.userId, role: 'Admin' }],
    });

    await project.save();
    await project.populate(['admin', 'members.user']);

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      'members.user': req.userId,
    })
      .populate('admin', 'name email')
      .populate('members.user', 'name email');

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('admin', 'name email')
      .populate('members.user', 'name email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is a member of the project
    const isMember = project.members.some((m) => m.user._id.toString() === req.userId);
    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this project' });
    }

    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is admin
    if (project.admin.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only admin can add members' });
    }

    // Check if user is already a member
    const isMemberAlready = project.members.some((m) => m.user.toString() === userId);
    if (isMemberAlready) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    project.members.push({ user: userId, role: 'Member' });
    await project.save();
    await project.populate(['admin', 'members.user']);

    res.status(200).json({
      message: 'Member added successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is admin
    if (project.admin.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only admin can remove members' });
    }

    // Prevent removing admin
    if (project.admin.toString() === userId) {
      return res.status(400).json({ message: 'Cannot remove project admin' });
    }

    project.members = project.members.filter((m) => m.user.toString() !== userId);
    await project.save();
    await project.populate(['admin', 'members.user']);

    res.status(200).json({
      message: 'Member removed successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is admin
    if (project.admin.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only admin can update project' });
    }

    if (name) project.name = name;
    if (description) project.description = description;

    await project.save();
    await project.populate(['admin', 'members.user']);

    res.status(200).json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is admin
    if (project.admin.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only admin can delete project' });
    }

    await Project.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
