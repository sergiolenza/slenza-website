import { Trans, useLingui } from '@lingui/react/macro';
import { processSteps } from '@/core/portfolio/domain/content';
import styles from '@/core/portfolio/ui/ProcessSection/ProcessSection.module.css';
import { processTranslations } from '@/core/portfolio/ui/portfolio-translations';

export default function ProcessSection() {
  const { i18n } = useLingui();

  return (
    <section data-reveal className={styles.section}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>
              <Trans>How I work</Trans>
            </p>
            <h2 className={styles.title}>
              <Trans>I make the pieces</Trans>
              <br />
              <em className={styles.accentText}>
                <Trans>fit together and move forward.</Trans>
              </em>
            </h2>
          </div>
          <span className={styles.summary}>
            <Trans>
              How I work when there are many moving parts, little time, and a
              decision that needs to last.
            </Trans>
          </span>
        </div>
        <div className={styles.processGrid}>
          {processSteps.map(({ number }) => {
            const translation = processTranslations[number];

            return (
              <article key={number} className={styles.processCard}>
                <span className={styles.stepNumber}>{number}</span>
                <div className={styles.cardHeading}>
                  <h3 className={styles.cardTitle}>
                    {i18n._(translation.title)}
                  </h3>
                  <span className={styles.command}>
                    {i18n._(translation.command)}
                  </span>
                </div>
                <p className={styles.description}>
                  {i18n._(translation.description)}
                </p>
                <div className={styles.processLine} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
