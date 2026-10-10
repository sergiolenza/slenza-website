import type { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import type { ProjectTechnology } from '@/core/portfolio/domain/models';

export const technologyTranslations: Record<
  ProjectTechnology,
  MessageDescriptor
> = {
  react: msg`React`,
  microfrontends: msg`Microfrontends`,
  'code-review': msg`Code review`,
  'material-ui': msg`Material UI`,
  leaflet: msg`Leaflet`,
  javascript: msg`JavaScript`,
  frontend: msg`Front-end`,
  'best-practices': msg`Best practices`,
};

export const experienceTranslations: Record<
  string,
  {
    company: MessageDescriptor;
    period: MessageDescriptor;
    role: MessageDescriptor;
  }
> = {
  kairos: {
    company: msg`Kairos Digital Solutions`,
    period: msg`2022 — Present`,
    role: msg`Front-end Lead`,
  },
  'global-avl': {
    company: msg`Global AVL`,
    period: msg`2018 — 2021`,
    role: msg`Senior Front-end Developer`,
  },
  neoris: {
    company: msg`NEORIS`,
    period: msg`2015 — 2018`,
    role: msg`Front-end Developer`,
  },
  elegra: {
    company: msg`Elegra Digital Systems`,
    period: msg`2014 - 2015`,
    role: msg`Full-stack Developer`,
  },
  ibermatica: {
    company: msg`Ibermática`,
    period: msg`2011 — 2014`,
    role: msg`Full-stack Developer`,
  },
};

export const projectTranslations: Record<
  string,
  {
    title: MessageDescriptor;
    category: MessageDescriptor;
    description: MessageDescriptor;
    impact: MessageDescriptor;
  }
> = {
  '01': {
    title: msg`Next-generation retail`,
    category: msg`Retail · Microfrontends`,
    description: msg`At Kairos, I moved from building features to helping the whole product move forward: React, microfrontends, and microservices for a retail platform that needs to grow without losing speed.`,
    impact: msg`Leading 4 developers`,
  },
  '02': {
    title: msg`Real-time fleet management`,
    category: msg`B2B SaaS · Operations platform`,
    description: msg`I designed and built a fleet management platform from scratch to handle large volumes of data and real-time decisions. Without a design team, I also made sure the experience was clear and useful.`,
    impact: msg`From zero to product`,
  },
  '03': {
    title: msg`GENIAC for small businesses`,
    category: msg`SaaS · Business digitalization`,
    description: msg`At NEORIS, I worked on GENIAC, an “office as a service” platform backed by Grant Thornton to digitize back-office processes: accounting, HR, and business management. I grew from Full Stack to Senior Front-end Developer and helped define practices to improve performance, quality, and maintainability.`,
    impact: msg`From back office to product`,
  },
};

export const processTranslations: Record<
  string,
  {
    title: MessageDescriptor;
    description: MessageDescriptor;
    command: MessageDescriptor;
  }
> = {
  '01': {
    title: msg`Observe`,
    description: msg`Understand the context before opening the editor.`,
    command: msg`/ research`,
  },
  '02': {
    title: msg`Shape`,
    description: msg`Turn scattered signals into an interface that guides.`,
    command: msg`/ craft`,
  },
  '03': {
    title: msg`Build a system`,
    description: msg`Build a foundation others can extend with confidence.`,
    command: msg`/ scale`,
  },
};
