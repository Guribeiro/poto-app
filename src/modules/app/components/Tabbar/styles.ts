import styled, { css } from 'styled-components/native';
import { darken } from 'polished';
import { Feather } from '@expo/vector-icons';
import { Image, View, TouchableOpacity } from 'react-native';

import { Text } from '@shared/common/components/Text';

type SelectedProps = {
  selected: boolean;
};

type ContainerProps = {
  display: string;
};

export const Container = styled(View)<ContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  background: ${({ theme }) => theme.palette.colors.secondary};
  border-top-width: 0.5px;
  border-top-color: ${({ theme }) => theme.palette.colors.texts.strong};

  ${({ display }) =>
    css`
      display: ${display};
  `}
`;

export const Touchable = styled(TouchableOpacity) <SelectedProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => theme.screen.rem(3.125)}px;

  ${({ selected }) => selected && css`
    background: ${({ theme }) => darken(0.05, theme.palette.colors.secondary)};
  `}

`;

export const TouchableText = styled(Text) <SelectedProps>`
  font-family: ${({ theme }) => theme.palette.fonts.bold};
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  margin-top: ${({ theme }) => theme.screen.rem(0.1)}px;

  color: ${({ theme, selected }) =>
    selected
      ? theme.palette.colors.white
      : theme.palette.colors.texts.medium};
`;

export const Icon = styled(Feather) <SelectedProps>`
  font-size: ${({ theme }) => theme.screen.rem(1.6, true)}px;

  color: ${({ theme, selected }) =>
    selected
      ? theme.palette.colors.shapes.strong
      : theme.palette.colors.texts.light};
`;


export const UserAvatar = styled(Image)`
  width: ${({ theme }) => theme.screen.rem(2)}px;
  height: ${({ theme }) => theme.screen.rem(2)}px;
  border-radius: ${({ theme }) => theme.screen.rem(1)}px;
`;
