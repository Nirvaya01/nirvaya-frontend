import React from 'react';
import { TextInput, View, Text, ViewStyle, TextStyle } from 'react-native';
import theme from '../theme';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  error?: string | null;
  style?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
};

export const Input: React.FC<Props> = ({ value, onChangeText, placeholder, error = null, style, inputStyle }) => {
  const base = theme.components.input.default;
  const state = error ? { ...base, ...theme.components.input.error } : base;

  return (
    <View style={style}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.outlines.default}
        style={[
          {
            backgroundColor: state.backgroundColor,
            borderColor: state.borderColor,
            borderWidth: state.borderWidth,
            borderRadius: state.borderRadius,
            paddingVertical: state.paddingVertical,
            paddingHorizontal: state.paddingHorizontal,
            color: state.color,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.bodyMd.fontSize,
            lineHeight: theme.typography.bodyMd.lineHeight,
          },
          inputStyle,
        ]}
      />
      {error ? <Text style={{ color: theme.colors.error[600], marginTop: theme.spacing.xs }}>{error}</Text> : null}
    </View>
  );
};

export default Input;
