import { Platform } from 'react-native';
import {
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
  launchCameraAsync,
  launchImageLibraryAsync,
  ImagePickerResult,
  MediaTypeOptions,
  ImagePickerOptions
} from 'expo-image-picker';
import Toast from 'react-native-toast-message';

export interface PickerOptions {
  options?: ImagePickerOptions
}

export const requestMediaLibraryPermissions = async () => {
  try {
    if (Platform.OS !== 'web') {
      const { status } = await requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error(
          'Desculpe, não temos permissão de acesso às suas fotos',
        )
      }
    }
  } catch (error) {
    const err = error as Error;
    Toast.show({
      type: 'error',
      text1: `${err.message} 😥`,
    });
  }
}

export const requestCameraPermissions = async () => {
  try {
    if (Platform.OS !== 'web') {
      const { status } = await requestCameraPermissionsAsync();

      if (status !== 'granted') {
        throw new Error(
          'Desculpe, não temos permissão de acesso à sua câmera',
        );
      }
    }
  } catch (error) {
    const err = error as Error;
    Toast.show({
      type: 'error',
      text1: `${err.message} 😥`,
    });
  }
}

export const launchCamera = async ({ options }: PickerOptions): Promise<ImagePickerResult> => {
    await requestCameraPermissions();

    const defaultOptions: ImagePickerOptions = {
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    }

    const imagePickerResult = await launchCameraAsync(options || defaultOptions);

    return imagePickerResult;
}

export const launchImageLibrary = async ({ options }: PickerOptions): Promise<ImagePickerResult> => {
  await requestMediaLibraryPermissions();

  const defaultOptions: ImagePickerOptions = {
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [9, 16],
    quality: 1,
  }

  const imagePickerResult = await launchImageLibraryAsync(options || defaultOptions);

  return imagePickerResult;
}
