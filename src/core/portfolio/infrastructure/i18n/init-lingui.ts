import { setI18n } from '@lingui/react/server';
import { getI18nInstance } from '@/core/portfolio/infrastructure/i18n/app-router-i18n';

export async function initLingui(locale: string) {
  const i18n = await getI18nInstance(locale);
  setI18n(i18n);
  return i18n;
}
