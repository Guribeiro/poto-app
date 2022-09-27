import { call, put } from 'redux-saga/effects'
import { AxiosResponse, AxiosError, Axios } from 'axios';
import Toast from 'react-native-toast-message';

import api from '@shared/services/api'
import { Post, AddPostPayload, LikePostPayload } from './types';

import { ImageInfo } from 'expo-image-picker';

import {
    loadPostsFailure,
    loadPostsSuccess,
    addPostSuccess,
    addPostFailure,
    likePostSuccess,
    likePostFailure,
  } from './actions';

function apiGetRequestPosts() {
  return api.get('/posts');
}

interface ApiPostRequestPost {
  image: ImageInfo;
  subtitle?: string;
}

interface CreatePostAction {
  type: string;
  payload: AddPostPayload;
}

interface LikePostAction {
  type: string;
  payload: LikePostPayload
}

interface ApiPostLikePostRequest {
  post_id: string;
}

function apiPostRequestPost({ image, subtitle }: ApiPostRequestPost) {

  const form = new FormData();

  const filename = image.uri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename!!);
  const type = match ? `image/${match[1]}` : `image`;

  form.append('photo', { uri: image.uri, name: image.fileName, type });
  form.append('subtitle', subtitle || '');

  return api.post('posts/me', form, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    }
  });
}

function apiPostLikePostRequest({ post_id }: ApiPostLikePostRequest) {
  return api.post(`/likes/posts/${post_id}`);
}

export function* fetchPosts() {
  try {
    const { data }: AxiosResponse<Post[]> = yield call(apiGetRequestPosts);

    yield put(loadPostsSuccess(data));

  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    Toast.show({
      type: 'error',
      text1: `${err.message} 😥`,
    });
    yield put(loadPostsFailure());
  }
}

export function* addPost({ payload }: CreatePostAction) {
  try {
    const { data }: AxiosResponse<Post> = yield call(apiPostRequestPost, payload);

    yield put(addPostSuccess(data));

    Toast.show({
      type: 'success',
      text1: 'Seu post foi publicado com sucesso!',
      position: 'bottom',
    });

  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    Toast.show({
      type: 'error',
      text1: `${err.message} 😥`,
    });
    yield put(addPostFailure());
  }
}

export function* likePost({ payload }: LikePostAction) {
  try {
    const { data }: AxiosResponse<Post> = yield call(apiPostLikePostRequest, payload);

    yield put(likePostSuccess(data));

  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    Toast.show({
      type: 'error',
      text1: `${err.message} 😥`,
    });
    yield put(likePostFailure());
  }
}
