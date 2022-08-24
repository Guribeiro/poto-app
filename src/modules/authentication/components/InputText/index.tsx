import React from 'react';
import { TextInputProps } from 'react-native';
// import TextError from '@modules/transactions/components/Inputs/TextError';
import { Container, InputTextContainer, InputLabel, TextInputRow } from './styles';

interface InputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  error?: boolean | undefined;
}

const InputText = ({
  label,
  required,
  error,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <Container>
      {/* {error && <TextError>{error.message}</TextError>} */}
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
