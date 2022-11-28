import { useCallback, useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync,
  launchCameraAsync
} from 'expo-image-picker';
import { Platform, RefreshControl, ActivityIndicator, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import { useTheme } from '@shared/hooks/theme';
import ListEmptyComponent from '@shared/common/components/ListEmptyComponent';

import * as PostsActions from '@shared/store/ducks/posts/actions';
import * as FeedActions from '@shared/store/ducks/feed/actions';

import {LoadFeedPayload} from '@shared/store/ducks/feed/types';

import { RootFeedParamsList } from '@modules/feed/routes';
import { ApplicationState } from '@shared/store';

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

interface StateProps {
  feed: FeedState;
}

interface DispatchProps {
  loadFeed(payload:LoadFeedPayload): void;
  refreshFeed(payload:LoadFeedPayload): void;
}

type FeedScreenProps = NativeStackNavigationProp<RootFeedParamsList, 'Feed'>;

type FeedProps = StateProps & DispatchProps;

const Feed = ({ feed, loadFeed, refreshFeed }: FeedProps): JSX.Element => {
  const INITIAL_VALUE = -1000;
  const FINAL_VALUE = 0;

  const [mediaLoading, setMediaLoading] = useState(false);
  const [page, setPage] = useState(0);

  const { theme } = useTheme();

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

  const requestMediaLibraryPermissions = useCallback(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error(
          'Desculpe, não temos permissão de acesso às suas fotos',
        );
      }
    }
  }, []);

  const requestCameraPermissions = useCallback(async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await requestCameraPermissionsAsync();

        if (status !== 'granted') {
          throw new Error(
            'Desculpe, não temos permissão de acesso à sua câmera',
          );
        }
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }, []);

  const launchCamera = useCallback(async (): Promise<void> => {
    try {
      await requestCameraPermissions();

      const imagePickerResult = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });

      if (imagePickerResult.cancelled) return;

      closeSelectImageModal();

      navigate('CreatePost', {
        image: imagePickerResult
      });

    } catch (error) {
      console.log({ error })
    } finally {
      setMediaLoading(false);
    }
  }, [requestCameraPermissions]);

  const launchMediaLibrary = useCallback(async (): Promise<void> => {
    try {
      setMediaLoading(true);
      await requestMediaLibraryPermissions();
      const imagePickerResult = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });

      if (imagePickerResult.cancelled) return;

      closeSelectImageModal();

      navigate('CreatePost', {
        image: imagePickerResult
      });

    } catch (error) {
      console.log({ error })
    } finally {
      setMediaLoading(false);
    }
  }, [requestMediaLibraryPermissions]);


  const handleLoadFeed = useCallback(() => {
    if (loading) {
      return;
    }

    setPage(prev => prev + 1)

  }, [page])

  useEffect(() => {
    loadFeed({page})
  }, [page, loadFeed])

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
        onEndReached={handleLoadFeed}
        onEndReachedThreshold={.1}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => refreshFeed({page})}
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
          onLaunchMediaLibrary={launchMediaLibrary}
          onLaunchCamera={launchCamera}
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
