import { ImageBackground, TouchableOpacity } from 'react-native';

import KeyboardView from '../../../../shared/common/components/KeyboardView';
import Scroll from '../../../../shared/common/components/Scroll';

import Logo from '../../../../shared/common/components/Logo';
import Button from '../../../../shared/common/components/Button';
import { Text } from '../../../../shared/common/components/Text';
import Spacer from '../../../../shared/common/components/Spacer';

import InputText from '../../components/InputText';

import backgroundImage from '../../assets/signin-background-photographer.png';

import {
  Container,
  Content,
  BackgroundShadeContainer,
  LogoContainer,
  EmphasizedText,
  FormContainer,
  ButtonContainer,
  Footer,
  CreateNewAccountContainer
} from './styles';

const Signin = (): JSX.Element => {
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
              <LogoContainer>
                <Logo size='medium' />
              </LogoContainer>
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

                  <TouchableOpacity>
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