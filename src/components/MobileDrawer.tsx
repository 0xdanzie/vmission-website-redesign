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
  const [ashramOpen, setAshramOpen] = useState(false);
  const [teachingsOpen, setTeachingsOpen] = useState(false);
  const [pubsOpen, setPubsOpen] = useState(false);
  const [ebooksSubOpen, setEbooksSubOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

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
        data-lenis-prevent
      >
        {/* Header */}
        <div className={styles.header}>
          <Link href="/" onClick={onClose} aria-label="Vedanta Mission Home">
            <BrandLogo variant="emblem" size="md" />
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
            {/* Home */}
            <li>
              <Link
                href="/"
                className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
                onClick={onClose}
              >
                Home
              </Link>
            </li>

            {/* 1. ASHRAM */}
            <li className={styles.accordionItem}>
              <button
                type="button"
                className={`${styles.accordionToggle} ${ashramOpen ? styles.openToggle : ''}`}
                onClick={() => setAshramOpen(!ashramOpen)}
                aria-expanded={ashramOpen}
              >
                <span>Ashram</span>
                <svg
                  className={`${styles.toggleCaret} ${ashramOpen ? styles.caretRotated : ''}`}
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
              {ashramOpen && (
                <ul className={styles.subList}>
                  <li>
                    <Link href="/ashram#activities" className={styles.subLink} onClick={onClose}>
                      Ashram Activities
                    </Link>
                  </li>
                  <li>
                    <Link href="/ashram/camps" className={styles.subLink} onClick={onClose}>
                      Sadhna Camps
                    </Link>
                  </li>
                  <li>
                    <Link href="/ashram/courses/gita-course" className={styles.subLink} onClick={onClose}>
                      Courses (Long &amp; Short Term)
                    </Link>
                  </li>
                  <li>
                    <Link href="/ashram" className={styles.subLink} onClick={onClose}>
                      About Ashram (Info)
                    </Link>
                  </li>
                  <li>
                    <Link href="/ashram#facilities" className={styles.subLink} onClick={onClose}>
                      Campus Facilities
                    </Link>
                  </li>
                  <li>
                    <Link href="/ashram#reach" className={styles.subLink} onClick={onClose}>
                      Direction &amp; Location
                    </Link>
                  </li>
                  <li>
                    <Link href="/ashram#parivar" className={styles.subLink} onClick={onClose}>
                      Ashram Parivar
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 2. TEACHINGS */}
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
                    <Link href="/teachings" className={styles.subLink} onClick={onClose}>
                      All Discourses &amp; Audio (Jnana Ganga)
                    </Link>
                  </li>
                  <li>
                    <Link href="/teachings/?category=bhagavad-gita" className={styles.subLink} onClick={onClose}>
                      Bhagwad Gita
                    </Link>
                  </li>
                  <li>
                    <Link href="/teachings/?category=prakarana-granth" className={styles.subLink} onClick={onClose}>
                      Prakarana Grantha
                    </Link>
                  </li>
                  <li>
                    <Link href="/teachings/?category=upanishads" className={styles.subLink} onClick={onClose}>
                      Principal Upanishad
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 3. PUBLICATIONS */}
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
                  {/* Nested E-Books Grouping */}
                  <li>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '1rem' }}>
                      <Link href="/publications?type=E-Books" className={styles.subLink} onClick={onClose}>
                        E-Books (All Languages)
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEbooksSubOpen(!ebooksSubOpen);
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--dr-accent)', cursor: 'pointer', fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}
                        aria-label="Toggle language filters"
                      >
                        {ebooksSubOpen ? 'Hide ▲' : 'Languages ▼'}
                      </button>
                    </div>
                    {ebooksSubOpen && (
                      <ul style={{ listStyle: 'none', paddingLeft: '2.8rem', margin: '0.2rem 0 0.5rem' }}>
                        <li>
                          <Link href="/publications?type=E-Books&lang=hindi" className={styles.subLink} onClick={onClose} style={{ fontSize: '0.85rem', padding: '0.35rem 0' }}>
                            Hindi E-Books
                          </Link>
                        </li>
                        <li>
                          <Link href="/publications?type=E-Books&lang=english" className={styles.subLink} onClick={onClose} style={{ fontSize: '0.85rem', padding: '0.35rem 0' }}>
                            English E-Books
                          </Link>
                        </li>
                        <li>
                          <Link href="/publications?type=E-Books&lang=gujarati" className={styles.subLink} onClick={onClose} style={{ fontSize: '0.85rem', padding: '0.35rem 0' }}>
                            Gujarati E-Books
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <Link href="/publications?type=Vedanta+Sandesh" className={styles.subLink} onClick={onClose}>
                      Vedanta Sandesh (Ezine Archive)
                    </Link>
                  </li>
                  <li>
                    <Link href="/publications?type=Vedanta+Piyush" className={styles.subLink} onClick={onClose}>
                      Vedanta Piyush (Hindi/Gujarati)
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 4. COURSES */}
            <li className={styles.accordionItem}>
              <button
                type="button"
                className={`${styles.accordionToggle} ${coursesOpen ? styles.openToggle : ''}`}
                onClick={() => setCoursesOpen(!coursesOpen)}
                aria-expanded={coursesOpen}
              >
                <span>Courses</span>
                <svg
                  className={`${styles.toggleCaret} ${coursesOpen ? styles.caretRotated : ''}`}
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
              {coursesOpen && (
                <ul className={styles.subList}>
                  <li>
                    <Link href="/courses" className={styles.subLink} onClick={onClose}>
                      Courses Overview &amp; Curriculum
                    </Link>
                  </li>
                  <li>
                    <Link href="/learn/tattva-bodha" className={styles.subLink} onClick={onClose}>
                      Tattvabodha (Interactive Reader)
                    </Link>
                  </li>
                  <li>
                    <Link href="/learn/gita-online" className={styles.subLink} onClick={onClose}>
                      Gita Intro (Correspondence Course)
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses/vishnu-sahasranaam" className={styles.subLink} onClick={onClose}>
                      Vishnu Sahasranaam
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses?teacher=amitananda" className={styles.subLink} onClick={onClose}>
                      Online Class — Sw. Amitananda
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses?teacher=samatananda" className={styles.subLink} onClick={onClose}>
                      Online Class — Sw. Samatananda
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 5. PROGRAMS */}
            <li className={styles.accordionItem}>
              <button
                type="button"
                className={`${styles.accordionToggle} ${programsOpen ? styles.openToggle : ''}`}
                onClick={() => setProgramsOpen(!programsOpen)}
                aria-expanded={programsOpen}
              >
                <span>Programs</span>
                <svg
                  className={`${styles.toggleCaret} ${programsOpen ? styles.caretRotated : ''}`}
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
              {programsOpen && (
                <ul className={styles.subList}>
                  <li>
                    <Link href="/events" className={styles.subLink} onClick={onClose}>
                      All Programs &amp; Activities
                    </Link>
                  </li>
                  <li>
                    <Link href="/events#forthcoming" className={styles.subLink} onClick={onClose}>
                      Forthcoming Programs
                    </Link>
                  </li>
                  <li>
                    <Link href="/events#earlier" className={styles.subLink} onClick={onClose}>
                      Earlier Programs (Archive)
                    </Link>
                  </li>
                  <li>
                    <Link href="/events#gallery" className={styles.subLink} onClick={onClose}>
                      Album &amp; Chronicle
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 6. ABOUT */}
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
                    <Link href="/about" className={styles.subLink} onClick={onClose}>
                      About Ashram (Vision &amp; Genesis)
                    </Link>
                  </li>
                  <li>
                    <Link href="/ashram#routine" className={styles.subLink} onClick={onClose}>
                      Daily Routine &amp; Classes
                    </Link>
                  </li>
                  <li>
                    <Link href="/acharyas" className={styles.subLink} onClick={onClose}>
                      Our Acharyas &amp; Lineage
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#trusts" className={styles.subLink} onClick={onClose}>
                      Trusts &amp; Governance
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 7. CONTACT */}
            <li className={styles.accordionItem}>
              <button
                type="button"
                className={`${styles.accordionToggle} ${contactOpen ? styles.openToggle : ''}`}
                onClick={() => setContactOpen(!contactOpen)}
                aria-expanded={contactOpen}
              >
                <span>Contact</span>
                <svg
                  className={`${styles.toggleCaret} ${contactOpen ? styles.caretRotated : ''}`}
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
              {contactOpen && (
                <ul className={styles.subList}>
                  <li>
                    <Link href="/contact" className={styles.subLink} onClick={onClose} style={{ fontWeight: 600, color: 'var(--nb-accent, #C96622)' }}>
                      Contact & Visit Information →
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/919826959480"
                      className={styles.subLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                    >
                      WhatsApp Direct (+91 98269 59480)
                    </a>
                  </li>
                  <li>
                    <a href="mailto:vmission@gmail.com" className={styles.subLink} onClick={onClose}>
                      Email Ashram (vmission@gmail.com)
                    </a>
                  </li>
                  <li>
                    <Link href="/contact#form" className={styles.subLink} onClick={onClose}>
                      Online Contact Form
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* 8. DONATE & Footer Actions in Drawer */}
        <div className={styles.footerActions}>
          <Link href="/donate" className={styles.btnDrawerDonate} onClick={onClose}>
            <span>Donate</span>
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
