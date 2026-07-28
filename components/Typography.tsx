import React from 'react';
import { Text, TextStyle } from 'react-native';
import designTheme from '../theme';
import { useAppTheme } from '@/hooks/useAppTheme';

type Variant = 'displaySos' | 'headlineLg' | 'headlineLgMobile' | 'headlineMd' | 'bodyLg' | 'bodyMd' | 'labelMd' | 'labelSm';

type Props = {
  variant?: Variant;
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
};

export const Typography: React.FC<Props> = ({ variant = 'bodyMd', children, style }) => {
  const appTheme = useAppTheme();
  const v = designTheme.typography[variant];

  const textStyle: TextStyle = {
    fontFamily: designTheme.typography.fontFamily,
    fontSize: v.fontSize as number,
    fontWeight: v.fontWeight as any,
    lineHeight: v.lineHeight as number,
    letterSpacing: (v as any).letterSpacing,
    color: appTheme.text,
  };

  return <Text style={[textStyle, style as any]}>{children}</Text>;
};

export default Typography;
