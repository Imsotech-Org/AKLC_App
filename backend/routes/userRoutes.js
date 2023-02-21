const express = require('express');
const router = express.Router();
const multer = require('multer');
const {registerUser, loginUser, getMe, updateMe, forgotMyPassword, getAll} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/signIn', loginUser);
router.get('/me', protect, getMe);
router.get('/getAll', protect, getAll);
router.put('/me', protect, updateMe);
router.put('/forgotPassword', forgotMyPassword);

module.exports = router;