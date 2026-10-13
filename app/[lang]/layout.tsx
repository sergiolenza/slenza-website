import { msg } from '@lingui/core/macro';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { initLingui } from '@/core/portfolio/infrastructure/i18n/init-lingui';
import {
  isLocale,
  locales,
} from '@/core/portfolio/infrastructure/i18n/locales';
import LinguiClientProvider from '@/shared/ui/providers/LinguiClientProvider';
import '@/shared/ui/styles/colors.css';
import '@/shared/ui/styles/typography.css';
import '@app/globals.css';

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f5ef',
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const i18n = await initLingui(lang);

  return {
    title: i18n._(msg`Sergio Lenza — Frontend Lead`),
    description: i18n._(
      msg`Portfolio of Sergio Lenza, a frontend lead specializing in digital products, design systems, and high-impact web experiences.`,
    ),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const i18n = await initLingui(lang);

  return (
    <html lang={lang}>
      <body>
        <LinguiClientProvider
          initialLocale={lang}
          initialMessages={i18n.messages}
        >
          {children}
        </LinguiClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
