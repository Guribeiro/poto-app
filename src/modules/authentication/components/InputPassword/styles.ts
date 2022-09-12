import styled, { css } from 'styled-components/native';
import { TextInputProps, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text } from '../../../../shared/common/components/Text';


interface FocusedProps {
  isFocused?: boolean;
}

export const Container = styled.View`
`;

export const Label = styled(Text)`
  text-align: center;
`;

export const InputText = styled(TextInput)`
  flex: 1;
  color: ${({theme}) => theme.palette.colors.white};
`;

export const InputTextContainer = styled(View) <FocusedProps>`
  margin-top: ${({ theme }) => theme.screen.rem(4.75)}px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.palette.colors.white};

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-color: ${theme.palette.colors.secondary};
  `}
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;
`;

export const TextInputRow = styled.View`
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


export const TogglePasswordVisibility = styled(TouchableOpacity)`
  padding-bottom: 4px;
`;