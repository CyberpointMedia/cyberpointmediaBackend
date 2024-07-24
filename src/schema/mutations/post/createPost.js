// src/schema/mutations/post/createPost.js
const { GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const PostType = require('../../types/PostType');
const Post = require('../../../models/Post');
const User = require('../../../models/User');
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
    seotitle: { type: GraphQLString },
    seometadescription: { type: GraphQLString },
    breadcrumbsTitle: { type: GraphQLString },
    canonicalURL: { type: GraphQLString },
    searchEngines: { type: new GraphQLList(GraphQLString) },
    hsRadioGroup: { type: GraphQLString },
    metaRobots: { type: GraphQLString }
  },
  resolve: authMiddleware(async(parent, args, context , info) =>{

    // Check if user is authenticated
     console.log('context user', context.user);
     if (!context.user) {
       throw new Error('User is not authenticated');
     }

       // Find the user by their email to get their _id
       const user = await User.findOne({ email: context.user.email });
       console.log('user', user);
       if (!user) {
         throw new Error('User not found');
       }


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
      author: user._id ,
      feature_img: feature_img_path,
      picture_img: picture_img_path,
      created_at: new Date(),
      updated_at: new Date(),
      updated_date: new Date()
    });

    const savedPost = await newPost.save();
     // Fetch the full user details
     const fullUserDetails = await User.findById(user._id);
     // Return the saved page with full author details
    return {
      ...savedPost._doc,
      author: fullUserDetails
    };

} catch (error) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
  })
};

module.exports = createPost;
