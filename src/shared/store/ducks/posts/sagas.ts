import { call, put } from 'redux-saga/effects'
import { Alert } from 'react-native';
import { AxiosResponse, AxiosError } from 'axios';
import api from '@shared/services/api'
import { Post, AddPostPayload } from './types';

import { ImageInfo } from 'expo-image-picker';

import { loadPostsFailure, loadPostsSuccess, addPostSuccess, addPostFailure } from './actions';

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

export function* fetchPosts() {
  try {
    const { data }: AxiosResponse<Post[]> = yield call(apiGetRequestPosts);

    yield put(loadPostsSuccess(data));

  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    Alert.alert(err.message);
    yield put(loadPostsFailure());
  }
}

export function* addPost({ payload }: CreatePostAction) {
  try {
    const { data }: AxiosResponse<Post> = yield call(apiPostRequestPost, payload);

    yield put(addPostSuccess(data));
  } catch (error) {
    console.log({error});
    yield put(addPostFailure());
  }
}
