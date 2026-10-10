import { Trans } from '@lingui/react/macro';
import styles from '@/core/portfolio/ui/SiteFooter/SiteFooter.module.css';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span>
        <Trans>© {year} Sergio Lenza Morillo</Trans>
      </span>
      <span>
        <Trans>Front-end lead · Product · Systems</Trans>
      </span>
    </footer>
  );
}
