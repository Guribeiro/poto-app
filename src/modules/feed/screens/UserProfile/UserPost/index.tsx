import { useMemo } from 'react';

import { ENDPOINT_URL } from '@env';

import { Container, PostImage, Empty } from './styles';

export interface Post {
  id: string;
  photo?: string;
}

export interface PostProps extends Post {
  empty?: boolean;
}

export interface UserPostProps {
  data: PostProps
}

const UserPost = ({ data }: UserPostProps): JSX.Element => {

  const { empty, photo } = data;

  const uri = useMemo(() => {
    return photo ? `${ENDPOINT_URL}/files/posts/${photo}` : ''
  }, []);

  if (empty) return <Empty />

  return (
    <Container>
      <PostImage source={{ uri }} />
    </Container>
  )
}

export default UserPost;
