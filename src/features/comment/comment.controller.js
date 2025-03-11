import CommentRepository from "./comment.repository.js";

export default class CommentController {
    constructor() {
        this.commentRepo = new CommentRepository();
    }

    async addComment(req, res, next) {
        try {
            const comment = req.body;
            comment.userId = req.userID;
            const newComment = await this.commentRepo.createComment(comment);
            res.status(201).send(newComment);
        } catch(err) {
            next(err);
        }
    }

    async fetchComment(req, res, next) {
        try {
            const comment = await this.commentRepo.getCommentByPostId(req.params.postId);
            if(!comment) {
                return res.status(404).send("No comments found for this post");
            }
            res.status(200).send(comment);
        } catch(err) {
            next(err);
        }
    }

    async updateComment(req, res, next) {
        try {
            const comment = await this.commentRepo.updateComment(req.params.commentId, req.body);
            if(!comment) {
                return res.status(404).send("Comment not found");
            }
            res.status(200).send(comment);
        } catch(err) {
            next(err);
        }
    }

    async removeComment(req, res, next) {
        try {
            const comment = await this.commentRepo.deleteComment(req.params.commentId);
            if(!comment) {
                return res.status(404).send("Comment not found");
            }
            res.status(204).send("Comment has been deleted successfully!");
        } catch(err) {
            next(err);
        }
    }
}