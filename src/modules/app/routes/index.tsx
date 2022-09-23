import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageInfo } from 'expo-image-picker';
import styled from 'styled-components/native';

import TabBar from '../components/Tabbar';

import Feed from '@modules/feed/screens/Feed';
import ProfileRoutes from '@modules/profile/routes';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

export type PostFormParams = {
  image: ImageInfo;
}

export type RootAppParamsList = {
  Feed: undefined;
  ProfileRoutes: undefined;
}

const { Screen, Navigator } = createBottomTabNavigator<RootAppParamsList>();

const AppRoutes = (): JSX.Element => {

  return (
    <Container>
      <Navigator
        initialRouteName="Feed"
        screenOptions={{
          headerShown: false,
          unmountOnBlur: true
        }}
        tabBar={props => <TabBar {...props} />}
      >
        <Screen name="Feed" component={Feed} />
        <Screen name='ProfileRoutes' component={ProfileRoutes} />
      </Navigator>
    </Container>
  )
}


export default AppRoutes;
