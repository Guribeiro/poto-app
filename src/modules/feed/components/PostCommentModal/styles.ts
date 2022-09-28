import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { lighten } from 'polished';
import Touchable from '@shared/common/components/Touchable';
import { Feather } from '@expo/vector-icons';


export const Container = styled(View)`
  flex: 1;
  position: absolute;
  height: 100%;
  width: 100%;

  justify-content: flex-end;
`;

export const Content = styled(View)`
  bottom: 0;
  flex-direction: row;
  background: ${({ theme }) => theme.palette.colors.primary};
  padding: ${({ theme }) => theme.screen.rem(2)}px ${({ theme }) => theme.screen.rem(.8)}px;
`

export const PostCommentTextInput = styled(TextInput)`
  flex: 1;
  padding: ${({ theme }) => theme.screen.rem(.8)}px;
  color: ${({theme}) => theme.palette.colors.texts.medium};
  border: 1px solid ${({ theme }) => lighten(.05, theme.palette.colors.primary)};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;
`;

export const SendPostCommentTouchable = styled(Touchable)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.screen.rem(.8)}px;

  border: 1px solid ${({ theme }) => lighten(.05, theme.palette.colors.primary)};
`
