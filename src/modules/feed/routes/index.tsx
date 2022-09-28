import styled from 'styled-components/native';
import { ImageInfo } from 'expo-image-picker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shared/hooks/theme';

import Feed from '../screens/Feed';
import CreatePost from '../screens/CreatePost';
import PostComments from '../screens/PostComments';

export type CreatePostParams = {
  image: ImageInfo;
}

export type PostCommentsParams = {
  post_id: string;
}

export type RootFeedParamsList = {
  Feed: undefined;
  CreatePost: CreatePostParams;
  PostComments: PostCommentsParams;
}

const { Navigator, Screen } = createNativeStackNavigator<RootFeedParamsList>()

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

const FeedRoutes = (): JSX.Element => {
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
        <Screen name="Feed" component={Feed} />
        <Screen name="CreatePost" component={CreatePost} />
        <Screen name="PostComments" component={PostComments} />
      </Navigator>
    </Container>
  )
}

export default FeedRoutes
