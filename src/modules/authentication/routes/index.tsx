import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../../../shared/hooks/theme';
import SigninRoutes from './signin.routes';

export type RootAuthenticationParamsList = {
  SigninRoutes: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<RootAuthenticationParamsList>();


const AuthenticationRoutes = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <Navigator
      initialRouteName="SigninRoutes"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palette.colors.shapes.light,
        },
      }}
    >
      <Screen name="SigninRoutes" component={SigninRoutes} />
    </Navigator>
  );
}

export default AuthenticationRoutes;