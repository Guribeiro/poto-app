import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import {lighten} from 'polished';
import { Text } from '../../../../shared/common/components/Text';

export const Container = styled.View``;

interface TextInputRowProps {
  error: boolean;
}

export const InputTextContainer = styled(TextInput)`
  flex: 1;
  color: ${({ theme }) => theme.palette.colors.texts.light};
  height: ${({ theme }) => theme.screen.rem(5.375)}px;
  border-radius: ${({theme}) => theme.screen.rem(0.5)}px;
  padding: ${({theme}) => theme.screen.rem(.5)}px;
  background: ${({theme}) => lighten(.05, theme.palette.colors.primary)};
`;

export const InputLabel = styled(Text)`
  text-transform: capitalize;
  font-family: ${({ theme }) => theme.palette.fonts.regular};
  line-height: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const TextInputRow = styled.View<TextInputRowProps>`
  flex-direction: row;
  align-items: center;
`;

export const ErrorText = styled(Text)`
  padding-top: 4px;
  color: ${({ theme }) => theme.palette.colors.red};
  text-align: right;

  position: absolute;
  bottom: -24px;
  right: 0;
`;
