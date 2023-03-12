const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const Goals = require('../models/goalsModel');
const User = require('../models/userModel');

// @desc  Get All goals
// @route GET /api/v1/goals
// @access Public
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goals.find();
    res.status(200).json(goals);
});

// @desc  Get goals from a user
// @route GET /api/v1/goals/:id
// @access Public

const getUserGoals = asyncHandler(async (req, res) => {
    const goals = await Goals.findById(req.params.id);
    if(!goals){
      res.status(404);
      throw new Error('User goal not found');
    }
    res.status(200).json(goals);
});

// @desc  Create a goal
// @route POST /api/v1/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
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

    const {client, goalPeriod, goalDescription} = req.body;

    if(!client || !goalPeriod || !goalDescription){
        res.status(400);
        throw new Error('Please add a client, goal period and goal description');
    }
    
    const newGoals = await Goals.create({
        client,
        goalPeriod, 
        goalDescription,
    });
    
    console.log(newGoals);

    res.status(201).json(newGoals);
});

module.exports = {
    getGoals,
    getUserGoals,
    createGoal,
    //deleteG
}