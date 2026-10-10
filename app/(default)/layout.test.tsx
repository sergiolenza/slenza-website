import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import DefaultLayout from './layout';

describe('default route layout', () => {
  it('sets the document language to Spanish', () => {
    const markup = renderToStaticMarkup(
      DefaultLayout({ children: <p>Portfolio</p> }),
    );

    expect(markup).toContain(
      '<html lang="es"><head></head><body><p>Portfolio</p></body></html>',
    );
  });
});
