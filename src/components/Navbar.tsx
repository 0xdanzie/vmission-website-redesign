'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from './BrandLogo';
import MobileDrawer from './MobileDrawer';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/about',        label: 'About' },
  { href: '/ashram',       label: 'Ashram' },
  { href: '/learn',        label: 'Learn' },
  { href: '/events',       label: 'Events' },
  { href: '/teachings',    label: 'Teachings' },
  { href: '/publications', label: 'Publications' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // If in /admin route, hide the public navbar
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isAdmin) return null;

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={`container ${styles.inner}`}>
          {/* Brand Logo */}
          <Link href="/" aria-label="Vedanta Mission — Home">
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} role="navigation" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname?.startsWith(link.href) ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <Link href="/donate" className={styles.btnDonate}>
              Donate / Seva
            </Link>
            <Link href="/contact" className={styles.btnContact}>
              Contact
            </Link>
            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} pathname={pathname || '/'} />
    </>
  );
}
