import { call, put } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import api from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginRequestPayload,
  Authentication,
  SignupRequestPayload,
} from './types';

import {
  signupRequestFailure,
  loginRequestSuccess,
  loginRequestFailure,
  logoutRequestSuccess,
  logoutRequestFailure,
  loadStorageAuthenticationSuccess,
  loadStorageAuthenticationFailure,
} from './actions';
import { Alert } from 'react-native';

export const STORAGE_AUTHENTICATION_KEY = '@test:authentication';

interface ApiRequestAuthenticationProps {
  email: string;
  password: string;
}

function apiRequestAuthentication({
  email,
  password,
}: ApiRequestAuthenticationProps) {
  return api.post(`/sessions`, {
    email,
    password,
  });
}

interface ApiPostRequestSignupProps {
  name: string;
  email: string;
  password: string;
}

function apiPostRequestSignup({
  name,
  email,
  password,
}: ApiPostRequestSignupProps) {
  return api.post('/users', {
    full_name: name,
    email,
    password,
  });
}

interface AsyncStorageGetRequestProps {
  key: string;
}

type AsyncStorageGetRequestResponse = string | null;

function asyncStorageGetRequest({ key }: AsyncStorageGetRequestProps) {
  return AsyncStorage.getItem(key)
}

interface Action {
  type: string;
  payload: LoginRequestPayload;
}

interface SignupAction {
  type: string;
  payload: SignupRequestPayload;
}

export function* signup({ payload }: SignupAction) {
  try {
    const { name, email, password } = payload;

    yield call(apiPostRequestSignup, { name, email, password });

    const response: AxiosResponse<Authentication> = yield call(
      apiRequestAuthentication,
      { email, password },
    );

    const { user, token, refresh_token } = response.data;

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    yield AsyncStorage.setItem(
      STORAGE_AUTHENTICATION_KEY,
      JSON.stringify({ token, user }),
    );

    yield put(
      loginRequestSuccess({
        user,
        token,
        refresh_token
      }),
    );

  } catch (error) {

    const axiosError = error as AxiosError<{ error: string }>;

    Alert.alert(axiosError.message);

    yield put(signupRequestFailure());
  }
}

export function* login({ payload }: Action) {
  try {
    const { email, password } = payload;

    const response: AxiosResponse<Authentication> = yield call(
      apiRequestAuthentication,
      { email, password },
    );

    const { user, token, refresh_token } = response.data;

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    yield AsyncStorage.setItem(
      STORAGE_AUTHENTICATION_KEY,
      JSON.stringify({ token, user, refresh_token }),
    );

    yield put(
      loginRequestSuccess({
        user,
        token,
        refresh_token
      }),
    );
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    Alert.alert(axiosError.message);
    yield put(loginRequestFailure());

  }
}

export function* logout() {
  try {
    yield AsyncStorage.removeItem(STORAGE_AUTHENTICATION_KEY);

    delete api.defaults.headers.common['Authorization']

    yield put(logoutRequestSuccess());

  } catch (error) {
    yield put(logoutRequestFailure());
    const axiosError = error as AxiosError<{ error: string }>;
    yield put(loginRequestFailure());

  }
}

export function* loadStorageAuth() {
  try {
    const storagedData: AsyncStorageGetRequestResponse = yield call(asyncStorageGetRequest, { key: STORAGE_AUTHENTICATION_KEY });

    if (!storagedData) return;

    const { token, user, refresh_token } = JSON.parse(storagedData);

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const data: Authentication = {
      token,
      user,
      refresh_token
    };

    yield put(loadStorageAuthenticationSuccess(data));
  } catch (error) {
    console.log('error', error)
    yield put(loadStorageAuthenticationFailure());
  }
}
