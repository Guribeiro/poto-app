import { useState, useCallback, createElement } from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

import { TextInput } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { RootEditProfileRouteParams } from '@modules/profile/screens/UpdateProfile/routes';

import { ApplicationState } from '@shared/store';
import Touchable from '@shared/common/components/Touchable';
import { AuthenticationState } from '@shared/store/ducks/authentication/types';
import * as AuthenticationActions from '@shared/store/ducks/authentication/actions';

import EditProfileButton from '@modules/settings/components/EditProfileButton';

import {
  Icon,
  Header,
  Container,
  UsernameText,
  TouchableContainer,
  HeaderContent,
  Content,
  EditProfileButtonsContainer,
  EditProfileButtonContainer
} from './styles';

type UpdateProfileScreenProps = NativeStackNavigationProp<RootEditProfileRouteParams, 'UpdateProfile'>

interface StateProps {
  authentication: AuthenticationState;
}

interface DispatchProps {
  logoutRequest(): void;
}

type SettingsProps = StateProps & DispatchProps;

type Field = 'name' | 'email' | 'username'



const UpdateProfile = ({ authentication, logoutRequest }: SettingsProps): JSX.Element => {
  const INITIAL_VALUE = 0;
  const FINAL_VALUE = 1000;

  const { goBack, navigate } = useNavigation<UpdateProfileScreenProps>()

  const [field, setField] = useState<Field>('name')

  const { data } = authentication;

  const { user } = data;

  return (
    <Container>
      <Header>
        <HeaderContent>
          <TouchableContainer>
            <Touchable onPress={goBack}>
              <Icon name='x' />
            </Touchable>
          </TouchableContainer>
          <UsernameText>Perfil</UsernameText>
        </HeaderContent>
      </Header>

      <Content>
        <EditProfileButtonsContainer>
          <EditProfileButtonContainer>
            <EditProfileButton
              label='name'
              type='common'
              onPress={() => navigate('UpdateName', {
                name: user.full_name
              })}
            >
              {user.full_name}
            </EditProfileButton>
          </EditProfileButtonContainer>

          <EditProfileButtonContainer>
            <EditProfileButton
              label='email'
              type='common'
              onPress={() => navigate('UpdateEmail', {
                email: user.email
              })}
            >
              {user.email}
            </EditProfileButton>
          </EditProfileButtonContainer>
          <EditProfileButtonContainer>
            <EditProfileButton
              label='username'
              type='username'
              onPress={() => navigate('UpdateUsername', {
                username: user.username
              })}
            >
              {user.username}
            </EditProfileButton>
          </EditProfileButtonContainer>
        </EditProfileButtonsContainer>
      </Content>
    </Container >
  )
}


const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthenticationActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
