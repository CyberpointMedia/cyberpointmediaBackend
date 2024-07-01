// src/auth/authController.js
const passport = require('passport');

const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log("Logged in successfully");
      return res.json({ message: 'Logged in successfully' });
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
