import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import SiteHeader from '@/core/portfolio/ui/SiteHeader/SiteHeader';

describe('SiteHeader', () => {
  afterEach(() => {
    globalThis.portfolioLinguiTestState = { locale: 'en' };
  });

  it('opens and closes the mobile navigation while exposing its expanded state', () => {
    render(<SiteHeader />);

    const openButton = screen.getByRole('button', { name: 'Open menu' });
    expect(openButton.getAttribute('aria-expanded')).toBe('false');
    expect(
      screen.queryByRole('navigation', { name: 'Mobile navigation' }),
    ).toBeNull();

    fireEvent.click(openButton);
    expect(
      screen
        .getByRole('button', { name: 'Close menu' })
        .getAttribute('aria-expanded'),
    ).toBe('true');
    expect(
      screen
        .getByRole('navigation', { name: 'Mobile navigation' })
        .querySelectorAll('a[href^="#"]'),
    ).toHaveLength(3);

    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(
      screen.queryByRole('navigation', { name: 'Mobile navigation' }),
    ).toBeNull();
  });

  it('closes the mobile menu after choosing a section and links to the other locale', () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const experienceLink = screen
      .getByRole('navigation', { name: 'Mobile navigation' })
      .querySelector('a[href="#experience"]');
    if (!experienceLink) {
      throw new Error('The experience navigation link should be present.');
    }
    fireEvent.click(experienceLink);
    expect(
      screen.queryByRole('navigation', { name: 'Mobile navigation' }),
    ).toBeNull();

    expect(
      screen
        .getByRole('link', { name: 'Switch language to Spanish' })
        .getAttribute('href'),
    ).toBe('/es');

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const languageLink = screen
      .getByRole('navigation', { name: 'Mobile navigation' })
      .querySelector('a[lang="es"]');
    if (!languageLink) {
      throw new Error('The mobile language switcher should be present.');
    }
    languageLink.addEventListener('click', (event) => event.preventDefault(), {
      once: true,
    });
    fireEvent.click(languageLink);
    expect(
      screen.queryByRole('navigation', { name: 'Mobile navigation' }),
    ).toBeNull();
  });

  it('switches back to English when the current locale is Spanish', () => {
    globalThis.portfolioLinguiTestState = { locale: 'es' };
    render(<SiteHeader />);

    const languageLink = screen.getByRole('link', {
      name: 'Switch language to English',
    });
    expect(languageLink.getAttribute('href')).toBe('/en');
    expect(languageLink.getAttribute('lang')).toBe('en');

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const mobileLanguageLink = screen
      .getByRole('navigation', { name: 'Mobile navigation' })
      .querySelector('a[lang="en"]');
    if (!mobileLanguageLink) {
      throw new Error('The mobile language switcher should be present.');
    }
    expect(mobileLanguageLink.getAttribute('aria-label')).toBe(
      'Switch language to English',
    );
  });
});
