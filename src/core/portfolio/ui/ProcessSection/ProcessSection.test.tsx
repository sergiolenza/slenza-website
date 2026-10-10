import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { processSteps } from '@/core/portfolio/domain/content';
import ProcessSection from '@/core/portfolio/ui/ProcessSection/ProcessSection';
import { processTranslations } from '@/core/portfolio/ui/portfolio-translations';

describe('ProcessSection', () => {
  it('preserves the ordered process steps and pairs each title with its command', () => {
    render(<ProcessSection />);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(processSteps.length);

    for (const [index, step] of processSteps.entries()) {
      const translation = processTranslations[step.number];
      const card = cards[index];

      expect(within(card).getByText(step.number)).toBeTruthy();
      expect(
        within(card).getByText(translation.title.message ?? ''),
      ).toBeTruthy();
      expect(
        within(card).getByText(translation.command.message ?? ''),
      ).toBeTruthy();
      expect(
        within(card).getByText(translation.description.message ?? ''),
      ).toBeTruthy();
    }
  });
});
