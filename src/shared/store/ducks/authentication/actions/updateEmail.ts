import { action } from 'typesafe-actions';
import { AuthenticationTypes, UpdateEmailRequestPayload, User } from '../types';

const {
  UPDATE_EMAIL_REQUEST,
  UPDATE_EMAIL_REQUEST_FAILURE,
  UPDATE_EMAIL_REQUEST_SUCCESS,
} = AuthenticationTypes

export const updateEmailRequest = (data: UpdateEmailRequestPayload) => {
  return action(UPDATE_EMAIL_REQUEST, data);
};

export const updateEmailRequestSuccess = (data: User) => {
  return action(UPDATE_EMAIL_REQUEST_SUCCESS, {
    data
  });
};

export const updateEmailRequestFailure = () => {
  return action(UPDATE_EMAIL_REQUEST_FAILURE);
};
