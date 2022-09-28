import styled from 'styled-components/native';
import { Image, View } from 'react-native';
import { Text } from '@shared/common/components/Text';


export const Container = styled(View)`

  padding: ${({ theme }) => theme.screen.rem(.4)}px 0;
  margin: ${({ theme }) => theme.screen.rem(.4)}px 0;
`

export const Content = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({theme}) => theme.screen.rem(.2)}px;
`;

export const UserAvatar = styled(Image)`
  width: ${({ theme }) => theme.screen.rem(2.25)}px;
  height: ${({ theme }) => theme.screen.rem(2.25)}px;
  border-radius: ${({ theme }) => theme.screen.rem(1.125)}px;

  border: 1px solid ${({ theme }) => theme.palette.colors.secondary};
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
`;

export const CreatedAtText = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(.7)}px;
  font-family: ${({ theme }) => theme.palette.fonts.light};
`;
