import { action } from 'typesafe-actions';

import { PostsTypes, Post, AddPostPayload, LikePostPayload } from './types';

const {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_REQUEST_SUCCESS,
  LOAD_POSTS_REQUEST_FAILURE,

  ADD_POSTS_REQUEST,
  ADD_POSTS_REQUEST_SUCCESS,
  ADD_POSTS_REQUEST_FAILURE,

  LIKE_POST_REQUEST,
  LIKE_POST_REQUEST_SUCCESS,
  LIKE_POST_REQUEST_FAILURE
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

export const likePost = (payload: LikePostPayload) => {
  return action(LIKE_POST_REQUEST, payload)
}

export const likePostSuccess = (data: Post) => {
  return action(LIKE_POST_REQUEST_SUCCESS, { data })
}

export const likePostFailure = () => {
  return action(LIKE_POST_REQUEST_FAILURE)
}
