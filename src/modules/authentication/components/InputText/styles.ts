import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { Text } from '../../../../shared/common/components/Text';

export const Container = styled.View``;

interface TextInputRowProps {
  error: boolean;
}

export const InputTextContainer = styled(TextInput)`
  color: ${({ theme }) => theme.palette.colors.texts.medium};
  height: ${({ theme }) => theme.screen.rem(2.375)}px;
  flex: 1;
`;

export const InputLabel = styled(Text)`
  text-transform: capitalize;
  font-family: ${({ theme }) => theme.palette.fonts.regular};
  line-height: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const TextInputRow = styled.View<TextInputRowProps>`
  flex-direction: row;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: 1px ;
  border-bottom-color: ${({ theme, error }) =>
      error ? theme.palette.colors.red : theme.palette.colors.texts.light};
`;
