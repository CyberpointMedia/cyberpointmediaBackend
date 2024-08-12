// src/auth/authController.js
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    // Log in the user
    req.logIn(user, async (err) => {
      if (err) return next(err);
      try {
        // Fetch user details including role
        const userDetails = await User.findById(user._id);
        // Generate a JWT token with a short expiry time
        const token = jwt.sign({ id: userDetails._id, role: userDetails.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1s' });
        // Log the username and role to the console
        console.log(`Logged in successfully. Username: ${userDetails.username}, Role: ${userDetails.role}`);
        console.log('Token: ', token);
        // Send a success response with the token
        res.cookie('user', { id: userDetails.id, role: userDetails.role }, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return res.json({ message: 'Logged in successfully (authcontroller)', token });
      } catch (err) {
        return next(err);
      }
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' });

    // Clear the user cookie
    res.clearCookie('user');

    console.log("Logged out successfully");
    res.json({ message: 'Logged out successfully ( (authcontroller))' });
  });
};

module.exports = {
  login,
  logout,
};