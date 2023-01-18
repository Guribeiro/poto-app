import { call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';

import { verifyErrorInstance } from '@shared/utils/errors';
import api from '../../../services/api';
import {
  Authentication,
  LoginRequestPayload,
  SignupRequestPayload,
  UpdateAvatarRequestPayload,
  UpdateNameRequestPayload,
  UpdateEmailRequestPayload,
  UpdateUsernameRequestPayload,
  User,
} from './types';

import { AxiosErrorResponse, ErrorResponse } from '@shared/store/ducks/rootSagas'

import {
  signupRequestFailure,
  loginRequestSuccess,
  loginRequestFailure,
  logoutRequestSuccess,
  logoutRequestFailure,
  loadStorageAuthenticationSuccess,
  loadStorageAuthenticationFailure,
  updateAvatarRequestSuccess,
  updateAvatarRequestFailure,
  updateNameRequestSuccess,
  updateNameRequestFailure,
  updateEmailRequestSuccess,
  updateEmailRequestFailure,
  updateUsernameRequestSuccess,
  updateUsernameRequestFailure
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

interface UpdateNameAction {
  type: string;
  payload: UpdateNameRequestPayload
}

interface UpdateEmailAction {
  type: string;
  payload: UpdateEmailRequestPayload
}

interface UpdateUsernameAction {
  type: string;
  payload: UpdateUsernameRequestPayload
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

function apiPutRequestUpdateName({ name }: UpdateNameRequestPayload) {
  return api.put('/profile/name', {
    name
  })
}

function apiPutRequestUpdateEmail({ email }: UpdateEmailRequestPayload) {
  return api.put('/profile/email', {
    email
  })
}

function apiPutRequestUpdateUsername({ username }: UpdateUsernameRequestPayload) {
  return api.put('/profile/username', {
    username
  })
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

    yield put(signupRequestFailure())
    yield put(loginRequestFailure())
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

    yield put(loginRequestFailure());
  }
}

export function* logout() {
  try {
    yield AsyncStorage.removeItem(STORAGE_AUTHENTICATION_KEY);

    delete api.defaults.headers.common['Authorization']

    yield put(logoutRequestSuccess());
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

    yield put(logoutRequestFailure());
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

    Toast.show({
      type: 'success',
      text1: 'Seu avatar foi atualizado com sucesso',
      position: 'bottom',
    });

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

    yield put(updateAvatarRequestFailure());
  }
}

export function* updateName({ payload }: UpdateNameAction) {
  try {
    const response: AxiosResponse<User> = yield call(apiPutRequestUpdateName, payload);

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

    yield put(updateNameRequestSuccess(data));

    Toast.show({
      type: 'success',
      text1: 'Seu nome foi atualizado com sucesso',
      position: 'bottom',
    });

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

    yield put(updateNameRequestFailure());
  }
}

export function* updateEmail({ payload }: UpdateEmailAction) {
  try {
    const response: AxiosResponse<User> = yield call(apiPutRequestUpdateEmail, payload);

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

    yield put(updateEmailRequestSuccess(data));

    Toast.show({
      type: 'success',
      text1: 'Seu email foi atualizado com sucesso',
      position: 'bottom',
    });

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

    yield put(updateEmailRequestFailure());
  }
}

export function* updateUsername({ payload }: UpdateUsernameAction) {
  try {
    const response: AxiosResponse<User> = yield call(apiPutRequestUpdateUsername, payload);

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

    yield put(updateUsernameRequestSuccess(data));

    Toast.show({
      type: 'success',
      text1: 'Seu username foi atualizado com sucesso',
      position: 'bottom',
    });

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

    yield put(updateUsernameRequestFailure());
  }
}
