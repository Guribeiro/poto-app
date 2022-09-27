import { useCallback, useMemo } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Like } from '@shared/store/ducks/posts/types';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import Touchable from '@shared/common/components/Touchable';
import { User, AuthenticationState } from '@shared/store/ducks/authentication/types';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ApplicationState } from '@shared/store';
import * as PostsActions from '@shared/store/ducks/posts/actions';
import { LikePostPayload } from '@shared/store/ducks/posts/types';

import heartImage from '@shared/common/assets/heart/heart-like.png';

import {
  Container,
  UserProfile,
  UserAvatar,
  UserName,
  PostImage,
  InteractionContainer,
  Icon,
  PostSubtitleContainer,
  PostSubtitleText,
  PostOwnerName,
  CreatedAtContainer,
  CreatedAtText,
  HeartLikeImage
} from './styles';



export interface Post {
  id: string;
  subtitle: string;
  photo: string;
  created_at: Date;
  user: User;
  likes: Array<Like>
  _count_likes: number;
}

interface OwnProps {
  post: Post;
}

interface StateProps {
  authentication: AuthenticationState
}

interface DispatchProps {
  likePost(data: LikePostPayload): void;
}

type PostProps = OwnProps & StateProps & DispatchProps;

const Post = ({ post, authentication, likePost }: PostProps): JSX.Element => {

  const { data } = authentication;
  const { photo, subtitle, user, created_at, likes } = post;

  const uri = `http://10.0.0.175:3333/files/posts/${photo}`;

  const avatarUri = user.avatar ?
    `http://10.0.0.175:3333/files/avatars/${user.avatar}` :
    `https://ui-avatars.com/api/?name=${user.full_name}&length=1`;

  const isPostLiked = useMemo(() => {
    const isLiked = likes.find(like => like.user_id === data.user.id);
    return !!isLiked
  }, [likes]);

  const iconLikeOpacity = useSharedValue(0);
  const iconLikeScale = useSharedValue(1);

  const iconLikeStyle = useAnimatedStyle(() => {
    return {
      opacity: iconLikeOpacity.value,
      transform: [{ scale: iconLikeScale.value }],
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      position: 'absolute'
    }
  })

  const createdAtPostFormatDistance = useCallback(() => {
    const todayDate = new Date();
    return formatDistance(new Date(created_at),
      todayDate, { addSuffix: true, locale: ptBR })
  }, []);

  const handleShowLikeIndicator = useCallback(() => {

    iconLikeOpacity.value = withTiming(
      1,
      {
        duration: 200,
        easing: Easing.ease
      }, () => {
        'worklet'
        runOnJS(likePost)({post_id: post.id });
        iconLikeScale.value = withTiming(
          1.25,
          {
            duration: 200,
            easing: Easing.ease
          }, () => {
            iconLikeScale.value = withTiming(
              1,
              {
                duration: 200,
                easing: Easing.ease
              },
              () => {
                iconLikeOpacity.value = withTiming(
                  0,
                  {
                    duration: 300,
                    easing: Easing.ease
                  }
                )
              }
            )
          }
        )
      }
    )
  }, [post]);



  return (
    <Container>

      <UserProfile>
        <UserAvatar source={{ uri: avatarUri }} />

        <UserName>{user.full_name}</UserName>
      </UserProfile>

      <PostImage source={{ uri }} />

      <Animated.View style={iconLikeStyle}>
        <HeartLikeImage source={heartImage} />
      </Animated.View>

      <InteractionContainer>
        <Touchable onPress={() => handleShowLikeIndicator()}>
          <Icon isLiked={isPostLiked} name='heart' />
        </Touchable>
        <Touchable>
          <Icon name='message-circle' />
        </Touchable>
        <Touchable>
          <Icon name='share-2' />
        </Touchable>
      </InteractionContainer>

      <PostSubtitleContainer>
        <PostSubtitleText>
          <PostOwnerName>{user.full_name}{' '}</PostOwnerName>
          {subtitle}
        </PostSubtitleText>
      </PostSubtitleContainer>
      <CreatedAtContainer>
        <CreatedAtText>{createdAtPostFormatDistance()}</CreatedAtText>
      </CreatedAtContainer>
    </Container>
  )
}

const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication
})


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(PostsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
