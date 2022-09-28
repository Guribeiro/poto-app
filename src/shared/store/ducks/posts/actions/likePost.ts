import { action } from 'typesafe-actions';

import { PostsTypes, Post, LikePostPayload } from '../types';

const {
  LIKE_POST_REQUEST,
  LIKE_POST_REQUEST_SUCCESS,
  LIKE_POST_REQUEST_FAILURE
} = PostsTypes;


export const likePost = (payload: LikePostPayload) => {
  return action(LIKE_POST_REQUEST, payload)
}

export const likePostSuccess = (data: Post) => {
  return action(LIKE_POST_REQUEST_SUCCESS, { data })
}

export const likePostFailure = () => {
  return action(LIKE_POST_REQUEST_FAILURE)
}
