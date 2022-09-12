import { useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import {
  Container,
  Label,
  InputTextContainer,
  TextInputRow,
  InputText,
  TogglePasswordVisibility,
  Icon,
  ErrorText
} from './styles';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string | undefined;
}


const InputPassword = ({ label, error, ...rest }: InputProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);


  const handlePasswordVisibility = useCallback(() => {
    setPasswordVisibility(prev => !prev);
  }, []);


  return (
    <Container>
      <Label>{label}</Label>
      <InputTextContainer isFocused={isFocused}>
        <TextInputRow>
          <InputText
            keyboardAppearance="dark"
            autoCapitalize="words"
            autoCorrect={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={passwordVisibility}
            {...rest}
          />
          <TogglePasswordVisibility onPress={handlePasswordVisibility}>
            <Icon name={passwordVisibility ? 'eye' : 'eye-off'} />
          </TogglePasswordVisibility>
        </TextInputRow>
      </InputTextContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  )
}

export default InputPassword;