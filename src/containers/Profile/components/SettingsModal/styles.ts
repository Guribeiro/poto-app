import styled, {css} from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@shared/common/components/Text';


interface ColorProps {
  color: string;
  selected: boolean;
}

export const Container = styled(View)`
  flex: 1;
  position: absolute;
  justify-content: flex-end;
  bottom: 0;
  height: 100%;
  width: 100%;
`;

export const Content = styled(View)`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.colors.secondary};

  align-items: center;
  height: 62%;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);

  border-top-width: 0.5px;
  border-top-color: ${({ theme }) => theme.palette.colors.texts.medium};
`;

export const Title = styled(Text)`
  padding: ${({ theme }) => theme.screen.rem(1)}px 0;
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;
`;

export const Color = styled(View) <ColorProps>`
  width: ${({ theme }) => theme.screen.rem(4)}px;
  height: ${({ theme }) => theme.screen.rem(8)}px;
  border-radius: ${({ theme }) => theme.screen.rem(1)}px;
  border: 1px solid ${({ theme }) => theme.palette.colors.texts.strong};
  background: ${({ color }) => color};

  ${({ selected }) => selected && css`
    border: 2px solid black;
  `}
`;

export const SelectColorButton = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.screen.rem(.8)}px;
  margin: ${({ theme }) => theme.screen.rem(.8)}px;
`;
