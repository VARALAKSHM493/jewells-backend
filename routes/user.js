const express = require('express');
const { Signup, Login, verifyOtp } = require('../controllers/user');
const router = express.Router();
 
router.post('/Signup', Signup);
router.post('/login', Login);
router.post('/verify-otp', verifyOtp);
 
module.exports = router;