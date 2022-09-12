import styled from 'styled-components/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { dimension } from '../../../shared/utils/dimensions';
import { useTheme } from '../../../shared/hooks/theme';

import DefineFullName from '../screens/DefineFullName';
import DefineEmail from '../screens/DefineEmail';
import DefinePassword from '../screens/DefinePassword';
import ConfirmCredentials from '../screens/ConfirmCredentials';
import Authentication from '../../../containers/Authentication';

export const Container = styled.View`
  flex: 1;
  height: ${dimension.height}px;
`;

export type DefineEmailParams = {
  fullName: string;
}

export type DefinePasswordParams = DefineEmailParams & {
  email: string;
}

export type ConfirmCredentialsParams = DefinePasswordParams & {
  password: string;
} 

export type RootSignupParamsList = {
  DefineFullName: undefined;
  DefineEmail: DefineEmailParams;
  DefinePassword: DefinePasswordParams;
  ConfirmCredentials: ConfirmCredentialsParams;
}

const {Navigator, Screen} = createNativeStackNavigator<RootSignupParamsList>()

const SignupRoutes = ():JSX.Element => {
  const {theme} = useTheme();
  return (
    <Navigator
      initialRouteName="DefineFullName"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palette.colors.shapes.strong,
        },
        presentation: 'card'
      }}
    >
      <Screen name="DefineFullName" component={DefineFullName} />
      <Screen name="DefineEmail" component={DefineEmail} />
      <Screen name="DefinePassword" component={DefinePassword} />
      <Screen name="ConfirmCredentials" component={Authentication} />
    </Navigator>
  )
}

export default SignupRoutes;