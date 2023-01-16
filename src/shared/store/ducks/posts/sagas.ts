import { call, put } from 'redux-saga/effects'
import axios, { AxiosResponse, AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import api from '@shared/services/api'

import {
  Post,
  AddPostPayload,
  LikePostPayload,
  AddPostCommentPayload,
  RemovePostCommentPayload,
} from './types';

import { ImagePickerAsset } from 'expo-image-picker';

import {
  addPostSuccess,
  addPostFailure,
  likePostSuccess,
  likePostFailure,
  addPostCommentSuccess,
  addPostCommentFailure,
  removePostCommentFailure,
  removePostCommentSuccess
} from './actions';

interface ApiPostRequestPost {
  image: ImagePickerAsset;
  subtitle?: string;
  latitude?: number;
  longitude?: number;
}

interface ApiPostCommentRequest {
  post_id: string;
  content: string;
}

interface CreatePostAction {
  type: string;
  payload: AddPostPayload;
}

interface LikePostAction {
  type: string;
  payload: LikePostPayload
}

interface AddPostCommentAction {
  type: string;
  payload: AddPostCommentPayload
}

interface RemovePostCommentAction {
  type: string;
  payload: RemovePostCommentPayload;
}

interface ApiPostLikePostRequest {
  post_id: string;
}
interface ApiDeletePostCommentRequest {
  post_id: string,
  comment_id: string;
}


function apiPostRequestPost({ image, subtitle, latitude, longitude }: ApiPostRequestPost) {
  const form = new FormData();
  const filename = image.uri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename!!);
  const type = match ? `image/${match[1]}` : `image`;

  const latitudeAsString = String(latitude);
  const longitudeAsString = String(longitude);

  form.append('photo', { uri: image.uri, name: image.fileName, type });
  form.append('subtitle', subtitle || '');
  form.append('latitude', latitudeAsString);
  form.append('longitude', longitudeAsString);

  return api.post('/posts/me', form, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    }
  });
}

function apiPostLikePostRequest({ post_id }: ApiPostLikePostRequest) {
  return api.post(`/posts/${post_id}/likes`);
}

function apiPostCommentRequest({ post_id, content }: ApiPostCommentRequest) {
  return api.post(`/posts/${post_id}/comments`, {
    content,
  });
}

function apiDeletePostCommentRequest({ post_id, comment_id }: ApiDeletePostCommentRequest) {
  return api.delete(`/posts/${post_id}/comments/${comment_id}`);
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
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log(error.response)
      Toast.show({
        type: 'error',
        text1: `${error.response?.data?.message} 😥`,
      });
    }
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

export function* addPostComment({ payload }: AddPostCommentAction) {
  try {
    const { data }: AxiosResponse<Post> = yield call(apiPostCommentRequest, payload);

    yield put(addPostCommentSuccess(data))

  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    Toast.show({
      type: 'error',
      text1: `${err.message} 😥`,
    });
    yield put(addPostCommentFailure());
  }
}

export function* removePostComment({ payload }: RemovePostCommentAction) {
  try {

    const { data }: AxiosResponse<Post> = yield call(apiDeletePostCommentRequest, payload);

    yield put(removePostCommentSuccess(data))

  } catch (error) {
    yield put(removePostCommentFailure());
    const err = error as AxiosError<{ error: string }>;
    Toast.show({
      type: 'error',
      text1: `${err.message} 😥`,
    });
  }
}
