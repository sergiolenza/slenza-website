import type { Messages } from '@lingui/core';
import { useLingui } from '@lingui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LinguiClientProvider from '@/shared/ui/providers/LinguiClientProvider';

function LocalizedGreeting() {
  const { i18n } = useLingui();
  return <p>{i18n._('greeting')}</p>;
}

describe('LinguiClientProvider', () => {
  it('provides the selected locale catalog to client descendants', () => {
    const messages = { greeting: 'Hola' } as Messages;

    render(
      <LinguiClientProvider initialLocale="es" initialMessages={messages}>
        <LocalizedGreeting />
      </LinguiClientProvider>,
    );

    expect(screen.getByText('Hola')).toBeTruthy();
  });
});
