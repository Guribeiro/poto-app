import { TouchableWithoutFeedback } from 'react-native';
import Loading from '@shared/common/components/Loading';
import Spacer from '@shared/common/components/Spacer';

import {
  Container,
  Content,
  Body,
  Title,
  Button,
  Icon,
  ButtonText,
  CloseButton,
} from './styles';

type SelectMediaModal = {
  loading: boolean;
  onRequestClose(): void;
  onLaunchMediaLibrary(): Promise<void>;
  onLaunchCamera(): Promise<void>;
};

const SelectMediaModal = ({
  onRequestClose,
  loading,
  onLaunchMediaLibrary,
  onLaunchCamera
}: SelectMediaModal): JSX.Element => {

  return (
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <Container>
        <Content>
          <Body>
            <Title>Selecione o seu momento</Title>
            <Button onPress={onLaunchCamera}>
              <Icon name="camera" />
              <ButtonText>Câmera</ButtonText>
            </Button>
            <Spacer size={16} />
            <Button onPress={onLaunchMediaLibrary}>
              <Icon name="image" />
              <ButtonText>Galeria</ButtonText>
            </Button>
          </Body>
          {loading ? (
            <Loading />
          ) : (
            <CloseButton onPress={onRequestClose}>
              <Icon name="chevrons-down" />
            </CloseButton>
          )}
        </Content>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SelectMediaModal;
