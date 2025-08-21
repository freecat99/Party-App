const express = require('express');
const { signUpValidate, loginValidate } = require('../middleware/authValidation');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signUpValidate, signup)
router.post('/login', loginValidate, login)

module.exports = router