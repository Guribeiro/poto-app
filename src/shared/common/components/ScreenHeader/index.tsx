import { View } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { Text } from '@shared/common/components/Text';

import Touchable from '../Touchable';


export const Container = styled(View)`
  padding: ${({ theme }) => theme.screen.rem(3)}px
  ${({ theme }) => theme.screen.rem(.8)}px
  ${({ theme }) => theme.screen.rem(1.6)}px;

  background-color: ${({ theme }) => theme.palette.colors.secondary};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const HeaderContent = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TouchableContainer = styled(View)`
  position: absolute;
  left: 0;
`;


export const UsernameText = styled(Text)`
  font-family: ${({ theme }) => theme.palette.fonts.bold};
  font-size: ${({ theme }) => theme.screen.rem(1.8, true)}px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.6, true)}px;
`;

interface ScreenHeaderProps {
  onPress: () => void;
  title: string;
}

const ScreenHeader = ({ title, onPress }: ScreenHeaderProps): JSX.Element => {
  return (
    <Container>
      <HeaderContent>
        <TouchableContainer>
          <Touchable onPress={onPress}>
            <Icon name='x' />
          </Touchable>
        </TouchableContainer>
        <UsernameText>{title}</UsernameText>
      </HeaderContent>
    </Container>
  )
}

export default ScreenHeader;
