import { action } from 'typesafe-actions';
import { AuthenticationTypes } from '../../types';

const {
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILURE,
  LOGOUT_REQUEST_SUCCESS
} = AuthenticationTypes

export const logoutRequest = () => {
  return action(LOGOUT_REQUEST);
};

export const logoutRequestSuccess = () => {
  return action(LOGOUT_REQUEST_SUCCESS);
};

export const logoutRequestFailure = () => {
  return action(LOGOUT_REQUEST_FAILURE);
};
