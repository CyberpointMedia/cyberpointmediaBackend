// src/schema/mutations/post/createPost.js
const { GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const PostType = require('../../types/PostType');
const Post = require('../../../models/Post');
const { GraphQLUpload } = require('graphql-upload');
const authMiddleware = require('../../../auth/authMiddleware');
const { storeUpload } = require('../../../auth/uploadMiddleware');

const createPost = {
  type: PostType,
  args: {
    post_name: { type: new GraphQLNonNull(GraphQLString) },
    post_router: { type: GraphQLString },
    sub_description: { type: GraphQLString },
    description: { type: GraphQLString },
    feature_img: { type: GraphQLUpload },
    picture_img: { type: GraphQLUpload },
    status: { type: GraphQLString },
    author: { type: new GraphQLNonNull(GraphQLString) },
    seotitle: { type: GraphQLString },
    seometadescription: { type: GraphQLString },
    breadcrumbsTitle: { type: GraphQLString },
    canonicalURL: { type: GraphQLString },
    searchEngines: { type: new GraphQLList(GraphQLString) },
    hsRadioGroup: { type: GraphQLString },
    metaRobots: { type: GraphQLString }
  },
  async resolve(_, args, context) {
    // Ensure user is authenticated
    authMiddleware(_, args, context);
    const { post_name, feature_img, picture_img } = args;
    try {
    // Check if post_name is unique
    const existingPost = await Post.findOne({ post_name });
    if (existingPost) {
      throw new Error('Post name already exists');
    }
    // Generate the post_router from post_name
    const post_router = post_name.trim().toLowerCase().replace(/\s+/g, '-');
    // Handle file uploads
    let feature_img_path = null;
    let picture_img_path = null;
    if (feature_img) {
      const { createReadStream, filename } = await feature_img;
      const stream = createReadStream();
      feature_img_path = await storeUpload({ stream, filename });
    }
    if (picture_img) {
      const { createReadStream, filename } = await picture_img;
      const stream = createReadStream();
      picture_img_path = await storeUpload({ stream, filename });
    }

    const newPost = new Post({
      ...args,
      post_router,
      feature_img: feature_img_path,
      picture_img: picture_img_path,
      created_at: new Date(),
      updated_at: new Date(),
      updated_date: new Date()
    });

    return newPost.save();
} catch (error) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
  }
};

module.exports = createPost;
