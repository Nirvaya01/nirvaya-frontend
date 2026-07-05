/**
 * Centralised route constants for the app.
 * Values match the file-based route names used by expo-router.
 */
export const ROUTES = {
  HOME: 'index',
  CONTACTS: 'contacts',
  HISTORY: 'history',
  PROFILE: 'profile',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];