const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { sample_users } = require('../data.js');
const { UserModel } = require('../models/usermodel.js'); 
const { HTTP_BAD_REQUEST } = require('../constants/http_status.js');

const router = express.Router();

// Route for seeding users
router.get('/seed', asyncHandler(async (req, res) => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    res.send('Seed is already done!');
    return;
  }

  await UserModel.create(sample_users);
  res.send('Seed Is Done!');
}));

// Route for login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  
  // Query the user by email
  const user = await UserModel.findOne({ email });
  console.log(user);

  if (user) {
    // Compare the hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      // Passwords match, generate token response and send it
      res.send(generateTokenResponse(user));
    } else {
      // Passwords do not match
      res.status(HTTP_BAD_REQUEST).send('Username or password is invalid!');
    }
  } else {
    // User with the given email not found
    res.status(HTTP_BAD_REQUEST).send('Username or password is invalid!');
  }
}));

// Route for registration
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(HTTP_BAD_REQUEST).send('User already exists, please login!');
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: '',
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    isAdmin: false
  };

  const dbUser = await UserModel.create(newUser);
  res.send(generateTokenResponse(dbUser));
}));

// Function to generate token response
const generateTokenResponse = (user) => {
  const token = jwt.sign({
    email: user.email,
    isAdmin: user.isAdmin
  }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token
  };
};

module.exports = router;