const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } = require('graphql');
const PostType = require('../../types/PostType');
const Post = require('../../../models/Post');
const User = require('../../../models/User');
const { GraphQLUpload } = require('graphql-upload');
const authMiddleware = require('../../../auth/authMiddleware');
const { storeUpload } = require('../../../auth/uploadMiddleware');

const updatePost = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    post_name: { type: GraphQLString },
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
  resolve :authMiddleware (async(parent, args, context ,info) => {
    console.log('context user', context.user);
    // Ensure user is authenticated
    if (!context.user) {
      throw new Error('User is not authenticated');
    }

    // Find the user by their email to get their _id
    const user = await User.findOne({ email: context.user.email });
    if (!user) {
      throw new Error('User not found');
    }
    // Ensure user is authenticated
    const { id, post_name, feature_img, picture_img } = args;

    try {
      // Find the post to update
      const post = await Post.findById(id);
      if (!post) {
        throw new Error('Post not found');
      }

      // Update fields
      if (post_name) {
        post.post_name = post_name;
        post.post_router = post_name.trim().toLowerCase().replace(/\s+/g, '-');
      }
      if (args.sub_description) post.sub_description = args.sub_description;
      if (args.description) post.description = args.description;
      if (args.status) post.status = args.status;
      if (args.seotitle) post.seotitle = args.seotitle;
      if (args.seometadescription) post.seometadescription = args.seometadescription;
      if (args.breadcrumbsTitle) post.breadcrumbsTitle = args.breadcrumbsTitle;
      if (args.canonicalURL) post.canonicalURL = args.canonicalURL;
      if (args.searchEngines) post.searchEngines = args.searchEngines;
      if (args.hsRadioGroup) post.hsRadioGroup = args.hsRadioGroup;
      if (args.metaRobots) post.metaRobots = args.metaRobots;

      // Handle file uploads
      if (feature_img) {
        const { createReadStream, filename } = await feature_img;
        const stream = createReadStream();
        post.feature_img = await storeUpload({ stream, filename});
      }
      if (picture_img) {
        const { createReadStream, filename } = await picture_img;
        const stream = createReadStream();
        post.picture_img = await storeUpload({ stream, filename});
      }

      post.updated_at = new Date();
      post.updated_date = new Date();

       // Save the updated post to the database
       const updatedPost = await post.save();

     // Fetch full user details for the author
     const fullUserDetails = await User.findById(user._id);
     console.log('fullUserDetails', fullUserDetails);

     // Return the updated post with full author details
     return {
       ...updatedPost._doc,
       author: fullUserDetails ? {
         _id: fullUserDetails._id.toString(),
         username: fullUserDetails.username,
         email: fullUserDetails.email,
         website: fullUserDetails.website,
         role: fullUserDetails.role
       } : null
     };
   } catch (error) {
     throw new Error(`Failed to update post: ${error.message}`);
   }
 })
};

module.exports = updatePost;
