import styles from '@app/page.module.css';
import { initLingui } from '@/core/portfolio/infrastructure/i18n/init-lingui';
import ContactSection from '@/core/portfolio/ui/ContactSection/ContactSection';
import ExperienceSection from '@/core/portfolio/ui/ExperienceSection/ExperienceSection';
import HeroSection from '@/core/portfolio/ui/HeroSection/HeroSection';
import PortfolioEffects from '@/core/portfolio/ui/PortfolioEffects';
import ProcessSection from '@/core/portfolio/ui/ProcessSection/ProcessSection';
import ProjectsSection from '@/core/portfolio/ui/ProjectsSection/ProjectsSection';
import SiteFooter from '@/core/portfolio/ui/SiteFooter/SiteFooter';
import SiteHeader from '@/core/portfolio/ui/SiteHeader/SiteHeader';
import StrengthsSection from '@/core/portfolio/ui/StrengthsSection/StrengthsSection';

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  await initLingui(lang);

  return (
    <main className={styles.portfolioShell} data-portfolio-shell>
      <PortfolioEffects />
      <div className={styles.noiseLayer} aria-hidden="true" />
      <div className={styles.cursorOrb} aria-hidden="true" />
      <div className={styles.gridLines} aria-hidden="true" />
      <SiteHeader />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <StrengthsSection />
      <ProcessSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
