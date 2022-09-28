import { useMemo } from 'react';

import { View } from 'react-native';
import { formatDistance } from 'date-fns';
import { Comment } from '@shared/store/ducks/posts/types';
import { Container, Content, UserAvatar, PostOwnerName, PostSubtitleText, CreatedAtContainer, CreatedAtText } from './styles';
import ptBR from 'date-fns/locale/pt-BR';

interface PostCommentProps {
  comment: Comment;
}

const PostComment = ({ comment }: PostCommentProps): JSX.Element => {
  const { user, content, created_at } = comment;

  const createdAtPostFormatDistance = useMemo(() => {
    const todayDate = new Date();
    return formatDistance(new Date(created_at),
      todayDate, { addSuffix: true, locale: ptBR })
  }, []);

  const avatarUri = user.avatar ?
    `http://10.0.0.175:3333/files/avatars/${user.avatar}` :
    `https://ui-avatars.com/api/?name=${user.full_name}&length=1`;

  return (
    <Container>
      <Content>
        <UserAvatar source={{ uri: avatarUri }} />
        <View style={{ marginLeft: 16 }}>
          <PostOwnerName>{user.full_name}</PostOwnerName>
          <PostSubtitleText>{content}</PostSubtitleText>
        </View>
      </Content>
      <CreatedAtContainer>
        <CreatedAtText>{createdAtPostFormatDistance}</CreatedAtText>
      </CreatedAtContainer>
    </Container>
  )
}

export default PostComment;
