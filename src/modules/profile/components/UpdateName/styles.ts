import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text } from '@shared/common/components/Text';

export const Container = styled.View`
  flex: 1;
  display: flex;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

export const Header = styled(View)`
  padding: ${({ theme }) => theme.screen.rem(3)}px
  ${({ theme }) => theme.screen.rem(.8)}px
  ${({ theme }) => theme.screen.rem(1.6)}px;

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


export const UsernameText = styled(Text)`
  font-family: ${({ theme }) => theme.palette.fonts.bold};
  font-size: ${({ theme }) => theme.screen.rem(1.8, true)}px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.6, true)}px;
`;

export const EditProfileButtonsContainer = styled(View)``;

export const EditProfileButtonContainer = styled(View)`
  margin: ${({theme}) => theme.screen.rem(.5)}px;
`;


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


