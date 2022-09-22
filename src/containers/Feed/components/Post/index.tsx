import Touchable from '@shared/common/components/Touchable';
import { User } from '@shared/store/ducks/authentication/types';

import {
  Container,
  UserProfile,
  UserAvatar,
  UserName,
  PostImage,
  InteractionContainer,
  Icon,
  PostSubtitleContainer,
  PostSubtitleText,
  PostOwnerName
} from './styles';


export interface Post {
  id: string;
  subtitle: string;
  photo: string;
  created_at: Date;
  user: User;
}

interface PostProps {
  post: Post;
}

const Post = ({ post }: PostProps): JSX.Element => {
  const { photo, subtitle, user } = post;

  const { full_name, avatar } = user;

  const uri = `http://10.0.0.175:3333/files/posts/${photo}`;

  const avatarUri = user.avatar ?
  `http://10.0.0.175:3333/files/avatars/${avatar}` :
  `https://ui-avatars.com/api/?name=${user.full_name}&length=1`;

  return (
    <Container>
      <UserProfile>
        <UserAvatar source={{ uri: avatarUri }} />
        <UserName>{full_name}</UserName>
      </UserProfile>

      <PostImage source={{ uri }} />
      <InteractionContainer>
        <Touchable>
          <Icon name='heart' />
        </Touchable>
        <Touchable>
          <Icon name='message-circle' />
        </Touchable>
        <Touchable>
          <Icon name='share-2' />
        </Touchable>
      </InteractionContainer>

      <PostSubtitleContainer>
        <PostSubtitleText>
          <PostOwnerName>{full_name}{' '}</PostOwnerName>
          {subtitle}
        </PostSubtitleText>
      </PostSubtitleContainer>
    </Container>
  )
}

export default Post;
