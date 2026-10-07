'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './PageTransition.module.css';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [navState, setNavState] = useState<'idle' | 'active' | 'completing'>('idle');
  const [key, setKey] = useState(pathname);
  const prevPathRef = useRef(pathname);

  // Instant tactile feedback on clicking internal navigation links
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Skip external links, hashes, mailto, tel, downloads, or blank targets
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.getAttribute('target') === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      // If clicking current route exactly, do not trigger transition
      if (href === pathname || href === `${pathname}/`) {
        return;
      }

      // Check if user prefers reduced motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      // Check for Shared-Element Morph Source
      const morphCard = anchor.closest('[data-morph-source]');
      if (morphCard) {
        const morphEl =
          morphCard.querySelector('[data-morph-element]') ||
          morphCard.querySelector('img') ||
          morphCard;
        if (morphEl) {
          (morphEl as HTMLElement).style.setProperty('view-transition-name', 'vm-morph-entity');
          setTimeout(() => {
            (morphEl as HTMLElement).style.removeProperty('view-transition-name');
          }, 1200);
        }
      }

      // Start instant tactile hairline indicator (0ms delay)
      setNavState('active');
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true });
    };
  }, [pathname]);

  // When pathname changes, complete transition and reveal destination
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReduced && typeof document !== 'undefined' && 'startViewTransition' in document) {
        (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
          setKey(pathname);
        });
      } else {
        setKey(pathname);
      }

      setNavState('completing');

      const timer = setTimeout(() => {
        setNavState('idle');
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const hairlineClass =
    navState === 'active'
      ? styles.hairlineActive
      : navState === 'completing'
      ? styles.hairlineCompleting
      : styles.hairlineDone;

  return (
    <>
      {/* Top Editorial Hairline Indicator */}
      <div className={styles.hairlineTrack} aria-hidden="true">
        <div className={`${styles.hairlineProgress} ${hairlineClass}`} />
      </div>

      {/* Main Content Area with Editorial Reveal */}
      <div key={key} className={`${styles.pageWrapper} ${styles.editorialEntering}`}>
        {children}
      </div>
    </>
  );
}
