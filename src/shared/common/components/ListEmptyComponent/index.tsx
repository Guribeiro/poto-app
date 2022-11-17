import styled from 'styled-components/native';
import { View } from 'react-native'
import LottieView from 'lottie-react-native';
import source from '@shared/common/assets/lottie/no-data-found.json';

import { Text } from '../Text';

const Container = styled(View)`
  align-items: center;
`;

const NotFoundTextContainer = styled(View)`
  margin-top: ${({theme}) => theme.screen.rem(2)}px;
  padding: ${({theme}) => theme.screen.rem(1)}px;
`;

const NotFoundText = styled(Text)`
  text-align: center;
  font-size: ${({theme}) => theme.screen.rem(1.6)}px;
  line-height:${({theme}) => theme.screen.rem(2.4)}px;
`;

const ListEmptyComponent = (): JSX.Element => {
  return (
    <Container>
      <LottieView
        autoPlay
        style={{
          height:  200,
        }}
        source={source}
      />
      <NotFoundTextContainer>
        <NotFoundText>Sorry, all we have is a continuous area which is free, available and unoccupied.</NotFoundText>
      </NotFoundTextContainer>
    </Container>
  )
}

export default ListEmptyComponent;
