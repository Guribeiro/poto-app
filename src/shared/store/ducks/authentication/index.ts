import { Reducer } from 'redux';
import {
  AuthenticationState,
  AuthenticationAction,
  Authentication,
  AuthenticationTypes,
} from './types';

const {
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_FAILURE,
  SIGNUP_REQUEST_SUCCESS,

  LOAD_AUTHENTICATION_REQUEST,
  LOAD_AUTHENTICATION_REQUEST_FAILURE,
  LOAD_AUTHENTICATION_REQUEST_SUCCESS,

  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILURE,
  LOGOUT_REQUEST_SUCCESS,

  LOAD_STORAGED_AUTHENTICATION_REQUEST,
  LOAD_STORAGED_AUTHENTICATION_REQUEST_FAILURE,
  LOAD_STORAGED_AUTHENTICATION_REQUEST_SUCCESS,

  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_REQUEST_FAILURE,
  UPDATE_AVATAR_REQUEST_SUCCESS,

  UPDATE_NAME_REQUEST,
  UPDATE_NAME_REQUEST_FAILURE,
  UPDATE_NAME_REQUEST_SUCCESS,

  UPDATE_EMAIL_REQUEST,
  UPDATE_EMAIL_REQUEST_FAILURE,
  UPDATE_EMAIL_REQUEST_SUCCESS,

  UPDATE_USERNAME_REQUEST,
  UPDATE_USERNAME_REQUEST_FAILURE,
  UPDATE_USERNAME_REQUEST_SUCCESS
} = AuthenticationTypes;

const INITIAL_STATE: AuthenticationState = {
  data: {} as Authentication,
  error: false,
  loading: false,
};

const reducer: Reducer<AuthenticationState, AuthenticationAction> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, loading: true };
    case SIGNUP_REQUEST_SUCCESS:
      return { ...state, loading: false, error: false };
    case SIGNUP_REQUEST_FAILURE:
      return { ...state, loading: false, error: true };
    case LOAD_AUTHENTICATION_REQUEST:
      return { ...state, loading: true };
    case LOAD_AUTHENTICATION_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case LOAD_AUTHENTICATION_REQUEST_FAILURE:
      return { loading: false, error: true, data: {} as Authentication };
    case LOGOUT_REQUEST:
      return { ...state, loading: true, error: false };
    case LOGOUT_REQUEST_FAILURE:
      return { ...state, loading: false, error: true };
    case LOGOUT_REQUEST_SUCCESS:
      return { loading: false, error: false, data: {} as Authentication };
    case LOAD_STORAGED_AUTHENTICATION_REQUEST:
      return { ...state, loading: true }
    case LOAD_STORAGED_AUTHENTICATION_REQUEST_FAILURE:
      return { data: {} as Authentication, state, loading: false, error: true };
    case LOAD_STORAGED_AUTHENTICATION_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case UPDATE_AVATAR_REQUEST:
      return { ...state, loading: true }
    case UPDATE_AVATAR_REQUEST_SUCCESS:
      return { loading: false, error: false, data: { ...state.data, user: action.payload.data } }
    case UPDATE_AVATAR_REQUEST_FAILURE:
      return { ...state, loading: false, error: true };
    case UPDATE_NAME_REQUEST:
      return { ...state, loading: true }
    case UPDATE_NAME_REQUEST_SUCCESS:
      return { loading: false, error: false, data: { ...state.data, user: action.payload.data } }
    case UPDATE_NAME_REQUEST_FAILURE:
      return { ...state, loading: false, error: true };
    case UPDATE_EMAIL_REQUEST:
      return { ...state, loading: true }
    case UPDATE_EMAIL_REQUEST_SUCCESS:
      return { loading: false, error: false, data: { ...state.data, user: action.payload.data } }
    case UPDATE_EMAIL_REQUEST_FAILURE:
      return { ...state, loading: false, error: true };
    case UPDATE_USERNAME_REQUEST:
      return { ...state, loading: true }
    case UPDATE_USERNAME_REQUEST_SUCCESS:
      return { loading: false, error: false, data: { ...state.data, user: action.payload.data } }
    case UPDATE_USERNAME_REQUEST_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default reducer;
