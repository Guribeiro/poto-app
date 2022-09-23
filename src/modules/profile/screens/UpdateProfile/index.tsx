import styled from 'styled-components/native';
import { View } from 'react-native';
import { Text } from '@shared/common/components/Text';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const UpdateProfile = ():JSX.Element => {
  return (
    <Container>
      <Text>Olá, UpdateProfile screen</Text>
    </Container>
  )
}

export default UpdateProfile;
