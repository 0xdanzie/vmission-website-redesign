'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
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
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const trigger = { trigger: section, start: 'top 75%', once: true };
      gsap.fromTo(
        '[data-pf-line]',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12, scrollTrigger: trigger }
      );
      gsap.fromTo(
        '[data-pf-rule]',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: 'power3.out', scrollTrigger: trigger }
      );
    }, section);

    if (reduce || window.innerWidth < 900) {
      return () => ctx.revert();
    }

    const xTo = gsap.quickTo(glow, 'x', { duration: 0.9, ease: 'power3.out' });
    const yTo = gsap.quickTo(glow, 'y', { duration: 0.9, ease: 'power3.out' });
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      xTo(e.clientX - r.left - 280);
      yTo(e.clientY - r.top - 280);
    };
    section.addEventListener('pointermove', onMove);
    return () => {
      section.removeEventListener('pointermove', onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.preFooterSection} aria-labelledby="pre-footer-heading">
      <div className={styles.preFooterBackdrop} aria-hidden="true">
        <div ref={glowRef} className={styles.glow} />
      </div>
      <div className="container">
        <div className={styles.preFooterContent}>
          {tag && <span className={styles.tagBadge}>{tag}</span>}
          {sanskrit && <p className={styles.sanskritInvocation}>{sanskrit}</p>}

          <h2 id="pre-footer-heading" className={styles.heading}>
            <span className={styles.lineMask}><span className={styles.lineInner} data-pf-line>{heading}</span></span>
            {subheading && (
              <span className={styles.subheading}>
                <span className={styles.lineMask}><span className={styles.lineInner} data-pf-line>{subheading}</span></span>
              </span>
            )}
          </h2>
          <span className={styles.rule} data-pf-rule aria-hidden="true" />

          <p className={styles.description}>{description}</p>

          {quote && (
            <blockquote className={styles.quoteCard}>
              <p className={styles.quoteSanskrit}>{quote.sanskrit}</p>
              <p className={styles.quoteTranslation}>&ldquo;{quote.translation}&rdquo;</p>
              <cite className={styles.quoteSource}>{quote.source}</cite>
            </blockquote>
          )}

          <div className={styles.ctaRow}>
            {ctas.map((cta, idx) => (
              <Button
                key={idx}
                href={cta.href}
                variant={cta.variant || (idx === 0 ? 'primary' : 'outline')}
                size="lg"
                tone="dark"
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
