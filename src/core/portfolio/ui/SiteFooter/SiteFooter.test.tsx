import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SiteFooter from '@/core/portfolio/ui/SiteFooter/SiteFooter';

describe('SiteFooter', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('uses the current year in the copyright and includes the professional signature', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2032-06-01T12:00:00Z'));
    render(<SiteFooter />);

    expect(screen.getByText('© 2032 Sergio Lenza Morillo')).toBeTruthy();
    expect(screen.getByText('Front-end lead · Product · Systems')).toBeTruthy();
  });
});
