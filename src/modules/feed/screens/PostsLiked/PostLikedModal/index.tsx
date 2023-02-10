import { useMemo } from 'react';
import styled from 'styled-components/native';
import { Image, Modal, View, ModalProps } from 'react-native';

import { Like } from '../PostLiked';

export const Container = styled(Modal)`
  border: 1px solid red;
  padding: ${({ theme }) => theme.screen.rem(2)}px;
`;

export const ImageFullScreen = styled(Image)`
  width: 100%;
  height: 100%;

  border-radius: ${({theme}) => theme.screen.rem(.4)}px;
`;

export const Content = styled(View)`
  flex: 1;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.colors.primary};
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
      </Content>
    </Container>
  )
}

export default PostLikedModal;
