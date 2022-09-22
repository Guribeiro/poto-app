import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import * as AuthenticationActions from '@shared/store/ducks/authentication/actions';
import Button from '@shared/common/components/Button';

import Touchable from '@shared/common/components/Touchable';

import { RootProfileRoutesParamsList } from '@modules/app/routes/profile.routes';

import {
  Icon,
  Header,
  Container,
  UsernameText,
  TouchableContainer,
  HeaderContent,
  Content
} from './styles';


import { AuthenticationState, SignupRequestPayload, LoginRequestPayload } from '@shared/store/ducks/authentication/types';
import { ApplicationState } from '@shared/store';

type SettingsScreenProps = NativeStackNavigationProp<RootProfileRoutesParamsList, 'Settings'>

interface StateProps {
  authentication: AuthenticationState;
}

interface DispatchProps {
  logoutRequest(): void;
}

type SettingsProps = StateProps & DispatchProps;

const Settings = ({ authentication, logoutRequest }: SettingsProps): JSX.Element => {
  const { goBack } = useNavigation<SettingsScreenProps>()

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
          <UsernameText>Configurações</UsernameText>
        </HeaderContent>
      </Header>
      <Content>
        <Button onPress={logoutRequest}>
          Sair
        </Button>
      </Content>
    </Container >
  )
}


const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthenticationActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
