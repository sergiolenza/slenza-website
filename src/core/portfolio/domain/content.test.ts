import { describe, expect, it } from 'vitest';
import {
  experience,
  processSteps,
  projects,
} from '@/core/portfolio/domain/content';
import {
  experienceTranslations,
  processTranslations,
  projectTranslations,
  technologyTranslations,
} from '@/core/portfolio/ui/portfolio-translations';

describe('portfolio domain content', () => {
  it('keeps project identifiers unique and every project fully translatable', () => {
    const projectIds = projects.map(({ id }) => id);

    expect(new Set(projectIds).size).toBe(projectIds.length);
    expect(projectIds).toEqual(Object.keys(projectTranslations));

    for (const project of projects) {
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.accent).toMatch(/^(violet|orange|green)$/);

      for (const technology of project.technologies) {
        expect(technologyTranslations[technology]).toBeDefined();
      }
    }

    expect(Object.keys(technologyTranslations).sort()).toEqual([
      'best-practices',
      'code-review',
      'frontend',
      'javascript',
      'leaflet',
      'material-ui',
      'microfrontends',
      'react',
    ]);
  });

  it('keeps experience and process entries connected to their presentation copy', () => {
    expect(experience.map(({ company }) => company)).toEqual(
      Object.keys(experienceTranslations),
    );
    expect(processSteps.map(({ number }) => number)).toEqual(
      Object.keys(processTranslations),
    );
    expect(processSteps.map(({ command }) => command)).toEqual([
      'research',
      'craft',
      'scale',
    ]);
  });
});
