import { Trans } from '@lingui/react/macro';
import styles from '@/core/portfolio/ui/StrengthsSection/StrengthsSection.module.css';

export default function StrengthsSection() {
  return (
    <section data-reveal className={styles.section}>
      <div className={styles.content}>
        <div>
          <p className={styles.eyebrow}>
            <Trans>Tech stack and strengths</Trans>
          </p>
          <h2 className={styles.title}>
            <Trans>Code that stands up to the real world.</Trans>
          </h2>
        </div>
        <p className={styles.copy}>
          <Trans>
            React, Vue.js, JavaScript, TypeScript, Material UI, Leaflet,
            microfrontends, and microservices. Technology matters; knowing when
            to simplify, how to measure, and what to leave ready for the next
            team matters more.
          </Trans>
        </p>
        <p className={styles.copy}>
          <Trans>
            I lead through the day-to-day work: unblocking problems, giving
            actionable feedback, reviewing code, and coordinating with product,
            design, and other teams.
          </Trans>
        </p>
      </div>
    </section>
  );
}
