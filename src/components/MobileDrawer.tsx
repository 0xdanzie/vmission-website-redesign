'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BrandLogo from './BrandLogo';
import styles from './MobileDrawer.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileDrawer({ open, onClose, pathname }: Props) {
  // Accordion states
  const [aboutOpen, setAboutOpen] = useState(false);
  const [teachingsOpen, setTeachingsOpen] = useState(false);
  const [pubsOpen, setPubsOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Close drawer on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${open ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`${styles.drawer} ${open ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Header */}
        <div className={styles.header}>
          <Link href="/" onClick={onClose} aria-label="Vedanta Mission Home">
            <BrandLogo variant="mobile" size="md" />
          </Link>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Sacred Motto */}
        <div className={styles.mottoBar}>
          <span>सत्यं ज्ञानमनन्तं ब्रह्म</span>
          <p>&ldquo;Spreading Love &amp; Light by revealing the basic oneness of all.&rdquo;</p>
        </div>

        {/* Scrollable Navigation Body */}
        <nav className={styles.navContent} aria-label="Mobile Primary Navigation">
          <ul className={styles.navList}>
            {/* 1. Home */}
            <li>
              <Link
                href="/"
                className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
                onClick={onClose}
              >
                Home
              </Link>
            </li>

            {/* 2. About Accordion */}
            <li className={styles.accordionItem}>
              <button
                type="button"
                className={`${styles.accordionToggle} ${aboutOpen ? styles.openToggle : ''}`}
                onClick={() => setAboutOpen(!aboutOpen)}
                aria-expanded={aboutOpen}
              >
                <span>About</span>
                <svg
                  className={`${styles.toggleCaret} ${aboutOpen ? styles.caretRotated : ''}`}
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
              {aboutOpen && (
                <ul className={styles.subList}>
                  <li>
                    <Link href="/about/" className={styles.subLink} onClick={onClose}>
                      Vision &amp; Genesis
                    </Link>
                  </li>
                  <li>
                    <Link href="/acharyas/" className={styles.subLink} onClick={onClose}>
                      Our Acharyas &amp; Lineage
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/#trusts" className={styles.subLink} onClick={onClose}>
                      Trusts &amp; Governance
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 3. Ashram (Direct Link) */}
            <li>
              <Link
                href="/ashram/"
                className={`${styles.navLink} ${pathname === '/ashram' || pathname === '/ashram/' ? styles.active : ''}`}
                onClick={onClose}
              >
                The Ashram
              </Link>
            </li>

            {/* 4. Teachings Accordion */}
            <li className={styles.accordionItem}>
              <button
                type="button"
                className={`${styles.accordionToggle} ${teachingsOpen ? styles.openToggle : ''}`}
                onClick={() => setTeachingsOpen(!teachingsOpen)}
                aria-expanded={teachingsOpen}
              >
                <span>Teachings</span>
                <svg
                  className={`${styles.toggleCaret} ${teachingsOpen ? styles.caretRotated : ''}`}
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
              {teachingsOpen && (
                <ul className={styles.subList}>
                  <li>
                    <Link href="/teachings/" className={styles.subLink} onClick={onClose}>
                      All Discourses &amp; Audio (Jnana Ganga)
                    </Link>
                  </li>
                  <li>
                    <Link href="/teachings/?category=bhagavad-gita" className={styles.subLink} onClick={onClose}>
                      Bhagavad Gita
                    </Link>
                  </li>
                  <li>
                    <Link href="/teachings/?category=upanishads" className={styles.subLink} onClick={onClose}>
                      Principal Upanishads
                    </Link>
                  </li>
                  <li>
                    <Link href="/teachings/?category=prakarana-granth" className={styles.subLink} onClick={onClose}>
                      Prakarana Granths
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 5. Publications Accordion */}
            <li className={styles.accordionItem}>
              <button
                type="button"
                className={`${styles.accordionToggle} ${pubsOpen ? styles.openToggle : ''}`}
                onClick={() => setPubsOpen(!pubsOpen)}
                aria-expanded={pubsOpen}
              >
                <span>Publications</span>
                <svg
                  className={`${styles.toggleCaret} ${pubsOpen ? styles.caretRotated : ''}`}
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
              {pubsOpen && (
                <ul className={styles.subList}>
                  <li>
                    <Link href="/publications/" className={styles.subLink} onClick={onClose}>
                      Vedanta Sandesh (English/Hindi)
                    </Link>
                  </li>
                  <li>
                    <Link href="/publications/" className={styles.subLink} onClick={onClose}>
                      Vedanta Piyush (Hindi/Gujarati)
                    </Link>
                  </li>
                  <li>
                    <Link href="/publications/" className={styles.subLink} onClick={onClose}>
                      E-Books &amp; Articles
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 6. Events */}
            <li>
              <Link
                href="/events/"
                className={`${styles.navLink} ${pathname === '/events' || pathname === '/events/' ? styles.active : ''}`}
                onClick={onClose}
              >
                Events &amp; Retreats
              </Link>
            </li>

            {/* 7. Learn */}
            <li>
              <Link
                href="/learn/"
                className={`${styles.navLink} ${pathname === '/learn' || pathname === '/learn/' ? styles.active : ''}`}
                onClick={onClose}
              >
                Learn Vedanta
              </Link>
            </li>

            {/* 8. Contact */}
            <li>
              <Link
                href="/contact/"
                className={`${styles.navLink} ${pathname === '/contact' || pathname === '/contact/' ? styles.active : ''}`}
                onClick={onClose}
              >
                Contact &amp; Location
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer Actions in Drawer */}
        <div className={styles.footerActions}>
          <Link href="/donate" className={styles.btnDrawerDonate} onClick={onClose}>
            <span>Offer Seva / Donate</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>

          <div className={styles.quickContactLinks}>
            <a
              href="https://wa.me/919826959480"
              className={styles.contactChip}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Ashram
            </a>
            <a href="tel:+917000361938" className={styles.contactChip}>
              +91 7000361938
            </a>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '4px' }}>
            <Link
              href="/admin/login"
              onClick={onClose}
              style={{
                fontSize: '0.75rem',
                color: '#8A8178',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color var(--vm-ease-fast)',
              }}
            >
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
