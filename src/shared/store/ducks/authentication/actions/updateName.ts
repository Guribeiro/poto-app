import { action } from 'typesafe-actions';
import { AuthenticationTypes, UpdateNameRequestPayload, User } from '../types';

const {
  UPDATE_NAME_REQUEST,
  UPDATE_NAME_REQUEST_FAILURE,
  UPDATE_NAME_REQUEST_SUCCESS,
} = AuthenticationTypes

export const updateNameRequest = (data: UpdateNameRequestPayload) => {
  return action(UPDATE_NAME_REQUEST, data);
};

export const updateNameRequestSuccess = (data: User) => {
  return action(UPDATE_NAME_REQUEST_SUCCESS, {
    data
  });
};

export const updateNameRequestFailure = () => {
  return action(UPDATE_NAME_REQUEST_FAILURE);
};
