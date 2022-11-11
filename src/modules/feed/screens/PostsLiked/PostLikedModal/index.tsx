import { useMemo } from 'react';
import styled from 'styled-components';
import { Image, Modal, View, ModalProps } from 'react-native';

import { Like } from '../PostLiked';

import Touchable from '@shared/common/components/Touchable';
import { Feather } from '@expo/vector-icons';


export const Container = styled(Modal)`
  border: 1px solid red;
  padding: ${({ theme }) => theme.screen.rem(2)}px;
`;

export const ImageFullScreen = styled(Image)`
  width: 100%;
  height: 200px;

  border-radius: ${({theme}) => theme.screen.rem(.4)}px;
`;

export const Content = styled(View)`
  flex: 1;
  padding: ${({theme}) => theme.screen.rem(.5)}px;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.colors.primary};
`;

export const CloseModalButton = styled(Touchable)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.colors.secondary};
`;

const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.8, true)}px;
`;

interface PostLikedModal extends ModalProps {
  like: Like | undefined;
}

const PostLikedModal = ({ like, visible, onRequestClose }: PostLikedModal): JSX.Element => {
  const postImageUri = useMemo(() => {
    return like?.post ? `http://10.0.0.76:3333/files/posts/${like.post.photo}` : ''
  }, [like]);

  return (
    <Container
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="slide"
      presentationStyle='pageSheet'
    >
      <Content>
        <ImageFullScreen source={{ uri: postImageUri }} />
        <CloseModalButton onPress={onRequestClose}>
          <Icon name='arrow-down' />
        </CloseModalButton>
      </Content>
    </Container>
  )
}

export default PostLikedModal;
