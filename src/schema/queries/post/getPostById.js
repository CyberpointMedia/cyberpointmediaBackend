const { GraphQLNonNull, GraphQLID } = require('graphql');
const PostType = require('../../types/PostType');
const Post = require('../../../models/Post');

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
      return post;
    } catch (error) {
      throw new Error(`Failed to fetch post: ${error.message}`);
    }
  }
};

module.exports = getPostById;
