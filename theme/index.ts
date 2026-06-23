import colors from '../tokens/colors';
import typography from '../tokens/typography';
import spacing from '../tokens/spacing';
import radius from '../tokens/radius';
import shadows from '../tokens/shadows';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,

  components: {
    button: {
      variants: {
        primary: {
          backgroundColor: colors.primary[900],
          color: colors.primary[50],
          borderRadius: radius.default,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
        },
        secondary: {
          backgroundColor: colors.secondary[600],
          color: colors.secondary[50],
          borderRadius: radius.default,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
        },
        ghost: {
          backgroundColor: colors.transparent,
          color: colors.primary[900],
          borderColor: colors.primary[900],
          borderWidth: 1,
          borderRadius: radius.default,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
        },
        sos: {
          backgroundColor: colors.tertiary[600],
          color: colors.tertiary[50],
          borderRadius: radius.full,
          width: 96,
          height: 96,
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },

    card: {
      default: {
        backgroundColor: colors.surfaces.surface3,
        borderColor: shadows.level1?.border || '#E2E8F0',
        borderWidth: 1,
        borderRadius: radius.default,
        padding: spacing.md,
      },
      elevated: {
        backgroundColor: colors.surfaces.surface3,
        borderRadius: radius.md,
        padding: spacing.md,
        ...shadows.level2,
      },
      alert: {
        backgroundColor: colors.surfaces.surface3,
        borderWidth: 2,
        borderColor: colors.tertiary[600],
        borderRadius: radius.default,
        padding: spacing.md,
      },
    },

    input: {
      default: {
        backgroundColor: '#F1F5F9',
        borderColor: colors.outlines.muted,
        borderWidth: 1,
        borderRadius: radius.sm,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        color: colors.text.primary,
      },
      focus: {
        borderColor: colors.secondary[600],
      },
      error: {
        borderColor: colors.error[600],
      },
    },

    navigation: {
      bottomBar: {
        backgroundColor: colors.primary[50],
        activeIcon: colors.primary[900],
        inactiveIcon: 'rgba(9,20,38,0.4)',
      },
    },
  },
};

export type Theme = typeof theme;
export default theme;
