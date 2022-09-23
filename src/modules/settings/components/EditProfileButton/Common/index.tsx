import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, InputLabel, TextInputRow, InputText } from './styles';

interface EditProfileTextProps extends TouchableOpacityProps {
  label: string;
  children: string;
}

const Common = ({
  label,
  children,
  ...rest
}: EditProfileTextProps): JSX.Element => (
  <Container {...rest}>
    <InputLabel>{label}</InputLabel>
    <TextInputRow>
      <InputText>{children}</InputText>
    </TextInputRow>
  </Container>
);

export default Common;
