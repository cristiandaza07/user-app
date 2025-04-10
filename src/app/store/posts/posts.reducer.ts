import { createReducer, on } from "@ngrx/store";
import { Post } from "../../models/post";
import { addPostSuccess, findAllPosts, findAllPostsPageable, loadPosts } from "./posts.action";

const posts: Post[] = [];
const post: Post = new Post();

export const postsReducer = createReducer(
  {
    posts,
    paginator: {},
    post,
    errors: {},
  },
  on(loadPosts, (state) => {
    return {
        posts: state.posts,
        paginator: state.paginator,
        post: state.post,
        errors: state.errors,
    };
  }),
  on(findAllPosts, (state, { posts }) => {
    return {
        posts: [...posts],
        paginator: state.paginator,
        post: state.post,
        errors: state.errors,
    };
  }),
  on(findAllPostsPageable, (state, { posts, paginator }) => {
    return {
      posts: [...state.posts, ...posts],
      paginator: { ...paginator },
      post: state.post,
      errors: state.errors,
    };
  }),
  on(addPostSuccess, (state, { postNew }) => {
    return {
        posts: [...posts],
        paginator: state.paginator,
        post: { ...postNew },
        errors: state.errors,
    };
  })
);