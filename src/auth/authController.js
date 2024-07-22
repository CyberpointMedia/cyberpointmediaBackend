// src/auth/authController.js
const passport = require('passport');
const User = require('../models/User');

const login = async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    // Log in the user
    req.logIn(user, (err) => {
      if (err) return next(err);

      // Fetch user details including role
      User.findById(user.id, (err, userDetails) => {
        if (err) return next(err);

        // Log the username and role to the console
        console.log(`Logged in successfully. Username: ${userDetails.username}, Role: ${userDetails.role}`);

        // Send a success response
        return res.json({ message: 'Logged in successfully' });
      });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    console.log("Logged out successfully");
    res.json({ message: 'Logged out successfully' });
  });
};

module.exports = {
  login,
  logout,
};
