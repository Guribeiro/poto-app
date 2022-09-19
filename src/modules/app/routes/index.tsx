import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../../containers/Home';
import PostForm from '../../../containers/Home/components/PostForm';
import styled from 'styled-components/native';
import { useTheme } from '@shared/hooks/theme';

import { ImageInfo } from 'expo-image-picker';

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
}

const { Screen, Navigator } = createNativeStackNavigator<RootAppParamsList>();

const AppRoutes = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <Container>
      <Navigator
        initialRouteName="Feed"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.palette.colors.primary,
          },
        }}
      >
        <Screen name="Feed" component={Home} />
        <Screen name='PostForm' component={PostForm} />
      </Navigator>
    </Container>
  )
}


export default AppRoutes;
