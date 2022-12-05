import { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import Toast from 'react-native-toast-message';

interface LocationContextData {
  location: Location | undefined
}

const LocationContext = createContext<LocationContextData>({} as LocationContextData);

interface LocationProviderProps {
  children: ReactNode;
}

interface Location {
  latitude: number;
  longitude: number;
}

const LocationProvider = ({ children }: LocationProviderProps): JSX.Element => {
  const [location, setLocation] = useState<Location | undefined>();

  const requestForegroundPermissions = useCallback(async () => {
    try {
      await requestForegroundPermissionsAsync();

    } catch (error) {
      const err = error as Error;
      Toast.show({
        type: 'error',
        text1: `${err.message} 😥`,
      });
    }
  }, []);

  const getCurrentPosition = useCallback(async () => {
    try {
      const { coords } = await getCurrentPositionAsync();

      const { latitude, longitude } = coords;

      console.log(coords)

      setLocation({
        latitude,
        longitude
      });

    } catch (error) {
      const err = error as Error;
      Toast.show({
        type: 'error',
        text1: `${err.message} 😥`,
      });
    }
  }, [])

  useEffect(() => {
    requestForegroundPermissions();

    getCurrentPosition();
  }, [])

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  )
}

function useLocation(): LocationContextData {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocation should be used within a LocationProvider')
  }
  return context;
}


export { useLocation, LocationProvider }
