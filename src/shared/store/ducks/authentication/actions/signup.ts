import { action } from 'typesafe-actions';
import { AuthenticationTypes, SignupRequestPayload, } from '../types';

const {
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAILURE
} = AuthenticationTypes

export const signupRequest = (data: SignupRequestPayload) => {
  return action(SIGNUP_REQUEST, data);
};

export const signupRequestSuccess = () => {
  return action(SIGNUP_REQUEST_SUCCESS);
};

export const signupRequestFailure = () => {
  return action(SIGNUP_REQUEST_FAILURE);
};
