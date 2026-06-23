import { create } from 'nativewind';
import colors from './tokens/colors';

// Map a subset of tokens to NativeWind theme keys
export default {
  theme: {
    colors: {
      primary: colors.primary[900],
      secondary: colors.secondary[600],
      tertiary: colors.tertiary[600],
      background: colors.background.default,
      surface: colors.surfaces.surface3,
      text: colors.text.primary,
    },
    borderRadius: {
      sm: `${colors ? '4' : '4'}px`,
      DEFAULT: `${8}px`,
      md: `${12}px`,
      lg: `${16}px`,
      xl: `${24}px`,
      full: `${9999}px`,
    },
    spacing: {
      xs: `${8}px`,
      sm: `${12}px`,
      md: `${16}px`,
      lg: `${24}px`,
      xl: `${32}px`,
    },
  },
};
