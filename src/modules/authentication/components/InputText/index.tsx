import React from 'react';
import { TextInputProps } from 'react-native';
// import TextError from '@modules/transactions/components/Inputs/TextError';
import { Container, InputTextContainer, InputLabel, TextInputRow, ErrorText } from './styles';

interface InputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  error?: string | undefined;
}

const InputText = ({
  label,
  required,
  error,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <Container>
      {error && <ErrorText>{error}</ErrorText>}
      <InputLabel>
        {label}
        {required && '*'}
      </InputLabel>
      <TextInputRow error={!!error}>
        <InputTextContainer
          keyboardAppearance="dark"
          autoCapitalize="sentences"
          autoCorrect={false}
          {...rest}
        />
      </TextInputRow>
    </Container>
  );
};

export default InputText;
