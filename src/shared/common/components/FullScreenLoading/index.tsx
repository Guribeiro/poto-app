import styled, { css } from 'styled-components/native';
import { transparentize } from 'polished';
import {ActivityIndicator} from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  background: ${({ theme }) => transparentize(.5, theme.palette.colors.primary)};
`;

const FullScreenLoading = (): JSX.Element => {
  return (
    <Container>
      <ActivityIndicator />
    </Container>
  )
}

export default FullScreenLoading
