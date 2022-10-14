import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { StorageKeys } from '../constants/storageKeys';

interface RefreshTokenResponse {
  refresh_token: string;
  updated_token: string;
}

const api = axios.create({
  baseURL: 'http://10.0.0.154:3333',
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});


api.interceptors.response.use((response) => {
  return response
}, async (error: AxiosError) => {
  try {

    const storagedData = await AsyncStorage.getItem(StorageKeys.STORAGE_AUTHENTICATION_KEY);

    if (!storagedData) return Promise.reject(error);

    const { user, token, refresh_token } = JSON.parse(storagedData);

    if (error.response?.status === 401 && token) {
      const { data } = await api.post<RefreshTokenResponse>('/sessions/refresh_token', {
        token: refresh_token
      });

      const { refresh_token: refreshed_token, updated_token } = data;

      api.defaults.headers.common['Authorization'] = `Bearer ${updated_token}`;

      await AsyncStorage.setItem(
        StorageKeys.STORAGE_AUTHENTICATION_KEY,
        JSON.stringify({ token: updated_token, user, refresh_token: refreshed_token }),
      );

      return;
    }

    AsyncStorage.removeItem(StorageKeys.STORAGE_AUTHENTICATION_KEY)

    console.log({ error1: error });
  } catch (error) {
    console.log({ error2: error });
  }
})

export default api;
