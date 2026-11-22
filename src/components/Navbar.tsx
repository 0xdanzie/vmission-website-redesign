'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from './BrandLogo';
import MobileDrawer from './MobileDrawer';
import styles from './Navbar.module.css';

export interface NavSubChild {
  label: string;
  href: string;
}

export interface NavChildItem {
  label: string;
  href: string;
  description?: string;
  isExternal?: boolean;
  subChildren?: NavSubChild[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChildItem[];
}

export const CLIENT_NAV_STRUCTURE: NavItem[] = [
  {
    label: 'Ashram',
    href: '/ashram',
    children: [
      { label: 'Ashram Activities', href: '/ashram#activities', description: 'Daily rhythm of meditation, worship & classes' },
      { label: 'Sadhna Camps', href: '/ashram/camps', description: 'Residential scriptural camps & retreats' },
      { label: 'Courses (Long & Short Term)', href: '/ashram/courses/gita-course', description: 'Residential 1-year Gita Course & Gurukula study' },
      { label: 'About Ashram (Info)', href: '/ashram', description: 'Campus founding, history & Gurukula overview' },
      { label: 'Facilities', href: '/ashram#facilities', description: 'Pravachan hall, research library & campus facilities' },
      { label: 'Direction & Location', href: '/ashram#reach', description: 'Travel guide by air, rail, and road' },
      { label: 'Ashram Parivar', href: '/ashram#parivar', description: 'Silver Jubilee devotee fellowship & mission seva' },
    ],
  },
  {
    label: 'Teachings',
    href: '/teachings',
    children: [
      { label: 'Bhagwad Gita', href: '/teachings/?category=bhagavad-gita', description: 'Karma Yoga & Bhakti Yoga discourses' },
      { label: 'Prakarana Grantha', href: '/teachings/?category=prakarana-granth', description: 'Vivekachudamani & introductory texts' },
      { label: 'Principal Upanishad', href: '/teachings/?category=upanishads', description: 'Mandukya Karika & classical Upanishads' },
      { label: 'Others / Complete Archive', href: '/teachings', description: 'Jnana Ganga complete searchable archive' },
    ],
  },
  {
    label: 'Publications',
    href: '/publications',
    children: [
      {
        label: 'E-Books',
        href: '/publications?type=E-Books',
        description: 'Advaita treatises and commentaries by Pujya Guruji',
        subChildren: [
          { label: 'Hindi', href: '/publications?type=E-Books&lang=hindi' },
          { label: 'English', href: '/publications?type=E-Books&lang=english' },
          { label: 'Gujarati', href: '/publications?type=E-Books&lang=gujarati' },
        ],
      },
      { label: 'Vedanta Sandesh', href: '/publications?type=Vedanta+Sandesh', description: 'Monthly spiritual ezine archive' },
      { label: 'Vedanta Piyush', href: '/publications?type=Vedanta+Piyush', description: 'Quarterly Hindi/Gujarati journal collection' },
    ],
  },
  {
    label: 'Courses',
    href: '/courses',
    children: [
      { label: 'Tattvabodha', href: '/learn/tattva-bodha', description: 'Classical introductory 40-lesson text' },
      { label: 'Gita Intro', href: '/learn/gita-online', description: 'Structured 40-lesson correspondence course' },
      { label: 'Vishnu Sahasranaam', href: '/courses/vishnu-sahasranaam', description: '1,000 names meditative exposition' },
      { label: 'Online Class — Sw. Amitananda', href: '/courses?teacher=amitananda', description: 'Systematic scriptural study series' },
      { label: 'Online Class — Sw. Samatananda', href: '/courses?teacher=samatananda', description: 'Introductory & youth Vedanta series' },
    ],
  },
  {
    label: 'Programs',
    href: '/events',
    children: [
      { label: 'Forthcoming Programs', href: '/events#forthcoming', description: 'Upcoming satsangs, shivirs & camps' },
      { label: 'Earlier Programs', href: '/events#earlier', description: 'Chronicle of past Gyana Yagnas' },
      { label: 'Album & Chronicle', href: '/events#gallery', description: 'Historical camp archives & assembly records' },
      { label: 'All Activities', href: '/events', description: 'Thirty-six years of continuous gatherings' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About Ashram', href: '/about', description: 'Vision, genesis & institutional history' },
      { label: 'Daily Routine & Classes', href: '/ashram#routine', description: 'Monastic Dinacharya & daily study rhythm' },
      { label: 'Our Acharyas & Lineage', href: '/acharyas', description: 'Swami Atmananda Saraswati & Acharyas' },
      { label: 'Trusts & Governance', href: '/about#trusts', description: 'Registered public charitable trusts' },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contactCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleContactMouseEnter = () => {
    if (contactCloseTimeoutRef.current) {
      clearTimeout(contactCloseTimeoutRef.current);
      contactCloseTimeoutRef.current = null;
    }
    setContactDropdownOpen(true);
  };

  const handleContactMouseLeave = () => {
    contactCloseTimeoutRef.current = setTimeout(() => {
      setContactDropdownOpen(false);
    }, 200);
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
              <BrandLogo variant="emblem" size="md" priority />
            </span>
          </Link>

          {/* Desktop Navigation — 6 Primary Left Items */}
          <nav className={styles.desktopNav} role="navigation" aria-label="Primary Navigation">
            {CLIENT_NAV_STRUCTURE.map((item) => {
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
                        {item.children?.map((child) => {
                          const isExt = child.isExternal || child.href.startsWith('http') || child.href.startsWith('mailto');
                          return (
                            <li key={child.href} role="none">
                              {isExt ? (
                                <a
                                  href={child.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.dropdownItem}
                                  role="menuitem"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <span className={styles.dropdownItemLabel}>{child.label}</span>
                                  {child.description && (
                                    <span className={styles.dropdownItemDesc}>{child.description}</span>
                                  )}
                                </a>
                              ) : (
                                <div className={styles.dropdownItemWrap}>
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

                                  {/* Subchildren pills for parent items like E-Books */}
                                  {child.subChildren && child.subChildren.length > 0 && (
                                    <ul className={styles.subChildrenList} role="group" aria-label={`${child.label} languages`}>
                                      {child.subChildren.map((sub) => (
                                        <li key={sub.href} role="none">
                                          <Link
                                            href={sub.href}
                                            prefetch={true}
                                            className={styles.subChildPill}
                                            onClick={() => setActiveDropdown(null)}
                                          >
                                            {sub.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Group — Single Contact Dropdown & Donate */}
          <div className={styles.actions}>
            {/* Split Interactive Contact Control: direct navigation + options trigger */}
            <div
              className={styles.contactDropdownWrapper}
              onMouseEnter={handleContactMouseEnter}
              onMouseLeave={handleContactMouseLeave}
            >
              <div className={`${styles.btnContactGroup} ${contactDropdownOpen ? styles.btnContactActive : ''}`}>
                <Link
                  href="/contact"
                  prefetch={true}
                  className={styles.btnContactLabel}
                  aria-label="Visit Contact Page"
                >
                  <span>Contact</span>
                </Link>
                <button
                  type="button"
                  className={styles.btnContactTrigger}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setContactDropdownOpen(!contactDropdownOpen);
                  }}
                  aria-expanded={contactDropdownOpen}
                  aria-haspopup="menu"
                  aria-label="Toggle contact options"
                >
                  <svg
                    className={`${styles.caret} ${contactDropdownOpen ? styles.caretRotated : ''}`}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {contactDropdownOpen && (
                <div
                  className={styles.contactDropdownPanel}
                  role="menu"
                  aria-label="Contact channels"
                >
                  <Link
                    href="/contact"
                    prefetch={true}
                    className={styles.contactDropdownItem}
                    role="menuitem"
                    onClick={() => setContactDropdownOpen(false)}
                  >
                    <span className={styles.contactDropdownLabel}>Contact & Visit Information</span>
                    <span className={styles.contactDropdownDesc}>Ashram address, directions & visiting hours</span>
                  </Link>
                  <a
                    href="https://wa.me/919826959480"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactDropdownItem}
                    role="menuitem"
                    onClick={() => setContactDropdownOpen(false)}
                  >
                    <span className={styles.contactDropdownLabel}>WhatsApp Direct</span>
                    <span className={styles.contactDropdownDesc}>+91 98269 59480 direct assistance</span>
                  </a>
                  <a
                    href="mailto:vmission@gmail.com"
                    className={styles.contactDropdownItem}
                    role="menuitem"
                    onClick={() => setContactDropdownOpen(false)}
                  >
                    <span className={styles.contactDropdownLabel}>Gmail Direct</span>
                    <span className={styles.contactDropdownDesc}>vmission@gmail.com</span>
                  </a>
                  <Link
                    href="/contact#form"
                    prefetch={true}
                    className={styles.contactDropdownItem}
                    role="menuitem"
                    onClick={() => setContactDropdownOpen(false)}
                  >
                    <span className={styles.contactDropdownLabel}>Contact Form</span>
                    <span className={styles.contactDropdownDesc}>Send an online enquiry to Ashram</span>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/donate" prefetch={true} className={styles.btnDonate}>
              <span>Donate</span>
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
