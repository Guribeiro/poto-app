import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import Scroll from '../Scroll';

export const Content = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.screen.rem(0.625)}px 0;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`;

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps): JSX.Element => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    enabled
  >
    <Content>
      <Scroll>{children}</Scroll>
    </Content>
  </KeyboardAvoidingView>
);

export default Container;