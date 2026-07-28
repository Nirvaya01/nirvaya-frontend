import React from "react";
import { TouchableOpacity, Text, ViewStyle } from "react-native";
import designTheme from "../theme";
import { useAppTheme } from "@/hooks/useAppTheme";

type Props = {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
};

export const SosButton: React.FC<Props> = ({ onPress, style }) => {
  const appTheme = useAppTheme();
  const v = designTheme.components.button.variants.sos;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: appTheme.danger,
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
          color: appTheme.primaryText,
          fontFamily: designTheme.typography.fontFamily,
          fontSize: designTheme.typography.labelMd.fontSize,
          fontWeight: designTheme.typography.labelMd.fontWeight as any,
        }}
      >
        SOS
      </Text>
    </TouchableOpacity>
  );
};

export default SosButton;
