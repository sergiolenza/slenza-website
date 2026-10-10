export const locales = ['es', 'en'] as const;

export type Locale = (typeof locales)[number];

export function isLocale(locale: string): locale is Locale {
  return locales.some((supportedLocale) => supportedLocale === locale);
}
