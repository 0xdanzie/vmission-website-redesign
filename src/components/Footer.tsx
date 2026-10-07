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
          
          {/* Column 1: Brand & Sacred Mission */}
          <div className={styles.brandCol}>
            <Link href="/" aria-label="Vedanta Mission Home" className={styles.footerLogo}>
              <BrandLogo variant="footer" size="md" />
            </Link>
            
            <p className={styles.missionText}>
              &ldquo;Spreading &lsquo;Love &amp; Light&rsquo; by revealing the basic oneness of all.&rdquo;
            </p>

            <address className={styles.addressBlock}>
              <strong>Vedanta Ashram</strong><br />
              2948, Sector-E, Sudama Nagar<br />
              Inside Shankaracharya Gate<br />
              Indore – 452009, M.P., India
            </address>

            <div className={styles.contactList}>
              <a href="tel:+917000361938" className={styles.contactItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 7000361938
              </a>
              <a href="mailto:vmission@gmail.com" className={styles.contactItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                vmission@gmail.com
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className={styles.navCol}>
            <h3 className={styles.colHeading}>Navigate</h3>
            <nav aria-label="Footer primary navigation">
              <ul className={styles.navList}>
                {[
                  { href: '/about', label: 'About' },
                  { href: '/ashram', label: 'Ashram' },
                  { href: '/acharyas', label: 'Acharyas' },
                  { href: '/teachings', label: 'Teachings' },
                  { href: '/publications', label: 'Publications' },
                  { href: '/events', label: 'Events' },
                  { href: '/learn', label: 'Learn' },
                  { href: '/contact', label: 'Contact' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.navLink}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Registered Charitable Trusts */}
          <div className={styles.trustCol}>
            <h3 className={styles.colHeading}>Governing Trusts</h3>
            
            <div className={styles.trustItem}>
              <h4 className={styles.trustName}>Vedanta Parmarthic Sewa Trust</h4>
              <p className={styles.trustDetail}>
                Registered Public Charitable Trust<br />
                Indore, Madhya Pradesh
              </p>
              <div className={styles.taxPill}>
                <span>✓ 80-G Tax Exemption Available</span>
              </div>
            </div>

            <div className={styles.trustItem}>
              <h4 className={styles.trustName}>Ishwara Charitable Trust</h4>
              <p className={styles.trustDetail}>
                Registered Public Charitable Trust<br />
                Mumbai, Maharashtra
              </p>
            </div>

            <div className={styles.trustItem}>
              <h4 className={styles.trustName}>Ancient Indian Culture Trust</h4>
              <p className={styles.trustDetail}>
                Registered Public Cultural Trust<br />
                Mumbai, Maharashtra
              </p>
            </div>
          </div>

          {/* Column 4: Publications & Direct Ashram WhatsApp */}
          <div className={styles.actionCol}>
            <h3 className={styles.colHeading}>Connect &amp; Support</h3>
            
            <Link href="/donate" className={styles.btnFooterDonate}>
              Support Through Seva →
            </Link>

            <a
              href="https://wa.me/919826959480"
              className={styles.btnFooterWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp the Ashram
            </a>

            <div className={styles.pubFeatureBox}>
              <div className={styles.pubFeatureTitle}>Monthly Publications</div>
              <Link href="/publications" className={styles.pubFeatureLink}>
                Vedanta Sandesh (English / Hindi) →
              </Link>
              <Link href="/publications" className={styles.pubFeatureLink}>
                Vedanta Piyush (Hindi / Gujarati) →
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; 1992 &ndash; {year} Vedanta Mission &amp; Vedanta Ashram, Indore. All spiritual discourses and texts shared for self-inquiry (Atma-Vichara).
          </p>
          <div className={styles.legalLinks}>
            <Link href="/about#trusts" className={styles.legalLink}>Trust Status</Link>
            <span className={styles.legalSep}>·</span>
            <Link href="/donate" className={styles.legalLink}>Tax Exemption 80-G</Link>
            <span className={styles.legalSep}>·</span>
            <Link href="/contact" className={styles.legalLink}>Ashram Pilgrimage</Link>
            <span className={styles.legalSep}>·</span>
            <Link href="/admin/login" className={styles.legalLink} title="Vedanta Mission Staff & Operations Console">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
