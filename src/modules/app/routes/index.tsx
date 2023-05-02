import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigatorScreenParams } from '@react-navigation/native';
import styled from 'styled-components/native';

import Icon from '@shared/common/components/Icon';

import ProfileRoutes from '@modules/profile/routes';
import FeedRoutes, { RootFeedParamsList } from '@modules/feed/routes';
import Explore from '@modules/explore/Explore';
import { BottomFabBar } from 'rn-wave-bottom-bar';
import { useTheme } from '@shared/hooks/theme';


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
  'PostDetails'
];

const { Screen, Navigator } = createBottomTabNavigator<RootAppParamsList>();

const AppRoutes = (): JSX.Element => {

  const { theme } = useTheme();

  return (
    <Container>
      <Navigator
        initialRouteName="FeedRoutes"
        screenOptions={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarActiveTintColor: theme.palette.colors.shapes.light,
          tabBarActiveBackgroundColor: theme.palette.colors.secondary,
          tabBarInactiveBackgroundColor: 'red',
        }}
        tabBar={(props) => (
          <BottomFabBar
            mode='default'
            isRtl={false}
            // Add Shadow for active tab bar button
            focusedButtonStyle={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.41,
              shadowRadius: 9.11,
              elevation: 14,
            }}
            // - You can add the style below to show screen content under the tab-bar
            // - It will makes the "transparent tab bar" effect.
            bottomBarContainerStyle={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
            {...props}
          />
        )}
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
              tabBarIcon: () => <Icon name='home' />,
              tabBarActiveTintColor: theme.palette.colors.secondary,
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
              tabBarIcon: () => <Icon name='compass' />,
              tabBarActiveTintColor: theme.palette.colors.secondary,
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
              tabBarIcon: () => <Icon name='user' />,
              tabBarActiveTintColor: theme.palette.colors.secondary,
              tabBarStyle: { display: 'flex' },
            };
          }}
        />
      </Navigator>
    </Container>
  )
}


export default AppRoutes;
