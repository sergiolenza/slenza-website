import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StrengthsSection from '@/core/portfolio/ui/StrengthsSection/StrengthsSection';

describe('StrengthsSection', () => {
  it('communicates both the technical stack and the leadership approach', () => {
    render(<StrengthsSection />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Code that stands up to the real world.',
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /React, Vue\.js, JavaScript, TypeScript, Material UI, Leaflet/,
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /unblocking problems, giving actionable feedback, reviewing code/,
      ),
    ).toBeTruthy();
  });
});
