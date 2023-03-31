const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const Age = require('../models/ageModel');
const User = require('../models/userModel');

// @desc  Get All user ages
// @route GET /api/v1/age
// @access Public
const getAge = asyncHandler(async (req, res) => {
    const age = await Age.find();
    res.status(200).json(age);
});

// @desc  Get One user's age
// @route GET /api/v1/age/:id
// @access Public

const getUserAge = asyncHandler(async (req, res) => {
    const ageItem = await Age.findById({client: req.params.id});
    if(!ageItem){
      res.status(404);
      throw new Error('User age not found');
    }
    res.status(200).json(ageItem);
});

// @desc  Create an age entry
// @route POST /api/v1/age
// @access Private
const createAge = asyncHandler(async (req, res) => {
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

    const {client, chronologicalAge, biologicalAge} = req.body;

    
    const newAgeEntry = await Age.create({
        client,
        chronologicalAge, 
        biologicalAge,
    });
    
    console.log(newAgeEntry);

    res.status(201).json(newAgeEntry);
});


// @desc  Delete a age entry
// @route DELETE /api/v1/age/:id
// @access Private

const deleteAge = asyncHandler(async (req, res) => {
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

    const ageEntry = await Age.findById(req.params.id);
    if(!ageItem){
        res.status(404);
        throw new Error('Age entries not found');
    }

    await ageEntry.remove();

    res.status(200).json({success: true});
})

module.exports = {
    getAge,
    getUserAge,
    createAge,
    deleteAge,
}