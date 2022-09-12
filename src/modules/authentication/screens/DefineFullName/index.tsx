import { useForm, Controller } from 'react-hook-form';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '../../../../shared/common/components/Container';
import InputText from '../../components/Input';
import Spacer from '../../../../shared/common/components/Spacer';
import NextButton from '../../components/NextButton';


import { RootSignupParamsList } from '../../routes/signup.routes';

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
  fullName: string;
}

const schema = yup.object().shape({
  fullName: yup.string().required('required field')
})

type DefineFullNameScreenProps = NativeStackNavigationProp<RootSignupParamsList, 'DefineFullName'>

const DefineFullName = (): JSX.Element => {

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { navigate, goBack } = useNavigation<DefineFullNameScreenProps>();

  const onSubmit = useCallback(({ fullName }: FormData) => {
    navigate('DefineEmail', {
      fullName
    });
  }, [navigate])

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={goBack}>
          <Icon name='x' />
        </TouchableOpacity>
      </Header>
      <Content>
        <Title>Welcome</Title>
        <TextContainer>
          <SubTitle>
            Enter your details to get sign{'\n'} in to your account
          </SubTitle>
        </TextContainer>
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
        </Form>
        <NextButtonContainer>
          <NextButton onPress={handleSubmit(onSubmit)} />
        </NextButtonContainer>
      </Content>
      <Spacer size={32} />
    </Container>
  )
}

export default DefineFullName;