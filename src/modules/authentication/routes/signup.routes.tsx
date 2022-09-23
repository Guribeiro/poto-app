import styled from 'styled-components/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { dimension } from '../../../shared/utils/dimensions';
import { useTheme } from '../../../shared/hooks/theme';

import DefineEmail from '../screens/DefineEmail';
import DefineUsername from '../screens/DefineUsername';
import DefineFullName from '../screens/DefineFullName';
import DefinePassword from '../screens/DefinePassword';
import ConfirmCredentials from '../screens/ConfirmCredentials';
import DefineProfileAvatar from '../screens/DefineProfileAvatar';

export const Container = styled.View`
  flex: 1;
  height: ${dimension.height}px;
`;

export type DefineEmailParams = {
  fullName: string;
}

export type DefineUsernameParams = DefineEmailParams & {
  email: string;
}

export type DefineProfileAvatarParams = DefineUsernameParams & {
  username: string;
}

export type DefinePasswordParams = DefineProfileAvatarParams & {
  avatar: string;
}

export type ConfirmCredentialsParams = DefinePasswordParams & {
  password: string;
}

export type RootSignupParamsList = {
  DefineFullName: undefined;
  DefineEmail: DefineEmailParams;
  DefineUsername: DefineUsernameParams;
  DefinePassword: DefinePasswordParams;
  ConfirmCredentials: ConfirmCredentialsParams;
  DefineProfileAvatar: DefineProfileAvatarParams;
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
      <Screen name="DefineUsername" component={DefineUsername} />
      <Screen name="DefinePassword" component={DefinePassword} />
      <Screen name="ConfirmCredentials" component={ConfirmCredentials} />
      <Screen name="DefineProfileAvatar" component={DefineProfileAvatar} />
    </Navigator>
  )
}

export default SignupRoutes;
