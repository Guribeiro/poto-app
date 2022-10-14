import { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, PostImage, Empty } from './styles';
import { Post } from '@shared/store/ducks/posts/types';
import { User } from '@shared/store/ducks/authentication/types'

export interface Like {
  id: string;
  post?: Post;
  user?: User;
  created_at?: string;
  empty?: boolean;
}

interface PostLikedProps {
  data: Like;
}

const PostLiked = ({ data }: PostLikedProps): JSX.Element => {
  const { id, user, post, created_at, empty } = data;

  const postImageUri = useMemo(() => {
    return post?.photo ? `http://10.0.0.154:3333/files/posts/${post.photo}` : ''
  }, [post]);

  if (empty) return <Empty />

  return (
    <Container>
      <TouchableOpacity>
        <PostImage source={{ uri: postImageUri }} />
      </TouchableOpacity>
    </Container>
  )
}

export default PostLiked;
