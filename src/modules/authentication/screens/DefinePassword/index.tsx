import { useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { DefinePasswordParams, RootSignupParamsList } from '../../routes/signup.routes';

import Container from '../../../../shared/common/components/Container';
import InputPassword from '../../components/InputPassword';
import Spacer from '../../../../shared/common/components/Spacer';
import NextButton from '../../components/NextButton';

import {
  Header,
  Icon,
  Content,
  Title,
  TextContainer,
  SubTitle,
  Form,
  NextButtonContainer
} from './styles';
import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface FormData {
  password: string;
}

const schema = yup.object().shape({
  password: yup.string().required().min(8, 'password must have at least 8 caracteres')
})

type DefinePasswordScreenProps = NativeStackNavigationProp<RootSignupParamsList, 'DefinePassword'>

const DefinePassword = (): JSX.Element => {
  const { params } = useRoute();
  const { navigate, goBack } = useNavigation<DefinePasswordScreenProps>();

  const { fullName, email, avatar } = params as DefinePasswordParams;

  const [firstName,] = fullName.split(' ');

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback(({ password }: FormData) => {
    navigate('ConfirmCredentials', {
      fullName,
      email,
      avatar,
      password
    });
  }, [])

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
            Enter your details to get sign{'\n'} in to your account
          </SubTitle>
        </TextContainer>
        <Form>
          <Controller
            name='password'
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <InputPassword
                label='choose a password'
                value={value}
                autoCapitalize='none'
                onChangeText={onChange}
                error={error && error.message}
              />
            )}
          />
        </Form>
        <NextButtonContainer>
          <NextButton onPress={handleSubmit(onSubmit)} />
        </NextButtonContainer>
      </Content>
      <Spacer size={32} />
    </Container>
  )
}

export default DefinePassword;
