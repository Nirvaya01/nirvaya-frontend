import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import designTheme from '../theme';
import { ButtonVariant } from '../types/theme';
import { useAppTheme } from '@/hooks/useAppTheme';

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
  const appTheme = useAppTheme();
  const v = designTheme.components.button.variants[variant];

  const containerStyle: ViewStyle = {
    backgroundColor:
      variant === 'primary'
        ? appTheme.primary
        : variant === 'secondary'
          ? appTheme.secondary
          : variant === 'ghost'
            ? 'transparent'
            : appTheme.danger,
    borderRadius: (v as any).borderRadius,
    paddingVertical: (v as any).paddingVertical,
    paddingHorizontal: (v as any).paddingHorizontal,
    borderWidth: (v as any).borderWidth || 0,
    borderColor:
      variant === 'ghost' ? appTheme.primary : (v as any).borderColor || 'transparent',
    opacity: disabled ? 0.6 : 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  };

  const labelStyle: TextStyle = {
    color: variant === 'ghost' ? appTheme.primary : appTheme.primaryText,
    fontFamily: designTheme.typography.fontFamily,
    fontSize: designTheme.typography.labelMd.fontSize,
    fontWeight: designTheme.typography.labelMd.fontWeight as any,
  };

  return (
    <TouchableOpacity onPress={onPress} style={[containerStyle, style]} disabled={disabled}>
      <Text style={[labelStyle, textStyle as any]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
