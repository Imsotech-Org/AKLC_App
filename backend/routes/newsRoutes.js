const express = require('express');
const router = express.Router();
const {getNews, getSingleNews, createNews, deleteNews} = require('../controllers/newsController');

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getNews).post(createNews);
router.route('/:id').get(getSingleNews).delete(protect, deleteNews);

module.exports = router;