import { action } from 'typesafe-actions';

import { PostsTypes, Post, AddPostPayload } from '../types';

const {
  ADD_POSTS_REQUEST,
  ADD_POSTS_REQUEST_SUCCESS,
  ADD_POSTS_REQUEST_FAILURE,
} = PostsTypes;


export const addPost = (payload: AddPostPayload) => {
  return action(ADD_POSTS_REQUEST, payload);
}

export const addPostSuccess = (data: Post) => {
  return action(ADD_POSTS_REQUEST_SUCCESS, { data });
}

export const addPostFailure = () => {
  return action(ADD_POSTS_REQUEST_FAILURE);
}
