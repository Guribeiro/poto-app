import { useCallback, useMemo, memo } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Share, TouchableOpacity } from 'react-native';
import { formatDistance } from 'date-fns';
import { createURL, useURL } from 'expo-linking';
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS
} from 'react-native-reanimated';

import { ENDPOINT_URL } from '@env';

import { RootFeedParamsList } from '@modules/feed/routes'

import Touchable from '@shared/common/components/Touchable';
import { User, AuthenticationState } from '@shared/store/ducks/authentication/types';
import { ApplicationState } from '@shared/store';
import { Comment, Like } from '@shared/store/ducks/posts/types';
import * as PostsActions from '@shared/store/ducks/posts/actions';
import { LikePostPayload } from '@shared/store/ducks/posts/types';
import heartImage from '@shared/common/assets/heart/heart-like.png';

import {
  Container,
  UserProfile,
  UserAvatar,
  Header,
  MoreHorizontalTouchable,
  UserName,
  PostImageContainer,
  PostImage,
  InteractionContainer,
  Icon,
  PostSubtitleContainer,
  PostSubtitleText,
  PostOwnerName,
  CreatedAtContainer,
  CreatedAtText,
  HeartLikeImage,
  PostCommentTouchableContainer,
  PostCommentTouchable,
  PostCommentTouchableText,
  PostCommentUserAvatar
} from './styles';


export interface Post {
  id: string;
  subtitle: string;
  photo: string;
  created_at: Date;
  user: User;
  likes: Array<Like>
  comments: Array<Comment>
  _likes_count: number;
  _comments_count: number;
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

type PostScreenProps = NativeStackNavigationProp<RootFeedParamsList, 'Feed'>;

const Post = ({ post, authentication, likePost }: PostProps): JSX.Element => {

  const { data } = authentication;
  const { photo, subtitle, user, created_at, likes } = post;

  const { navigate } = useNavigation<PostScreenProps>()
  const calledUrl = useURL()

  const uri = `${ENDPOINT_URL}/files/posts/${photo}`;

  const avatarUri = useMemo(() => {
    return data.user.avatar ?
      `${ENDPOINT_URL}/files/avatars/${data.user.avatar}` :
      `https://ui-avatars.com/api/?name=${data.user.full_name}&length=1`;
  }, [data])

  const postOwnerAvatarUri = useMemo(() => {
    return user.avatar ?
      `${ENDPOINT_URL}/files/avatars/${user.avatar}` :
      `https://ui-avatars.com/api/?name=${user.full_name}&length=1`;
  }, [user])


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
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      position: 'absolute',
    }
  })

  const createdAtPostFormatDistance = useMemo(() => {
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
        runOnJS(likePost)({ post_id: post.id });
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

  const onShare = useCallback(async () => {
    try {
      const url = createURL(`post`, {
        scheme: 'poto',
        isTripleSlashed: true,
        queryParams: {
          'post_id': post.id
        }
      });

      console.log(url);

      const result = await Share.share({
        title: 'Título',
        url,
      }, {
        dialogTitle: `Compartilhar post de ${post.user.full_name}`,
        subject: post.subtitle,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  }, [post, createURL])

  return (
    <Container>
      <Header>
        <UserProfile>
          <TouchableOpacity onPress={() => navigate('UserProfile', {
            user_id: user.id
          })}>
            <UserAvatar source={{ uri: postOwnerAvatarUri }} />
          </TouchableOpacity>

          <UserName>{user.full_name}</UserName>
        </UserProfile>

        <MoreHorizontalTouchable>
          <Icon name='more-horizontal' />
        </MoreHorizontalTouchable>
      </Header>

      <TapGestureHandler numberOfTaps={2} onActivated={handleShowLikeIndicator}>
        <PostImageContainer>
          <PostImage source={{ uri }} />
          <Animated.View style={iconLikeStyle}>
            <HeartLikeImage source={heartImage} />
          </Animated.View>
        </PostImageContainer>
      </TapGestureHandler>


      <InteractionContainer>
        <Touchable onPress={handleShowLikeIndicator}>
          <Icon isLiked={isPostLiked} name='heart' />
        </Touchable>
        <Touchable onPress={() => navigate('PostComments', { post_id: post.id })}>
          <Icon name='message-circle' />
        </Touchable>
        <Touchable onPress={onShare}>
          <Icon name='share-2' />
        </Touchable>
      </InteractionContainer>

      <PostSubtitleContainer>
        <PostSubtitleText>
          <PostOwnerName>{user.username || user.full_name}{' '}</PostOwnerName>
          {subtitle}
        </PostSubtitleText>
      </PostSubtitleContainer>

      {!!post.comments?.length && (
        <Touchable onPress={() => navigate('PostComments', { post_id: post.id })}>
          <PostCommentTouchableText>Ver todos os {post._comments_count} comentários</PostCommentTouchableText>
        </Touchable>
      )}

      <PostCommentTouchableContainer>
        <PostCommentUserAvatar source={{ uri: avatarUri }} />
        <PostCommentTouchable onPress={() => navigate('PostComments', { post_id: post.id })}>
          <PostCommentTouchableText>Adicionar comentário</PostCommentTouchableText>
        </PostCommentTouchable>
      </PostCommentTouchableContainer>

      <CreatedAtContainer>
        <CreatedAtText>{createdAtPostFormatDistance}</CreatedAtText>
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
)(memo(Post))
