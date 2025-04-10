import { createAction, props } from "@ngrx/store";
import { Post } from "../../models/post";

export const loadPosts = createAction('loadPosts', props<{ page: number }>());

export const findAllPosts = createAction('findAllPosts', props<{ posts: Post[] }>());

export const addPost = createAction('addPost', props<{ postNew: Post }>());
export const addPostSuccess = createAction('addSuccessPost', props<{ postNew: Post }>());
export const findAllPostsPageable = createAction('findAllPostsPageable', props<{ posts: Post[]; paginator: any }>());

export const setErrorsPost = createAction('setErrorsPost',props<{ postForm: Post; errors: any }>());
