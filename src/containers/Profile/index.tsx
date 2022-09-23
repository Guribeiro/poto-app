import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '@shared/common/components/Text';
import { connect } from 'react-redux';
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

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import * as AuthenticationActions from '@shared/store/ducks/authentication/actions';

import { RootProfileRoutesParamsList } from '@modules/app/routes/profile.routes';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import Touchable from '@shared/common/components/Touchable';
import Spacer from '@shared/common/components/Spacer';
import SelectMediaModal from '../Feed/components/SelectMediaModal';

import TouchableAvatar from '../../shared/common/components/TouchableAvatar';

import {
  Container,
  Header,
  Row,
  UserProfileDetails,
  UsernameText,
  Icon,
  UpdateProfileButton,
} from './styles';

import SettingsModal from './components/SettingsModal';
import { AuthenticationState, SignupRequestPayload, LoginRequestPayload } from '@shared/store/ducks/authentication/types';
import { ApplicationState } from '@shared/store';

type ProfileScreenProps = NativeStackNavigationProp<RootProfileRoutesParamsList, 'Profile'>

interface StateProps {
  authentication: AuthenticationState;
}

interface DispatchProps {
  signupRequest(data: SignupRequestPayload): void;
  loginRequest(data: LoginRequestPayload): void;
}

type ProfileProps = StateProps & DispatchProps;

const Profile = ({ authentication }: ProfileProps): JSX.Element => {

  const { data } = authentication;

  const { user } = data;

  const uri = user.avatar ?
    `http://10.0.0.175:3333/files/avatars/${user.avatar}` :
    `https://ui-avatars.com/api/?name=${user.full_name}&length=1`;

  const INITIAL_VALUE = -600;
  const FINAL_VALUE = 0;

  const SELECT_MEDIA_INITIAL_VALUE = -1000;
  const SELECT_MEDIA_FINAL_VALUE = 0;

  const [mediaLoading, setMediaLoading] = useState(false);

  const { navigate } = useNavigation<ProfileScreenProps>()

  const settingsModalOffset = useSharedValue(INITIAL_VALUE);

  const handleOpenSettings = useCallback(() => {
    settingsModalOffset.value = withTiming(FINAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    })
  }, [settingsModalOffset]);

  const handleCloseSettings = useCallback(() => {
    settingsModalOffset.value = withTiming(INITIAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    })
  }, [settingsModalOffset])

  const settingsModalStyle = useAnimatedStyle(() => {
    return {
      left: 0,
      bottom: settingsModalOffset.value,
      position: 'absolute',
      width: '100%',
      height: '100%'
    }
  });

  const updateImageOffset = useSharedValue(INITIAL_VALUE);

  const updateImageStyle = useAnimatedStyle(() => {
    return {
      bottom: updateImageOffset.value,
    };
  });

  const openSelectImageModal = useCallback(() => {
    updateImageOffset.value = withTiming(SELECT_MEDIA_FINAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [updateImageOffset]);

  const closeSelectImageModal = useCallback(() => {
    updateImageOffset.value = withTiming(SELECT_MEDIA_INITIAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [updateImageOffset, INITIAL_VALUE]);


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

      closeSelectImageModal();

      //update profile avatar here

    } catch (error) {
      console.log({ error })
    } finally {
      setMediaLoading(false);
    }
  }, [requestMediaLibraryPermissions]);

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
          <Text>Gustavo Henrique Ribeiro Dias</Text>
        </UserProfileDetails>
        <Spacer size={32} />
        <UpdateProfileButton onPress={() => navigate('UpdateProfile')}>
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
      <Animated.View style={settingsModalStyle}>
        <SettingsModal onRequestClose={handleCloseSettings} />
      </Animated.View>
    </Container>
  )
}


const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthenticationActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
