import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRoute } from '@react-navigation/native';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import api from '../../../../shared/services/api';

import InputText from '../../components/Input';
import NextButton from '../../components/NextButton';
import Spacer from '../../../../shared/common/components/Spacer';
import Container from '../../../../shared/common/components/Container';

import { DefineEmailParams, RootSignupParamsList } from '../../routes/signup.routes';

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


interface FormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

type DefineEmailScreenProps = NativeStackNavigationProp<RootSignupParamsList, 'DefineEmail'>;

const DefineEmail = (): JSX.Element => {
  const { params } = useRoute();
  const { navigate, goBack } = useNavigation<DefineEmailScreenProps>();
  const [isDisabled, setIsDisabled] = useState(true);

  const { control, handleSubmit, getValues, setError } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { fullName } = params as DefineEmailParams;

  const [firstName,] = fullName.split(' ');

  const checkEmailAvailable = useCallback(async () => {
    try {
      
      const email = getValues('email')

      // const response = await api.post('/sessions/valid_email', {
      //   email,
      // });

    } catch (error) {
      setError('email', {message: 'Email is already been used'})
    } finally {
      setIsDisabled(false)
    }
  }, [getValues])

  const onSubmit = useCallback(async ({ email }: FormData) => {
    await checkEmailAvailable();

    navigate('DefinePassword', {
      fullName,
      email
    })
  }, []);



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
        </Form>
        <NextButtonContainer>
          <NextButton
            onPress={handleSubmit(onSubmit)}
          />
        </NextButtonContainer>
      </Content>
      <Spacer size={32} />
    </Container>
  )
}

export default DefineEmail;