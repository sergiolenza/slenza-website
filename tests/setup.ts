import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(cleanup);

declare global {
  var portfolioLinguiTestState: { locale: string } | undefined;
}

vi.mock('@lingui/core/macro', () => ({
  msg: (strings: TemplateStringsArray, ...values: unknown[]) => ({
    id: strings.join(''),
    message: strings.reduce(
      (message, part, index) =>
        `${message}${part}${String(values[index] ?? '')}`,
      '',
    ),
  }),
}));

vi.mock('@lingui/react/macro', async () => {
  const { createElement, Fragment } = await import('react');

  return {
    Trans: ({ children }: { children: React.ReactNode }) =>
      createElement(Fragment, null, children),
    useLingui: () => ({
      i18n: {
        get locale() {
          return globalThis.portfolioLinguiTestState?.locale ?? 'en';
        },
        _(descriptor: { message?: string }) {
          return descriptor.message ?? '';
        },
      },
    }),
  };
});

globalThis.portfolioLinguiTestState = { locale: 'en' };
