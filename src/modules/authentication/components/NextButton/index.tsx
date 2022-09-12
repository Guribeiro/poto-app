import styled, {css} from 'styled-components/native';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';

import {Feather} from '@expo/vector-icons';

interface ContainerProps {
  disabled: boolean;
}

const Container = styled(View)<ContainerProps>`
  border-radius: ${({theme}) => theme.screen.rem(.8)}px;
  background-color: ${({theme}) => theme.palette.colors.secondary};

  align-items: center;
  justify-content: center;

  ${({disabled}) => disabled && css`
    opacity: 0.5;
  `}
`;

const Touchable = styled(TouchableOpacity)`
  padding: ${({theme}) => theme.screen.rem(1)}px;
`;

const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.8, true)}px;
`;

const NextButton = ({disabled, ...props}:TouchableOpacityProps):JSX.Element => {
  return (
    <Container disabled={!!disabled}>
      <Touchable disabled={!!disabled} {...props}>
        <Icon name='arrow-right' />
      </Touchable>
    </Container>
  )
}

export default NextButton;