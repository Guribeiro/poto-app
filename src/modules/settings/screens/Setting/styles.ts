import styled from 'styled-components/native';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text } from '@shared/common/components/Text';

import { lighten } from 'polished';

export const Container = styled.View`
  flex: 1;
  display: flex;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

export const EditProfileButtonsContainer = styled(View)``;

export const EditProfileButtonContainer = styled(View)`
  margin: ${({ theme }) => theme.screen.rem(.5)}px;
`;

export const SettingButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(.8)}px 0;
`;

export const SettingButtonText = styled(Text)`
  font-family: ${({ theme }) => theme.palette.fonts.bold};
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;
  margin-left: ${({ theme }) => theme.screen.rem(1)}px;
`

export const SelectedThemeCircle = styled(View)`
  width: ${({ theme }) => theme.screen.rem(1.4)}px;
  height: ${({ theme }) => theme.screen.rem(1.4)}px;

  border-radius: ${({ theme }) => theme.screen.rem(.7)}px;

  border: 2px solid ${({ theme }) => lighten(.3, theme.palette.colors.secondary)};
  background: ${({ theme }) => theme.palette.colors.secondary};
`;

export const SettingsButtonsContainer = styled(View)``;

export const SettingsButtonContainer = styled(View)``;


export const Content = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    justifyContent: 'space-between',
    flex: 1
  }
}))`
  flex: 1;
  padding: ${({ theme }) => theme.screen.rem(3)}px
    ${({ theme }) => theme.screen.rem(.8)}px
    ${({ theme }) => theme.screen.rem(1.6)}px;
`;


