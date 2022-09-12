import { call, put } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
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
} from './actions';

export const STORAGE_AUTHENTICATION_KEY = '@test:authentication';

interface ApiRequestAuthenticationProps {
  email: string;
  password: string;
}

function apiRequestAuthentication({
  email,
  password,
}: ApiRequestAuthenticationProps) {
  return api.post(`/users`, {
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

    const { token, user } = response.data;

    yield AsyncStorage.setItem(
      STORAGE_AUTHENTICATION_KEY,
      JSON.stringify({ token, user }),
    );

    yield put(
      loginRequestSuccess({
        token,
        user,
      }),
    );

  } catch (error) {

    const axiosError = error as AxiosError<{ error: string }>;

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

    const { token, user } = response.data;

    yield AsyncStorage.setItem(
      STORAGE_AUTHENTICATION_KEY,
      JSON.stringify({ token, user }),
    );

    yield put(
      loginRequestSuccess({
        token,
        user,
      }),
    );
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    yield put(loginRequestFailure());

  }
}

export function* logout() {
  try {
    yield AsyncStorage.removeItem(STORAGE_AUTHENTICATION_KEY);

    yield put(logoutRequestSuccess());

  } catch (error) {
    yield put(logoutRequestFailure());
    const axiosError = error as AxiosError<{ error: string }>;
    yield put(loginRequestFailure());

  }
}
