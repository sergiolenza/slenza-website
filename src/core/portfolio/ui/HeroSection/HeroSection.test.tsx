import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HeroSection from '@/core/portfolio/ui/HeroSection/HeroSection';

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

describe('HeroSection', () => {
  it('exposes the home landmark, portrait alternative text, and projects call to action', () => {
    const { container } = render(<HeroSection />);

    expect(container.querySelector('#home')).toBeTruthy();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /from architecture.*to impact/i,
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole('img', { name: 'Editorial portrait of Sergio Lenza' }),
    ).toBeTruthy();
    expect(
      screen.getByRole('link', { name: /view projects/i }).getAttribute('href'),
    ).toBe('#work');
  });
});
