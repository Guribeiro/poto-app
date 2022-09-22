import styled from 'styled-components/native';
import {Text as NativeText} from 'react-native';

export const Text = styled(NativeText)`
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  font-family: ${({ theme }) => theme.palette.fonts.bold};
  color: ${({ theme }) => theme.palette.colors.texts.light};
`;
