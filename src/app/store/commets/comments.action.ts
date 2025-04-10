import { createAction, props } from "@ngrx/store";
import { Comment } from "../../models/comment";

export const loadComments = createAction('loadComments', props<{ page: number, idPost: number }>());

export const findAllComments = createAction('findAllComments', props<{ comments: Comment[] }>());

export const addComment = createAction('addComment', props<{ commentNew: Comment }>());
export const addCommentSuccess = createAction('addCommentSuccess', props<{ commentNew: Comment }>());
export const findAllCommentsPageable = createAction('findAllCommentsPageable', props<{ comments: Comment[]; paginator: any, postId: number }>());

export const setErrorsComment = createAction('setErrorsComment',props<{ commentForm: Comment; errors: any }>());
