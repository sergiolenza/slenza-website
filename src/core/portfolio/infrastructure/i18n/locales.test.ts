import { describe, expect, it } from 'vitest';
import {
  isLocale,
  locales,
} from '@/core/portfolio/infrastructure/i18n/locales';

describe('supported locales', () => {
  it('accepts exactly the locales served by the application', () => {
    expect(locales).toEqual(['es', 'en']);
    expect(isLocale('en')).toBe(true);
    expect(isLocale('es')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale('')).toBe(false);
    expect(isLocale('EN')).toBe(false);
  });
});
