import { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { RefreshControl, ActivityIndicator, View } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import { useTheme } from '@shared/hooks/theme';
import ListEmptyComponent from '@shared/common/components/ListEmptyComponent';

import * as PostsActions from '@shared/store/ducks/posts/actions';
import * as FeedActions from '@shared/store/ducks/feed/actions';

import { LoadFeedPayload } from '@shared/store/ducks/feed/types';

import { RootFeedParamsList } from '@modules/feed/routes';
import { ApplicationState } from '@shared/store';
import Post from '../../components/Post';

import {
  Container,
  Header,
  HeaderWelcomeText,
  HeaderWelcomeTextEmphasized,
  ButtonsContainer,
  Touchable,
  Icon,
  PostsList
} from './styles';
import { FeedState } from '@shared/store/ducks/feed/types';
import { useLocation } from '@shared/hooks/location';
import { useSelectMediaModal } from '@modules/feed/hooks/selectMediaModal';

interface StateProps {
  feed: FeedState;
}

interface DispatchProps {
  loadFeed(payload: LoadFeedPayload): void;
  refreshFeed(payload: LoadFeedPayload): void;
}

type FeedScreenProps = NativeStackNavigationProp<RootFeedParamsList, 'Feed'>;

type FeedProps = StateProps & DispatchProps;

const Feed = ({ feed, loadFeed, refreshFeed }: FeedProps): JSX.Element => {
  const [page, setPage] = useState(0);

  const { theme } = useTheme();
  const { openSelectImageModal } = useSelectMediaModal();

  const { location } = useLocation();

  const { navigate } = useNavigation<FeedScreenProps>()

  const { data, loading } = feed;

  useEffect(() => {
    loadFeed({
      page: 0,
      latitude: location?.latitude,
      longitude: location?.longitude
    })
  }, [])

  // if (loading) {
  //   return <FullScreenLoading />
  // }

  return (
    <Container>
      <Header>
        <HeaderWelcomeText>
          Let's share{'\n'}your{' '}
          <HeaderWelcomeTextEmphasized>moments</HeaderWelcomeTextEmphasized>
        </HeaderWelcomeText>
        <ButtonsContainer>
          <Touchable onPress={openSelectImageModal}>
            <Icon name='plus-square' />
          </Touchable>
          <Touchable>
            <Icon name='user' />
          </Touchable>
          <Touchable onPress={() => navigate('PostsLiked')}>
            <Icon name='heart' />
          </Touchable>
        </ButtonsContainer>
      </Header>

      <PostsList
        data={data}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={item => item.id}
        onEndReachedThreshold={.7}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => refreshFeed({
              page,
              latitude: location?.latitude,
              longitude: location?.longitude
            })}
            tintColor={theme.palette.colors.secondary}
            colors={[theme.palette.colors.primary]}
          />
        }
        ListEmptyComponent={<ListEmptyComponent />}
        ListFooterComponent={loading ? <ActivityIndicator /> : <View style={{ height: theme.screen.rem(1) }} />}
      />

      {/* <Animated.View
        style={updateImageStyle}
      >
        <SelectMediaModal
          loading={false}
          onRequestClose={closeSelectImageModal}
          onLaunchMediaLibrary={handleLaunchMediaLibrary}
          onLaunchCamera={handleLaunchCamera}
        />
      </Animated.View> */}
    </Container>
  )
}

const mapStateToProps = ({ feed }: ApplicationState) => ({
  feed,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ ...PostsActions, ...FeedActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
