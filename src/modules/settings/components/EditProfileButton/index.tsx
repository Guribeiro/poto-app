import React from 'react';
import styled from 'styled-components/native';
import Common from './Common';
import Password from './Password';
import Username from './Username';

export const Container = styled.View``;

interface EditProfileButtonProps {
  label: string;
  children: string;
  type: 'common' | 'username' | 'password';
  onPress(): void;
}

const EditProfileButton = ({
  label,
  children,
  type,
  onPress,
}: EditProfileButtonProps): JSX.Element => (
  <Container>
    {type === 'common' && (
      <Common label={label} onPress={onPress}>
        {children}
      </Common>
    )}
    {type === 'password' && (
      <Password label={label} onPress={onPress}>
        {children}
      </Password>
    )}
    {type === 'username' && (
      <Username label={label} onPress={onPress}>
        {children}
      </Username>
    )}
  </Container>
);

export default EditProfileButton;
