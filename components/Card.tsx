import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import designTheme from '../theme';
import { useAppTheme } from '@/hooks/useAppTheme';

type Props = {
  variant?: 'default' | 'elevated' | 'alert';
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export const Card: React.FC<Props> = ({ variant = 'default', children, style }) => {
  const appTheme = useAppTheme();
  const v = designTheme.components.card[variant] as {
    backgroundColor: string;
    borderRadius: number;
    padding: number;
    borderColor?: string;
    borderWidth?: number;
  };

  const container: ViewStyle = {
    backgroundColor: appTheme.surface,
    borderColor: appTheme.border,
    borderWidth: v.borderWidth || 0,
    borderRadius: v.borderRadius,
    padding: v.padding,
    ...(v as any).shadowColor ? { shadowColor: (v as any).shadowColor, shadowOpacity: (v as any).shadowOpacity, shadowRadius: (v as any).shadowRadius, shadowOffset: (v as any).shadowOffset, elevation: (v as any).elevation } : {},
  };

  return (
    <View style={[container, style]}>
      {typeof children === 'string' ? <Text style={{ color: appTheme.text }}>{children}</Text> : children}
    </View>
  );
};

export default Card;
