'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './MobileDrawer.module.css';

const navLinks = [
  { href: '/',             label: 'Home' },
  { href: '/about',        label: 'About' },
  { href: '/ashram',       label: 'Ashram' },
  { href: '/learn',        label: 'Learn' },
  { href: '/events',       label: 'Events' },
  { href: '/teachings',    label: 'Teachings' },
  { href: '/publications', label: 'Publications' },
  { href: '/acharyas',     label: 'Acharyas' },
];

interface Props {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileDrawer({ open, onClose, pathname }: Props) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

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
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.om}>ॐ</span>
            <span className={styles.brandName}>Vedanta Mission</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Quote */}
        <p className={styles.quote}>
          &ldquo;Spreading Love &amp; Light by revealing the basic oneness of all&rdquo;
        </p>

        {/* Navigation Links */}
        <nav aria-label="Mobile navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Actions */}
        <div className={styles.actions}>
          <Link href="/donate" className={styles.btnDonate} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2C8 2 2 5.5 2 9.5C2 12 4.5 14 8 14C11.5 14 14 12 14 9.5C14 5.5 8 2 8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            Donate / Seva
          </Link>

          <a href="tel:+917000361938" className={styles.btnCall}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 3a1 1 0 011-1h2.5l1.5 3-1.5 1.5a10 10 0 004.5 4.5L11.5 9.5l3 1.5v2.5a1 1 0 01-1 1A12 12 0 012 3z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" fill="none"/>
            </svg>
            Call Ashram: 7000361938
          </a>

          <a href="https://wa.me/919826959480" className={styles.btnWhatsApp} target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25"/>
              <path d="M5.5 5c.2.5.6 1.2.5 1.5S5.3 7 5 7.5C5.5 8.5 7.5 10.5 8.5 11c.5-.3.9-.5 1.5-.5s1 .4 1.5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
            </svg>
            WhatsApp Chat
          </a>
        </div>

        {/* Footer */}
        <div className={styles.drawerFooter}>
          <p className={styles.address}>
            2948, Sector-E, Sudama Nagar<br />
            Indore – 452009, MP, India
          </p>
        </div>
      </div>
    </>
  );
}
