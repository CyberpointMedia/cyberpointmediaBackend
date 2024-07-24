const { GraphQLList } = require('graphql');
const PostType = require('../../types/PostType');
const Post = require('../../../models/Post');
const User = require('../../../models/User');

const getAllPosts = {
  type: new GraphQLList(PostType),
  resolve: async () => {
    try {
      // Fetch all posts
      const posts = await Post.find().populate('author'); // Assuming 'author' is a reference field

      // For each post, fetch and include full user details
      const postsWithAuthorDetails = await Promise.all(posts.map(async (post) => {
        const fullUserDetails = await User.findById(post.author);
        return {
          ...post._doc,
          author: fullUserDetails ? {
            _id: fullUserDetails._id.toString(),
            username: fullUserDetails.username,
            email: fullUserDetails.email,
            website: fullUserDetails.website,
            role: fullUserDetails.role
          } : null
        };
      }));

      return postsWithAuthorDetails;
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  }
};

module.exports = getAllPosts;
