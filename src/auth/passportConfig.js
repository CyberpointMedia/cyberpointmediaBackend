// src/auth/passportConfig.js
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log(`Logged out in successfully. Username: ${user.username}, Role: ${user.role}`);
      console.log('Token: ', token);
      // Generate a JWT token with a short expiry time
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1s' });
      return done(null, { user, token });
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
