import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootFeedParamsList, PostCommentsParams } from '@modules/feed/routes';

import api from '@shared/services/api';

import Touchable from '@shared/common/components/Touchable';
import { Comment } from '@shared/store/ducks/posts/types';

import PostComment from './components/PostComment';

import {
  Container,
  Header,
  HeaderContent,
  TouchableContainer,
  UsernameText,
  Icon,
  PostCommentsList
} from './styles';

type PostCommentsScreenProps = NativeStackNavigationProp<RootFeedParamsList, 'Feed'>

const PostComments = (): JSX.Element => {
  const { goBack } = useNavigation<PostCommentsScreenProps>();

  const [comments, setComments] = useState<Array<Comment>>([]);
  const [loading, setLoading] = useState(false);

  const { params } = useRoute();

  const { post_id } = params as PostCommentsParams;

  const fetchPostComments = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<Comment[]>(`posts/${post_id}/comments`)

      setComments(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPostComments()
  }, [post_id])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <TouchableContainer>
            <Touchable onPress={goBack}>
              <Icon name='x' />
            </Touchable>
          </TouchableContainer>
          <UsernameText>Comentários</UsernameText>
        </HeaderContent>
      </Header>

      {loading && <ActivityIndicator />}

      <PostCommentsList
        onRefresh={fetchPostComments}
        refreshing={loading}
        data={comments}
        renderItem={({ item }) => <PostComment comment={item} />}
        keyExtractor={item => item.id}
      />

    </Container>
  )
}

export default PostComments
