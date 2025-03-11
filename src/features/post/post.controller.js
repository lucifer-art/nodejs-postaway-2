import PostRepository from "./post.repository.js";

export default class PostController {
    constructor() {
        this.postRepo = new PostRepository();
    }

    async addPost(req, res, next) {
        try {
            const postData = req.body;
            if(req.file) {
                postData.image = '/uploads/' + req.file.filename;
            }
            postData.userId = req.userID;
            const post = await this.postRepo.createPost(postData);
            res.status(201).send(post);
        } catch(err) {
            next(err);
        }
    }

    async updatePost(req, res, next) {
        try {
            let updatedData = req.body;
            if(req.file) {
                updatedData.image = '/uploads/' + req.file.filename;
            }
            const post = await this.postRepo.updatePost(req.params.postId, updatedData);
            if(!post) {
                return res.status(404).send("Post not found");
            }
            res.status(200).send(post);
        } catch(err) {
            next(err);
        }
    }

    async deletePost(req, res, next) {
        try {
            await this.postRepo.deletePost(req.params.postId);
            res.status(200).send("Post deleted successfully");
        } catch(err) {
            next(err);
        }
    }

    async fetchPostById(req, res, next) {
        try {
            const post = await this.postRepo.getPostById(req.params.postId);
            if(!post) {
                return res.status(404).send("Post not found");
            }
            res.status(200).send(post);
        } catch(err) {
            next(err);
        }
    }

    async fetchAllPosts(req, res, next) {
        try {
            const posts = await this.postRepo.getAllPosts();
            if(!posts) {
                return res.status(404).send("No posts found");
            }
            res.status(200).send(posts);
        } catch(err) {
            next(err);
        }
    }
}