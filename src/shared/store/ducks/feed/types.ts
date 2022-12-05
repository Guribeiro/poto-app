import { ImageInfo } from 'expo-image-picker';
import { User } from '@shared/store/ducks/authentication/types';

export enum FeedTypes {
  LOAD_FEED_REQUEST = 'LOAD_FEED_REQUEST',
  LOAD_FEED_REQUEST_SUCCESS = 'LOAD_FEED_REQUEST_SUCCESS',
  LOAD_FEED_REQUEST_FAILURE = 'LOAD_FEED_REQUEST_FAILURE',

  REFRESH_FEED_REQUEST = 'REFRESH_FEED_REQUEST',
  REFRESH_FEED_REQUEST_SUCCESS = 'REFRESH_FEED_REQUEST_SUCCESS',
  REFRESH_FEED_REQUEST_FAILURE = 'REFRESH_FEED_REQUEST_FAILURE',

  ADD_POSTS_REQUEST = 'ADD_POSTS_REQUEST',
  ADD_POSTS_REQUEST_SUCCESS = 'ADD_POSTS_REQUEST_SUCCESS',
  ADD_POSTS_REQUEST_FAILURE = 'ADD_POSTS_REQUEST_FAILURE',

  LIKE_POST_REQUEST = 'LIKE_POST_REQUEST',
  LIKE_POST_REQUEST_SUCCESS = 'LIKE_POST_REQUEST_SUCCESS',
  LIKE_POST_REQUEST_FAILURE = 'LIKE_POST_REQUEST_FAILURE',

  ADD_POST_COMMENT_REQUEST = 'ADD_POST_COMMENT_REQUEST',
  ADD_POST_COMMENT_REQUEST_SUCCESS = 'ADD_POST_COMMENT_REQUEST_SUCCESS',
  ADD_POST_COMMENT_REQUEST_FAILURE = 'ADD_POST_COMMENT_REQUEST_FAILURE',

  REMOVE_POST_COMMENT_REQUEST = 'REMOVE_POST_COMMENT_REQUEST',
  REMOVE_POST_COMMENT_REQUEST_SUCCESS = 'REMOVE_POST_COMMENT_REQUEST_SUCCESS',
  REMOVE_POST_COMMENT_REQUEST_FAILURE = 'REMOVE_POST_COMMENT_REQUEST_FAILURE',
}

export interface Like {
  id: string;
  user_id: string;
  post_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  id: string;
  user_id: string;
  user: User;
  post_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface Post {
  id: string;
  user_id: string;
  subtitle: string;
  photo: string;
  created_at: Date;
  updated_at: Date;
  user: User;
  likes: Array<Like>
  comments: Array<Comment>
  _likes_count: number;
  _comments_count: number;
}

export interface AddPostPayload {
  image: ImageInfo;
  subtitle?: string;
}

export interface LoadFeedPayload {
  page: number;
  latitude?: number;
  longitude?: number;
}

export interface FeedAction {
  type: keyof typeof FeedTypes;
  payload: {
    data: any;
  };
}

export interface FeedState {
  readonly data: Post[];
  readonly loading: boolean;
  readonly error: boolean;
}
