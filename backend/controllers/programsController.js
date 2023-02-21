const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const Programs = require('../models/programsModel');
const User = require('../models/userModel');

// @desc  Get All programs
// @route GET /api/v1/programs
// @access Public
const getPrograms = asyncHandler(async (req, res) => {
    const programs = await Programs.find();
    res.status(200).json(programs);
});

// @desc  Get One program
// @route GET /api/v1/programs/:id
// @access Public
const getProgram = asyncHandler(async (req, res) => {
    const program = await Programs.findById(req.params.id);
    if(!program){
      res.status(404);
      throw new Error('Program not found');
    }
    res.status(200).json(program);
});

// @desc  Create a program
// @route POST /api/v1/programs
// @access Private
const createProgram = asyncHandler(async (req, res) => {
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

    const {programImage, title, price, secondPrice, description, firstTopics, moreTopics, longTopics} = req.body;

    if(!programImage || !title || !price || !description || moreTopics){
        res.status(400);
        console.log(programImage, title, price, description, firstTopics, moreTopics, longTopics);
        throw new Error('Please add programImage, title, price, description, and the moreTopics');
    }
    
    const newProgram = await Programs.create({
        programImage,
        title, 
        price,
        secondPrice,
        description, 
        firstTopics, 
        moreTopics, 
        longTopics
    });
    
      res.status(201).json(newProgram);
});

// @desc  Delete a program
// @route DELETE /api/v1/programs/:id
// @access Private
const deleteProgram = asyncHandler(async (req, res) => {
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

    const program = await Programs.findById(req.params.id);
    if(!program){
        res.status(404);
        throw new Error('Program not found');
    }

    await program.remove();

    res.status(200).json({success: true});
})

module.exports = {
    getPrograms,
    getProgram,
    createProgram,
    deleteProgram
}