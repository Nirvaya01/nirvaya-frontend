import React, { useRef, useEffect } from 'react';
import { Animated, TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

type Props = {
  onPress?: () => void;
  label?: string;
};

export const SosButton: React.FC<Props> = ({ onPress, label = 'SOS' }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(progress, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [progress]);

  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });
  const opacity = progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0.7] });

  const v = theme.components.button.variants.sos;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          {
            width: (v as any).width,
            height: (v as any).height,
            borderRadius: (v as any).borderRadius,
            backgroundColor: (v as any).backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
          },
          { transform: [{ scale }], opacity },
        ]}
      >
        <Text style={{ color: (v as any).color, fontFamily: theme.typography.fontFamily, fontSize: 18, fontWeight: '700' }}>{label}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default SosButton;
