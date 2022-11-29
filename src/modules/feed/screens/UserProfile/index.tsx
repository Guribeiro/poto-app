import { useEffect, useState, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
import { ScrollView } from 'react-native';

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


  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true)
        const { data } = await api.get(`/users/${user_id}`);

        setUser(data);

      } catch (error) {
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

  if(loading){
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
      <ScrollView>
         <HeaderContainer>
        <Row>
          <Touchable onPress={goBack}>
            <Icon name='arrow-left' />
          </Touchable>
          <UsernameText>{user.username}</UsernameText>
        </Row>

        <Spacer size={16} />
        <UserProfileDetails>
          <ProfileAvatar source={{ uri }} />
        </UserProfileDetails>
        <Spacer size={16} />
        <UserProfileDetails>
          <Text>{user.full_name}</Text>
        </UserProfileDetails>
        <Spacer size={32} />
      </HeaderContainer>
        {user.posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ScrollView>

    </Container>
  )
}

export default UserProfile;
