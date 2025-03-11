import express from 'express';
import { upload } from '../../middlewares/fileUpload.middleware.js';
import PostController from './post.controller.js';

const postRoutes = express.Router();
const postController = new PostController();

postRoutes.post('/', upload.single('image'), (req, res, next) => {
    postController.addPost(req, res, next);
})

postRoutes.put('/:postId', upload.single('image'), (req, res, next) =>{
    postController.updatePost(req, res, next);
})

postRoutes.delete('/:postId', (req, res, next) => {
    postController.deletePost(req, res, next);
})

postRoutes.get('/', (req, res, next) => {
    postController.fetchAllPosts(req, res, next);
})

postRoutes.get('/:postId', (req, res, next) => {
    postController.fetchPostById(req, res, next);
})

export default postRoutes;