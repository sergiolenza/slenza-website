import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContactSection from '@/core/portfolio/ui/ContactSection/ContactSection';

describe('ContactSection', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('copies the contact address, announces success, and restores the button label', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', {
      ...navigator,
      clipboard: { writeText },
    });
    render(<ContactSection />);

    const copyButton = screen.getByRole('button', { name: 'Copy email' });
    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(writeText).toHaveBeenCalledWith('slenzamori.dev@gmail.com');
    expect(
      screen.getByRole('button', { name: 'Copy email' }).textContent,
    ).toContain('Email copied');

    act(() => {
      vi.advanceTimersByTime(1800);
    });
    expect(
      screen.getByRole('button', { name: 'Copy email' }).textContent,
    ).toContain('slenzamori.dev@gmail.com');
  });
});
