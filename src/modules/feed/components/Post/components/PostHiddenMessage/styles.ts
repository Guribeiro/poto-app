import { View } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { Text } from '@shared/common/components/Text';

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;
`;

export const Container = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.screen.rem(1)}px;
`;

export const StrongText = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(1.2, true)}px;
  font-family: ${({ theme }) => theme.palette.fonts.bold};
  color: ${({ theme }) => theme.palette.colors.texts.light};
`;

export const LightText = styled(Text)`
  text-align: center;
  font-size: ${({ theme }) => theme.screen.rem(1.2, true)}px;
  font-family: ${({ theme }) => theme.palette.fonts.regular};
  color: ${({ theme }) => theme.palette.colors.texts.light};
`;
