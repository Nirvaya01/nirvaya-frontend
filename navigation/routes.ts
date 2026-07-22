export const ROUTES = {
  HOME: 'index',
  HISTORY: 'history',
  CONTACTS: 'contact',
  PROFILE: 'profile',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];