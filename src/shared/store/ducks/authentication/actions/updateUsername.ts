import { action } from 'typesafe-actions';
import { AuthenticationTypes, UpdateUsernameRequestPayload, User } from '../types';

const {
  UPDATE_USERNAME_REQUEST,
  UPDATE_USERNAME_REQUEST_FAILURE,
  UPDATE_USERNAME_REQUEST_SUCCESS,
} = AuthenticationTypes

export const updateUsernameRequest = (data: UpdateUsernameRequestPayload) => {
  return action(UPDATE_USERNAME_REQUEST, data);
};

export const updateUsernameRequestSuccess = (data: User) => {
  return action(UPDATE_USERNAME_REQUEST_SUCCESS, {
    data
  });
};

export const updateUsernameRequestFailure = () => {
  return action(UPDATE_USERNAME_REQUEST_FAILURE);
};
