import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import theme from '../theme';
import { ButtonVariant } from '../types/theme';

type Props = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  onPress?: () => void;
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({
  variant = 'primary',
  children,
  style,
  textStyle,
  onPress,
  disabled = false,
}) => {
  const v = theme.components.button.variants[variant];

  const containerStyle: ViewStyle = {
    backgroundColor: (v as any).backgroundColor,
    borderRadius: (v as any).borderRadius,
    paddingVertical: (v as any).paddingVertical,
    paddingHorizontal: (v as any).paddingHorizontal,
    borderWidth: (v as any).borderWidth || 0,
    borderColor: (v as any).borderColor || 'transparent',
    opacity: disabled ? 0.6 : 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  };

  const labelStyle: TextStyle = {
    color: (v as any).color,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.labelMd.fontSize,
    fontWeight: theme.typography.labelMd.fontWeight as any,
  };

  return (
    <TouchableOpacity onPress={onPress} style={[containerStyle, style]} disabled={disabled}>
      <Text style={[labelStyle, textStyle as any]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
