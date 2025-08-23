const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userDb');

require('dotenv').config();

// ---------------- Signup ----------------
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already registered",
        success: false
      });
    }

    // hash password & create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });

    await newUser.save();

    return res.status(201).json({
      message: "Signup Success",
      success: true
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
        success: false
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};

// ---------------- Login ----------------
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false
      });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({
        message: "Invalid password!",
        success: false
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};

module.exports = { signup, login };
