const {GraphQLString} = require('graphql');
const PostType = require('../../types/PostType');
const Page = require('../../../models/Post');
const { args } = require('./getPostById');
const User = require('../../../models/User');

const getPostByRouter = {
    type:PostType,
    args:{
        post_router:{type:GraphQLString}
    },
    resolve:async(parent,args)=>{
        try {
            const post = await Page.findOne({post_router:args.post_router});
            if(!post){
                throw new Error('Post not found');
            }
            let authorDetails = null;
            if(post.author){
                try {
                    authorDetails = await User.findById(post.author);
                    if(!authorDetails){
                        console.warn(`Author not found for post with router: ${args.post_router}`);
                    }
                } catch (error) {
                    console.error(`Error fetching author details: ${error.message}`);
                }
            }
            return {
                ...post._doc,
                author:authorDetails ? {
                    _id:authorDetails._id ? authorDetails._id.toString() : null,
                    username:authorDetails.username,
                    email:authorDetails.email,
                    website:authorDetails.website,
                    role:authorDetails.role
                } : null
            };
        } catch (error) {
            throw new Error(`Error fetching post by router: ${error.message}`);
        }
    }
};

module.exports = getPostByRouter;