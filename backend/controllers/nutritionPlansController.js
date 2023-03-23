const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const NutritionPlans = require('../models/nutritionPlansModel');
const User = require('../models/userModel');

// @desc  Get All plans
// @route GET /api/v1/nutritionPlans
// @access Public
const getNutritionPlans = asyncHandler(async (req, res) => {
    const nutritionPlans = await NutritionPlans.find();
    res.status(200).json(nutritionPlans);
});

// @desc  Get One user plan
// @route GET /api/v1/nutritionPlans/:id
// @access Public

const getUserNutritionPlan = asyncHandler(async (req, res) => {
    const nutritionPlan = await NutritionPlans.find({client: req.params.id});
    if(!nutritionPlan){
      res.status(404);
      throw new Error('User plan not found');
    }
    res.status(200).json(nutritionPlan);
    console.log(nutritionPlan);
});

// @desc  Create a Nutrition Plan Item
// @route POST /api/v1/nuritionPlans
// @access Private
const createNutritionPlan = asyncHandler(async (req, res) => {
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

    const {schedule, overview, client} = req.body;

    if(!schedule || !overview || !client){
        res.status(400);
        throw new Error('Please add schedule, overview, user');
    }
    
    const newNutritionPlan = await NutritionPlans.create({
        schedule,
        overview, 
        client,
    });
    
    console.log(newNutritionPlan);

    res.status(201).json(newNutritionPlan);
});


{/*}
// @desc  Delete a news item
// @route DELETE /api/v1/news/:id
// @access Private

const deleteNews = asyncHandler(async (req, res) => {
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

    const newsItem = await News.findById(req.params.id);
    if(!newsItem){
        res.status(404);
        throw new Error('News items not found');
    }

    await newsItem.remove();

    res.status(200).json({success: true});
})
*/}

module.exports = {
    getNutritionPlans,
    getUserNutritionPlan,
    createNutritionPlan,
    //deleteN
}