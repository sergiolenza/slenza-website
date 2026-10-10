'use client';

import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { Languages, Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from '@/core/portfolio/ui/SiteHeader/SiteHeader.module.css';

const links = [
  ['work', msg`Work`],
  ['experience', msg`Experience`],
  ['contact', msg`Contact`],
] as const;

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { i18n } = useLingui();
  const nextLocale = i18n.locale === 'es' ? 'en' : 'es';

  return (
    <>
      <header className={styles.header}>
        <span className={styles.logo}>SL</span>
        <nav
          className={styles.desktopNavigation}
          aria-label={i18n._(msg`Main navigation`)}
        >
          {links.map(([sectionId, label]) => (
            <a
              key={sectionId}
              className={styles.navigationLink}
              href={`#${sectionId}`}
            >
              {i18n._(label)}
            </a>
          ))}
          <div className={styles.languageSwitcher}>
            <Languages aria-hidden="true" size={18} />
            <span lang={i18n.locale} aria-current="true">
              {i18n.locale.toUpperCase()}
            </span>
            <a
              href={`/${nextLocale}`}
              lang={nextLocale}
              aria-label={
                i18n.locale === 'es'
                  ? i18n._(msg`Switch language to English`)
                  : i18n._(msg`Switch language to Spanish`)
              }
            >
              {nextLocale.toUpperCase()}
            </a>
          </div>
        </nav>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={
            menuOpen ? i18n._(msg`Close menu`) : i18n._(msg`Open menu`)
          }
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      {menuOpen && (
        <nav
          className={styles.mobileNavigation}
          aria-label={i18n._(msg`Mobile navigation`)}
        >
          {links.map(([sectionId, label]) => (
            <a
              key={sectionId}
              href={`#${sectionId}`}
              onClick={() => setMenuOpen(false)}
            >
              {i18n._(label)}
            </a>
          ))}
          <div className={styles.languageSwitcher}>
            <Languages aria-hidden="true" size={18} />
            <span lang={i18n.locale} aria-current="true">
              {i18n.locale.toUpperCase()}
            </span>
            <a
              href={`/${nextLocale}`}
              lang={nextLocale}
              aria-label={
                i18n.locale === 'es'
                  ? i18n._(msg`Switch language to English`)
                  : i18n._(msg`Switch language to Spanish`)
              }
              onClick={() => setMenuOpen(false)}
            >
              {nextLocale.toUpperCase()}
            </a>
          </div>
        </nav>
      )}
    </>
  );
}
