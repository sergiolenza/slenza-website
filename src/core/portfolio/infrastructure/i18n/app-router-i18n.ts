import 'server-only';

import { type I18n, type Messages, setupI18n } from '@lingui/core';
import { notFound } from 'next/navigation';
import {
  isLocale,
  type Locale,
} from '@/core/portfolio/infrastructure/i18n/locales';

const catalogLoaders: Record<Locale, () => Promise<{ messages: Messages }>> = {
  en: () => import('./locales/en/messages'),
  es: () => import('./locales/es/messages'),
};

async function loadCatalog(locale: Locale): Promise<Messages> {
  const catalog = await catalogLoaders[locale]();
  return catalog.messages;
}

const i18nInstances = new Map<Locale, Promise<I18n>>();

export function getI18nInstance(locale: string): Promise<I18n> {
  if (!isLocale(locale)) {
    notFound();
  }

  let i18n = i18nInstances.get(locale);

  if (!i18n) {
    i18n = loadCatalog(locale).then((messages) =>
      setupI18n({ locale, messages: { [locale]: messages } }),
    );
    i18nInstances.set(locale, i18n);
  }

  return i18n;
}
