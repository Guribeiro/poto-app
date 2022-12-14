import styled from 'styled-components/native';

import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';

import { Text } from '../../../../shared/common/components/Text';


const { statusBarHeight } = Constants;
export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background: ${({ theme }) => theme.palette.colors.primary};
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: ${({ theme }) => theme.screen.rem(2)}px
    ${({ theme }) => theme.screen.rem(.8)}px;
  align-items: center;
  justify-content: space-between;

`;

export const BackgroundShadeContainer = styled.View`
  flex: 1;

  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  background-color: ${({ theme }) => theme.palette.colors.primary};
  opacity: .4;
`;

export const Header = styled.View`
   padding: ${({ theme }) => theme.screen.rem(1) + statusBarHeight}px
    ${({ theme }) => theme.screen.rem(0.625)}px
    ${({ theme }) => theme.screen.rem(1)}px;
  width: 100%;

`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.secondary};
  font-size: ${({ theme }) => theme.screen.rem(1.8, true)}px;
`;

export const LogoContainer = styled.View`
  margin-top: ${({theme}) => theme.screen.rem(2)}px;
  align-items: center;
`;

export const FormContainer = styled.View`
  width: 100%;
`;

export const EmphasizedText = styled(Text)`
  color: ${({ theme }) => theme.palette.colors.secondary};
`;

export const Footer = styled.View`
  width: 100%;

  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.palette.colors.texts.light};
  border-top-style: solid;

  padding: ${({ theme }) => theme.screen.rem(1)}px 0;

  align-items: center;

`;

export const CreateNewAccountContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

`;

export const ButtonContainer = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(4)}px;
`;
