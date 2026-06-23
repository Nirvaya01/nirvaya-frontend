export const typography = {
  fontFamily: 'Plus Jakarta Sans',

  displaySos: {
    fontSize: 40,
    fontWeight: '800' as const,
    lineHeight: 48,
    letterSpacing: -0.02,
  },

  headlineLg: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: -0.01,
  },

  headlineLgMobile: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },

  headlineMd: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },

  bodyLg: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 28,
  },

  bodyMd: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },

  labelMd: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    letterSpacing: 0.01,
  },

  labelSm: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
};

export type Typography = typeof typography;
export default typography;
