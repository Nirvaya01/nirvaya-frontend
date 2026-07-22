import React from "react";
import { TouchableOpacity, Text, ViewStyle } from "react-native";
import theme from "../theme";

type Props = {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
};

export const SosButton: React.FC<Props> = ({ onPress, style }) => {
  const v = theme.components.button.variants.sos;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: v.backgroundColor,
          borderRadius: v.borderRadius,
          width: v.width,
          height: v.height,
          justifyContent: v.justifyContent as ViewStyle["justifyContent"],
          alignItems: v.alignItems as ViewStyle["alignItems"],
        },
        style,
      ]}
    >
      <Text
        style={{
          color: v.color,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.labelMd.fontSize,
          fontWeight: theme.typography.labelMd.fontWeight as any,
        }}
      >
        SOS
      </Text>
    </TouchableOpacity>
  );
};

export default SosButton;