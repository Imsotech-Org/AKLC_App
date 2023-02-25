const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const News = require('../models/newsModel');
const User = require('../models/userModel');

// @desc  Get All news
// @route GET /api/v1/news
// @access Public
const getNews = asyncHandler(async (req, res) => {
    const news = await News.find();
    res.status(200).json(news);
});

// @desc  Get One news item
// @route GET /api/v1/news/:id
// @access Public

const getNew = asyncHandler(async (req, res) => {
    const newsItem = await News.findById(req.params.id);
    if(!newsItem){
      res.status(404);
      throw new Error('News not found');
    }
    res.status(200).json(newsItem);
});

// @desc  Create a News Item
// @route POST /api/v1/news
// @access Private
const createNews = asyncHandler(async (req, res) => {
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

    const {newsImage, title, description} = req.body;

    if(!newsImage || !title || !description){
        res.status(400);
        throw new Error('Please add newsImage, title, description');
    }
    
    const newNewsItem = await News.create({
        newsImage,
        title, 
        description,
    });
    
    console.log(newNewsItem);

    res.status(201).json(newNewsItem);
});


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

module.exports = {
    getNews,
    getNew,
    createNews,
    deleteNews
}