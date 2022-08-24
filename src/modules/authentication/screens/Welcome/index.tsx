import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootSigninParamsList } from '../../routes/signin.routes';

import backgroundImage from '../../assets/background-protographer.png';
import Button from '../../../../shared/common/components/Button';
import { Text } from '../../../../shared/common/components/Text';
import Logo from '../../../../shared/common/components/Logo';

import {
  Container,
  Content,
  WelcomeText,
  WelcomeTextContainer,
  EmphasizedText,
  Footer,
  ButtonContainer
} from './styles';

type WelcomeScreenProps = NativeStackNavigationProp<RootSigninParamsList, 'Welcome'>;

const Welcome = (): JSX.Element => {
  const { navigate } = useNavigation<WelcomeScreenProps>()
  return (
    <Container>
      <ImageBackground style={{
        flex: 1,
        width: '100%',
      }}
        source={backgroundImage}
      >
        <Content>
          <Logo />
          <Footer>
            <WelcomeTextContainer>
              <WelcomeText>
                Explore your{'\n'}
                captures.
              </WelcomeText>
            </WelcomeTextContainer>
            <Text>
              Share your captures with{' '}
              <EmphasizedText>
                Poto
              </EmphasizedText>
            </Text>
            <ButtonContainer>
              <Button onPress={() => navigate('Signin')}>
                get started
              </Button>
            </ButtonContainer>
          </Footer>
        </Content>
      </ImageBackground>
    </Container>
  )
}

export default Welcome;