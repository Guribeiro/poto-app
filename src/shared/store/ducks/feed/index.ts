import { Reducer } from 'redux';

import { FeedTypes, FeedState, FeedAction, Post } from './types';

const {
  LOAD_FEED_REQUEST,
  LOAD_FEED_REQUEST_FAILURE,
  LOAD_FEED_REQUEST_SUCCESS,

  ADD_POSTS_REQUEST,
  ADD_POSTS_REQUEST_FAILURE,
  ADD_POSTS_REQUEST_SUCCESS,

  LIKE_POST_REQUEST,
  LIKE_POST_REQUEST_FAILURE,
  LIKE_POST_REQUEST_SUCCESS,

  ADD_POST_COMMENT_REQUEST,
  ADD_POST_COMMENT_REQUEST_FAILURE,
  ADD_POST_COMMENT_REQUEST_SUCCESS,

  REMOVE_POST_COMMENT_REQUEST,
  REMOVE_POST_COMMENT_REQUEST_FAILURE,
  REMOVE_POST_COMMENT_REQUEST_SUCCESS
} = FeedTypes;

const INITIAL_STATE: FeedState = {
  data: [],
  error: false,
  loading: false
};

const reducer: Reducer<FeedState, FeedAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case LOAD_FEED_REQUEST:
      return { ...state, loading: true }
    case LOAD_FEED_REQUEST_SUCCESS:
      return { ...state, loading: false, error: false, data: action.payload.data as Post[] }
    case LOAD_FEED_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }
    case ADD_POSTS_REQUEST:
      return { ...state, loading: true }
    case ADD_POSTS_REQUEST_SUCCESS:
      return { ...state, loading: false, error: false, data: [action.payload.data, ...state.data,] }
    case ADD_POSTS_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }
    case LIKE_POST_REQUEST:
      return { ...state, loading: true, error: false }
    case LIKE_POST_REQUEST_SUCCESS:
      const postsData = [...state.data];

      const findPostIndex = postsData.findIndex(post => post.id === action.payload.data.id);
      postsData[findPostIndex] = action.payload.data;

      return { loading: false, error: false, data: postsData }
    case LIKE_POST_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }

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

export default reducer;
