import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { Image, TouchableOpacity } from 'react-native';
import { lighten } from 'polished';
import { Text } from '@shared/common/components/Text';

export const Container = styled.View`
  flex: 1;
  display: flex;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

export const Header = styled.View`
  padding: ${({ theme }) => theme.screen.rem(3)}px
  ${({ theme }) => theme.screen.rem(.8)}px
  ${({ theme }) => theme.screen.rem(1.6)}px;

  background-color: ${({ theme }) => theme.palette.colors.secondary};
  border-bottom-left-radius: ${({ theme }) => theme.screen.rem(1.6)}px;
  border-bottom-right-radius: ${({ theme }) => theme.screen.rem(1.6)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserProfileDetails = styled(Row)`
  justify-content: center;
`

export const UsernameText = styled(Text)`
  font-family: ${({ theme }) => theme.palette.fonts.bold};
  font-size: ${({ theme }) => theme.screen.rem(1.8, true)}px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;
`;

export const UpdateProfileButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.screen.rem(.8)}px;
  border-radius: 5px;
  background: ${({ theme }) => lighten(.1, theme.palette.colors.primary)};
`
