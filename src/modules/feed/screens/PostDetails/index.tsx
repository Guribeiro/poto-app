import { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Spacer from '@shared/common/components/Spacer';
import ListEmptyComponent from '@shared/common/components/ListEmptyComponent';

import * as PostsActions from '@shared/store/ducks/posts/actions';
import * as FeedActions from '@shared/store/ducks/feed/actions';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { FeedState, Post } from '@shared/store/ducks/feed/types'

import PostComponent from '@modules/feed/components/Post';
import Header from '@shared/common/components/Header';

import FullScreenLoading from '@shared/common/components/FullScreenLoading';

import { PostDetailsParams } from '@modules/feed/routes';
import { RootAppParamsList } from '@modules/app/routes';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '@shared/store';
import { connect } from 'react-redux';

type PostDetailsScreenProps = BottomTabNavigationProp<RootAppParamsList, 'FeedRoutes'>;

export const Container = styled(View)`
  flex: 1;
  display: flex;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

interface StateProps {
  feed: FeedState;
}

type PostDetailsProps = StateProps;


const PostDetails = ({ feed }: PostDetailsProps): JSX.Element => {
  const { params } = useRoute();
  const { navigate } = useNavigation<PostDetailsScreenProps>();

  const { post_id } = params as PostDetailsParams;

  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState<Post | undefined>(() => {
    const findPost = feed.data.find((p) => p.id === post_id);

    setLoading(false)

    return findPost
  })

  useEffect(() => {
    const refreshPost = () => {
      const findPost = feed.data.find((p) => p.id === post_id);

      setPost(findPost)
    }

    refreshPost()
  }, [feed])

  if (loading) {
    return <FullScreenLoading />
  }

  if (!post) {
    return (
      <Container>
        <Header onGoback={() => navigate('Explore')} />
        <Spacer size={32} />
        <ListEmptyComponent />
      </Container>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Header onGoback={() => navigate('Explore')} />
      <ScrollView>
        <PostComponent post={post} />
      </ScrollView>
    </View>
  )
}
const mapStateToProps = ({ feed }: ApplicationState) => ({
  feed,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ ...PostsActions, ...FeedActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);
