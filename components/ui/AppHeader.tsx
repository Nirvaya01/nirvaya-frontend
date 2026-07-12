import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type AppHeaderProps = {
  onSettingsPress?: () => void;
};

export default function AppHeader({ onSettingsPress }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.iconBtn}
        onPress={() => (router.canGoBack() ? router.back() : null)}
      >
        <Ionicons name="arrow-back" size={22} color="#091426" />
      </TouchableOpacity>
      <Text style={styles.title}>Nirvaya</Text>
      <TouchableOpacity style={styles.iconBtn} onPress={onSettingsPress}>
        <Ionicons name="settings-outline" size={22} color="#091426" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 8,
    backgroundColor: '#f8f9ff',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#091426',
    letterSpacing: -0.2,
  },
});