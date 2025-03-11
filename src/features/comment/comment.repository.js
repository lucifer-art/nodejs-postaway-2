import { ApplicationError } from "../../error-handler/application-error.js";
import Comment from "./comment.schema.js";

export default class CommentRepository {
    async createComment(comment) {
        try {
            const comment = await Comment.create(comment);
            return comment;
        } catch(err) {
            console.log("Error creating comment", err);
            throw new ApplicationError("createComment - Something went wrong with the database");
        }
    }

    async getCommentByPostId(postId) {
        try {
            return await Comment.find({postId}).populate('userId', 'name avatar');
        } catch(err) {
            console.log("Error getting comments by post id", err);
            throw new ApplicationError("getCommentByPostId - Something went wrong with the database");
        }
    }

    async updateComment(commentid, updatedData) {
        try {
            return await Comment.findByIdAndUpdate(commentid, updatedData, {new: true}).populate('userId', 'name avatar');
        } catch(err) {
            console.log("Error updating comment", err);
            throw new ApplicationError("updateComment - Something went wrong with the database");
        }
    }

    async deleteComment(commentId) {
        try {
            return await Comment.findByIdAndDelete(commentId);
        } catch(err) {
            console.log("Error deleting comment", err);
            throw new ApplicationError("deleteComment - Something went wrong with the database");
        }
    }
}