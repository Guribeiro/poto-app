import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shared/hooks/theme';
import styled from 'styled-components/native';


import Profile from '../screens/Profile';
import Settings from '@modules/settings/screens/Setting';
import UpdateProfileRoutes from '../screens/UpdateProfile/routes';

export type RootProfileRoutesParamsList = {
  Profile: undefined;
  UpdateProfileRoutes: undefined;
  Settings: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<RootProfileRoutesParamsList>();

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

const ProfileRoutes = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <Container>
      <Navigator
        initialRouteName="Profile"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.palette.colors.primary,
          },
        }}
      >
        <Screen name="Profile" component={Profile} />
        <Screen name="UpdateProfileRoutes" component={UpdateProfileRoutes} />
        <Screen name='Settings' component={Settings} />
      </Navigator>
    </Container>
  );
}

export default ProfileRoutes;
