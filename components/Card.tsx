import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import theme from '../theme';

type Props = {
  variant?: 'default' | 'elevated' | 'alert';
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export const Card: React.FC<Props> = ({ variant = 'default', children, style }) => {
  const v = theme.components.card[variant] as {
    backgroundColor: string;
    borderRadius: number;
    padding: number;
    borderColor?: string;
    borderWidth?: number;
  };

  const container: ViewStyle = {
    backgroundColor: v.backgroundColor,
    borderColor: v.borderColor,
    borderWidth: v.borderWidth || 0,
    borderRadius: v.borderRadius,
    padding: v.padding,
    ...(v as any).shadowColor ? { shadowColor: (v as any).shadowColor, shadowOpacity: (v as any).shadowOpacity, shadowRadius: (v as any).shadowRadius, shadowOffset: (v as any).shadowOffset, elevation: (v as any).elevation } : {},
  };

  return (
    <View style={[container, style]}>
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </View>
  );
};

export default Card;
