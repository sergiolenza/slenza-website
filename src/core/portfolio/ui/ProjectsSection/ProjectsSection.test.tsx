import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { projects } from '@/core/portfolio/domain/content';
import ProjectsSection from '@/core/portfolio/ui/ProjectsSection/ProjectsSection';
import {
  projectTranslations,
  technologyTranslations,
} from '@/core/portfolio/ui/portfolio-translations';

describe('ProjectsSection', () => {
  it('renders each project outcome and its technology tags', () => {
    render(<ProjectsSection />);

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(projects.length);

    for (const [index, project] of projects.entries()) {
      const article = articles[index];
      const translation = projectTranslations[project.id];

      expect(
        within(article).getByText(translation.title.message ?? ''),
      ).toBeTruthy();
      expect(
        within(article).getByText(translation.impact.message ?? ''),
      ).toBeTruthy();
      for (const technology of project.technologies) {
        expect(
          within(article).getByText(
            technologyTranslations[technology].message ?? '',
          ),
        ).toBeTruthy();
      }
    }
  });
});
