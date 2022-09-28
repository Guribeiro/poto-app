import {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
  Dispatch,
  useEffect,
} from 'react';
import { Keyboard } from 'react-native';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

import PostCommentModal from '@modules/feed/components/PostCommentModal';
import { Post } from '@modules/feed/components/Post';
import api from '@shared/services/api';

interface PostCommentContextData {
  openPostCommentModal(post: Post): void;
  closePostCommentModal(): void;
  setPost: Dispatch<React.SetStateAction<Post | undefined>>
}

interface SendPostCommentProps {
  post_id: string;
  content: string;
}

const PostCommentContext = createContext<PostCommentContextData>({} as PostCommentContextData);

interface PostCommentProviderProps {
  children: ReactNode;
}

const PostCommentProvider = ({ children }: PostCommentProviderProps): JSX.Element => {

  const [post, setPost] = useState<Post | undefined>()

  const inputCommentOpacity = useSharedValue(1);
  const inputCommentPositionX = useSharedValue(900);

  const inputCommentStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: inputCommentOpacity.value,
      transform: [{ translateY: inputCommentPositionX.value }],
    }
  });

  const openPostCommentModal = useCallback((post: Post) => {
    setPost(post);

    inputCommentOpacity.value = withTiming(1, {
      duration: 100,
      easing: Easing.ease
    });
    inputCommentPositionX.value = withTiming(0, {
      duration: 200,
      easing: Easing.ease
    });
  }, []);

  const closePostCommentModal = useCallback(() => {
    Keyboard.dismiss();
    inputCommentPositionX.value = withTiming(900, {
      duration: 200,
      easing: Easing.ease
    })
    inputCommentOpacity.value = withTiming(0, {
      duration: 100,
      easing: Easing.ease
    });

    setPost(undefined);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
      inputCommentPositionX.value = withTiming(-event.endCoordinates.height, {
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
    <PostCommentContext.Provider value={{ closePostCommentModal, openPostCommentModal, setPost }}>
      {children}
      <Animated.View style={inputCommentStyle}>
        <PostCommentModal onRequestClose={closePostCommentModal} post={post} />
      </Animated.View>
    </PostCommentContext.Provider>
  )
}

function usePostComment(): PostCommentContextData {
  const context = useContext(PostCommentContext);

  if (!context) {
    throw new Error('')
  }

  return context;
}

export { PostCommentProvider, usePostComment }
