'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import BrandLogo from '@/components/BrandLogo';
import { createClient } from '@/lib/supabase/client';
import {
  OverviewIcon,
  ContentIcon,
  PublicationsIcon,
  TeachingsIcon,
  EventsIcon,
  CoursesIcon,
  AcharyasIcon,
  MediaIcon,
  EnquiriesIcon,
  SevaIcon,
  SettingsIcon,
  AuditIcon,
  RefreshIcon,
  ExternalLinkIcon,
  MenuIcon,
} from '@/components/admin/AdminIcons';
import styles from './admin.module.css';

interface NavItemDef {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  countKey?: 'inquiries' | 'donations';
}

interface NavGroup {
  group: string;
  items: NavItemDef[];
}

const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    group: 'DASHBOARD & OVERVIEW',
    items: [
      { href: '/admin', label: 'Dashboard Overview', icon: OverviewIcon },
      { href: '/admin/content', label: 'Content Library', icon: ContentIcon },
    ],
  },
  {
    group: 'EDITORIAL MANAGEMENT',
    items: [
      { href: '/admin/publications', label: 'Publications & Ezines', icon: PublicationsIcon },
      { href: '/admin/teachings', label: 'Teachings & Discourses', icon: TeachingsIcon },
      { href: '/admin/events', label: 'Events & Study Camps', icon: EventsIcon },
      { href: '/admin/courses', label: 'Gurukula Courses', icon: CoursesIcon },
      { href: '/admin/acharyas', label: 'Acharyas & Lineage', icon: AcharyasIcon },
    ],
  },
  {
    group: 'DIGITAL ARCHIVE',
    items: [
      { href: '/admin/media', label: 'Archival Media Repository', icon: MediaIcon },
    ],
  },
  {
    group: 'COMMUNICATION & SEVA',
    items: [
      { href: '/admin/enquiries', label: 'Seeker Enquiries', icon: EnquiriesIcon, countKey: 'inquiries' },
      { href: '/admin/seva', label: 'Seva & 80-G Records', icon: SevaIcon, countKey: 'donations' },
    ],
  },
  {
    group: 'SYSTEM & GOVERNANCE',
    items: [
      { href: '/admin/settings', label: 'Institutional Settings', icon: SettingsIcon },
      { href: '/admin/audit', label: 'System Audit Log', icon: AuditIcon },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { resetToDefaults, inquiries, donations, isAdmin } = useData();
  const { showToast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [staffUser, setStaffUser] = useState<{ email: string; name: string; role: string } | null>(null);

  const isStaffAdmin = isAdmin || staffUser?.role === 'Administrator';
  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'New').length;
  const pendingDonationsCount = isStaffAdmin
    ? donations.filter((d) => d.receiptStatus === 'Pending').length
    : donations.filter((d) => d.verificationStatus === 'Pending').length;

  useEffect(() => {
    const checkStaff = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('admin_profiles')
            .select('role, full_name, email')
            .eq('id', user.id)
            .maybeSingle();

          if (profile) {
            setStaffUser({
              email: profile.email || user.email || '',
              name: profile.full_name || 'Ashram Staff',
              role: profile.role === 'admin' ? 'Administrator' : 'Editor',
            });
          }
        }
      } catch (e) {
        console.warn('Failed to load staff user:', e);
      }
    };
    checkStaff();
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      showToast('Signed out of staff console.', 'info');
      router.push('/admin/login/');
      router.refresh();
    } catch (e) {
      console.warn('Sign out error:', e);
    }
  };

  const isDev = process.env.NODE_ENV !== 'production';

  const handleReset = () => {
    if (confirm('Reset local demo dataset (events, teachings, publications, enquiries, donations) back to development baseline?')) {
      resetToDefaults();
      showToast('Local demo baseline restored.', 'info');
    }
  };

  // If viewing the login page, render the standalone login screen without the admin workspace shell
  const normalizedPath = pathname?.replace(/\/+$/, '') || '';
  if (normalizedPath === '/admin/login') {
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
            aria-label="Toggle staff portal navigation"
            aria-expanded={mobileMenuOpen}
          >
            <MenuIcon size={18} />
          </button>
          <Link href="/admin" className={styles.brandLink}>
            <BrandLogo variant="emblem" size="sm" />
            <div className={styles.brandTextWrap}>
              <span className={styles.brandName}>Vedanta Mission</span>
              <span className={styles.portalTag}>Staff Operations &amp; CMS Console</span>
            </div>
          </Link>
        </div>

        <div className={styles.topbarRight}>
          <div className={styles.systemStatus}>
            <span className={styles.statusPulse} />
            <span className={styles.statusText}>{isDev ? 'Development · Connected' : 'Live · Connected'}</span>
          </div>

          {isDev && (
            <button
              type="button"
              className={styles.btnReset}
              onClick={handleReset}
              title="Reset local demo dataset to development baseline"
            >
              <RefreshIcon size={13} />
              <span>Reset Local Demo Data</span>
            </button>
          )}

          <Link href="/" className={styles.btnLiveSite} target="_blank" rel="noopener noreferrer">
            <span>View Public Site</span>
            <ExternalLinkIcon size={12} />
          </Link>

          {staffUser ? (
            <div className={styles.userBadge}>
              <div className={styles.userAvatar}>
                {staffUser.name.charAt(0) || 'S'}
              </div>
              <div className={styles.userText}>
                <span className={styles.userName}>{staffUser.name}</span>
                <span className={styles.userRole}>{staffUser.role}</span>
              </div>
            </div>
          ) : (
            <div className={styles.userBadge}>
              <div className={styles.userAvatar}>AS</div>
              <div className={styles.userText}>
                <span className={styles.userName}>Ashram Staff</span>
                <span className={styles.userRole}>Authenticated Session</span>
              </div>
            </div>
          )}

          <button
            type="button"
            className={styles.btnReset}
            onClick={handleSignOut}
            title="Sign out of staff session"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className={styles.workspace}>
        {/* Mobile backdrop */}
        <div
          className={`${styles.mobileBackdrop} ${mobileMenuOpen ? styles.open : ''}`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Institutional Sidebar */}
        <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : ''}`}>
          <nav className={styles.sidebarNav} aria-label="CMS Navigation">
            {ADMIN_NAV_GROUPS.map((group) => (
              <div key={group.group} className={styles.navGroup}>
                <p className={styles.navSectionLabel}>{group.group}</p>
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  let badgeCount = 0;
                  if (item.countKey === 'inquiries') badgeCount = pendingInquiriesCount;
                  if (item.countKey === 'donations') badgeCount = pendingDonationsCount;

                  const displayLabel = item.href === '/admin/seva' && !isStaffAdmin
                    ? 'Offering Verification'
                    : item.label;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className={styles.navIcon}>
                        <Icon size={17} />
                      </span>
                      <span className={styles.navLabel}>{displayLabel}</span>
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
              <span>Session Security</span>
            </div>
            <p className={styles.syncDesc}>
              Role-restricted access. Operations are verified against institutional database policies.
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
