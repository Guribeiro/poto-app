import { action } from 'typesafe-actions';

import { PostsTypes, Post } from '../types';

const {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_REQUEST_SUCCESS,
  LOAD_POSTS_REQUEST_FAILURE,
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
