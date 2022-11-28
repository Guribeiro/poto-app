import { call, put } from 'redux-saga/effects'
import { AxiosResponse, AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import api from '@shared/services/api'

import { Post, LoadFeedPayload } from './types';

import { loadFeedFailure, loadFeedSuccess, refreshFeedFailure, refreshFeedSuccess } from './actions';

interface LoadFeedAction {
  type: string;
  payload: LoadFeedPayload;
}

interface ApiLoadFeedRequest {
  page: number;
}


function apiGetRequestPosts({ page }: ApiLoadFeedRequest) {

  return api.get('/feed/posts', {
    params: {
      page
    }
  });
}

function apiGetRequestRefreshFeed({ page }: ApiLoadFeedRequest) {

  return api.get('/feed/posts', {
    params: {
      page
    }
  });
}

export function* loadFeedCall({ payload }: LoadFeedAction) {
  try {
    const { data }: AxiosResponse<Post[]> = yield call(apiGetRequestPosts, payload);

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
export function* refreshFeedCall({ payload }: LoadFeedAction) {
  try {
    const { data }: AxiosResponse<Post[]> = yield call(apiGetRequestRefreshFeed, payload);

    yield put(refreshFeedSuccess(data));

  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    Toast.show({
      type: 'error',
      text1: `${err.message} 😥`,
    });
    yield put(refreshFeedFailure());
  }
}
