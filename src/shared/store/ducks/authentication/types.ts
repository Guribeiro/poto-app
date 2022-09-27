export enum AuthenticationTypes {
  SIGNUP_REQUEST = 'SIGNUP_REQUEST',
  SIGNUP_REQUEST_SUCCESS = 'SIGNUP_REQUEST_SUCCESS',
  SIGNUP_REQUEST_FAILURE = 'SIGNUP_REQUEST_FAILURE',

  LOAD_AUTHENTICATION_REQUEST = 'LOAD_AUTHENTICATION_REQUEST',
  LOAD_AUTHENTICATION_REQUEST_SUCCESS = 'LOAD_AUTHENTICATION_REQUEST_SUCCESS',
  LOAD_AUTHENTICATION_REQUEST_FAILURE = 'LOAD_AUTHENTICATION_REQUEST_FAILURE',

  LOGOUT_REQUEST = 'LOGOUT_REQUEST',
  LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS',
  LOGOUT_REQUEST_FAILURE = 'LOGOUT_REQUEST_FAILURE',

  LOAD_STORAGED_AUTHENTICATION_REQUEST = 'LOAD_STORAGED_AUTHENTICATION_REQUEST',
  LOAD_STORAGED_AUTHENTICATION_REQUEST_SUCCESS = 'LOAD_STORAGED_AUTHENTICATION_REQUEST_SUCCESS',
  LOAD_STORAGED_AUTHENTICATION_REQUEST_FAILURE = 'LOAD_STORAGED_AUTHENTICATION_REQUEST_FAILURE',

  UPDATE_AVATAR_REQUEST = 'UPDATE_AVATAR_REQUEST',
  UPDATE_AVATAR_REQUEST_SUCCESS = 'UPDATE_AVATAR_REQUEST_SUCCESS',
  UPDATE_AVATAR_REQUEST_FAILURE = 'UPDATE_AVATAR_REQUEST_FAILURE',
}

export interface SignupRequestPayload {
  name: string;
  email: string;
  password: string;
  avatar: string;
  username: string;
}

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface UpdateAvatarRequestPayload {
  image: string;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  avatar?: string;
  username: string;
}

export interface Authentication {
  user: User;
  token: string;
  refresh_token: string;
}

export interface AuthenticationAction {
  type: keyof typeof AuthenticationTypes;
  payload: {
    data: any;
  };
}

export interface AuthenticationState {
  readonly data: Authentication;
  readonly loading: boolean;
  readonly error: boolean;
}
