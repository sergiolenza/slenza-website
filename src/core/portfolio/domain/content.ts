import type {
  ExperienceEntry,
  PortfolioProject,
  ProcessStep,
} from '@/core/portfolio/domain/models';

export const experience: readonly ExperienceEntry[] = [
  {
    company: 'kairos',
  },
  {
    company: 'global-avl',
  },
  {
    company: 'neoris',
  },
  {
    company: 'elegra',
  },
  {
    company: 'ibermatica',
  },
];

export const projects: readonly PortfolioProject[] = [
  {
    id: '01',
    accent: 'violet',
    technologies: ['react', 'microfrontends', 'code-review'],
  },
  {
    id: '02',
    accent: 'orange',
    technologies: ['react', 'material-ui', 'leaflet'],
  },
  {
    id: '03',
    accent: 'green',
    technologies: ['javascript', 'frontend', 'best-practices'],
  },
];

export const processSteps: readonly ProcessStep[] = [
  {
    number: '01',
    command: 'research',
  },
  {
    number: '02',
    command: 'craft',
  },
  {
    number: '03',
    command: 'scale',
  },
];
