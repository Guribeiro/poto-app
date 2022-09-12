import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';

import styled from 'styled-components/native';
import { Text } from '../../../../shared/common/components/Text';

const { statusBarHeight } = Constants;


export const Content = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.screen.rem(2)}px;
  align-items: center;
  width: 100%;
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

export const Title = styled(Text)`
    font-size: ${({ theme }) => theme.screen.rem(2, true)}px;
`;

export const SubTitle = styled(Text)`
  text-align: center;
`;

export const TextContainer = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(2.9375)}px;
`;



export const Form = styled.View`
  width: 100%;
  margin-top: ${({ theme }) => theme.screen.rem(8)}px;
`;

export const NextButtonContainer = styled.View`
  align-self: flex-end;
  margin-top: ${({theme}) => theme.screen.rem(4.75)}px;
`;