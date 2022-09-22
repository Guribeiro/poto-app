import styled from 'styled-components/native';
import { TouchableOpacity, FlatList, FlatListProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text } from '@shared/common/components/Text';

import { Post } from '@shared/store/ducks/posts/types';

export const Container = styled.View`
  flex: 1;
  background: #151417;
`;

export const Header = styled.View`
  padding: ${({ theme }) => theme.screen.rem(2)}px ${({ theme }) => theme.screen.rem(.8)}px;
  flex-direction: row;

  justify-content: space-between;
`;

export const Content = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.screen.rem(.8)}px;
`;

export const HeaderWelcomeText = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(2, true)}px;
`;

export const HeaderWelcomeTextEmphasized = styled(HeaderWelcomeText)`
  color: ${({ theme }) => theme.palette.colors.secondary};
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Touchable = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.screen.rem(.5)}px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;
`;

export const PostsList = styled(
  FlatList as new (props: FlatListProps<Post>) => FlatList<Post>,
).attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,

}))``;