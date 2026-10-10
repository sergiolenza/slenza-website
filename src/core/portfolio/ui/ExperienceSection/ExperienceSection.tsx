import { Trans, useLingui } from '@lingui/react/macro';
import { experience } from '@/core/portfolio/domain/content';
import styles from '@/core/portfolio/ui/ExperienceSection/ExperienceSection.module.css';
import { experienceTranslations } from '@/core/portfolio/ui/portfolio-translations';

export default function ExperienceSection() {
  const { i18n } = useLingui();

  return (
    <section id="experience" data-reveal className={styles.experience}>
      <div>
        <p className={styles.eyebrow}>
          <Trans>My experience</Trans>
        </p>
        <h2 className={styles.title}>
          <Trans>
            14 years turning complexity into{' '}
            <em className={styles.accentText}>product.</em>
          </Trans>
        </h2>
      </div>
      <div className={styles.timeline}>
        {experience.map(({ company }) => {
          const translation = experienceTranslations[company];

          return (
            <div key={company} className={styles.experienceItem}>
              <span className={styles.period}>
                {i18n._(translation.period)}
              </span>
              <strong className={styles.company}>
                {i18n._(translation.company)}
              </strong>
              <span className={styles.role}>{i18n._(translation.role)}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
