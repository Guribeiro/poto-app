import { useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { ConfirmCredentialsParams, RootSignupParamsList } from '../../routes/signup.routes';
import { AuthenticationState, SignupRequestPayload, LoginRequestPayload } from '../../../../shared/store/ducks/authentication/types';

import TouchableAvatar from '@shared/common/components/TouchableAvatar';
import Container from '../../../../shared/common/components/Container';
import InputTextPassword from '../../components/InputTextPassword';
import Spacer from '../../../../shared/common/components/Spacer';
import InputText from '../../components/InputText';

import {
  Header,
  Icon,
  Content,
  Title,
  TextContainer,
  SubTitle,
  Form,
  Footer,
  FooterText,
  FooterTextEmphasized,
  TouchableAvatarContainer
} from './styles';

import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface FormData {
  fullName: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

const DefaultValuesMocked = {
  fullName: 'Gustavo Henrique',
  email: 'gugahribeiro@hotmail.com',
  password: '12345678',
  password_confirmation: ''
}

const schema = yup.object().shape({
  fullName: yup.string().required('required field'),
  email: yup.string().email().required(),
  username: yup.string().email().required(),
  password: yup.string().required().min(8, 'password must have at least 8 caracteres'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

type DefinePasswordScreenProps = NativeStackNavigationProp<RootSignupParamsList, 'DefinePassword'>

interface StateProps {
  authentication: AuthenticationState;
}

interface DispatchProps {
  signupRequest(data: SignupRequestPayload): void;
  loginRequest(data: LoginRequestPayload): void;
}

type ConfirmCredentialsProps = StateProps & DispatchProps;

const ConfirmCredentials = ({ authentication, signupRequest }: ConfirmCredentialsProps): JSX.Element => {
  const { loading } = authentication;

  const { params } = useRoute();
  const { navigate, goBack } = useNavigation<DefinePasswordScreenProps>();

  const { fullName, email, username, password, avatar } = params as ConfirmCredentialsParams;

  const [firstName,] = fullName.split(' ');

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      fullName,
      email,
      username,
      password
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback(({ fullName, email, password }: FormData) => {

    signupRequest({
      name: fullName,
      email,
      username,
      password,
      avatar
    });
  }, [signupRequest, avatar])

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={goBack}>
          <Icon name='x' />
        </TouchableOpacity>
      </Header>
      <Content>
        <Title>Hi, {firstName}</Title>
        <TextContainer>
          <SubTitle>
            please, confirm your details
          </SubTitle>
        </TextContainer>
        <TouchableAvatarContainer>
          <TouchableAvatar
            onPress={() => { }}
            source={{ uri: avatar }}
            icon='plus'
          />
        </TouchableAvatarContainer>
        <Form>
          <Controller
            name='fullName'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                label='Your full name'
                value={value}
                onChangeText={onChange}
                error={error && error.message}
              />
            )}
          />

          <Spacer size={16} />

          <Controller
            name='email'
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <InputText
                label='Your email'
                value={value}
                onChangeText={onChange}
                error={error && error.message}
                autoCapitalize='none'
                keyboardType='email-address'
              />
            )}
          />

          <Spacer size={16} />

          <Controller
            name='username'
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <InputText
                label='Your username'
                value={value}
                onChangeText={onChange}
                error={error && error.message}
                autoCapitalize='none'
              />
            )}
          />

          <Spacer size={16} />

          <Controller
            name='password'
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <InputTextPassword
                label='password'
                value={value}
                onChangeText={onChange}
                error={error && error.message}
              />
            )}
          />
        </Form>

        <Footer>
          <FooterText>
            Confirm your password {'\n'} to {' '}
            <FooterTextEmphasized>finish your registration</FooterTextEmphasized>
          </FooterText>

          <Spacer size={16} />

          <Controller
            name='password_confirmation'
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <InputTextPassword
                label='password'
                value={value}
                onChangeText={onChange}
                error={error && error.message}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />
        </Footer>
      </Content>
      <Spacer size={32} />
    </Container>
  )
}

export default ConfirmCredentials;
