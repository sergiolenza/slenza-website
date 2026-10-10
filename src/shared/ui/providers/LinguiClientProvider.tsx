'use client';

import { type Messages, setupI18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useState } from 'react';

type LinguiClientProviderProps = Readonly<{
  children: React.ReactNode;
  initialLocale: string;
  initialMessages: Messages;
}>;

export default function LinguiClientProvider({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    }),
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
