//src/resolvers/auth/login.js
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const login = async (_, { email, password }, context) => {
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
  context.res.setHeader('Authorization', `Bearer ${token}`);
  
  return {
    message: 'Logged in successfully',
    token: token
  };
};

module.exports = login;
