const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const WorkoutPlans = require('../models/workoutPlansModel');
const User = require('../models/userModel');

// @desc  Get All Workout plans
// @route GET /api/v1/workoutPlans
// @access Public
const getWorkoutPlans = asyncHandler(async (req, res) => {
    const workoutPlans = await WorkoutPlans.find();
    res.status(200).json(workoutPlans);
});

// @desc  Get Workout plan by user
// @route GET /api/v1/workoutPlans/:id
// @access Public

const getWorkoutPlanByUser = asyncHandler(async (req, res) => {
    const workoutPlan = await WorkoutPlans.findById(req.params.id);
    if(!workoutPlan){
      res.status(404);
      throw new Error('User plans not found');
    }
    res.status(200).json(workoutPlan);
});

// @desc  Create a Workout Plan Item
// @route POST /api/v1/nuritionPlans
// @access Private
const createWorkoutPlan = asyncHandler(async (req, res) => {
    let token
    let user

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user = await User.findById(decoded.id).select('-password');
    }

    if(!user.isAdmin) {
        res.status(401);
        throw new Error('User not authorized for function');
    }

    const {client, weekday, title, description} = req.body;

    if(!client || !weekday || !title || !description){
        res.status(400);
        throw new Error('Please add client, weekday, title and description');
    }
    
    const newWorkoutPlan = await WorkoutPlans.create({
        client,
        weekday, 
        title,
        description,
    });
    
    console.log(newWorkoutPlan);

    res.status(201).json(newWorkoutPlan);
});

module.exports = {
    getWorkoutPlans,
    getWorkoutPlanByUser,
    createWorkoutPlan,
}