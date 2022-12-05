import { Image, View, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Text } from '@shared/common/components/Text';
import { Feather } from '@expo/vector-icons';
import { opacify } from 'polished';

interface IconProps {
  isLiked?: boolean;
}

export const Container = styled(View)`
  justify-content: center;
  padding-bottom: ${({ theme }) => theme.screen.rem(.5)}px;
`;

export const Header = styled(View)`
  flex-direction: row;
`;

export const UserProfile = styled(View)`
  flex: 1;

  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(1)}px ${({ theme }) => theme.screen.rem(.8)}px;
`;

export const MoreHorizontalTouchable = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.screen.rem(1)}px;
  align-items: center;
  justify-content: center;
`

export const UserAvatar = styled(Image)`
  width: ${({ theme }) => theme.screen.rem(2.25)}px;
  height: ${({ theme }) => theme.screen.rem(2.25)}px;
  border-radius: ${({ theme }) => theme.screen.rem(1.125)}px;
`;

export const UserName = styled(Text)`
  margin-left: ${({ theme }) => theme.screen.rem(.5)}px;
`;

export const PostImageContainer = styled(View)`
    width: 100%;
    height: ${({ theme }) => theme.screen.rem(17.0625)}px;
`;

export const PostImage = styled(Image)`
  width: 100%;
  /* height: ${({ theme }) => theme.screen.rem(17.0625)}px; */
  height: 100%;
`;

export const Icon = styled(Feather) <IconProps>`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;

  ${({ isLiked, theme }) => isLiked && css`
    color: ${theme.palette.colors.red};
  `}
`;

export const HeartLikeImage = styled(Image)`
  width: ${({ theme }) => theme.screen.rem(6)}px;
  height: ${({ theme }) => theme.screen.rem(6)}px;
`;


export const InteractionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(.5)}px  ${({ theme }) => theme.screen.rem(.3)}px 0;
`;

export const PostSubtitleContainer = styled.View`
  padding: ${({ theme }) => theme.screen.rem(.5)}px ${({ theme }) => theme.screen.rem(.8)}px;
`;

export const PostOwnerName = styled(Text)`
  font-family: ${({ theme }) => theme.palette.fonts.bold};
`;

export const PostSubtitleText = styled(Text)`
  font-family: ${({ theme }) => theme.palette.fonts.light};
`;

export const CreatedAtContainer = styled.View`
  padding: 0 ${({ theme }) => theme.screen.rem(.8)}px;
`;

export const CreatedAtText = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(.7)}px;
  font-family: ${({ theme }) => theme.palette.fonts.light};
`;

export const PostCommentTouchableContainer = styled(View)`
  padding: ${({ theme }) => theme.screen.rem(.5)}px;
  flex-direction: row;
  align-items: center;
`

export const PostCommentTouchable = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.screen.rem(.2)}px;
  margin-left: ${({ theme }) => theme.screen.rem(.8)}px;

`

export const PostCommentTouchableText = styled(Text)`
  color: ${({ theme }) => opacify(.5, theme.palette.colors.texts.medium)};
`
export const PostCommentUserAvatar = styled(Image)`
  width: ${({ theme }) => theme.screen.rem(2)}px;
  height: ${({ theme }) => theme.screen.rem(2)}px;

  border-radius: ${({ theme }) => theme.screen.rem(1)}px;
`


