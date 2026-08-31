'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import styles from './admin.module.css';

interface NavGroup {
  group: string;
  items: { href: string; label: string; icon: string; countKey?: 'inquiries' | 'donations' }[];
}

const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    group: 'OPERATIONS & SEVA',
    items: [
      { href: '/admin', label: 'Overview Dashboard', icon: '📊' },
      { href: '/admin/contact', label: 'Seeker Inquiries', icon: '✉️', countKey: 'inquiries' },
      { href: '/admin/donations', label: 'Seva & 80-G Records', icon: '🧾', countKey: 'donations' },
    ],
  },
  {
    group: 'ACADEMIC & RETREATS',
    items: [
      { href: '/admin/events', label: 'Camps & Satsang Events', icon: '📅' },
      { href: '/admin/courses', label: 'Study Courses & Curricula', icon: '📚' },
    ],
  },
  {
    group: 'PUBLICATIONS & MEDIA',
    items: [
      { href: '/admin/teachings', label: 'Audio Library & Discourses', icon: '🎙️' },
      { href: '/admin/publications', label: 'Monthly Ezines & PDFs', icon: '📰' },
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

  return (
    <div className={styles.adminRoot}>
      {/* Top Institutional Header Bar */}
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
            <span className={styles.brandSeal}>ॐ</span>
            <div className={styles.brandTextWrap}>
              <span className={styles.brandName}>VEDANTA MISSION</span>
              <span className={styles.portalTag}>Staff Operations &amp; CMS Portal</span>
            </div>
          </Link>
        </div>

        <div className={styles.topbarRight}>
          <div className={styles.systemStatus}>
            <span className={styles.statusPulse} />
            <span className={styles.statusText}>Indore Ashram Server Online</span>
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
              <span className={styles.userRole}>Duty Coordinator · Day Shift</span>
            </div>
          </div>
        </div>
      </header>

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
              <span className={styles.syncDot} />
              <span>Real-Time State Synchronization</span>
            </div>
            <p className={styles.syncDesc}>
              Form submissions from the public website instantly appear in staff queues.
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
