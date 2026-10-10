import { defineConfig } from '@lingui/cli';

export default defineConfig({
  locales: ['es', 'en'],
  sourceLocale: 'en',
  fallbackLocales: {
    default: 'en',
  },
  catalogs: [
    {
      path: 'src/core/portfolio/infrastructure/i18n/locales/{locale}/messages',
      include: ['src/', 'app/'],
      exclude: ['**/*.test.*', '**/*.spec.*'],
    },
  ],
});
