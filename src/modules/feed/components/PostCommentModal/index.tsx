import { useCallback } from 'react';
import { TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { bindActionCreators, Dispatch } from 'redux';

import { Post } from '@modules/feed/components/Post';

import { ApplicationState } from '@shared/store';
import * as PostsActions from '@shared/store/ducks/posts/actions';
import { AddPostCommentPayload, PostsState } from '@shared/store/ducks/posts/types';

import {
  Container,
  Content,
  PostCommentTextInput,
  Icon,
  SendPostCommentTouchable
} from './styles';

interface FormData {
  content: string;
}

const schema = yup.object().shape({
  content: yup.string().required(),
})

interface StateProps {
  posts: PostsState;
}

interface OwnProps {
  onRequestClose(): void;
  post: Post | undefined;
}

interface DispatchProps {
  addPostComment(data: AddPostCommentPayload): void;
}

type PostCommentModalProps = OwnProps & StateProps & DispatchProps;

const PostCommentModal = ({ onRequestClose, post, addPostComment, posts }: PostCommentModalProps): JSX.Element => {

  const { loading } = posts;

  const { control, handleSubmit, reset, watch } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const content = watch('content');

  const onSubmitPostComment = useCallback(({ content }: FormData) => {
    if (!post) return;

    addPostComment({
      post_id: post.id,
      content
    });

    onRequestClose();

    reset();
  }, [post]);

  console.log(content);


  return (
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <Container>
        <Content>
          <Controller
            name='content'
            control={control}
            render={({ field: { value, onChange } }) => (
              <PostCommentTextInput
                placeholder='Adicione um comentário'
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <SendPostCommentTouchable
            onPress={handleSubmit(onSubmitPostComment)}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Icon name='send' disabled={!content} />
            )}
          </SendPostCommentTouchable>
        </Content>
      </Container>
    </TouchableWithoutFeedback>
  )
}

const mapStateToProps = ({ posts }: ApplicationState) => ({
  posts
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(PostsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCommentModal)
