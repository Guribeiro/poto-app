import { action } from 'typesafe-actions';
import { AuthenticationTypes, Authentication } from '../types';

const {
  LOAD_STORAGED_AUTHENTICATION_REQUEST,
  LOAD_STORAGED_AUTHENTICATION_REQUEST_FAILURE,
  LOAD_STORAGED_AUTHENTICATION_REQUEST_SUCCESS
} = AuthenticationTypes


export const loadStorageAuthentication = () => {
  return action(LOAD_STORAGED_AUTHENTICATION_REQUEST)
}

export const loadStorageAuthenticationSuccess = (data: Authentication) => {
  return action(LOAD_STORAGED_AUTHENTICATION_REQUEST_SUCCESS, {
    data,
  });
}

export const loadStorageAuthenticationFailure = () => {
  return action(LOAD_STORAGED_AUTHENTICATION_REQUEST_FAILURE)
}
