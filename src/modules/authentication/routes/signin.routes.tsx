import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { dimension } from '../../../shared/utils/dimensions';
import { useTheme } from '../../../shared/hooks/theme';
import styled from 'styled-components/native';

import Welcome from '../screens/Welcome';
import Signin from '../screens/Signin';

export const Container = styled.View`
  flex: 1;
  height: ${dimension.height}px;
`;

export type RootSigninParamsList = {
  Welcome: undefined;
  Signin: undefined;
}

const {Navigator, Screen} = createNativeStackNavigator<RootSigninParamsList>()

const SigninRoutes = ():JSX.Element => {
  const {theme} = useTheme();
  return (
    <Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palette.colors.shapes.strong,
        },
        presentation: 'fullScreenModal'
      }}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="Signin" component={Signin} />
    </Navigator>
  )
}

export default SigninRoutes;