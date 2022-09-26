import { useCallback } from 'react';
import { ApplicationState } from '@shared/store';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useRoute } from '@react-navigation/native';
import InputTextArea from '@modules/authentication/components/InputTextArea';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

import { RootFeedParamsList, CreatePostParams } from '@modules/feed/routes';
import Spacer from '@shared/common/components/Spacer';
import Button from '@shared/common/components/Button';
import Scroll from '@shared/common/components/Scroll';
import * as PostsActions from '@shared/store/ducks/posts/actions';
import { AddPostPayload, PostsState } from '@shared/store/ducks/posts/types';

import { Container, PostImage, Content, TouchableContainer, Touchable, Icon } from './styles';

type CreatePostScreenProps = NativeStackNavigationProp<RootFeedParamsList, 'CreatePost'>

interface FormData {
  subtitle: string;
}

interface StateProps {
  posts: PostsState;
}

interface DispatchProps {
  addPost(payload: AddPostPayload): void;
}

type CreatePostProps = StateProps & DispatchProps;

const CreatePost = ({ addPost }: CreatePostProps): JSX.Element => {
  const INITIAL_MEDIA_HEIGHT = 440
  const FINAL_MEDIA_HEIGHT = 240;

  const { params } = useRoute();
  const { goBack } = useNavigation<CreatePostScreenProps>()

  const { image } = params as CreatePostParams;

  const { control, handleSubmit } = useForm<FormData>();

  const mediaHeight = useSharedValue(INITIAL_MEDIA_HEIGHT);

  const mediaStyle = useAnimatedStyle(() => {
    return {
      height: mediaHeight.value,
    }
  });

  const onInputFocus = useCallback(() => {
    mediaHeight.value = withTiming(
      FINAL_MEDIA_HEIGHT,
      {
        duration: 200,
        easing: Easing.ease
      }
    )
  }, []);

  const onInputBlur = useCallback(() => {
    mediaHeight.value = withTiming(
      INITIAL_MEDIA_HEIGHT,
      {
        duration: 200,
        easing: Easing.ease
      }
    )
  }, []);

  const onSubmit = useCallback(async ({ subtitle }: FormData) => {

    addPost({
      image,
      subtitle
    });

    goBack()

  }, [image])

  return (
    <Container>
      <Scroll>
        <Animated.View style={mediaStyle}>
          <PostImage source={{ uri: image.uri }} />
        </Animated.View>
        <Content>
          <Controller
            name='subtitle'
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <InputTextArea
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                placeholder='Adicione uma legenda a sua foto'
                value={value}
                onChangeText={onChange}
                error={error && error.message}
              />
            )}
          />

          <Spacer size={32} />
          <Button onPress={handleSubmit(onSubmit)}>Enviar</Button>
        </Content>


        <TouchableContainer>
          <Touchable onPress={goBack}>
            <Icon name='arrow-left' />
          </Touchable>
        </TouchableContainer>
      </Scroll>
    </Container>
  )
}

const mapStateToProps = ({ posts }: ApplicationState) => ({
  posts,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(PostsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);

