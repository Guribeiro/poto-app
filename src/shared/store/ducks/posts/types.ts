import { User } from '@shared/store/ducks/authentication/types';
import { ImageInfo } from 'expo-image-picker';

export enum PostsTypes {
  LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST',
  LOAD_POSTS_REQUEST_SUCCESS = 'LOAD_POSTS_REQUEST_SUCCESS',
  LOAD_POSTS_REQUEST_FAILURE = 'LOAD_POSTS_REQUEST_FAILURE',

  ADD_POSTS_REQUEST = 'ADD_POSTS_REQUEST',
  ADD_POSTS_REQUEST_SUCCESS = 'ADD_POSTS_REQUEST_SUCCESS',
  ADD_POSTS_REQUEST_FAILURE = 'ADD_POSTS_REQUEST_FAILURE',

  LIKE_POST_REQUEST = 'LIKE_POST_REQUEST',
  LIKE_POST_REQUEST_SUCCESS = 'LIKE_POST_REQUEST_SUCCESS',
  LIKE_POST_REQUEST_FAILURE = 'LIKE_POST_REQUEST_FAILURE',

  ADD_POST_COMMENT_REQUEST = 'ADD_POST_COMMENT_REQUEST',
  ADD_POST_COMMENT_REQUEST_SUCCESS = 'ADD_POST_COMMENT_REQUEST_SUCCESS',
  ADD_POST_COMMENT_REQUEST_FAILURE = 'ADD_POST_COMMENT_REQUEST_FAILURE',

}

export interface LoadPostsRequestPayload { };

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
  _likesCount: number;
  _commentsCount: number;
}

export interface AddPostPayload {
  image: ImageInfo;
  subtitle?: string;
}

export interface LikePostPayload {
  post_id: string;
}

export interface AddPostCommentPayload {
  post_id: string;
  content: string;
}

export interface PostAction {
  type: keyof typeof PostsTypes;
  payload: {
    data: any;
  };
}

export interface PostsState {
  readonly data: Post[];
  readonly loading: boolean;
  readonly error: boolean;
}
