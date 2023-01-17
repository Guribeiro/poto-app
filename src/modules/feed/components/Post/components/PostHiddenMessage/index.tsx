import Spacer from '@shared/common/components/Spacer';
import Button from '@shared/common/components/Button';
import { useSelectMediaModal } from '@modules/feed/hooks/selectMediaModal';

import { Container, Icon, StrongText, LightText } from './styles';

const PostHiddenMessage = (): JSX.Element => {
  const { openSelectImageModal } = useSelectMediaModal();
  return (
    <Container>
      <Icon name='eye-off' />
      <Spacer size={8} />
      <StrongText>Postar para ver</StrongText>
      <Spacer size={8} />
      <LightText>Para ver os momentos dos seus amigos, compartilhe o seu com eles.</LightText>
      <Spacer size={16} />
      <Button onPress={openSelectImageModal}>Adicionar meu momento de hoje</Button>
    </Container>
  )
}

export default PostHiddenMessage;
