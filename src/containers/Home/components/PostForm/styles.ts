import styled from 'styled-components/native';
import { Image, TouchableOpacity, FlatList, FlatListProps } from 'react-native';
import { Feather } from '@expo/vector-icons'



export const Container = styled.View``;

export const Content = styled.View`
  padding: ${({ theme }) => theme.screen.rem(.8)}px;
`;

export const PostImage = styled(Image)`
  width: 100%;
  height: ${({ theme }) => theme.screen.rem(30.0625)}px;
`;

export const TouchableContainer = styled.View`
  position: absolute;
  padding: ${({ theme }) => theme.screen.rem(2)}px ${({ theme }) => theme.screen.rem(.8)}px;
`;

export const Touchable = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.screen.rem(.5)}px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.shapes.strong};
  font-size: ${({ theme }) => theme.screen.rem(1.8, true)}px;
`;


