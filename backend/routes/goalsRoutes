const express = require('express');
const router = express.Router();
const {getGoals, getUserGoals, createGoal} = require('../controllers/goalsController');

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getGoals).post(protect, createGoal);
router.route('/:id').get(getUserGoals);

module.exports = router;