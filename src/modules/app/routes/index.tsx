import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';

import TabBar from '../components/Tabbar';

import Feed from '@modules/feed/screens/Feed';
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
        <Screen name="FeedRoutes" component={FeedRoutes} />
        <Screen name='ProfileRoutes' component={ProfileRoutes} />
      </Navigator>
    </Container>
  )
}


export default AppRoutes;
