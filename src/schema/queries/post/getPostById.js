const { GraphQLNonNull, GraphQLID } = require('graphql');
const PostType = require('../../types/PostType');
const Post = require('../../../models/Post');
const User = require('../../../models/User');

const getPostById = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (_, { id }) => {
    try {
      const post = await Post.findById(id);
      if (!post) {
        throw new Error('Post not found');
      }

      let authorDetails = null;

      try {
        authorDetails = await User.findById(post.author);
        if (!authorDetails) {
          console.warn(`Author not found for post: ${id}`);
        }
      } catch (error) {
        console.error(`Error fetching author details: ${error.message}`);
      }

      return {
        ...post._doc,
        author: authorDetails ? {
          _id: authorDetails._id.toString(), // Ensure author ID is converted to string
          username: authorDetails.username,
          email: authorDetails.email,
          website: authorDetails.website,
          role: authorDetails.role
        } : null
      };
    } catch (error) {
      // Handle errors related to database operations or invalid ID
      throw new Error(`Error fetching post by ID: ${error.message}`);
    }
  }
};

module.exports = getPostById;
