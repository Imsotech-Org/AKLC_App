const express = require('express');
const router = express.Router();
const {getPrograms, getProgram, createProgram, deleteProgram} = require('../controllers/programsController');

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getPrograms).post(protect, createProgram);
router.route('/:id').get(getProgram).delete(protect, deleteProgram)

module.exports = router;