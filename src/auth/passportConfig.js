// src/auth/passportConfig.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    email: 'admin@gmail.com',
    password: '$2a$10$7QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8', // hashed password for 'adminpassword'
  },
];

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  const user = users.find(user => user.email === email);
  if (!user) {
    return done(null, false, { message: 'Incorrect email.' });
  }
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) throw err;
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(user => user.id === id);
  done(null, user);
});
