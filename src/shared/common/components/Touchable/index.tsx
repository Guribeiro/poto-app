import { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled(TouchableOpacity)`
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;
`;

interface TouchableProps extends TouchableOpacityProps {
  children?: ReactNode;
  text?: string;
}


const Touchable = ({children, text, ...props}: TouchableProps): JSX.Element => {
  return (
    <Container {...props}>
        {children || text}
    </Container>
  )
}

export default Touchable;
