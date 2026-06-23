import React from 'react';
import { Text, TextStyle } from 'react-native';
import theme from '../theme';

type Variant = 'displaySos' | 'headlineLg' | 'headlineLgMobile' | 'headlineMd' | 'bodyLg' | 'bodyMd' | 'labelMd' | 'labelSm';

type Props = {
  variant?: Variant;
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
};

export const Typography: React.FC<Props> = ({ variant = 'bodyMd', children, style }) => {
  const v = theme.typography[variant];

  const textStyle: TextStyle = {
    fontFamily: theme.typography.fontFamily,
    fontSize: v.fontSize as number,
    fontWeight: v.fontWeight as any,
    lineHeight: v.lineHeight as number,
    letterSpacing: (v as any).letterSpacing,
    color: theme.colors.text.primary,
  };

  return <Text style={[textStyle, style as any]}>{children}</Text>;
};

export default Typography;
