import { Reducer } from 'redux';

import {
  PostsState,
  PostAction,
  PostsTypes,
} from './types';

const {
  LIKE_POST_REQUEST,
  LIKE_POST_REQUEST_FAILURE,
  LIKE_POST_REQUEST_SUCCESS,

  ADD_POST_COMMENT_REQUEST,
  ADD_POST_COMMENT_REQUEST_FAILURE,
  ADD_POST_COMMENT_REQUEST_SUCCESS,

  REMOVE_POST_COMMENT_REQUEST,
  REMOVE_POST_COMMENT_REQUEST_FAILURE,
  REMOVE_POST_COMMENT_REQUEST_SUCCESS
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
    case ADD_POST_COMMENT_REQUEST:
      return { ...state, loading: true, error: false }
    case ADD_POST_COMMENT_REQUEST_SUCCESS:
      const postsCommentsData = [...state.data];

      const findPostCommentIndex = postsCommentsData.findIndex(post => post.id === action.payload.data.id);
      postsCommentsData[findPostCommentIndex] = action.payload.data;

      return { loading: false, error: false, data: postsCommentsData }
    case ADD_POST_COMMENT_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }
    case REMOVE_POST_COMMENT_REQUEST:
      return { ...state, loading: true }
    case REMOVE_POST_COMMENT_REQUEST_SUCCESS:
      const removePostsData = [...state.data];

      const findUpdatedPostIndex = removePostsData.findIndex(post => post.id === action.payload.data.id);

      removePostsData[findUpdatedPostIndex] = action.payload.data;

      return { ...state, loading: false, error: false, data: removePostsData }
    case REMOVE_POST_COMMENT_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}

export default reducer
