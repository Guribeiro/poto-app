import styled from 'styled-components/native';
import {TouchableOpacityProps, TouchableOpacity, ActivityIndicator} from 'react-native';

import { Text } from '../Text';

const Container = styled.View`
  background: ${({theme}) => theme.palette.colors.secondary};
  border-radius: ${({theme}) => theme.screen.rem(0.5)}px;
`;

const Touchable = styled(TouchableOpacity)`
  padding: ${({theme}) => theme.screen.rem(1)}px;
  align-items: center;
`;

type ButtonProps = {
  children: string;
  loading?: boolean;
} & TouchableOpacityProps;

const Button = ({ children, loading, ...rest }: ButtonProps): JSX.Element => {
  return (
    <Container>
      <Touchable {...rest}>
        {loading ? <ActivityIndicator /> : <Text>{children}</Text>}
      </Touchable>
    </Container>
  )
}

export default Button
