import { Alert } from 'react-native';
import { call, put } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import api from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Authentication,
  LoginRequestPayload,
  SignupRequestPayload,
  UpdateAvatarRequestPayload,
  User,
} from './types';

import {
  signupRequestFailure,
  loginRequestSuccess,
  loginRequestFailure,
  logoutRequestSuccess,
  logoutRequestFailure,
  loadStorageAuthenticationSuccess,
  loadStorageAuthenticationFailure,
  updateAvatarRequestSuccess,
  updateAvatarRequestFailure
} from './actions';

export const STORAGE_AUTHENTICATION_KEY = '@test:authentication';

interface ApiRequestAuthenticationProps {
  email: string;
  password: string;
}

interface ApiPostRequestSignupProps {
  name: string;
  email: string;
  password: string;
  avatar: string;
  username: string;
}

type AsyncStorageGetRequestResponse = string | null;


interface AsyncStorageGetRequestProps {
  key: string;
}

interface Action {
  type: string;
  payload: LoginRequestPayload;
}

interface UpdateAvatarAction {
  type: string;
  payload: UpdateAvatarRequestPayload
}

interface SignupAction {
  type: string;
  payload: SignupRequestPayload;
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

function apiPostRequestSignup({
  name,
  email,
  password,
  avatar,
  username
}: ApiPostRequestSignupProps) {
  const form = new FormData();

  form.append('photo', { uri: avatar, name: avatar });
  form.append('email', email);
  form.append('full_name', name);
  form.append('password', password);
  form.append('username', username);

  return api.post('/users', form, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    }
  });
}

function asyncStorageGetRequest({ key }: AsyncStorageGetRequestProps) {
  return AsyncStorage.getItem(key)
}

function apiPutRequestUpdateAvatar({ image }: UpdateAvatarRequestPayload) {
  const form = new FormData();
  form.append('photo', { uri: image, name: image });

  return api.put('/profile/avatar', form)
}


export function* signup({ payload }: SignupAction) {
  try {
    const { name, email, password, avatar, username } = payload;

    yield call(apiPostRequestSignup, {
      name,
      email,
      password,
      avatar,
      username
    });

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
    const storagedData: AsyncStorageGetRequestResponse = yield call(
      asyncStorageGetRequest,
      { key: STORAGE_AUTHENTICATION_KEY }
    );

    if (!storagedData) throw new Error('storagedAuth could not be found');

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

export function* updateAvatar({ payload }: UpdateAvatarAction) {
  try {
    const { image } = payload;

    const response: AxiosResponse<User> = yield call(apiPutRequestUpdateAvatar,
      { image }
    );

    const { data } = response;

    const storagedData: AsyncStorageGetRequestResponse = yield call(
      asyncStorageGetRequest,
      { key: STORAGE_AUTHENTICATION_KEY }
    );

    if (!storagedData) throw new Error('storagedAuth could not be found');

    const { token, refresh_token } = JSON.parse(storagedData);


    const authentication: Authentication = {
      token,
      user: data,
      refresh_token
    };

    yield AsyncStorage.setItem(
      STORAGE_AUTHENTICATION_KEY,
      JSON.stringify(authentication),
    );

    yield put(updateAvatarRequestSuccess(data));
  } catch (error) {
    yield put(updateAvatarRequestFailure());
  }
}
