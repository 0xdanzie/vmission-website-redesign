'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from './BrandLogo';
import MobileDrawer from './MobileDrawer';
import styles from './Navbar.module.css';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

const navStructure: NavItem[] = [
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'Vision & Mission', href: '/about/', description: 'Spreading Love & Light through Advaita' },
      { label: 'Our Acharyas', href: '/acharyas/', description: 'Swami Atmananda Saraswati & Lineage' },
      { label: 'Trusts & Governance', href: '/about/#trusts', description: 'Vedanta Parmarthic Sewa Trust' },
    ],
  },
  { label: 'Ashram', href: '/ashram/' },
  {
    label: 'Teachings',
    href: '/teachings/',
    children: [
      { label: 'All Discourses & Audio', href: '/teachings/', description: 'Jnana Ganga complete searchable archive' },
      { label: 'Bhagavad Gita', href: '/teachings/?category=bhagavad-gita', description: 'Karma Yoga & Bhakti Yoga discourses' },
      { label: 'Principal Upanishads', href: '/teachings/?category=upanishads', description: 'Mandukya Karika & classical Upanishads' },
      { label: 'Prakarana Granths', href: '/teachings/?category=prakarana-granth', description: 'Vivekachudamani & introductory texts' },
    ],
  },
  {
    label: 'Publications',
    href: '/publications/',
    children: [
      { label: 'Vedanta Sandesh', href: '/publications/', description: 'Monthly spiritual ezine in English & Hindi' },
      { label: 'Vedanta Piyush', href: '/publications/', description: 'Monthly Hindi & Gujarati publication' },
      { label: 'E-Books & Articles', href: '/publications/', description: 'Treatises by Swami Atmananda Saraswati' },
    ],
  },
  { label: 'Events', href: '/events/' },
  { label: 'Learn', href: '/learn/' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hide in /admin route
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCloseDrawer = React.useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  if (isAdmin) return null;

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={`container ${styles.inner}`}>
          {/* Brand Logo with approved production identities */}
          <Link href="/" className={styles.logoLink} aria-label="Vedanta Mission — Home">
            {/* Approved full horizontal brand lockup: default for desktop, tablet, and standard mobile (>= 361px) */}
            <span className={styles.brandPrimary}>
              <BrandLogo variant="navbar" size="md" priority />
            </span>
            {/* Ultra-narrow fallback (<= 360px): emblem mark */}
            <span className={styles.brandUltraNarrow}>
              <BrandLogo variant="mobile" size="md" priority />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} role="navigation" aria-label="Primary Navigation">
            {navStructure.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              const isOpen = activeDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className={styles.navItemWrapper}
                  onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                  onMouseLeave={() => hasChildren && handleMouseLeave()}
                >
                  <Link
                    href={item.href}
                    prefetch={true}
                    className={`${styles.navLink} ${isActive ? styles.active : ''} ${isOpen ? styles.dropdownOpen : ''}`}
                    aria-expanded={hasChildren ? isOpen : undefined}
                    aria-haspopup={hasChildren ? 'true' : undefined}
                  >
                    <span>{item.label}</span>
                    {hasChildren && (
                      <svg
                        className={`${styles.caret} ${isOpen ? styles.caretRotated : ''}`}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown Menu Panel */}
                  {hasChildren && isOpen && (
                    <div
                      className={styles.dropdownPanel}
                      role="menu"
                      aria-label={`${item.label} sub-navigation`}
                    >
                      <div className={styles.dropdownHeader}>
                        <span className={styles.dropdownKicker}>{item.label}</span>
                      </div>
                      <ul className={styles.dropdownList}>
                        {item.children?.map((child) => (
                          <li key={child.href} role="none">
                            <Link
                              href={child.href}
                              prefetch={true}
                              className={styles.dropdownItem}
                              role="menuitem"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className={styles.dropdownItemLabel}>{child.label}</span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>{child.description}</span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className={styles.actions}>
            <Link href="/contact" prefetch={true} className={styles.btnContact}>
              Contact
            </Link>

            <Link href="/donate" prefetch={true} className={styles.btnDonate}>
              <span>Donate / Seva</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={drawerOpen}
            >
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
            </button>
          </div>
        </div>
      </header>

      {/* Production Mobile Drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        pathname={pathname || '/'}
      />
    </>
  );
}
