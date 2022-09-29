import { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { bindActionCreators, Dispatch } from 'redux';

import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { RootFeedParamsList, PostCommentsParams } from '@modules/feed/routes';

import { ApplicationState } from '@shared/store';
import * as PostsActions from '@shared/store/ducks/posts/actions';
import Touchable from '@shared/common/components/Touchable';
import { AddPostCommentPayload, Comment, PostsState, Post } from '@shared/store/ducks/posts/types';

import api from '@shared/services/api';

import PostComment from './components/PostComment';

import {
  Container,
  Header,
  HeaderContent,
  TouchableContainer,
  UsernameText,
  Icon,
  PostCommentsList,
  AddPostCommentForm,
  SendPostCommentTouchableIcon,
  PostCommentTextInput,
  SendPostCommentTouchable
} from './styles';
import { Text } from '@shared/common/components/Text';

interface FormData {
  content: string;
}

interface StateProps {
  posts: PostsState;
}

interface DispatchProps {
  addPostComment(data: AddPostCommentPayload): void;
}

type PostCommentsProps = DispatchProps & StateProps;

type PostCommentsScreenProps = NativeStackNavigationProp<RootFeedParamsList, 'Feed'>

const schema = yup.object().shape({
  content: yup.string().required(),
})



const PostComments = ({ addPostComment, posts }: PostCommentsProps): JSX.Element => {
  const { goBack } = useNavigation<PostCommentsScreenProps>();

  const [comments, setComments] = useState<Array<Comment>>(() => {
    const post = posts.data.find((post) => post.id === post_id)
    return post ? post.comments : []
  });

  const { handleSubmit, control, watch, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { params } = useRoute();

  const { post_id } = params as PostCommentsParams;

  const inputCommentPositionX = useSharedValue(0);

  const inputCommentStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      bottom: inputCommentPositionX.value,
      right:0,
      left: 0,
    }
  });

  const content = watch('content');

  const onSubmitPostComment = useCallback(({ content }: FormData) => {
    if (!post_id) return;

    addPostComment({
      post_id,
      content
    });

    reset();
  }, [post_id]);

  useEffect(() => {
    const post = posts.data.find((post) => post.id === post_id);

    setComments(post ? post.comments : [])
  }, [posts])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
      inputCommentPositionX.value = withTiming(event.endCoordinates.height, {
        duration: 200,
        easing: Easing.ease
      });
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', () => {
      inputCommentPositionX.value = withTiming(0, {
        duration: 100,
        easing: Easing.ease
      });
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    }
  }, [])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <TouchableContainer>
            <Touchable onPress={goBack}>
              <Icon name='x' />
            </Touchable>
          </TouchableContainer>
          <UsernameText>Comentários</UsernameText>
        </HeaderContent>
      </Header>

      <PostCommentsList
        refreshing={posts.loading}
        data={comments}
        renderItem={({ item }) => <PostComment comment={item} />}
        keyExtractor={item => item.id}
      />

      {posts.loading && <ActivityIndicator />}

      <Animated.View style={inputCommentStyle}>
        <AddPostCommentForm>
          <Controller
            name='content'
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
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
            {posts.loading ? (
              <ActivityIndicator />
            ) : (
              <SendPostCommentTouchableIcon name='send' disabled={!content} />
            )}
          </SendPostCommentTouchable>
        </AddPostCommentForm>
      </Animated.View>


    </Container>

  )
}

const mapStateToProps = ({ posts }: ApplicationState) => ({
  posts
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(PostsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostComments)
