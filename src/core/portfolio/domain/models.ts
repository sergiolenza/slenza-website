export type ProjectAccent = 'violet' | 'orange' | 'green';

export type ProjectTechnology =
  | 'react'
  | 'microfrontends'
  | 'code-review'
  | 'material-ui'
  | 'leaflet'
  | 'javascript'
  | 'frontend'
  | 'best-practices';

export type PortfolioProject = {
  id: string;
  accent: ProjectAccent;
  technologies: readonly ProjectTechnology[];
};

export type ExperienceCompany =
  | 'kairos'
  | 'global-avl'
  | 'neoris'
  | 'elegra'
  | 'ibermatica';

export type ExperienceEntry = {
  company: ExperienceCompany;
};

export type ProcessStep = {
  number: string;
  command: 'research' | 'craft' | 'scale';
};
