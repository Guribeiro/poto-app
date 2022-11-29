import { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

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
      const { expires, status, granted } = await requestForegroundPermissionsAsync();

      console.log({ expires, status, granted })
    } catch (error) {
      console.log(error);
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
