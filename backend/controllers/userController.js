const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');


const User = require('../models/userModel');


// @desc Register a new user
// @route /api/v1/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  if(req.files === null){
    res.status(400);
    throw new Error("No File was uploaded");
  }

  const {name, email, password, userImage, about, plan, hasPaid, isAdmin} = req.body;

  // Validation
  if(!name || !email || !password){
    res.status(400);
    throw new Error('Please include all fields');
  }

  // Find if user already exist
  const userExists = await User.findOne({email})

  if(userExists){
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Check for value for userImage
  const newUserImage = '';
  if(userImage){
    newUserImage = `${email}_${userImage}`;
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    userImage: newUserImage,
    about,
    plan,
    hasPaid,
    isAdmin
  });

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userImage: user.userImage,
      about: user.about,
      plan: user.plan,
      hasPaid: user.hasPaid,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  }else {
    res.status(400);
    throw new Error('Invalid user data');
  }

});

// @desc Login a user
// @route /api/v1/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email})

  // Check user and passwords match
  if(user && (await bcrypt.compare(password, user.password))) {
    if(!user.plan){
      res.status(401);
      throw new Error('No Plan');
    }else{
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        hasPaid: user.hasPaid,
        plan: user.plan,
        token: generateToken(user._id)
      });
    }
  }else {
    res.status(401);
    throw new Error('Invalid Credentials');
  }
})

// @desc Get current user
// @route /api/v1/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id ? req.user._id : '',
    email: req.user.email ? req.user.email : '',
    name: req.user.name ? req.user.name : '',
    isAdmin: req.user.isAdmin ? req.user.isAdmin : '',
    hasPaid: req.user.hasPaid ? req.user.hasPaid : '',
    plan: req.user.plan ? req.user.plan : '',
    about: req.user.about ? req.user.about : '',
    userImage: req.user.userImage ? req.user.userImage : '',
    token: req.user.token
  }

  res.status(200).json(user);
})

// @desc Get all users
// @route /api/v1/users/getAll
// @access Public
const getAll = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
})


// @desc PUT update user
// @route /api/v1/users/me
// @access Private
const updateMe = asyncHandler(async (req, res) => {
  if(req.body.plan !== ""){
    console.log('DIFFERENT');
    console.log(req.body);
    const newPlan = mongoose.Types.ObjectId(req.body.plan);
    if(req.body.length > 1){
      const updatedUser = await User.findByIdAndUpdate(req.user._id, {plan: newPlan, hasPaid: req.body.hasPaid}, {new: true});
      res.status(200).json(updatedUser);
    }else {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, {plan: newPlan}, {new: true});
      res.status(200).json(updatedUser);
    }
  }else{
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });

    res.status(200).json(updatedUser);
  }
})

// @desc PUT Forgot Password method
// @route /api/v1/users/forgotPassword
// @access Public
const forgotMyPassword = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const getUserId = await User.findOne({email});

  if(getUserId.name !== name){
    res.status(401);
    throw new Error('Invalid User');
  }

  // Update User
  await User.findByIdAndUpdate(
    {_id: getUserId._id},
    {password: hashPassword}
  )

  res.status(200).json({msg: 'Password was updated successfully.'});
})


// Generate token function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}


module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAll,
  updateMe,
  forgotMyPassword
}