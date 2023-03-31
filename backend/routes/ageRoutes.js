const express = require('express');
const router = express.Router();
const {getAge, getUserAge, createAge, deleteAge} = require('../controllers/ageController');

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getAge).post(protect, createAge);
router.route('/:id').get(getUserAge).delete(protect, deleteAge);

module.exports = router;