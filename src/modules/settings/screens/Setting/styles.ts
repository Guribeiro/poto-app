import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
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
  flex-direction: row;
  justify-content: center;
  align-items: center;

`;

export const HeaderContent = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TouchableContainer = styled.View`
  position: absolute;
  left: ${({ theme }) => theme.screen.rem(.8)}px;
`;


export const UsernameText = styled(Text)`
  font-family: ${({ theme }) => theme.palette.fonts.bold};
  font-size: ${({ theme }) => theme.screen.rem(1.8, true)}px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.6, true)}px;
`;

export const Content = styled.View`
  padding: ${({ theme }) => theme.screen.rem(3)}px
    ${({ theme }) => theme.screen.rem(.8)}px
    ${({ theme }) => theme.screen.rem(1.6)}px;

  flex: 1;
  justify-content: flex-end;
`;

