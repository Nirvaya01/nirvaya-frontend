export const ROUTES = {
  HOME: 'Home',
  HISTORY: 'History',
  CONTACTS: 'Contacts',
  PROFILE: 'Profile',
} as const;

export type RouteValues = (typeof ROUTES)[keyof typeof ROUTES];