import styled from 'styled-components/native';

interface SpaceProps {
  size: number;
  horizontal?: boolean;
}

const Spacer = styled.View<SpaceProps>`
  ${({ theme, horizontal, size }) =>
    horizontal
      ? `width: ${theme.screen.rem(size / 16)}px`
      : `height: ${theme.screen.rem(size / 16)}px`}
`;

export default Spacer;
