const { GraphQLList } = require('graphql');
const PostType = require('../../types/PostType');
const Post = require('../../../models/Post');

const getAllPosts = {
  type: new GraphQLList(PostType),
  resolve: async () => {
    try {
      const posts = await Post.find();
      return posts;
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  }
};

module.exports = getAllPosts;
