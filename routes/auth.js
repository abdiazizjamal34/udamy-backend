const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/auth');


const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post('/signup', async (req, res) => {
  const { firstName, lastName, age, email, phoneNumber, username, password } = req.body;
  try {
    let user = await User.findOne({ email});
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      age,
      email,
      phoneNumber,
      username,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send('server Error');
  }
});

// @route   POST /api/auth/signin
// @desc    Authenticate user and get token
// @access  Public
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Incorrect password');
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/auth/users
// @desc    Get all users
// @access  Private
router.get('/users', async (req, res) => {
    try {
      const users = await User.find().select('-password'); // Exclude the password field
      res.json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
// @route   GET /api/auth/users
// @desc    Get all users
// @access  Private
router.get('/users', auth, async (req, res) => {
    try {
      const users = await User.find().select('-password'); // Exclude the password field
      res.json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });  


module.exports = router;
