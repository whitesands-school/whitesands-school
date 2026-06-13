/**
 * Canonical staff categories — the single source of truth shared by the admin
 * editor (the department dropdown) and the public Our People directory (the
 * filter pills). Order here is the order categories appear in the UI.
 *
 * "Management Team" replaces the former "Leadership" group. Members of it are
 * also flagged with `isLeadership` so they keep the badge and sort first.
 */
export const STAFF_CATEGORIES = [
  'Management Team',
  'Faculty',
  'Pastoral',
  'Sports',
  'Admissions',
  'Accounts',
  'Maintenance',
  'Admin Staff',
] as const

export type StaffCategory = (typeof STAFF_CATEGORIES)[number]
