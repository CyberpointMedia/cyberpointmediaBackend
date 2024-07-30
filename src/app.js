// src/app.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { graphqlHTTP } = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema');
const User = require('./models/User');
const { login, logout } = require('./auth/authController');
const PORT = process.env.PORT || 4000;
require('dotenv').config();
require('./auth/passportConfig');

const app = express();
app.use(cors());
app.use((req, res, next) => {
  console.log (`Request: ${req} ${res}`);
  next();
});

app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    name: 'token',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', login);
app.post('/logout', logout);

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP((req,res) => ({
  schema: schema,
  graphiql: true,
  context: {
    req,
    res,
    user: req.user,
    headers: req.headers,
  },
  customFormatErrorFn: (error) => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path,
  }),
})));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to MongoDB and ensure admin user exists
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');

  try {
    const user = await User.findOne({ email: process.env.USER_EMAIL });

    if (user) {
      console.log('Admin user already exists');
    } else {
      const adminUser = new User({
        username: process.env.USERNAME,
        email: process.env.USER_EMAIL,
        password: process.env.password,
        website: process.env.website,
        role: process.env.role,
      });

      await adminUser.save();
      console.log('Admin user created successfully');
    }

    // Start the server after ensuring the admin user exists
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error('Error checking/creating admin user:', err);
  }
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
