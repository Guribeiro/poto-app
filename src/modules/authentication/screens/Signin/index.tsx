import { ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootAuthenticationParamsList } from '../../routes';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import KeyboardView from '@shared/common/components/KeyboardView';

import Logo from '@shared/common/components/Logo';
import Button from '@shared/common/components/Button';
import { Text } from '@shared/common/components/Text';
import Spacer from '@shared/common/components/Spacer';

import InputText from '../../components/InputText';
import InputTextPassword from '@modules/authentication/components/InputTextPassword';
import { AuthenticationState, LoginRequestPayload } from '@shared/store/ducks/authentication/types';

import * as AuthenticationActions from '@shared/store/ducks/authentication/actions';

import backgroundImage from '../../assets/signin-background-photographer.png';

import {
  Container,
  Content,
  Header,
  Icon,
  BackgroundShadeContainer,
  LogoContainer,
  EmphasizedText,
  FormContainer,
  ButtonContainer,
  Footer,
  CreateNewAccountContainer
} from './styles';
import { useCallback } from 'react';
import { ApplicationState } from '@shared/store';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

type SigninScreenProps = NativeStackNavigationProp<RootAuthenticationParamsList, 'SigninRoutes'>;

const schema = yup.object().shape({
  email: yup.string().email().required('preencha este campo'),
  password: yup.string().required('preencha este campo')
})

interface FormData {
  email: string;
  password: string;
}


type DispatchProps = {
  loginRequest(data: LoginRequestPayload): void;
}

type StateProps = {
  authentication: AuthenticationState;
}

type SigninProps = StateProps & DispatchProps;

const Signin = ({ authentication, loginRequest }: SigninProps): JSX.Element => {
  const { loading } = authentication;
    const { navigate, goBack } = useNavigation<SigninScreenProps>();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(({ email, password }: FormData) => {
    loginRequest({
      email,
      password
    });
  }, [loginRequest])

  return (
    <KeyboardView>
      <Container>
        <ImageBackground style={{
          flex: 1,
          width: '100%',
        }}
          source={backgroundImage}
        >
          <Content>
            <BackgroundShadeContainer />
            <Header>
              <TouchableOpacity onPress={goBack}>
                <Icon name='x' />
              </TouchableOpacity>

              <LogoContainer>
                <Logo size='medium' />
              </LogoContainer>
            </Header>

            <FormContainer>
              <Controller
                name='email'
                control={control}
                render={({
                  field: { name, onChange, value },
                  fieldState: { error }
                }) => (
                  <InputText
                    label='Email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={value}
                    onChangeText={onChange}
                    error={error && error.message}
                  />
                )}
              />
              <Spacer size={16} />
              <Controller
                name='password'
                control={control}
                render={({
                  field: { name, onChange, value },
                  fieldState: { error }
                }) => (
                  <InputTextPassword
                    label='Password'
                    autoCapitalize='none'
                    value={value}
                    onChangeText={onChange}
                    error={error && error.message}
                  />
                )}
              />
              <ButtonContainer>
                <Button loading={loading} onPress={handleSubmit(onSubmit)}>
                  login
                </Button>
              </ButtonContainer>
            </FormContainer>
            <Footer>
              <CreateNewAccountContainer>
                <Text>New user ?{' '}</Text>

                <TouchableOpacity onPress={() => navigate('SignupRoutes')}>
                  <EmphasizedText>
                    create an account
                  </EmphasizedText>
                </TouchableOpacity>
              </CreateNewAccountContainer>
            </Footer>
          </Content>
        </ImageBackground>
      </Container>
    </KeyboardView>
  )
}

const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthenticationActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
