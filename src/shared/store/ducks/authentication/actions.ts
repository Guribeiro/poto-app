import { action } from 'typesafe-actions';
import {
  AuthenticationTypes,
  Authentication,
  LoginRequestPayload,
  SignupRequestPayload,
} from './types';

const {
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAILURE,
  LOAD_AUTHENTICATION_REQUEST,
  LOAD_AUTHENTICATION_REQUEST_SUCCESS,
  LOAD_AUTHENTICATION_REQUEST_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUEST_FAILURE,
} = AuthenticationTypes;

export const signupRequest = (data: SignupRequestPayload) => {
  return action(SIGNUP_REQUEST, data);
};

export const signupRequestSuccess = () => {
  return action(SIGNUP_REQUEST_SUCCESS);
};

export const signupRequestFailure = () => {
  return action(SIGNUP_REQUEST_FAILURE);
};

export const loginRequest = (data: LoginRequestPayload) => {
  return action(LOAD_AUTHENTICATION_REQUEST, data);
};

export const loginRequestSuccess = (data: Authentication) => {
  return action(LOAD_AUTHENTICATION_REQUEST_SUCCESS, {
    data,
  });
};

export const loginRequestFailure = () => {
  return action(LOAD_AUTHENTICATION_REQUEST_FAILURE);
};

export const logoutRequest = () => {
  return action(LOGOUT_REQUEST);
};

export const logoutRequestSuccess = () => {
  return action(LOGOUT_REQUEST_SUCCESS);
};

export const logoutRequestFailure = () => {
  return action(LOGOUT_REQUEST_FAILURE);
};
