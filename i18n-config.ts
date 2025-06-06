// i18n-config.ts
export const defaultLocale = 'cs';
export const locales = ['cs', 'en'] as const;
export type Locale = (typeof locales)[number];

export const getLocaleFromPathname = (pathname: string): Locale => {
  const segments = pathname.split('/');
  const locale = segments[1] as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
};

export default {
  defaultLocale,
  locales,
};