import { msg } from '@lingui/core/macro';
import { Trans, useLingui } from '@lingui/react/macro';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/core/portfolio/domain/content';
import styles from '@/core/portfolio/ui/ProjectsSection/ProjectsSection.module.css';
import {
  projectTranslations,
  technologyTranslations,
} from '@/core/portfolio/ui/portfolio-translations';

export default function ProjectsSection() {
  const { i18n } = useLingui();

  return (
    <section id="work" data-reveal className={styles.section}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>
              <Trans>Selected work</Trans>
            </p>
            <h2 className={styles.title}>
              <Trans>Products built to go further.</Trans>
            </h2>
          </div>
          <span className={styles.dateRange}>{i18n._(msg`2011 — 2026`)}</span>
        </div>
        <div className={styles.projectList}>
          {projects.map((project) => {
            const translation = projectTranslations[project.id];

            return (
              <article key={project.id} data-reveal className={styles.project}>
                <span className={styles.projectNumber}>{project.id}</span>
                <div>
                  <p className={styles.projectType}>
                    {i18n._(translation.category)}
                  </p>
                  <h3 className={styles.projectTitle}>
                    {i18n._(translation.title)}{' '}
                    <ArrowUpRight className={styles.projectIcon} />
                  </h3>
                  <p className={styles.description}>
                    {i18n._(translation.description)}
                  </p>
                </div>
                <div className={styles.projectDetails}>
                  <p className={`${styles.result} ${styles[project.accent]}`}>
                    {i18n._(translation.impact)}
                  </p>
                  <div className={styles.tags}>
                    {project.technologies.map((technology) => (
                      <span key={technology} className={styles.tag}>
                        {i18n._(technologyTranslations[technology])}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
