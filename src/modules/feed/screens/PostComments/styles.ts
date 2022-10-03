import { FlatListProps, View, TextInput, Image } from 'react-native';
import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';

import { lighten } from 'polished'
import { Feather } from '@expo/vector-icons';
import { Text } from '@shared/common/components/Text';
import { Comment } from '@shared/store/ducks/posts/types';
import Touchable from '@shared/common/components/Touchable';

interface IconProps {
  disabled: boolean;
}

export const Container = styled(View)`
  flex: 1;
`;

export const Header = styled(View)`
  padding: ${({ theme }) => theme.screen.rem(3)}px
  ${({ theme }) => theme.screen.rem(.8)}px
  ${({ theme }) => theme.screen.rem(1.6)}px;

  background-color: ${({ theme }) => theme.palette.colors.secondary};

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

export const PostSubtitleContainer = styled(View)`
  flex-direction: row;
  padding-bottom: ${({theme}) => theme.screen.rem(1)}px;
  border-bottom-width: .5px;
  border-bottom-color: ${({theme}) => theme.palette.colors.texts.strong};
`


export const AddPostCommentForm = styled(View)`
  bottom: 0;
  flex-direction: row;
  border-top-width: .5px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  background: ${({ theme }) => theme.palette.colors.primary};
  border-top-color: ${({ theme }) => theme.palette.colors.texts.strong};
  padding: ${({ theme }) => theme.screen.rem(2)}px ${({ theme }) => theme.screen.rem(.8)}px;
`

export const PostCommentTextInput = styled(TextInput)`
  flex: 1;
  padding: ${({ theme }) => theme.screen.rem(.8)}px;
  color: ${({ theme }) => theme.palette.colors.texts.medium};
  border: 1px solid ${({ theme }) => lighten(.05, theme.palette.colors.primary)};
`;

export const SendPostCommentTouchableIcon = styled(Feather) <IconProps>`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;

  ${({ disabled }) => disabled && css`
    opacity: .2;
  `}
`;

export const SendPostCommentTouchable = styled(Touchable)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.screen.rem(.8)}px;

  border: 1px solid ${({ theme }) => lighten(.05, theme.palette.colors.primary)};
`
export const UserAvatar = styled(Image)`
  width: ${({ theme }) => theme.screen.rem(2.25)}px;
  height: ${({ theme }) => theme.screen.rem(2.25)}px;
  border-radius: ${({ theme }) => theme.screen.rem(1.125)}px;
  border: 1px solid ${({ theme }) => theme.palette.colors.secondary};
`;

export const PostOwnerName = styled(Text)`
  font-family: ${({ theme }) => theme.palette.fonts.bold};
`;

export const PostSubtitleText = styled(Text)`
  font-family: ${({ theme }) => theme.palette.fonts.light};
  flex-shrink: 1;
`;

export const PostCommentsList = styled(
  Animated.FlatList as new (props: FlatListProps<Comment>) => Animated.FlatList<Comment>,
).attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: theme.screen.rem(.8),
  }
}))``;


