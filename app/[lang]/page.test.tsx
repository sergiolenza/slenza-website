import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

const initLingui = vi.hoisted(() => vi.fn());

vi.mock('next/image', async () => {
  const { createElement } = await import('react');

  return {
    default: ({
      preload: _preload,
      ...imageProps
    }: React.ComponentProps<'img'> & { preload?: boolean }) =>
      createElement('img', imageProps),
  };
});

vi.mock('@/core/portfolio/infrastructure/i18n/init-lingui', () => ({
  initLingui,
}));

import PortfolioPage from './page';

describe('localized portfolio page', () => {
  it('initializes the requested locale and connects navigation to sections', async () => {
    initLingui.mockResolvedValue({});

    const markup = renderToStaticMarkup(
      await PortfolioPage({ params: Promise.resolve({ lang: 'en' }) }),
    );

    expect(initLingui).toHaveBeenCalledWith('en');
    expect(markup).toContain('data-portfolio-shell');
    const sectionIds = [...markup.matchAll(/\sid="([^"]+)"/g)].map(
      ([, sectionId]) => sectionId,
    );
    const sectionLinks = [...markup.matchAll(/href="#([^"]+)"/g)].map(
      ([, sectionId]) => sectionId,
    );

    expect(sectionIds).toEqual(
      expect.arrayContaining(['home', 'work', 'experience', 'contact']),
    );
    for (const sectionId of sectionLinks) {
      expect(sectionIds).toContain(sectionId);
    }
  });
});
