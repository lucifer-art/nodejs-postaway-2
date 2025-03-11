import { ApplicationError } from '../../error-handler/application-error.js';
import Post from './post.schema.js';

export default class PostRepository {
    
    async createPost(postData) {
        try{
            const post = await Post.create(postData);
            return post;
        } catch(err) {
            console.log("Error creating post", err);
            throw new ApplicationError("createPost - Something went wrong with the database");
        }
    }

    async getAllPosts() {
        try{
            const posts = await Post.find().populate('userId', 'name avatar').sort({ createdAt: -1});
            return posts;
        } catch(err) {
            console.log("Error creating post", err);
            throw new ApplicationError("All Post - Something went wrong with the database");
        }
    }

    async getPostById(id) {
        try{
            const post = await Post.findById(id).populate('userId', 'name avatar');
            return post;
        } catch(err) {
            console.log("Error creating post", err);
            throw new ApplicationError("Get Post By Id - Something went wrong with the database");
        }
    }

    async updatePost(id, updatedData) {
        try{
            const post = await Post.findByIdAndUpdate(id, updatedData, {new: true});
            return post;
        } catch(err) {
            console.log("Error creating post", err);
            throw new ApplicationError("Update Post - Something went wrong with the database");
        }
    }

    async deletePost(id) {
        try{
            const post = await Post.findByIdAndDelete(id);
            return post;
        } catch(err) {
            console.log("Error creating post", err);
            throw new ApplicationError("Delete Post - Something went wrong with the database");
        }
    }
}