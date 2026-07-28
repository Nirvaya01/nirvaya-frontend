import React from 'react';
import { TextInput, View, Text, ViewStyle, TextStyle } from 'react-native';
import designTheme from '../theme';
import { useAppTheme } from '@/hooks/useAppTheme';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  error?: string | null;
  style?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
};

export const Input: React.FC<Props> = ({ value, onChangeText, placeholder, error = null, style, inputStyle }) => {
  const appTheme = useAppTheme();

  return (
    <View style={style}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={appTheme.placeholder}
        style={[
          {
            backgroundColor: appTheme.inputBackground,
            borderColor: error ? appTheme.danger : appTheme.inputBorder,
            borderWidth: 1,
            borderRadius: designTheme.radius.sm,
            paddingVertical: designTheme.spacing.sm,
            paddingHorizontal: designTheme.spacing.md,
            color: appTheme.text,
            fontFamily: designTheme.typography.fontFamily,
            fontSize: designTheme.typography.bodyMd.fontSize,
            lineHeight: designTheme.typography.bodyMd.lineHeight,
          },
          inputStyle,
        ]}
      />
      {error ? <Text style={{ color: appTheme.danger, marginTop: designTheme.spacing.xs }}>{error}</Text> : null}
    </View>
  );
};

export default Input;
