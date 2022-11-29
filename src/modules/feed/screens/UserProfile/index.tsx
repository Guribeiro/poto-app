import { useEffect, useState, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
import { ScrollView } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  Extrapolate
} from 'react-native-reanimated';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import PostItem from '@modules/feed/components/Post';

import FullScreenLoading from '@shared/common/components/FullScreenLoading';

import { Text } from '@shared/common/components/Text';
import Spacer from '@shared/common/components/Spacer';
import Touchable from '@shared/common/components/Touchable';
import ProfileAvatar from '@shared/common/components/ProfileAvatar';
import ListEmptyComponent from '@shared/common/components/ListEmptyComponent';
import { Post } from '@shared/store/ducks/posts/types';
import Header from '@shared/common/components/Header';

import { verifyErrorInstance } from '@shared/utils/errors';

import { UserProfileParams, RootFeedParamsList } from '../../routes'

import { ENDPOINT_URL } from '@env';

import {
  Container,
  HeaderContainer,
  Row,
  UsernameText,
  Icon,
  UserProfileDetails,
} from './styles';
import api from '@shared/services/api';

interface User {
  id: string;
  username: string;
  full_name: string;
  avatar: string;
  posts: Array<Post>
}

type UserProfileScreenProps = NativeStackNavigationProp<RootFeedParamsList, 'UserProfile'>;

const UserProfile = (): JSX.Element => {
  const { params } = useRoute();
  const { user_id } = params as UserProfileParams;

  const { goBack } = useNavigation<UserProfileScreenProps>()

  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    console.log(event.contentOffset.y)
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 50, 200],
        [320, 280, 120],
        Extrapolate.CLAMP
      )
    }
  });

  const profileAvatarStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 100,],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true)
        const { data } = await api.get(`/users/${user_id}`);

        setUser(data);

      } catch (err) {
        const { error } = verifyErrorInstance(err);
        Toast.show({
          type: 'error',
          text1: `${error} 😥`,
        });
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  if (loading) {
    return <FullScreenLoading size='large' />
  }

  if (!user) {
    return (
      <Container>
        <Header label='' onGoback={goBack} />
        <Spacer size={32} />
        <ListEmptyComponent />
      </Container>
    )
  }

  const uri = user.avatar ?
    `${ENDPOINT_URL}/files/avatars/${user.avatar}` :
    `https://ui-avatars.com/api/?name=${user.full_name}&length=1`;

  return (
    <Container>
      <Animated.ScrollView
        contentContainerStyle={{
          marginTop: 320,
          paddingBottom: 320
        }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        {user.posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Animated.ScrollView>

      <HeaderContainer style={headerStyle}>
        <Row>
          <Touchable onPress={goBack}>
            <Icon name='arrow-left' />
          </Touchable>
          <UsernameText>{user.username}</UsernameText>
        </Row>

        <Spacer size={16} />
        <Animated.View style={profileAvatarStyle}>
          <UserProfileDetails>
            <ProfileAvatar source={{ uri }} />
          </UserProfileDetails>
          <Spacer size={16} />
          <UserProfileDetails>
            <Text>{user.full_name}</Text>
          </UserProfileDetails>
        </Animated.View>
        <Spacer size={32} />
      </HeaderContainer>

    </Container>
  )
}

export default UserProfile;
