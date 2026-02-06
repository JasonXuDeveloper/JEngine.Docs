// Available versions per locale
// English: v1.1 and v1.0
// Chinese: all versions including pro
export const versions = ['v1.1', 'v1.0', 'v0.8', 'v0.7', 'v0.6', 'v0.5', 'pro'] as const;
export type Version = (typeof versions)[number];
export const defaultVersion: Version = 'v1.1';

// Versions available for each locale
export const versionsByLocale: Record<string, readonly Version[]> = {
  en: ['v1.1', 'v1.0'],
  zh: ['v1.1', 'v1.0', 'v0.8', 'v0.7', 'v0.6', 'v0.5', 'pro'],
};

export function getVersionsForLocale(locale: string): readonly Version[] {
  return versionsByLocale[locale] ?? versionsByLocale.en;
}
