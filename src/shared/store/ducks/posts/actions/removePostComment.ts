import { action } from 'typesafe-actions';

import { Comment, Post, PostsTypes, RemovePostCommentPayload } from '../types';

const {
  REMOVE_POST_COMMENT_REQUEST,
  REMOVE_POST_COMMENT_REQUEST_FAILURE,
  REMOVE_POST_COMMENT_REQUEST_SUCCESS,
} = PostsTypes;


export const removePostComment = (payload: RemovePostCommentPayload) => {
  return action(REMOVE_POST_COMMENT_REQUEST, payload);
}

export const removePostCommentSuccess = (data: Post) => {
  return action(REMOVE_POST_COMMENT_REQUEST_SUCCESS, { data });
}

export const removePostCommentFailure = () => {
  return action(REMOVE_POST_COMMENT_REQUEST_FAILURE);
}
