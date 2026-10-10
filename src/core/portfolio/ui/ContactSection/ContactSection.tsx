'use client';

import { msg } from '@lingui/core/macro';
import { Trans, useLingui } from '@lingui/react/macro';
import { Check, Code2, Copy, Globe2, Mail } from 'lucide-react';
import { useState } from 'react';
import styles from '@/core/portfolio/ui/ContactSection/ContactSection.module.css';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { i18n } = useLingui();

  const copyEmail = async () => {
    await navigator.clipboard.writeText('slenzamori.dev@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" data-reveal className={styles.section}>
      <div className={styles.content}>
        <div>
          <p className={styles.eyebrow}>
            <Trans>Have a product challenge?</Trans>
          </p>
          <h2 className={styles.title}>
            <Trans>
              Let's make the difficult feel{' '}
              <em className={styles.accentText}>possible.</em>
            </Trans>
          </h2>
        </div>
        <div className={styles.contactDetails}>
          <button
            type="button"
            onClick={copyEmail}
            className={styles.emailButton}
            aria-label={i18n._(msg`Copy email`)}
          >
            <span>
              {copied ? i18n._(msg`Email copied`) : 'slenzamori.dev@gmail.com'}
            </span>
            {copied ? <Check /> : <Copy className={styles.copyIcon} />}
          </button>
          <div className={styles.socialLinks}>
            <a
              className={styles.socialLink}
              href="https://www.linkedin.com"
              aria-label={i18n._(msg`LinkedIn`)}
            >
              <Globe2 />
            </a>
            <a
              className={styles.socialLink}
              href="https://github.com/sergiolenza"
              aria-label={i18n._(msg`GitHub`)}
            >
              <Code2 />
            </a>
            <a
              className={styles.socialLink}
              href="mailto:slenzamori.dev@gmail.com"
              aria-label={i18n._(msg`Email`)}
            >
              <Mail />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
