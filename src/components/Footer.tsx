'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from './BrandLogo';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Hide public footer in /admin routes
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.grid}>
          {/* Column 1: Brand & Mission */}
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <BrandLogo variant="monochrome-light" size="md" />
            </div>
            <p className={styles.mission}>
              &ldquo;Spreading &lsquo;Love &amp; Light&rsquo; by revealing the basic oneness of all.&rdquo;
            </p>
            <p className={styles.address}>
              <strong>Vedanta Ashram</strong><br />
              2948, Sector-E, Sudama Nagar<br />
              Inside Sankaracharya Gate<br />
              Indore – 452009, M.P., India
            </p>
            <div className={styles.contact}>
              <a href="tel:+917000361938" className={styles.contactLink}>
                📞 +91 7000361938
              </a>
              <a href="mailto:vmission@gmail.com" className={styles.contactLink}>
                ✉️ vmission@gmail.com
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className={styles.navCol}>
            <h3 className={styles.colHead}>Navigate</h3>
            <nav aria-label="Footer navigation">
              <ul className={styles.navList}>
                {[
                  { href: '/', label: 'Home' },
                  { href: '/about', label: 'About Us' },
                  { href: '/acharyas', label: 'Acharyas' },
                  { href: '/ashram', label: 'The Ashram' },
                  { href: '/learn', label: 'Learn Vedanta' },
                  { href: '/events', label: 'Events & Camps' },
                  { href: '/teachings', label: 'Teachings Hub' },
                  { href: '/publications', label: 'Publications' },
                  { href: '/donate', label: 'Donate / Seva' },
                  { href: '/contact', label: 'Contact Us' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.navLink}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Trusts & Tax Status */}
          <div className={styles.trustCol}>
            <h3 className={styles.colHead}>Our Trusts</h3>
            <div className={styles.trust}>
              <h4 className={styles.trustName}>Vedanta Parmarthic Sewa Trust</h4>
              <p className={styles.trustDetail}>Registered Public Charitable Trust<br />Indore, Madhya Pradesh</p>
              <p className={styles.taxBadge}>✓ 80-G Tax Exemption Available</p>
            </div>
            <div className={styles.trust}>
              <h4 className={styles.trustName}>Ishwara Charitable Trust</h4>
              <p className={styles.trustDetail}>Registered Public Charitable Trust<br />Mumbai, Maharashtra</p>
            </div>
          </div>

          {/* Column 4: Quick Actions & Staff Gateway */}
          <div className={styles.actionsCol}>
            <h3 className={styles.colHead}>Connect &amp; Support</h3>
            <Link href="/donate" className={styles.donateBtn}>
              Offer Seva / Donate →
            </Link>
            <a
              href="https://wa.me/919826959480"
              className={styles.waBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp the Ashram
            </a>
            <div className={styles.publication}>
              <p className={styles.pubLabel}>Monthly Publications</p>
              <Link href="/publications" className={styles.pubLink}>Vedanta Sandesh (English / Hindi)</Link>
              <Link href="/publications" className={styles.pubLink}>Vedanta Piyush (Hindi / Gujarati)</Link>
            </div>
            <div className={styles.adminGate}>
              <p className={styles.adminSectionHead}>Administration</p>
              <Link href="/admin" className={styles.adminLink}>
                Staff Portal →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {year} Vedanta Mission, Indore. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <span>A Proposal Prototype for Vedanta Mission · Indore, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
