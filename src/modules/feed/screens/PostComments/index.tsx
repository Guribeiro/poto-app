import { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, Keyboard, View } from 'react-native';
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
import { AddPostCommentPayload, RemovePostCommentPayload, Comment, PostsState, Post } from '@shared/store/ducks/posts/types';

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
  SendPostCommentTouchable,
  PostSubtitleContainer,
  PostOwnerName,
  PostSubtitleText,
  UserAvatar
} from './styles';

interface FormData {
  content: string;
}

interface StateProps {
  posts: PostsState;
}

interface DispatchProps {
  addPostComment(data: AddPostCommentPayload): void;
  removePostComment(data: RemovePostCommentPayload): void;
}

type PostCommentsProps = DispatchProps & StateProps;

type PostCommentsScreenProps = NativeStackNavigationProp<RootFeedParamsList, 'Feed'>

const schema = yup.object().shape({
  content: yup.string().required(),
})

const PostComments = ({ addPostComment, posts, removePostComment }: PostCommentsProps): JSX.Element => {
  const { params } = useRoute();

  const { post_id } = params as PostCommentsParams;

  const { goBack } = useNavigation<PostCommentsScreenProps>();

  const [post, setPost] = useState<Post>(() => {
    const post = posts.data.find((post) => post.id === post_id)
    return post || {} as Post
  });

  const { handleSubmit, control, watch, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const inputCommentPositionX = useSharedValue(0);

  const inputCommentStyle = useAnimatedStyle(() => {
    return {
      bottom: inputCommentPositionX.value,
      right: 0,
      left: 0,
    }
  });

  const content = watch('content');

  const avatarUri = post.user.avatar ?
    `http://10.0.0.175:3333/files/avatars/${post.user.avatar}` :
    `https://ui-avatars.com/api/?name=${post.user.full_name}&length=1`;

  const onSubmitPostComment = useCallback(({ content }: FormData) => {
    if (!post_id) return;

    addPostComment({
      post_id,
      content
    });

    reset();
  }, [post_id]);

  const onDeletePostComment = useCallback(async (comment_id: string) => {

    setPost(prev => ({
      ...prev,
      comments: prev.comments.filter((comment) => comment.id !== comment_id)
    }))

    removePostComment({
      post_id,
      comment_id,
    });

  }, [removePostComment]);

  useEffect(() => {
    const post = posts.data.find((post) => post.id === post_id);

    setPost(post || {} as Post)
  }, [posts]);

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
        data={post.comments}
        renderItem={({ item }) => <PostComment comment={item} onDelete={() => onDeletePostComment(item.id)} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <PostSubtitleContainer>
            <UserAvatar source={{ uri: avatarUri }} />
            <View style={{ marginHorizontal: 16, }}>
              <PostOwnerName>{post.user.full_name}</PostOwnerName>
              <PostSubtitleText>{post.subtitle}</PostSubtitleText>
            </View>
          </PostSubtitleContainer>
        )}
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
