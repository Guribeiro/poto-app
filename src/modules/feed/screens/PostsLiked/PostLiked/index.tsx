import { useMemo, useState } from 'react';
import { TouchableOpacity, Modal } from 'react-native';
import { Post } from '@shared/store/ducks/posts/types';
import { User } from '@shared/store/ducks/authentication/types'

import { ENDPOINT_URL } from '@env';

import { Container, PostImage, Empty } from './styles';



export interface Like {
  id: string;
  post?: Post;
  user?: User;
  created_at?: string;
  empty?: boolean;
}

interface PostLikedProps {
  data: Like;
  onPress: (like: Like) => void;
}

const PostLiked = ({ data, onPress }: PostLikedProps): JSX.Element => {
  const { id, user, post, created_at, empty } = data;

  const postImageUri = useMemo(() => {
    return post?.photo ? `${ENDPOINT_URL}/files/posts/${post.photo}` : ''
  }, [post]);

  if (empty) return <Empty />

  return (
    <Container>
      <TouchableOpacity onPress={() => onPress(data)} >
        <PostImage source={{ uri: postImageUri }} />
      </TouchableOpacity>
    </Container>
  )
}

export default PostLiked;
