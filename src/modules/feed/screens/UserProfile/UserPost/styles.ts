import { View, Image } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  margin: ${({ theme }) => theme.screen.rem(.1)}px;
  display: flex;
  flex-grow: 1;
`;

export const PostImage = styled(Image)`
  width: 100%;
  max-width: ${({ theme }) => theme.screen.rem(8)}px;
  height: ${({ theme }) => theme.screen.rem(8)}px;

  border-radius: ${({theme}) => theme.screen.rem(.2)}px;
`

export const Empty = styled(View)`
  width: 100%;
  max-width: ${({ theme }) => theme.screen.rem(8)}px;
  height: ${({ theme }) => theme.screen.rem(8)}px;
  background: transparent;
`;

