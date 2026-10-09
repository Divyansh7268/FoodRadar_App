import { useState, useRef, useCallback, useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import * as Location from 'expo-location';

export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  timestamp: number;
}

export type LocationLoadingStep =
  | 'idle'
  | 'requesting_permission'
  | 'detecting_location'
  | 'success'
  | 'error';

export type LocationErrorType =
  | 'permission_denied'
  | 'settings_required'
  | 'services_disabled'
  | 'timeout'
  | 'unknown';

export interface LocationErrorState {
  type: LocationErrorType;
  message: string;
  canOpenSettings: boolean;
}

export function useDeviceLocation() {
  const [loadingStep, setLoadingStep] = useState<LocationLoadingStep>('idle');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [errorState, setErrorState] = useState<LocationErrorState | null>(null);

  // Request ID ref to prevent stale async callbacks from updating UI
  const currentRequestIdRef = useRef<number>(0);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      currentRequestIdRef.current += 1;
    };
  }, []);

  /**
   * Cancels any pending location request and resets state to idle
   */
  const cancelRequest = useCallback(() => {
    currentRequestIdRef.current += 1;
    setLoadingStep('idle');
    setCoordinates(null);
    setErrorState(null);
  }, []);

  /**
   * Opens device settings so user can manually grant permission
   */
  const openAppSettings = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        await Linking.openSettings();
      } else {
        await Linking.openURL('app-settings:');
      }
    } catch {
      await Linking.openSettings();
    }
  }, []);

  /**
   * Initiates the real foreground location acquisition flow
   */
  const requestLocation = useCallback(async (): Promise<{
    success: boolean;
    coords?: Coordinates;
    error?: LocationErrorState;
  }> => {
    // Generate new request ID to invalidate any prior in-flight attempts
    const requestId = ++currentRequestIdRef.current;

    // Check helper: is this request still the active one?
    const isCurrent = () => isMountedRef.current && currentRequestIdRef.current === requestId;

    try {
      setErrorState(null);
      setLoadingStep('requesting_permission');

      // 1. Request Foreground Location Permission
      const permissionResponse = await Location.requestForegroundPermissionsAsync();

      if (!isCurrent()) {
        return { success: false };
      }

      if (permissionResponse.status !== Location.PermissionStatus.GRANTED) {
        const canAskAgain = permissionResponse.canAskAgain;
        const err: LocationErrorState = {
          type: canAskAgain ? 'permission_denied' : 'settings_required',
          message: canAskAgain
            ? 'Location permission is required to detect nearby food places. Please allow permission.'
            : 'Location permission was denied. Please enable location permissions in your device settings to continue.',
          canOpenSettings: !canAskAgain,
        };

        setErrorState(err);
        setLoadingStep('error');
        setCoordinates(null);
        return { success: false, error: err };
      }

      // 2. Check if Location Services (GPS) are enabled on device
      setLoadingStep('detecting_location');

      const servicesEnabled = await Location.hasServicesEnabledAsync();

      if (!isCurrent()) {
        return { success: false };
      }

      if (!servicesEnabled) {
        const err: LocationErrorState = {
          type: 'services_disabled',
          message:
            'Device location (GPS) is turned off. Please turn on location services in your phone settings to detect nearby food.',
          canOpenSettings: true,
        };

        setErrorState(err);
        setLoadingStep('error');
        setCoordinates(null);
        return { success: false, error: err };
      }

      // 3. Acquire current GPS position with timeout
      // Wrapped in a race with a timeout of 12 seconds
      const positionPromise = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('LOCATION_TIMEOUT')), 12000)
      );

      const locationResult = await Promise.race([positionPromise, timeoutPromise]);

      if (!isCurrent()) {
        return { success: false };
      }

      const newCoords: Coordinates = {
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
        accuracy: locationResult.coords.accuracy ?? null,
        timestamp: locationResult.timestamp,
      };

      setCoordinates(newCoords);
      setLoadingStep('success');
      setErrorState(null);

      return { success: true, coords: newCoords };
    } catch (error: any) {
      if (!isCurrent()) {
        return { success: false };
      }

      const isTimeout = error?.message === 'LOCATION_TIMEOUT';
      const err: LocationErrorState = {
        type: isTimeout ? 'timeout' : 'unknown',
        message: isTimeout
          ? 'Location request timed out. Please ensure GPS is active and tap Retry.'
          : error?.message || 'Failed to detect your current location. Please try again.',
        canOpenSettings: false,
      };

      setErrorState(err);
      setLoadingStep('error');
      setCoordinates(null);
      return { success: false, error: err };
    }
  }, []);

  return {
    loadingStep,
    coordinates,
    errorState,
    requestLocation,
    cancelRequest,
    openAppSettings,
  };
}
