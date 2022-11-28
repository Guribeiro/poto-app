import { action } from 'typesafe-actions';

import { FeedTypes, Post, AddPostPayload, LoadFeedPayload } from './types';

const {
  LOAD_FEED_REQUEST,
  LOAD_FEED_REQUEST_SUCCESS,
  LOAD_FEED_REQUEST_FAILURE,

  REFRESH_FEED_REQUEST,
  REFRESH_FEED_REQUEST_SUCCESS,
  REFRESH_FEED_REQUEST_FAILURE,

  ADD_POSTS_REQUEST,
  ADD_POSTS_REQUEST_SUCCESS,
  ADD_POSTS_REQUEST_FAILURE
} = FeedTypes;


export const loadFeed = (payload: LoadFeedPayload) => {
  return action(LOAD_FEED_REQUEST, payload);
}

export const loadFeedSuccess = (data: Post[]) => {
  return action(LOAD_FEED_REQUEST_SUCCESS, { data });
}

export const loadFeedFailure = () => {
  return action(LOAD_FEED_REQUEST_FAILURE);
}

export const refreshFeed = (payload: LoadFeedPayload) => {
  return action(REFRESH_FEED_REQUEST, payload);
}

export const refreshFeedSuccess = (data: Post[]) => {
  return action(REFRESH_FEED_REQUEST_SUCCESS, { data });
}

export const refreshFeedFailure = () => {
  return action(REFRESH_FEED_REQUEST_FAILURE);
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
