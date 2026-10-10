import { msg } from '@lingui/core/macro';
import { Trans, useLingui } from '@lingui/react/macro';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import styles from '@/core/portfolio/ui/HeroSection/HeroSection.module.css';

export default function HeroSection() {
  const { i18n } = useLingui();

  return (
    <section id="home" className={styles.hero}>
      <div>
        <p className={styles.availability}>
          <span className={styles.availabilityDot} />{' '}
          <Trans>Available for remote work · Madrid</Trans>
        </p>
        <h1 className={styles.title}>
          <Trans>From architecture</Trans>
          <br />
          <em className={styles.accentText}>
            <Trans>to impact.</Trans>
          </em>
        </h1>
        <div className={styles.intro}>
          <p className={styles.description}>
            <Trans>
              I'm Sergio Lenza, a Front-end Lead with over 14 years of
              experience. I've worked in retail, banking, fleet management, and
              platforms for small businesses. I move comfortably between
              interface details and the decisions that make a product
              sustainable.
            </Trans>
          </p>
          <a href="#work" className={styles.projectsLink}>
            <Trans>View projects</Trans>{' '}
            <ArrowUpRight className={styles.projectsIcon} />
          </a>
        </div>
      </div>
      <div className={styles.portraitArea}>
        <div className={styles.portraitGlow} />
        <div className={styles.portraitCard}>
          <Image
            src="/sergio-profile.webp"
            alt={i18n._(msg`Editorial portrait of Sergio Lenza`)}
            width={640}
            height={800}
            sizes="(max-width: 352px) calc(100vw - 3rem), 320px"
            preload
            fetchPriority="high"
            className={styles.portrait}
          />
          <div className={styles.portraitCaption}>
            <span className={styles.portraitMeta}>
              <Trans>14+ years · Madrid</Trans>
            </span>
            <p className={styles.portraitStatement}>
              <Trans>Technical leadership that keeps teams moving.</Trans>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
