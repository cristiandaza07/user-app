import { createReducer, on } from "@ngrx/store";
import { Comment } from "../../models/comment";
import { addCommentSuccess, findAllComments, findAllCommentsPageable, loadComments } from "./comments.action";

interface CommentsState {
  commentsByPost: { [postId: number]: Comment[] };
  paginatorByPost: { [postId: number]: any };
  comment: Comment;
  errors: any;
}

const initialState: CommentsState = {
  commentsByPost: {},
  paginatorByPost: {}, 
  comment: new Comment(),
  errors: {},
};

export const commentsReducer = createReducer(
  initialState,
  on(findAllCommentsPageable, (state, { comments, paginator, postId }) => {
    return {
      ...state,
      commentsByPost: { ...state.commentsByPost, [postId]: [...comments] },
      paginatorByPost: { ...state.paginatorByPost, [postId]: { ...paginator } }
    };
  }),
  on(addCommentSuccess, (state, { commentNew }) => {
    const postId = commentNew.post.id;
    const currentComments = state.commentsByPost[postId] || [];
    return {
      ...state,
      commentsByPost: { ...state.commentsByPost, [postId]: [...currentComments, commentNew] },
      comment: { ...commentNew }
    };
  })
  // on(loadComments, (state) => {
  //   return {
  //     comments: state.comments,
  //     paginator: state.paginator,
  //     comment: state.comment,
  //     errors: state.errors,
  //   };
  // }),
  // on(findAllComments, (state, { comments }) => {
  //   return {
  //     comments: [...comments],
  //     paginator: state.paginator,
  //     comment: state.comment,
  //     errors: state.errors,
  //   };
  // }),
  // on(findAllCommentsPageable, (state, { comments, paginator }) => {
  //   return {
  //     comments: [...comments],
  //     paginator: { ...paginator },
  //     comment: state.comment,
  //     errors: state.errors,
  //   };
  // }),
  // on(addCommentSuccess, (state, { commentNew }) => {
  //   return {
  //     comments: [...comments],
  //     paginator: state.paginator,
  //     comment: { ...commentNew },
  //     errors: state.errors,
  //   };
  // })
);