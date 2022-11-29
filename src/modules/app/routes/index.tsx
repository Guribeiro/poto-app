import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import styled from 'styled-components/native';

import { LocationProvider } from '@shared/hooks/location';

import TabBar from '../components/Tabbar';

import ProfileRoutes from '@modules/profile/routes';

import FeedRoutes from '@modules/feed/routes';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

export type RootAppParamsList = {
  FeedRoutes: undefined;
  ProfileRoutes: undefined;
}

const hiddenRoutesTabBar = [
  'UpdateProfileRoutes',
  'Settings',
  'CreatePost',
  'PostComments',
  'PostsLiked'
];

const { Screen, Navigator } = createBottomTabNavigator<RootAppParamsList>();

const AppRoutes = (): JSX.Element => {

  return (
    <Container>
        <Navigator
          initialRouteName="FeedRoutes"
          screenOptions={{
            headerShown: false,
            unmountOnBlur: true
          }}
          tabBar={props => <TabBar {...props} />}
        >
          <Screen
            name="FeedRoutes"
            component={FeedRoutes}
            options={({ route }) => {
              const focusedRouteName =
                getFocusedRouteNameFromRoute(route) || 'FeedRoutes';
              if (hiddenRoutesTabBar.includes(focusedRouteName)) {
                return {
                  tabBarStyle: { display: 'none' },
                };
              }

              return {
                tabBarStyle: { display: 'flex' },
              };
            }}
          />
          <Screen
            name='ProfileRoutes'
            component={ProfileRoutes}
            options={({ route }) => {
              const focusedRouteName =
                getFocusedRouteNameFromRoute(route) || 'Profile';
              if (hiddenRoutesTabBar.includes(focusedRouteName)) {
                return {
                  tabBarStyle: { display: 'none' },
                };
              }

              return {
                tabBarStyle: { display: 'flex' },
              };
            }}
          />
        </Navigator>
    </Container>
  )
}


export default AppRoutes;
