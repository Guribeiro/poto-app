import { all, takeLatest } from 'redux-saga/effects';

import { AuthenticationTypes } from './authentication/types';
import { login, logout, signup, loadStorageAuth } from './authentication/sagas';

import { PostsTypes } from './posts/types';
import { fetchPosts, addPost } from './posts/sagas';


export default function* rootSaga() {
  yield all([
    takeLatest(AuthenticationTypes.LOAD_STORAGED_AUTHENTICATION_REQUEST, loadStorageAuth),
    takeLatest(AuthenticationTypes.SIGNUP_REQUEST, signup),
    takeLatest(AuthenticationTypes.LOAD_AUTHENTICATION_REQUEST, login),
    takeLatest(AuthenticationTypes.LOGOUT_REQUEST, logout),
    takeLatest(PostsTypes.LOAD_POSTS_REQUEST, fetchPosts),
    takeLatest(PostsTypes.ADD_POSTS_REQUEST, addPost)
  ]);
}
