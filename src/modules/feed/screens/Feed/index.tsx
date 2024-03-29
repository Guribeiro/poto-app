import { useCallback, useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { RefreshControl, ActivityIndicator, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import Toast from 'react-native-toast-message';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import { useTheme } from '@shared/hooks/theme';
import ListEmptyComponent from '@shared/common/components/ListEmptyComponent';
import FullScreenLoading from '@shared/common/components/FullScreenLoading';

import * as PostsActions from '@shared/store/ducks/posts/actions';
import * as FeedActions from '@shared/store/ducks/feed/actions';

import { LoadFeedPayload } from '@shared/store/ducks/feed/types';

import { RootFeedParamsList } from '@modules/feed/routes';
import { ApplicationState } from '@shared/store';

import { launchCamera, launchImageLibrary, PickerOptions } from '@shared/utils/imagePicker';

import SelectMediaModal from '../../components/SelectMediaModal';
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
import { verifyErrorInstance } from '@shared/utils/errors';
import { useLocation } from '@shared/hooks/location';

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
  const INITIAL_VALUE = -1000;
  const FINAL_VALUE = 0;

  const [mediaLoading, setMediaLoading] = useState(false);
  const [page, setPage] = useState(0);

  const { theme } = useTheme();

  const { location } = useLocation();

  const { navigate } = useNavigation<FeedScreenProps>()

  const { data, loading } = feed;

  const uploadImageOffset = useSharedValue(INITIAL_VALUE);

  const updateImageStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: '100%',
      height: '100%',
      bottom: uploadImageOffset.value,
    };
  });

  const openSelectImageModal = useCallback(() => {
    uploadImageOffset.value = withTiming(FINAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [uploadImageOffset]);

  const closeSelectImageModal = useCallback(() => {
    uploadImageOffset.value = withTiming(INITIAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [uploadImageOffset, INITIAL_VALUE]);


  const handleLaunchCamera = useCallback(async (): Promise<void> => {
    try {
      setMediaLoading(true);
      const imagePickerResult = await launchCamera({} as PickerOptions);

      if (imagePickerResult.canceled) return;

      closeSelectImageModal();

      const [image] = imagePickerResult.assets;

      navigate('CreatePost', {
        image,
      });

    } catch (error) {
      const err = error as Error;
      Toast.show({
        type: 'error',
        text1: `${err.message} 😥`,
      });
    } finally {
      setMediaLoading(false);
    }
  }, []);

  const handleLaunchMediaLibrary = useCallback(async (): Promise<void> => {
    try {
      setMediaLoading(true);
      const imagePickerResult = await launchImageLibrary({} as PickerOptions);

      if (imagePickerResult.canceled) return;

      closeSelectImageModal();

      const [image] = imagePickerResult.assets;

      navigate('CreatePost', {
        image,
      });

    } catch (err) {
      const { error } = verifyErrorInstance(err)
      Toast.show({
        type: 'error',
        text1: `${error} 😥`,
      });
    } finally {
      setMediaLoading(false);
    }
  }, []);


  // const handlePagination = useCallback(() => {
  //   if (loading) {
  //     return;
  //   }

  //   setPage(prev => prev + 1)
  // }, [])

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
        // onEndReached={handlePagination}
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

      <Animated.View
        style={updateImageStyle}
      >
        <SelectMediaModal
          loading={false}
          onRequestClose={closeSelectImageModal}
          onLaunchMediaLibrary={handleLaunchMediaLibrary}
          onLaunchCamera={handleLaunchCamera}
        />
      </Animated.View>
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
