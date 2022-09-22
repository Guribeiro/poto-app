import { useCallback, useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  ImageInfo,
  requestCameraPermissionsAsync,
  launchCameraAsync
} from 'expo-image-picker';
import { Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import FullScreenLoading from '@shared/common/components/FullScreenLoading';

import * as PostsActions from '@shared/store/ducks/posts/actions';
import { PostsState } from '@shared/store/ducks/posts/types';

import { RootAppParamsList } from '@modules/app/routes';

import { ApplicationState } from '@shared/store';

import SelectMediaModal from './components/SelectMediaModal';
import Post from './components/Post';

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
import { connect } from 'react-redux';

interface StateProps {
  posts: PostsState;
}

interface DispatchProps {
  loadPosts(): void;
}

type FeedScreenProps = NativeStackNavigationProp<RootAppParamsList, 'Feed'>;

type FeedProps = StateProps & DispatchProps;

const Feed = ({ posts, loadPosts }: FeedProps): JSX.Element => {
  const INITIAL_VALUE = -1000;
  const FINAL_VALUE = 0;

  const [mediaLoading, setMediaLoading] = useState(false);

  const { navigate } = useNavigation<FeedScreenProps>()

  const { loading, data } = posts;

  const updateImageOffset = useSharedValue(INITIAL_VALUE);

  const updateImageStyle = useAnimatedStyle(() => {
    return {
      bottom: updateImageOffset.value,
    };
  });

  const openSelectImageModal = useCallback(() => {
    updateImageOffset.value = withTiming(FINAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [updateImageOffset]);

  const closeSelectImageModal = useCallback(() => {
    updateImageOffset.value = withTiming(INITIAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [updateImageOffset, INITIAL_VALUE]);

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

      // navigate('PostForm', {
      //   image: imagePickerResult
      // });

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

      // navigate('PostForm', {
      //   image: imagePickerResult
      // });

    } catch (error) {
      console.log({ error })
    } finally {
      setMediaLoading(false);
    }
  }, [requestMediaLibraryPermissions]);

  useEffect(() => {
    loadPosts()
  }, [])

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
          <Touchable>
            <Icon name='heart' />
          </Touchable>
        </ButtonsContainer>
      </Header>
      <PostsList
        onRefresh={loadPosts}
        refreshing={loading}
        data={data}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={item => item.id}
      />

      <Animated.View
        style={[
          updateImageStyle,
          { width: '100%', height: '100%', position: 'absolute' },
        ]}
      >
        <SelectMediaModal
          loading={false}
          onRequestClose={closeSelectImageModal}
          onLaunchMediaLibrary={launchMediaLibrary}
          onLaunchCamera={launchCamera}
        />
      </Animated.View>
      {(loading || mediaLoading) && <FullScreenLoading />}

    </Container>
  )
}

const mapStateToProps = ({ posts }: ApplicationState) => ({
  posts,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(PostsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
