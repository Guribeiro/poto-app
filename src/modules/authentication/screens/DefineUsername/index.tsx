import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRoute } from '@react-navigation/native';
import { AxiosError, AxiosResponse } from 'axios';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import api from '../../../../shared/services/api';

import InputText from '../../components/Input';
import NextButton from '../../components/NextButton';
import Spacer from '../../../../shared/common/components/Spacer';
import Container from '../../../../shared/common/components/Container';

import { DefineUsernameParams, RootSignupParamsList } from '../../routes/signup.routes';

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

import { TouchableOpacity } from 'react-native-gesture-handler';
import FullScreenLoading from '@shared/common/components/FullScreenLoading';

interface FormData {
  username: string;
}

const schema = yup.object().shape({
  username: yup.string().required().min(5, 'Mínimo 05 caracteres'),
});

type DefineUsernameScreenProps = NativeStackNavigationProp<RootSignupParamsList, 'DefineUsername'>;


type ErrorResponse = {
  error: string;
}

const DefineUsername = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const { params } = useRoute();
  const { navigate, goBack } = useNavigation<DefineUsernameScreenProps>();

  const { control, handleSubmit, getValues, setError } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { fullName, email } = params as DefineUsernameParams;

  const [firstName,] = fullName.split(' ');

  const checkUsernameAvailable = useCallback(async () => {

    const username = getValues('username');

    const { data } = await api.post('/sessions/valid_username', {
      username,
    });

    if (data instanceof AxiosError) {

      throw new Error('error');
    }
  }, [])

  const onSubmit = useCallback(async ({ username }: FormData) => {
    try {
      setLoading(true);

      await checkUsernameAvailable();

      console.log({username});

      navigate('DefineProfileAvatar', {
        fullName,
        username,
        email
      });

    } catch (error) {
      console.log({ error });
      setError('username', { message: 'Este username já está em uso' })
    } finally {
      setLoading(false)
    }
  }, [navigate, fullName, email, setError]);



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
            name='username'
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <InputText
                label='Your username'
                value={value}
                onChangeText={onChange}
                error={error && error.message}
                autoCapitalize='none'
                keyboardType='email-address'
              />
            )}
          />
        </Form>
        <NextButtonContainer>
          <NextButton
            onPress={handleSubmit(onSubmit)}
          />
        </NextButtonContainer>
      </Content>
      {loading && <FullScreenLoading />}
      <Spacer size={32} />
    </Container>
  )
}

export default DefineUsername;
