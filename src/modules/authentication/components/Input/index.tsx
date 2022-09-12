import { useState } from 'react';
import styled, { css } from 'styled-components/native';
import { Text } from '../../../../shared/common/components/Text';
import { TextInputProps, View, TextInput } from 'react-native';

interface FocusedProps {
  isFocused?: boolean;
}

const Container = styled.View`
`;

const Label = styled(Text)`
  text-align: center;
`;

const InputText = styled(TextInput)`
  color: ${({theme}) => theme.palette.colors.white};
`;

const InputTextContainer = styled(View) <FocusedProps>`
  margin-top: ${({ theme }) => theme.screen.rem(4.75)}px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.palette.colors.white};

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-color: ${theme.palette.colors.secondary};
  `}
`;

const ErrorText = styled(Text)`
  padding-top: 4px;
  color: ${({theme}) => theme.palette.colors.red};
  text-align: right;

  position: absolute;
  bottom: -24px;
  right: 0;
`;

interface InputProps extends TextInputProps {
  label?: string;
  error?: string | undefined;
}


const Input = ({ label, error, ...rest }: InputProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Container>
      <Label>{label}</Label>
      <InputTextContainer isFocused={isFocused}>
        <InputText
          keyboardAppearance="dark"
          autoCapitalize="words"
          autoCorrect={false}
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </InputTextContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  )
}

export default Input;