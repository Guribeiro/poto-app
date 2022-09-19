import { Reducer } from 'redux';

import {
  PostsState,
  PostAction,
  PostsTypes,
  Post
} from './types';

const {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_REQUEST_FAILURE,
  LOAD_POSTS_REQUEST_SUCCESS,
  ADD_POSTS_REQUEST,
  ADD_POSTS_REQUEST_FAILURE,
  ADD_POSTS_REQUEST_SUCCESS
} = PostsTypes;

const INITIAL_STATE: PostsState = {
  data: [],
  error: false,
  loading: false
};


const reducer: Reducer<PostsState, PostAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      return { ...state, loading: true }
    case LOAD_POSTS_REQUEST_SUCCESS:
      return { ...state, loading: false, error: false, data: action.payload.data as Post[] }
    case LOAD_POSTS_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }
    case ADD_POSTS_REQUEST:
      return { ...state, loading: true }
    case ADD_POSTS_REQUEST_SUCCESS:
      return { ...state, loading: false, error: false, data: [...state.data, action.payload.data]}
    case ADD_POSTS_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}

export default reducer
