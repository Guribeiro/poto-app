import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigatorScreenParams } from '@react-navigation/native';
import styled from 'styled-components/native';

import TabBar from '../components/Tabbar';

import ProfileRoutes from '@modules/profile/routes';
import FeedRoutes, { RootFeedParamsList } from '@modules/feed/routes';
import Explore from '@modules/explore/Explore';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

export type RootAppParamsList = {
  FeedRoutes?: NavigatorScreenParams<RootFeedParamsList>;
  ProfileRoutes: undefined;
  Explore: undefined;
}

const hiddenRoutesTabBar = [
  'UpdateProfileRoutes',
  'Settings',
  'CreatePost',
  'PostComments',
  'PostsLiked',
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
          name='Explore'
          component={Explore}
          options={({ route }) => {
            const focusedRouteName =
              getFocusedRouteNameFromRoute(route) || 'Explore';
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
