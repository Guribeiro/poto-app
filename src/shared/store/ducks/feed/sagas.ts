import { call, put } from 'redux-saga/effects'
import axios, { AxiosResponse, AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import api from '@shared/services/api'

import { Post, LoadFeedPayload } from './types';

import {
  loadFeedFailure,
  loadFeedSuccess,
  refreshFeedFailure,
  refreshFeedSuccess
} from './actions';
import { AxiosErrorResponse, ErrorResponse } from '../rootSagas';

interface LoadFeedAction {
  type: string;
  payload: LoadFeedPayload;
}

interface ApiLoadFeedRequest {
  page: number;
  latitude?: number;
  longitude?: number;
}


function apiGetRequestPosts({ page, latitude, longitude }: ApiLoadFeedRequest) {
  return api.get('/feed', {
    params: {
      page,
      latitude,
      longitude
    }
  });
}

function apiGetRequestRefreshFeed({ page, latitude, longitude }: ApiLoadFeedRequest) {
  return api.get('/feed', {
    params: {
      page,
      latitude,
      longitude
    }
  });
}

export function* loadFeedCall({ payload }: LoadFeedAction) {
  try {
    const { data }: AxiosResponse<Post[]> = yield call(apiGetRequestPosts, payload);
    yield put(loadFeedSuccess(data));

  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const { message } = error.response?.data as AxiosErrorResponse;
      Toast.show({
        type: 'error',
        text1: `${message} 😥`,
      });
    } else {
      const { message } = error as ErrorResponse;
      Toast.show({
        type: 'error',
        text1: `${message} 😥`,
      });
    }
    yield put(loadFeedFailure());
  }
}
export function* refreshFeedCall({ payload }: LoadFeedAction) {
  try {
    const { data }: AxiosResponse<Post[]> = yield call(apiGetRequestRefreshFeed, payload);

    yield put(refreshFeedSuccess(data));

  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const { message } = error.response?.data as AxiosErrorResponse;
      Toast.show({
        type: 'error',
        text1: `${message} 😥`,
      });
    } else {
      const { message } = error as ErrorResponse;
      Toast.show({
        type: 'error',
        text1: `${message} 😥`,
      });
    }
    yield put(refreshFeedFailure());
  }
}
