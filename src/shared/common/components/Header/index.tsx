import { View } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import Touchable from '@shared/common/components/Touchable';
import { Text } from '@shared/common/components/Text'


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

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.6, true)}px;
`;

export const UsernameText = styled(Text)`
  font-family: ${({ theme }) => theme.palette.fonts.bold};
  font-size: ${({ theme }) => theme.screen.rem(1.8, true)}px;
`;

interface HeaderProps {
  onGoback: () => void;
  label?: string;
}

const Header = ({label, onGoback}:HeaderProps): JSX.Element => {
  return (
    <Container>
      <HeaderContent>
        <TouchableContainer>
          <Touchable onPress={onGoback}>
            <Icon name='x' />
          </Touchable>
        </TouchableContainer>
        {label && <UsernameText>{label}</UsernameText>}
      </HeaderContent>
    </Container>

  )
}

export default Header;
