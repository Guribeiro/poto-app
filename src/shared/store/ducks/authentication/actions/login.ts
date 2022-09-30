import { action } from 'typesafe-actions';
import { AuthenticationTypes, LoginRequestPayload, Authentication } from '../types';

const {
  LOAD_AUTHENTICATION_REQUEST,
  LOAD_AUTHENTICATION_REQUEST_SUCCESS,
  LOAD_AUTHENTICATION_REQUEST_FAILURE
} = AuthenticationTypes

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
