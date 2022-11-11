import styled from 'styled-components/native';
import {
  View,
  FlatList,
  FlatListProps,
} from 'react-native';

import { Like } from './PostLiked'

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
