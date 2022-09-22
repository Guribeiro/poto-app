import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageInfo } from 'expo-image-picker';
import styled from 'styled-components/native';

import TabBar from '../components/Tabbar';

import Home from '../../../containers/Home';
import ProfileRoutes from '../routes/profile.routes';
// import PostForm from '../../../containers/Home/components/PostForm';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

export type PostFormParams = {
  image: ImageInfo;
}

export type RootAppParamsList = {
  Feed: undefined;
  PostForm: PostFormParams;
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
        }}
        tabBar={props => <TabBar {...props} />}
      >
        <Screen name="Feed" component={Home} />
        <Screen name='ProfileRoutes' component={ProfileRoutes} />
      </Navigator>
    </Container>
  )
}


export default AppRoutes;
