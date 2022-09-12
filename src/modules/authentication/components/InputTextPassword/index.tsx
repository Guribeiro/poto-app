import React, {useState, useCallback} from 'react';
import { TextInputProps } from 'react-native';
// import TextError from '@modules/transactions/components/Inputs/TextError';
import { 
    Container, 
    InputTextContainer, 
    InputLabel, 
    TextInputRow, 
    ErrorText,
    TogglePasswordVisibility,
    Icon
   } from './styles';

interface InputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  error?: string | undefined;
}

const InputTextPassword = ({
  label,
  required,
  error,
  ...rest
}: InputProps): JSX.Element => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);


  const handlePasswordVisibility = useCallback(() => {
    setPasswordVisibility(prev => !prev);
  }, []);
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
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          {...rest}
        />
         <TogglePasswordVisibility onPress={handlePasswordVisibility}>
            <Icon name={passwordVisibility ? 'eye' : 'eye-off'} />
          </TogglePasswordVisibility>
      </TextInputRow>
    </Container>
  );
};

export default InputTextPassword;
