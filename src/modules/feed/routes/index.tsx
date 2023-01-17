import styled from 'styled-components/native';
import { ImageInfo } from 'expo-image-picker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shared/hooks/theme';

import Feed from '../screens/Feed';
import PostDetails from '../screens/PostDetails';
import CreatePost from '../screens/CreatePost';
import PostComments from '../screens/PostComments';
import PostsLiked from '../screens/PostsLiked';
import UserProfile from '../screens/UserProfile';

import { SelectMediaModalProvider } from '../hooks/selectMediaModal';

export type CreatePostParams = {
  image: ImageInfo;
}

export type PostDetailsParams = {
  post_id: string;
}

export type PostCommentsParams = {
  post_id: string;
}

export interface UserProfileParams {
  user_id: string;
}

export type RootFeedParamsList = {
  Feed: undefined;
  PostDetails: PostDetailsParams;
  CreatePost: CreatePostParams;
  PostComments: PostCommentsParams;
  PostsLiked: undefined;
  UserProfile: UserProfileParams;
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
      <SelectMediaModalProvider>
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
          <Screen name="PostDetails" component={PostDetails} />
          <Screen name="CreatePost" component={CreatePost} />
          <Screen name="PostComments" component={PostComments} />
          <Screen name="PostsLiked" component={PostsLiked} />
          <Screen name='UserProfile' component={UserProfile} />
        </Navigator>
      </SelectMediaModalProvider>
    </Container>
  )
}

export default FeedRoutes
