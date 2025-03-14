import express from 'express';
import CommentController from './comment.controller.js';

const commentRoutes = express.Router();
const commentController = new CommentController();

commentRoutes.post('/', (req, res, next) => {
    commentController.addComment(req, res, next);
})

commentRoutes.get(':postId', (req, res, next) => {
    commentController.fetchComment(req, res, next);
})

commentRoutes.put(':commentId', (req, res, next) => {
    commentController.updateComment(req, res, next);
})

commentRoutes.delete(':commentId', (req, res, next) => {
    commentController.removeComment(req, res, next);
})


export default commentRoutes;