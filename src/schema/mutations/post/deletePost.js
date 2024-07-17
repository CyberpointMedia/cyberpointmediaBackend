const { GraphQLNonNull, GraphQLID } = require('graphql');
const PostType = require('../../types/PostType');
const Post = require('../../../models/Post');
const authMiddleware = require('../../../auth/authMiddleware');

const deletePost = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  async resolve(_, { id }, context) {
    // Ensure user is authenticated
    authMiddleware(_, { id }, context);

    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      if (!deletedPost) {
        throw new Error('Post not found');
      }
      return deletedPost;
    } catch (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  }
};

module.exports = deletePost;
