import { createComment, deleteComment, getComments,  likeTaskComment, unlikeTaskComment, updateComment } from "./commentControllers";

export const commentController = {
    createComment,
    getComments,
    updateComment,
    deleteComment,
    likeTaskComment,
    unlikeTaskComment,
}

