// src/auth/authController.js
const passport = require('passport');
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
        const userDetails = await User.findById(user.id);

        // Log the username and role to the console
        console.log(`Logged in successfully. Username: ${userDetails.username}, Role: ${userDetails.role}`);

        // Send a success response
        res.cookie('user', { id: userDetails.id, role: userDetails.role }, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.json({ message: 'Logged in successfully' });
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
    res.json({ message: 'Logged out successfully' });
  });
};

module.exports = {
  login,
  logout,
};

