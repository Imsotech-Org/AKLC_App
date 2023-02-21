const express = require('express');
const router = express.Router();
const {getNews, getNew, createNews, deleteNews} = require('../controllers/newsController');

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getNews).post(protect, createNews);
router.route('/:id').get(getNew).delete(protect, deleteNews);

module.exports = router;