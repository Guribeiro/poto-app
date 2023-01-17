import {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
  useMemo
} from 'react'

import { ImagePickerAsset } from 'expo-image-picker';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import { launchCamera, launchImageLibrary, PickerOptions } from '@shared/utils/imagePicker';
import { verifyErrorInstance } from '@shared/utils/errors';

import { RootFeedParamsList } from '@modules/feed/routes';

import SelectMediaModal from '../components/SelectMediaModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface SelectMedialModalContextData {
  onLaunchCamera: () => Promise<void>;
  onLaunchMediaLibrary: () => Promise<void>;
  openSelectImageModal: () => void;
  closeSelectImageModal: () => void;
}

const SelectMediaModalConext = createContext<SelectMedialModalContextData>(
  {} as SelectMedialModalContextData
);

interface SelectMediaModalProvider {
  children: ReactNode;
}

type FeedScreenProps = NativeStackNavigationProp<RootFeedParamsList>;

const SelectMediaModalProvider = ({ children }: SelectMediaModalProvider): JSX.Element => {
  const INITIAL_VALUE = -1000;
  const FINAL_VALUE = 0;

  const DURATION = 300;

  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation<FeedScreenProps>();

  const uploadImageOffset = useSharedValue(INITIAL_VALUE);

  const updateImageStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: '100%',
      height: '100%',
      bottom: uploadImageOffset.value,
    };
  });

  const openSelectImageModal = useCallback(() => {
    uploadImageOffset.value = withTiming(FINAL_VALUE, {
      duration: DURATION,
      easing: Easing.ease,
    });
  }, [uploadImageOffset]);

  const closeSelectImageModal = useCallback(() => {
    uploadImageOffset.value = withTiming(INITIAL_VALUE, {
      duration: DURATION,
      easing: Easing.ease,
    });
  }, [uploadImageOffset, INITIAL_VALUE]);

  const onLaunchCamera = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const { canceled, assets } = await launchCamera({} as PickerOptions);

      if (canceled) return;

      closeSelectImageModal();

      const [image] = assets;

      navigate('CreatePost', {
        image,
      });

    } catch (error) {
      const err = error as Error;
      Toast.show({
        type: 'error',
        text1: `${err.message} 😥`,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const onLaunchMediaLibrary = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const imagePickerResult = await launchImageLibrary({} as PickerOptions);

      if (imagePickerResult.canceled) return;

      closeSelectImageModal();

      const [image] = imagePickerResult.assets;

      navigate('CreatePost', {
        image,
      });

    } catch (err) {
      const { error } = verifyErrorInstance(err)
      Toast.show({
        type: 'error',
        text1: `${error} 😥`,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => {
    return {
      onLaunchCamera,
      onLaunchMediaLibrary,
      openSelectImageModal,
      closeSelectImageModal
    }
  }, []);

  return (
    <SelectMediaModalConext.Provider value={value}>
      {children}
      <Animated.View
        style={updateImageStyle}
      >
        <SelectMediaModal
          loading={false}
          onRequestClose={closeSelectImageModal}
          onLaunchMediaLibrary={onLaunchMediaLibrary}
          onLaunchCamera={onLaunchCamera}
        />
      </Animated.View>
    </SelectMediaModalConext.Provider>
  )
}

function useSelectMediaModal() {
  const context = useContext(SelectMediaModalConext);

  if (!context) {
    throw new Error('useSelectMediaModal should be used within an SelectMediaModal')
  }

  return context;
}

export { SelectMediaModalProvider, useSelectMediaModal };
