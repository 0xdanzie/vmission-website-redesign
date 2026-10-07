import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import styles from './CinematicPreFooter.module.css';

interface PreFooterCta {
  label: string;
  href: string;
  variant?: 'primary' | 'outline';
}

interface CinematicPreFooterProps {
  tag?: string;
  sanskrit?: string;
  heading: string;
  subheading?: string;
  description: string;
  ctas?: PreFooterCta[];
  quote?: {
    sanskrit: string;
    translation: string;
    source: string;
  };
}

export default function CinematicPreFooter({
  tag = 'Sacred Invitation',
  sanskrit,
  heading,
  subheading,
  description,
  ctas = [
    { label: 'Visit the Ashram', href: '/ashram', variant: 'primary' },
    { label: 'Explore Teachings', href: '/teachings', variant: 'outline' },
  ],
  quote,
}: CinematicPreFooterProps) {
  return (
    <section className={styles.preFooterSection} aria-label="Ashram Invitation">
      <div className={styles.preFooterBackdrop} aria-hidden="true" />
      <div className="container">
        <div className={styles.preFooterContent}>
          {tag && <span className={styles.tagBadge}>{tag}</span>}
          {sanskrit && <p className={styles.sanskritInvocation}>{sanskrit}</p>}

          <h2 className={styles.heading}>
            {heading}
            {subheading && <span className={styles.subheading}>{subheading}</span>}
          </h2>

          <p className={styles.description}>{description}</p>

          {quote && (
            <div className={styles.quoteCard}>
              <p className={styles.quoteSanskrit}>{quote.sanskrit}</p>
              <p className={styles.quoteTranslation}>&ldquo;{quote.translation}&rdquo;</p>
              <span className={styles.quoteSource}>{quote.source}</span>
            </div>
          )}

          <div className={styles.ctaRow}>
            {ctas.map((cta, idx) => (
              <Button
                key={idx}
                href={cta.href}
                variant={cta.variant || (idx === 0 ? 'primary' : 'outline')}
                size="lg"
                className={idx > 0 ? styles.secondaryBtn : undefined}
              >
                {cta.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
