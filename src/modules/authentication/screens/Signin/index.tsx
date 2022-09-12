import { ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootAuthenticationParamsList } from '../../routes';

import KeyboardView from '../../../../shared/common/components/KeyboardView';

import Logo from '../../../../shared/common/components/Logo';
import Button from '../../../../shared/common/components/Button';
import { Text } from '../../../../shared/common/components/Text';
import Spacer from '../../../../shared/common/components/Spacer';

import InputText from '../../components/InputText';

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

type SigninScreenProps = NativeStackNavigationProp<RootAuthenticationParamsList, 'SigninRoutes'>;

const Signin = (): JSX.Element => {
  const { navigate, goBack } = useNavigation<SigninScreenProps>()
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
              <InputText label='Email' />
              <Spacer size={16} />
              <InputText label='Password' />
              <ButtonContainer>
                <Button>
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

export default Signin;