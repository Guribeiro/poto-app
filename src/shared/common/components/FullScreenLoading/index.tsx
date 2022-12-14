import styled, { css } from 'styled-components/native';
import { transparentize } from 'polished';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { useTheme } from '@shared/hooks/theme';

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

const FullScreenLoading = ({ size = 'small' }: ActivityIndicatorProps): JSX.Element => {
  const { theme } = useTheme();
  return (
    <Container>
      <ActivityIndicator size={size} color={theme.palette.colors.secondary} />
    </Container>
  )
}

export default FullScreenLoading
