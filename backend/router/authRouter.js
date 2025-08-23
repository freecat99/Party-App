const express = require('express');
const { signUpValidate, loginValidate } = require('../middleware/authValidation');
const { signup, login } = require('../controllers/authController');
const otpSend = require('../controllers/otpController');

const router = express.Router();

router.post('/signup', signUpValidate, signup)
router.post('/signup/otp', otpSend)
router.post('/login', loginValidate, login)

module.exports = router