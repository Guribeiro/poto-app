import { call, put } from 'redux-saga/effects'
import { AxiosResponse, AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import api from '@shared/services/api'

import { Post } from './types';

import { loadFeedFailure, loadFeedSuccess } from './actions';


function apiGetRequestPosts() {
  return api.get('/feed/posts');
}

export function* loadFeedCall() {
  try {
    const { data }: AxiosResponse<Post[]> = yield call(apiGetRequestPosts);

    yield put(loadFeedSuccess(data));

  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    Toast.show({
      type: 'error',
      text1: `${err.message} 😥`,
    });
    yield put(loadFeedFailure());
  }
}
