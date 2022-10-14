import { useCallback, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { Text } from '@shared/common/components/Text';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync,
  launchCameraAsync
} from 'expo-image-picker';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootProfileRoutesParamsList } from '@modules/profile/routes';

import { ApplicationState } from '@shared/store';

import Spacer from '@shared/common/components/Spacer';
import Touchable from '@shared/common/components/Touchable';
import TouchableAvatar from '@shared/common/components/TouchableAvatar';
import * as AuthenticationActions from '@shared/store/ducks/authentication/actions';

import SelectMediaModal from '../../../feed/components/SelectMediaModal';

import {
  Container,
  Header,
  Row,
  UserProfileDetails,
  UsernameText,
  Icon,
  UpdateProfileButton,
} from './styles';

import { AuthenticationState, SignupRequestPayload, LoginRequestPayload, UpdateAvatarRequestPayload } from '@shared/store/ducks/authentication/types';
import FullScreenLoading from '@shared/common/components/FullScreenLoading';

type ProfileScreenProps = NativeStackNavigationProp<RootProfileRoutesParamsList, 'Profile'>

interface StateProps {
  authentication: AuthenticationState;
}

interface DispatchProps {
  updateAvatarRequest(data: UpdateAvatarRequestPayload): void;
}

type ProfileProps = StateProps & DispatchProps;

const Profile = ({ authentication, updateAvatarRequest }: ProfileProps): JSX.Element => {

  const { data, loading } = authentication;

  const { user } = data;

  const uri = user.avatar ?
    `http://10.0.0.154:3333/files/avatars/${user.avatar}` :
    `https://ui-avatars.com/api/?name=${user.full_name}&length=1`;

  const [mediaLoading, setMediaLoading] = useState(false);

  const { navigate } = useNavigation<ProfileScreenProps>()

  const SELECT_MEDIA_INITIAL_VALUE = 1000;
  const SELECT_MEDIA_FINAL_VALUE = 0;

  const positionY = useSharedValue(SELECT_MEDIA_INITIAL_VALUE);

  const updateImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: positionY.value }],
    };
  });

  const openSelectImageModal = useCallback(() => {
    positionY.value = withTiming(SELECT_MEDIA_FINAL_VALUE, {
      duration: 200,
      easing: Easing.ease,
    });
  }, [positionY]);

  const closeSelectImageModal = useCallback(() => {
    positionY.value = withTiming(SELECT_MEDIA_INITIAL_VALUE, {
      duration: 200,
      easing: Easing.ease,
    });
  }, [positionY, SELECT_MEDIA_INITIAL_VALUE]);


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

    } catch (error) {
      console.log({ error })
    } finally {
      setMediaLoading(false);
    }
  }, [requestCameraPermissions]);

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

      updateAvatarRequest({
        image: imagePickerResult.uri
      });

      closeSelectImageModal();

    } catch (error) {
      const err = new Error(error as string);
      Alert.alert(err.message)
    } finally {
      setMediaLoading(false);
    }
  }, [requestMediaLibraryPermissions, updateAvatarRequest]);

  return (
    <Container>
      <Header>
        <Row>
          <UsernameText>{user.username}</UsernameText>
          <Touchable onPress={() => navigate('Settings')}>
            <Icon name='settings' />
          </Touchable>
        </Row>

        <Spacer size={16} />
        <UserProfileDetails>
          <TouchableAvatar
            onPress={openSelectImageModal}
            source={{ uri }}
            icon='plus'
          />
        </UserProfileDetails>
        <Spacer size={16} />
        <UserProfileDetails>
          <Text>{user.full_name}</Text>
        </UserProfileDetails>
        <Spacer size={32} />
        <UpdateProfileButton onPress={() => navigate('UpdateProfileRoutes')}>
          <Text>Editar Perfil</Text>
        </UpdateProfileButton>
      </Header>
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
      {loading || mediaLoading && <FullScreenLoading />}
    </Container>
  )
}


const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthenticationActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Profile);
