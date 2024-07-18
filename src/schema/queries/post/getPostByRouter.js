const {GraphQLString} = require('graphql');
const PostType = require('../../types/PostType');
const Page = require('../../../models/Post');
const { args } = require('./getPostById');
const { resolve } = require('../../mutations/post/updatePost');

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
            return post;
        } catch (error) {
            throw new Error(`Error fetching post by router: ${error.message}`);
        }
    }
};

module.exports = getPostByRouter;