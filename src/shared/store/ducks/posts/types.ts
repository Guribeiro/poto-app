import {User} from '@shared/store/ducks/authentication/types';
import { ImageInfo } from 'expo-image-picker';

export enum PostsTypes {
  LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST',
  LOAD_POSTS_REQUEST_SUCCESS = 'LOAD_POSTS_REQUEST_SUCCESS',
  LOAD_POSTS_REQUEST_FAILURE = 'LOAD_POSTS_REQUEST_FAILURE',

  ADD_POSTS_REQUEST = 'ADD_POSTS_REQUEST',
  ADD_POSTS_REQUEST_SUCCESS = 'ADD_POSTS_REQUEST_SUCCESS',
  ADD_POSTS_REQUEST_FAILURE = 'ADD_POSTS_REQUEST_FAILURE',
}

export interface LoadPostsRequestPayload {};

export interface Post {
  id: string;
  user_id: string;
  subtitle: string;
  photo: string;
  created_at: Date;
  updated_at: Date;
  user: User;
}

export interface AddPostPayload {
  image: ImageInfo;
  subtitle?:string;
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
