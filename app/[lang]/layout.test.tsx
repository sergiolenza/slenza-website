import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { initLingui, notFound } = vi.hoisted(() => ({
  initLingui: vi.fn(),
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

vi.mock('next/navigation', () => ({ notFound }));
vi.mock('@/core/portfolio/infrastructure/i18n/init-lingui', () => ({
  initLingui,
}));

import LocaleLayout, { generateMetadata, generateStaticParams } from './layout';

describe('localized route layout', () => {
  beforeEach(() => {
    initLingui.mockReset();
    notFound.mockClear();
    initLingui.mockResolvedValue({
      locale: 'es',
      messages: {},
      _(descriptor: { message?: string }) {
        return descriptor.message ?? '';
      },
    });
  });

  it('generates only supported locale routes and localized metadata', async () => {
    expect(generateStaticParams()).toEqual([{ lang: 'es' }, { lang: 'en' }]);

    await expect(
      generateMetadata({ params: Promise.resolve({ lang: 'es' }) }),
    ).resolves.toEqual({
      title: 'Sergio Lenza — Frontend Lead',
      description:
        'Portfolio of Sergio Lenza, a frontend lead specializing in digital products, design systems, and high-impact web experiences.',
    });
    expect(initLingui).toHaveBeenCalledWith('es');
  });

  it('rejects unsupported locale metadata and layouts', async () => {
    await expect(
      generateMetadata({ params: Promise.resolve({ lang: 'fr' }) }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
    await expect(
      LocaleLayout({
        params: Promise.resolve({ lang: 'fr' }),
        children: <p>Portfolio</p>,
      }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalledTimes(2);
  });

  it('sets the document language and provides the matching catalog', async () => {
    const markup = renderToStaticMarkup(
      await LocaleLayout({
        params: Promise.resolve({ lang: 'es' }),
        children: <p>Localized portfolio</p>,
      }),
    );

    expect(markup).toContain(
      '<html lang="es"><head></head><body><p>Localized portfolio</p></body></html>',
    );
    expect(initLingui).toHaveBeenCalledWith('es');
  });
});
