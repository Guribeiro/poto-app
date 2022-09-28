import { action } from 'typesafe-actions';

import { PostsTypes, Post, AddPostCommentPayload } from '../types';

const {
  ADD_POST_COMMENT_REQUEST,
  ADD_POST_COMMENT_REQUEST_FAILURE,
  ADD_POST_COMMENT_REQUEST_SUCCESS,
} = PostsTypes;


export const addPostComment = (payload: AddPostCommentPayload) => {
  return action(ADD_POST_COMMENT_REQUEST, payload);
}

export const addPostCommentSuccess = (data: Post) => {
  return action(ADD_POST_COMMENT_REQUEST_SUCCESS, { data });
}

export const addPostCommentFailure = () => {
  return action(ADD_POST_COMMENT_REQUEST_FAILURE);
}
