'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import BrandLogo from '@/components/BrandLogo';
import styles from './admin.module.css';

interface NavGroup {
  group: string;
  items: { href: string; label: string; icon: string; countKey?: 'inquiries' | 'donations' }[];
}

const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    group: 'DASHBOARD & OVERVIEW',
    items: [
      { href: '/admin', label: 'Overview Dashboard', icon: '📊' },
      { href: '/admin/content', label: 'Content Index', icon: '📁' },
    ],
  },
  {
    group: 'CONTENT MANAGEMENT',
    items: [
      { href: '/admin/publications', label: 'Publications & Ezines', icon: '📰' },
      { href: '/admin/teachings', label: 'Teachings & Discourses', icon: '🎙️' },
      { href: '/admin/events', label: 'Events & Study Camps', icon: '📅' },
      { href: '/admin/courses', label: 'Gurukula Courses', icon: '📚' },
      { href: '/admin/acharyas', label: 'Acharyas & Lineage', icon: '🪔' },
    ],
  },
  {
    group: 'MEDIA REPOSITORY',
    items: [
      { href: '/admin/media', label: 'Audio / Video / Images', icon: '🎞️' },
    ],
  },
  {
    group: 'COMMUNICATION & SEVA',
    items: [
      { href: '/admin/enquiries', label: 'Seeker Enquiries', icon: '✉️', countKey: 'inquiries' },
      { href: '/admin/seva', label: 'Seva & 80-G Records', icon: '🧾', countKey: 'donations' },
    ],
  },
  {
    group: 'SYSTEM & GOVERNANCE',
    items: [
      { href: '/admin/settings', label: 'Site Settings & Roles', icon: '⚙️' },
      { href: '/admin/audit', label: 'Audit Log', icon: '📋' },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { resetToDefaults, inquiries, donations } = useData();
  const { showToast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'New').length;
  const pendingDonationsCount = donations.filter((d) => d.receiptStatus === 'Pending').length;

  const handleReset = () => {
    if (confirm('Reset all demo data back to default verified Vedanta Mission audit data?')) {
      resetToDefaults();
      showToast('All CMS staff demo records have been restored to defaults.', 'info');
    }
  };

  // If viewing the login page, render the standalone login screen without the admin workspace shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminRoot}>
      {/* Top Institutional Header Bar */}
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </head>
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle staff portal sidebar"
          >
            ☰
          </button>
          <Link href="/admin" className={styles.brandLink}>
            <BrandLogo variant="emblem" size="sm" />
            <div className={styles.brandTextWrap}>
              <span className={styles.brandName}>VEDANTA MISSION</span>
              <span className={styles.portalTag}>Staff Operations &amp; CMS Portal (Prototype)</span>
            </div>
          </Link>
        </div>

        <div className={styles.topbarRight}>
          <div className={styles.systemStatus}>
            <span className={styles.statusPulse} style={{ background: '#d97706' }} />
            <span className={styles.statusText}>Prototype Console · Client State</span>
          </div>

          <button
            type="button"
            className={styles.btnReset}
            onClick={handleReset}
            title="Reset demo data to default baseline"
          >
            ⟳ Reset Demo Data
          </button>

          <Link href="/" className={styles.btnLiveSite} target="_blank" rel="noopener noreferrer">
            View Live Site ↗
          </Link>

          <div className={styles.userBadge}>
            <div className={styles.userAvatar}>AS</div>
            <div className={styles.userText}>
              <span className={styles.userName}>Ashram Office</span>
              <span className={styles.userRole}>Duty Coordinator · Demo Mode</span>
            </div>
          </div>
        </div>
      </header>

      {/* Prototype Environment Notice */}
      <div style={{
        backgroundColor: '#FEF3C7',
        borderBottom: '1px solid #F59E0B',
        color: '#92400E',
        fontSize: '0.8rem',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 500
      }}>
        <span>
          ⚠️ <strong>PROTOTYPE ENVIRONMENT / LOCAL CLIENT STATE:</strong> This administrative interface is an interactive prototype operating on client state for workflow demonstration. It is not connected to a server-side authentication system. Production deployments must either exclude /admin/ from the public artifact or enforce server-side hosting authentication.
        </span>
        <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>Static Export · No Backend Connected</span>
      </div>

      {/* Main Admin Workspace */}
      <div className={styles.workspace}>
        {/* Institutional Sidebar */}
        <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : ''}`}>
          <nav className={styles.sidebarNav}>
            {ADMIN_NAV_GROUPS.map((group) => (
              <div key={group.group} className={styles.navGroup}>
                <p className={styles.navSectionLabel}>{group.group}</p>
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  let badgeCount = 0;
                  if (item.countKey === 'inquiries') badgeCount = pendingInquiriesCount;
                  if (item.countKey === 'donations') badgeCount = pendingDonationsCount;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className={styles.navIcon}>{item.icon}</span>
                      <span className={styles.navLabel}>{item.label}</span>
                      {badgeCount > 0 && (
                        <span className={styles.navBadge}>{badgeCount}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <div className={styles.syncNotice}>
              <span className={styles.syncDot} style={{ background: '#d97706' }} />
              <span>Local State Simulation</span>
            </div>
            <p className={styles.syncDesc}>
              Form submissions in this browser session are persisted to local storage for testing.
            </p>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
