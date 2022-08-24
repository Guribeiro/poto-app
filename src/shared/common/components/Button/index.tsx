import styled from 'styled-components/native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { Text } from '../Text';

const Container = styled.View`
  background: ${({theme}) => theme.palette.colors.secondary};
  border-radius: ${({theme}) => theme.screen.rem(0.5)}px;

`;

const Touchable = styled(RectButton)`
  padding: ${({theme}) => theme.screen.rem(1)}px;
  align-items: center;
`;

type ButtonProps = {
  children: string;
  loading?: boolean;
} & RectButtonProps;

const Button = ({ children, loading, ...rest }: ButtonProps): JSX.Element => {
  return (
    <Container>
      <Touchable {...rest}>
        <Text>{children}</Text>
      </Touchable>
    </Container>
  )
}

export default Button