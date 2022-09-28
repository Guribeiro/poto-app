import { FlatListProps, View } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

import { Feather } from '@expo/vector-icons';
import { Text } from '@shared/common/components/Text';
import { Comment } from '@shared/store/ducks/posts/types';

export const Container = styled(View)`
flex: 1;
`;

export const Header = styled(View)`
padding: ${({ theme }) => theme.screen.rem(3)}px
${({ theme }) => theme.screen.rem(.8)}px
${({ theme }) => theme.screen.rem(1.6)}px;

background-color: ${({ theme }) => theme.palette.colors.secondary};
border-bottom-left-radius: ${({ theme }) => theme.screen.rem(1.6)}px;
border-bottom-right-radius: ${({ theme }) => theme.screen.rem(1.6)}px;
flex-direction: row;
justify-content: center;
align-items: center;
`;

export const HeaderContent = styled(View)`
width: 100%;
flex-direction: row;
align-items: center;
justify-content: center;
`;

export const TouchableContainer = styled(View)`
position: absolute;
left: 0;
`;

export const Icon = styled(Feather)`
color: ${({ theme }) => theme.palette.colors.white};
font-size: ${({ theme }) => theme.screen.rem(1.6, true)}px;
`;

export const UsernameText = styled(Text)`
font-family: ${({ theme }) => theme.palette.fonts.bold};
font-size: ${({ theme }) => theme.screen.rem(1.8, true)}px;
`;

export const PostCommentsList = styled(
Animated.FlatList as new (props: FlatListProps<Comment>) => Animated.FlatList<Comment>,
).attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: theme.screen.rem(.8)
  }
}))``;

