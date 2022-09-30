import { all, takeLatest } from 'redux-saga/effects';
import { AuthenticationTypes } from './authentication/types';

import {
  login,
  logout,
  signup,
  loadStorageAuth,
  updateAvatar,
} from './authentication/sagas';

import { PostsTypes } from './posts/types';

import {
  fetchPosts,
  addPost,
  likePost,
  addPostComment,
  removePostComment
} from './posts/sagas';

const {
  LOAD_STORAGED_AUTHENTICATION_REQUEST,
  LOAD_AUTHENTICATION_REQUEST,
  UPDATE_AVATAR_REQUEST,
  SIGNUP_REQUEST,
  LOGOUT_REQUEST,
} = AuthenticationTypes;

const {
  LOAD_POSTS_REQUEST,
  ADD_POSTS_REQUEST,
  LIKE_POST_REQUEST,
  ADD_POST_COMMENT_REQUEST,
  REMOVE_POST_COMMENT_REQUEST
} = PostsTypes;

export default function* rootSaga() {
  yield all([
    takeLatest(LOGOUT_REQUEST, logout),
    takeLatest(SIGNUP_REQUEST, signup),
    takeLatest(LOAD_AUTHENTICATION_REQUEST, login),
    takeLatest(UPDATE_AVATAR_REQUEST, updateAvatar),
    takeLatest(LOAD_STORAGED_AUTHENTICATION_REQUEST, loadStorageAuth),
    takeLatest(ADD_POSTS_REQUEST, addPost),
    takeLatest(LOAD_POSTS_REQUEST, fetchPosts),
    takeLatest(LIKE_POST_REQUEST, likePost),
    takeLatest(ADD_POST_COMMENT_REQUEST, addPostComment),
    takeLatest(REMOVE_POST_COMMENT_REQUEST, removePostComment),
  ]);
}
