import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

export type LocationStatus =
  | 'idle'
  | 'requesting'
  | 'granted'
  | 'denied'
  | 'unavailable'
  | 'error';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export function useCurrentLocation() {
  const [status, setStatus] = useState<LocationStatus>('idle');
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestLocation = useCallback(async () => {
    setStatus('requesting');
    setErrorMessage(null);

    try {
      const { status: permissionStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (permissionStatus !== 'granted') {
        setStatus('denied');
        setErrorMessage(
          'Location permission was denied. Enable it in your device settings to use this feature.',
        );
        return;
      }

      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        setStatus('unavailable');
        setErrorMessage('Location services are turned off on this device.');
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setStatus('granted');
    } catch (err) {
      setStatus('error');
      setErrorMessage('Could not retrieve your location. Please try again.');
    }
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return { status, coords, errorMessage, refresh: requestLocation };
}