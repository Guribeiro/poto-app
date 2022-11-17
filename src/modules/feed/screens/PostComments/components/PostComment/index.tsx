import { useMemo, memo } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { ENDPOINT_URL } from '@env';

import { ApplicationState } from '@shared/store';
import Touchable from '@shared/common/components/Touchable';
import * as PostsActions from '@shared/store/ducks/posts/actions';
import { AuthenticationState } from '@shared/store/ducks/authentication/types';
import { AddPostCommentPayload, Comment, PostsState } from '@shared/store/ducks/posts/types';

import {
  Container,
  Content,
  PostCommentOwnerContainer,
  UserAvatar,
  PostOwnerName,
  PostSubtitleText,
  Footer,
  CreatedAtContainer,
  CreatedAtText,
  Icon
} from './styles';


interface OwnProps {
  comment: Comment;
  onDelete: () => Promise<void>;
}

interface StateProps {
  posts: PostsState;
  authentication: AuthenticationState
}

interface DispatchProps {
  addPostComment(data: AddPostCommentPayload): void;
}

type PostCommentProps = DispatchProps & StateProps & OwnProps;

const PostComment = ({ comment, authentication, onDelete }: PostCommentProps): JSX.Element => {
  const { data } = authentication;

  const { user, content, created_at } = comment;

  const createdAtPostFormatDistance = useMemo(() => {
    const todayDate = new Date();
    return formatDistance(new Date(created_at),
      todayDate, { addSuffix: true, locale: ptBR })
  }, []);

  const avatarUri = user.avatar ?
    `${ENDPOINT_URL}/files/avatars/${user.avatar}` :
    `https://ui-avatars.com/api/?name=${user.full_name}&length=1`;

  return (
    <Container>
      <PostCommentOwnerContainer>
        <Content>
          <UserAvatar source={{ uri: avatarUri }} />
          <View style={{ marginLeft: 16 }}>
            <PostOwnerName>{user.full_name}</PostOwnerName>
            <PostSubtitleText>{content}</PostSubtitleText>
          </View>
        </Content>

        {data.user.id === comment.user_id && (
          <Touchable onPress={onDelete}>
            <Icon name='trash-2' />
          </Touchable>
        )}

      </PostCommentOwnerContainer>

      <Footer>
        <CreatedAtContainer>
          <CreatedAtText>{createdAtPostFormatDistance}</CreatedAtText>
        </CreatedAtContainer>
      </Footer>

    </Container>
  )
}

const mapStateToProps = ({ authentication, posts }: ApplicationState) => ({
  authentication,
  posts
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(PostsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostComment)
