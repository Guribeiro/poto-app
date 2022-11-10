import { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  FlatListProps,
  SafeAreaView,
} from 'react-native';
import { AxiosError } from 'axios';

import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import PostLiked, { Like } from './PostLiked'
import PostLikedModal from './PostLikedModal';

import { RootFeedParamsList } from '@modules/feed/routes';

import FullScreenLoading from '@shared/common/components/FullScreenLoading'
import Header from '@shared/common/components/Header';
import api from '@shared/services/api';

type PostsLikedScreenProps = NativeStackNavigationProp<RootFeedParamsList, 'PostsLiked'>;

export const Container = styled(View)`
  flex: 1;
`;

export const LikesList = styled(
  FlatList as new (props: FlatListProps<Like>) => FlatList<Like>,
).attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
}))`
  padding: ${({ theme }) => theme.screen.rem(1)}px;
`;

const PostsLiked = (): JSX.Element => {
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedLike, setSelectedLike] = useState<Like>();

  const { goBack } = useNavigation<PostsLikedScreenProps>();

  const COLUMNS = 3;

  const createRows = useCallback((data: Like[], columns: number) => {
    const rows = Math.floor(data.length / columns);

    let lastRowElements = data.length - rows * columns;
    while (lastRowElements !== columns) {
      data.push({
        id: `empty-${Math.floor(data.length / columns)}`,
        empty: true,
      });
      lastRowElements++;
    }
    return data;
  }, [])

  const loadUserLikes = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/posts/me/likes');

      setLikes(data);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;

      Toast.show({
        type: 'error',
        text1: `${err.message} 😥`,
      });
    } finally {
      setLoading(false)
    }
  }, [])

  const handleOpenPostFullScreen = useCallback((like: Like) => {
    console.log(like);
    setSelectedLike(like)
    setModalVisible(true)
  }, [])

  const handleClosePostFullScreen = useCallback(() => {
    setModalVisible(false)
    setSelectedLike(undefined)
  }, [])

  useEffect(() => {
    loadUserLikes();
  }, [])

  return (
    <Container>
      <Header onGoback={goBack} label='Meus likes' />
      <SafeAreaView>
        <LikesList
          onRefresh={loadUserLikes}
          refreshing={loading}
          contentOffset={{ y: loading ? -60 : 0, x: 0 }}
          data={createRows(likes, COLUMNS)}
          numColumns={COLUMNS}
          renderItem={({ item }) => <PostLiked data={item} onPress={handleOpenPostFullScreen} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

      <PostLikedModal
        like={selectedLike}
        visible={modalVisible}
        onRequestClose={handleClosePostFullScreen}
      />

      {loading && <FullScreenLoading />}
    </Container>
  )
}

export default PostsLiked;
