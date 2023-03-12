const express = require('express');
const router = express.Router();
const {getWorkoutPlans, getWorkoutPlanByUser, createWorkoutPlan} = require('../controllers/workoutPlansController');

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getWorkoutPlans).post(protect, createWorkoutPlan);
router.route('/:id').get(getWorkoutPlanByUser);


module.exports = router;