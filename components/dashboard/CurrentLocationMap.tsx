import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Coordinates, LocationStatus } from '../../hooks/useCurrentLocation';

type Props = {
  status: LocationStatus;
  coords: Coordinates | null;
  errorMessage: string | null;
  height?: number;
};

export default function CurrentLocationMap({ status, coords, errorMessage, height = 180 }: Props) {
  if (status === 'idle' || status === 'requesting') {
    return (
      <View style={[styles.card, styles.center, { height }]}>
        <ActivityIndicator color="#091426" />
        <Text style={styles.stateText}>Getting your location…</Text>
      </View>
    );
  }

  if (status === 'denied' || status === 'unavailable' || status === 'error' || !coords) {
    return (
      <View style={[styles.card, styles.center, { height }]}>
        <Text style={styles.stateTextError}>
          {errorMessage ?? 'Location is unavailable right now.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.card, { height }]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={coords} title="Your location" pinColor="#e15347" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e6eeff',
  },
  map: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center', padding: 16 },
  stateText: { marginTop: 8, color: '#45474c', fontSize: 13, fontWeight: '600' },
  stateTextError: { color: '#ba1a1a', fontSize: 13, fontWeight: '600', textAlign: 'center' },
});