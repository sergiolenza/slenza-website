import { beforeEach, describe, expect, it, vi } from 'vitest';

const notFound = vi.hoisted(() =>
  vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
);

vi.mock('server-only', () => ({}));
vi.mock('next/navigation', () => ({ notFound }));

describe('getI18nInstance', () => {
  beforeEach(() => {
    notFound.mockClear();
  });

  it('loads each supported catalog and reuses its initialized instance', async () => {
    const { getI18nInstance } = await import(
      '@/core/portfolio/infrastructure/i18n/app-router-i18n'
    );

    const englishPromise = getI18nInstance('en');
    expect(getI18nInstance('en')).toBe(englishPromise);
    const english = await englishPromise;
    const spanish = await getI18nInstance('es');

    expect(english.locale).toBe('en');
    expect(Object.keys(english.messages).length).toBeGreaterThan(0);
    expect(spanish.locale).toBe('es');
    expect(Object.keys(spanish.messages).length).toBeGreaterThan(0);
    expect(Object.keys(english.messages).sort()).toEqual(
      Object.keys(spanish.messages).sort(),
    );
    expect(notFound).not.toHaveBeenCalled();
  });

  it('delegates unsupported locales to the Next.js not-found handler', async () => {
    const { getI18nInstance } = await import(
      '@/core/portfolio/infrastructure/i18n/app-router-i18n'
    );

    expect(() => getI18nInstance('fr')).toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalledOnce();
  });
});
