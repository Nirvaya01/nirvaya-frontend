export const shadows = {
  level0: null,
  level1: {
    border: '#E2E8F0',
  },
  level2: {
    shadowColor: '#1e293b',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  level3: {
    shadowColor: '#1e293b',
    shadowOpacity: 0.12,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
};

export type Shadows = typeof shadows;
export default shadows;
