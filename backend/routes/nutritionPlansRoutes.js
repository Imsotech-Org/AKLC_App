const express = require('express');
const router = express.Router();
const {getNutritionPlans, getUserNutritionPlan, createNutritionPlan} = require('../controllers/nutritionPlansController');

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getNutritionPlans).post(protect, createNutritionPlan);
router.route('/:id').get(getUserNutritionPlan);

module.exports = router;