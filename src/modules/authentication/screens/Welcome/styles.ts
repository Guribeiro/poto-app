import styled from 'styled-components/native';
import { Text } from '../../../../shared/common/components/Text';

export const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  background: ${({ theme }) => theme.palette.colors.primary};
`;

export const Content = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.screen.rem(2)}px;

  justify-content: space-between;
`;

export const Footer = styled.View``;

export const WelcomeTextContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.screen.rem(1)}px;
`

export const WelcomeText = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(2, true)}px;
`;

export const EmphasizedText = styled(Text)`
  color: ${({theme}) => theme.palette.colors.secondary};
`;


export const ButtonContainer = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(4)}px;
`;