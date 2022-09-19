import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useTheme} from '@shared/hooks/theme';
import styled from 'styled-components/native';

import SigninRoutes from './signin.routes';
import SignupRoutes from './signup.routes';

export type RootAuthenticationParamsList = {
  SigninRoutes: undefined;
  SignupRoutes: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<RootAuthenticationParamsList>();

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

const AuthenticationRoutes = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <Container>
      <Navigator
        initialRouteName="SigninRoutes"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.palette.colors.primary,
          },
        }}
      >
        <Screen name="SigninRoutes" component={SigninRoutes} />
        <Screen name="SignupRoutes" component={SignupRoutes} />
      </Navigator>
    </Container>
  );
}

export default AuthenticationRoutes;
