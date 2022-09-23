import React, { useState, useCallback } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@shared/hooks/theme';
import {
  Container,
  InputLabel,
  TextInputRow,
  InputText,
  TogglePasswordVisibilityButton,
} from './styles';

interface EditProfileTextProps extends TouchableOpacityProps {
  label: string;
  children: string;
}

const Password = ({ label, children }: EditProfileTextProps): JSX.Element => {
  const [isVisibile, setIsVisible] = useState(false);

  const { theme } = useTheme();

  const handleVisibility = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  return (
    <Container>
      <InputLabel>{label}</InputLabel>
      <TextInputRow>
        <InputText>{isVisibile ? children : '***********'}</InputText>
        <TogglePasswordVisibilityButton onPress={handleVisibility}>
          {isVisibile ? (
            <Feather
              name="eye-off"
              size={theme.screen.rem(1.375, true)}
              color={theme.palett.colors.text}
            />
          ) : (
            <Feather
              name="eye"
              size={theme.screen.rem(1.375, true)}
              color={theme.palett.colors.text}
            />
          )}
        </TogglePasswordVisibilityButton>
      </TextInputRow>
    </Container>
  );
};

export default Password;
