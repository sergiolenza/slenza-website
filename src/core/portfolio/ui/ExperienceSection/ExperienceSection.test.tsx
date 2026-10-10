import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { experience } from '@/core/portfolio/domain/content';
import ExperienceSection from '@/core/portfolio/ui/ExperienceSection/ExperienceSection';
import { experienceTranslations } from '@/core/portfolio/ui/portfolio-translations';

describe('ExperienceSection', () => {
  it('renders every experience entry with its matching company and role', () => {
    render(<ExperienceSection />);

    const timeline = screen.getByText('My experience').closest('section');
    if (!timeline) {
      throw new Error('The experience section should be rendered.');
    }
    expect(within(timeline).getAllByText(/Developer|Lead/)).toHaveLength(
      experience.length,
    );

    for (const entry of experience) {
      const translation = experienceTranslations[entry.company];
      const company = within(timeline).getByText(
        translation.company.message ?? '',
      );
      const experienceItem = company.closest('div');
      if (!experienceItem) {
        throw new Error('Each company should belong to an experience item.');
      }

      expect(
        within(experienceItem).getByText(translation.period.message ?? ''),
      ).toBeTruthy();
      expect(
        within(experienceItem).getByText(translation.role.message ?? ''),
      ).toBeTruthy();
    }
  });
});
