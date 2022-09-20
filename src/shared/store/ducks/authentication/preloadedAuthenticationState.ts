import { STORAGE_AUTHENTICATION_KEY } from './sagas';
import { Authentication } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const preloadedAuthenticationState = (): Promise<Authentication> => {
  return new Promise(async (resolve) => {
    const storagedData = await AsyncStorage.getItem(STORAGE_AUTHENTICATION_KEY);

    if (!storagedData) return {} as Authentication;

    const { token, user, refresh_token } = JSON.parse(storagedData);

    const data: Authentication = {
      token,
      user,
      refresh_token,
    };

    const authenticationState = {
      data,
      error: false,
      loading: false,
    };

    return authenticationState;
  })
};

export default preloadedAuthenticationState;
