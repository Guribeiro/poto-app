import { action } from 'typesafe-actions';

import { PostsTypes, Post, AddPostPayload } from './types';

const {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_REQUEST_SUCCESS,
  LOAD_POSTS_REQUEST_FAILURE,
  ADD_POSTS_REQUEST,
  ADD_POSTS_REQUEST_SUCCESS,
  ADD_POSTS_REQUEST_FAILURE,
 } = PostsTypes;

export const loadPosts = () => {
  return action(LOAD_POSTS_REQUEST);
}

export const loadPostsSuccess = (data: Post[]) => {
  return action(LOAD_POSTS_REQUEST_SUCCESS, { data });
}

export const loadPostsFailure = () => {
  return action(LOAD_POSTS_REQUEST_FAILURE);
}

export const addPost = (payload: AddPostPayload) => {
  return action(ADD_POSTS_REQUEST, payload);
}

export const addPostSuccess = (data: Post) => {
  return action(ADD_POSTS_REQUEST_SUCCESS, { data });
}

export const addPostFailure = () => {
  return action(ADD_POSTS_REQUEST_FAILURE);
}
