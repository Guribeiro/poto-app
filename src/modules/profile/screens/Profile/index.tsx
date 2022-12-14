import { useCallback, useState } from 'react';
import { Text } from '@shared/common/components/Text';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Toast from 'react-native-toast-message';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { ENDPOINT_URL } from '@env';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootProfileRoutesParamsList } from '@modules/profile/routes';

import { ApplicationState } from '@shared/store';

import { launchImageLibrary, launchCamera, PickerOptions } from '@shared/utils/imagePicker';

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
    `${ENDPOINT_URL}/files/avatars/${user.avatar}` :
    `https://ui-avatars.com/api/?name=${user.full_name}&length=1`;

  const [mediaLoading, setMediaLoading] = useState(false);

  const { navigate } = useNavigation<ProfileScreenProps>()

  const SELECT_MEDIA_INITIAL_VALUE = 1000;
  const SELECT_MEDIA_FINAL_VALUE = 0;

  const positionY = useSharedValue(SELECT_MEDIA_INITIAL_VALUE);

  const updateImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: positionY.value }],
      width: '100%',
      height: '100%',
      position: 'absolute'
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



  const handleLaunchCamera = useCallback(async (): Promise<void> => {
    try {
      setMediaLoading(true);
      const imagePickerResult = await launchCamera({} as PickerOptions);

      if (imagePickerResult.canceled) return;

      closeSelectImageModal();

      const [image] = imagePickerResult.assets;

      updateAvatarRequest({
        image: image.uri,
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

      const [image] = imagePickerResult.assets;

      updateAvatarRequest({
        image: image.uri,
      });

      closeSelectImageModal();

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
        style={updateImageStyle}
      >
        <SelectMediaModal
          loading={false}
          onRequestClose={closeSelectImageModal}
          onLaunchMediaLibrary={handleLaunchMediaLibrary}
          onLaunchCamera={handleLaunchCamera}
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
