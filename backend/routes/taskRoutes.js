const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware); // All routes require authentication

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/stats/dashboard', taskController.getDashboardStats);

module.exports = router;
