import { useState, useCallback } from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { RootProfileRoutesParamsList } from '@modules/profile/routes';

import { ApplicationState } from '@shared/store';
import Button from '@shared/common/components/Button';
import Touchable from '@shared/common/components/Touchable';
import { AuthenticationState } from '@shared/store/ducks/authentication/types';
import * as AuthenticationActions from '@shared/store/ducks/authentication/actions';

import ChangeThemeModal from '@modules/profile/components/ChangeThemeModal';


import {
  Icon,
  Header,
  Container,
  UsernameText,
  TouchableContainer,
  HeaderContent,
  Content,
  SettingButton,
  SettingButtonText,
  EditProfileButtonsContainer,
  EditProfileButtonContainer,
  SelectedThemeCircle
} from './styles';

type SettingsScreenProps = NativeStackNavigationProp<RootProfileRoutesParamsList, 'Settings'>

interface StateProps {
  authentication: AuthenticationState;
}

interface DispatchProps {
  logoutRequest(): void;
}

type SettingsProps = StateProps & DispatchProps;

const settings = ['theme'];

const Settings = ({ authentication, logoutRequest }: SettingsProps): JSX.Element => {
  const { goBack } = useNavigation<SettingsScreenProps>()

  const { data } = authentication;

  const { user } = data;

  const SELECT_MEDIA_INITIAL_VALUE = 1000;
  const SELECT_MEDIA_FINAL_VALUE = 0;

  const positionY = useSharedValue(SELECT_MEDIA_INITIAL_VALUE);

  const changeThemeModalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: positionY.value }],
      position: 'absolute',
      width: '100%',
      height: '100%'
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



  return (
    <Container>
      <Header>
        <HeaderContent>
          <TouchableContainer>
            <Touchable onPress={goBack}>
              <Icon name='x' />
            </Touchable>
          </TouchableContainer>
          <UsernameText>Configurações</UsernameText>
        </HeaderContent>
      </Header>
      <Content>

        <EditProfileButtonsContainer>
          <EditProfileButtonContainer>
            <SettingButton onPress={openSelectImageModal}>
              <SelectedThemeCircle />
              <SettingButtonText>Tema</SettingButtonText>
            </SettingButton>
          </EditProfileButtonContainer>
        </EditProfileButtonsContainer>


        <Button onPress={logoutRequest}>
          Sair
        </Button>
      </Content>

      <Animated.View style={changeThemeModalStyle}>
        <ChangeThemeModal onRequestClose={closeSelectImageModal} />
      </Animated.View>
    </Container>
  )
}


const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthenticationActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
