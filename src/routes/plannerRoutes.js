const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');
const { protect } = require('../middleware/authMiddleware');

// Plan CRUD
router.post('/', protect, plannerController.createPlan);
router.get('/today', protect, plannerController.getTodayPlan);
router.get('/weekly', protect, plannerController.getWeeklyPlan);
router.get('/monthly', protect, plannerController.getMonthlyPlan);
router.get('/stats', protect, plannerController.getStatistics);
router.get('/', protect, plannerController.getAllPlans);
router.get('/:planId', protect, plannerController.getPlanById);
router.put('/:planId', protect, plannerController.updatePlan);
router.delete('/:planId', protect, plannerController.deletePlan);

// Goal operations
router.post('/:planId/goals', protect, plannerController.addGoal);
router.patch('/:planId/goals/:goalId', protect, plannerController.updateGoal);
router.patch('/:planId/goals/:goalId/timer', protect, plannerController.updateTimer);
router.delete('/:planId/goals/:goalId', protect, plannerController.deleteGoal);

module.exports = router;
