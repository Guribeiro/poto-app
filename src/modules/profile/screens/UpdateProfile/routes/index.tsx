import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components/native';

import { useTheme } from '@shared/hooks/theme';
import UpdateProfile from "..";
import UpdateName from "@modules/profile/screens/UpdateProfile/screens/UpdateName";
import UpdateEmail from "@modules/profile/screens/UpdateProfile/screens/UpdateEmail";
import UpdateUsername from "@modules/profile/screens/UpdateProfile/screens/UpdateUsername";

export interface UpdateNameParams {
  name: string;
}

export interface UpdateEmailParams {
  email: string;
}

export interface UpdateUsernameParams {
  username: string;
}

export type RootEditProfileRouteParams = {
  UpdateProfile: undefined;
  UpdateName: UpdateNameParams;
  UpdateEmail: UpdateEmailParams;
  UpdateUsername: UpdateUsernameParams;
}

const { Navigator, Screen } = createNativeStackNavigator<RootEditProfileRouteParams>();

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

const UpdateProfileRoutes = ():JSX.Element => {
  const { theme } = useTheme();
  return (
    <Container>
    <Navigator
      initialRouteName="UpdateProfile"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palette.colors.primary,
        },
      }}
    >
      <Screen name="UpdateProfile" component={UpdateProfile} />
      <Screen name="UpdateName" component={UpdateName} />
      <Screen name="UpdateEmail" component={UpdateEmail} />
      <Screen name="UpdateUsername" component={UpdateUsername} />
    </Navigator>
  </Container>
  )
}
export default UpdateProfileRoutes;
