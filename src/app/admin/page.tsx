'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import {
  EnquiriesIcon,
  SevaIcon,
  EventsIcon,
  TeachingsIcon,
  ArrowRightIcon,
  ShieldIcon,
  PlusIcon,
} from '@/components/admin/AdminIcons';
import styles from './dashboard.module.css';

export default function AdminDashboardPage() {
  const {
    events,
    teachings,
    publications,
    inquiries,
    donations,
    isLoadingEvents,
    isLoadingTeachings,
    isLoadingPublications,
    isLoadingInquiries,
    isLoadingDonations,
    isAdmin,
  } = useData();

  const publishedTeachings = teachings.filter((t) => t.is_published !== false);
  const publishedPublications = publications.filter((p) => p.is_published !== false);
  const publishedEvents = events.filter((e) => e.is_published !== false);
  const upcomingEvents = publishedEvents.filter((e) => !e.isPast);

  const pendingInquiries = inquiries.filter((i) => i.status === 'New');
  const verifiedDonations = donations.filter((d) => d.verificationStatus === 'Verified');
  const pendingVerifications = donations.filter((d) => d.verificationStatus === 'Pending');
  const pendingReceipts = donations.filter((d) => d.receiptStatus === 'Pending');
  const totalVerifiedOfferings = verifiedDonations.reduce((sum, d) => sum + d.amount, 0);
  const isRepositoryLoading = isLoadingTeachings || isLoadingPublications;

  return (
    <div className={styles.dashboard}>
      {/* Page Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.headerBadgeRow}>
            <span className={styles.locationBadge}>Vedanta Ashram · Indore Operations</span>
            <span className={styles.todayDate}>
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
          <h1 className={styles.pageTitle}>Ashram Seva &amp; Operations Dashboard</h1>
          <p className={styles.subtitle}>
            Live operational control for visitor stay inquiries, 80-G tax exemption receipts, academic courses, and published audio discourses.
          </p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/enquiries" className={styles.btnActionSecondary}>
            Inquiry Queue ({isLoadingInquiries ? '…' : pendingInquiries.length})
          </Link>
          <Link href="/admin/events" className={styles.btnActionPrimary}>
            <PlusIcon size={14} />
            <span>Schedule Retreat / Event</span>
          </Link>
        </div>
      </div>

      {/* Operational KPI Metric Grid */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiTag}>Seeker Enquiries</span>
            <div className={styles.kpiIcon}>
              <EnquiriesIcon size={17} />
            </div>
          </div>
          <div className={styles.kpiMain}>
            <p className={styles.kpiValue}>{isLoadingInquiries ? '…' : pendingInquiries.length}</p>
            <span className={styles.kpiSub}>
              {isLoadingInquiries ? 'Synchronizing…' : `${pendingInquiries.length} New / Awaiting Review`}
            </span>
          </div>
          <div className={styles.kpiFooter}>
            <Link href="/admin/enquiries" className={styles.kpiLink}>
              <span>Open Enquiries Queue</span>
              <ArrowRightIcon size={12} />
            </Link>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiTag}>{isAdmin ? '80-G Seva Offerings' : 'Offering Verification'}</span>
            <div className={styles.kpiIcon}>
              <SevaIcon size={17} />
            </div>
          </div>
          <div className={styles.kpiMain}>
            <p className={styles.kpiValue}>
              {isLoadingDonations ? '…' : `₹${totalVerifiedOfferings.toLocaleString('en-IN')}`}
            </p>
            <span className={styles.kpiSub}>
              {isLoadingDonations
                ? 'Synchronizing…'
                : isAdmin
                ? `${pendingVerifications.length} Pending Verification · ${pendingReceipts.length} Pending 80-G`
                : `${pendingVerifications.length} Awaiting Payment Verification`}
            </span>
          </div>
          <div className={styles.kpiFooter}>
            <Link href="/admin/seva" className={styles.kpiLink}>
              <span>{isAdmin ? 'Manage Seva Records' : 'Verify Offerings'}</span>
              <ArrowRightIcon size={12} />
            </Link>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiTag}>Active Retreats</span>
            <div className={styles.kpiIcon}>
              <EventsIcon size={17} />
            </div>
          </div>
          <div className={styles.kpiMain}>
            <p className={styles.kpiValue}>{isLoadingEvents ? '…' : upcomingEvents.length}</p>
            <span className={styles.kpiSub}>
              {isLoadingEvents ? 'Synchronizing…' : `${upcomingEvents.length} Scheduled Camps & Satsangs`}
            </span>
          </div>
          <div className={styles.kpiFooter}>
            <Link href="/admin/events" className={styles.kpiLink}>
              <span>View Events Calendar</span>
              <ArrowRightIcon size={12} />
            </Link>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiTag}>Jnana Ganga Library</span>
            <div className={styles.kpiIcon}>
              <TeachingsIcon size={17} />
            </div>
          </div>
          <div className={styles.kpiMain}>
            <p className={styles.kpiValue}>
              {isRepositoryLoading ? '…' : publishedTeachings.length + publishedPublications.length}
            </p>
            <span className={styles.kpiSub}>
              {isRepositoryLoading
                ? 'Synchronizing…'
                : `${publishedTeachings.length} Discourses · ${publishedPublications.length} Issues`}
            </span>
          </div>
          <div className={styles.kpiFooter}>
            <Link href="/admin/content" className={styles.kpiLink}>
              <span>Content &amp; Media Index</span>
              <ArrowRightIcon size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Two Column Operational Queues */}
      <div className={styles.gridTwo}>
        {/* Left Column: Recent Seeker Enquiries Queue */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <div>
              <h3 className={styles.panelTitle}>Recent Seeker Enquiries ({isLoadingInquiries ? '…' : inquiries.length})</h3>
              <p className={styles.panelSub}>Latest visitor stay requests, study programs, and darshan correspondence</p>
            </div>
            <Link href="/admin/enquiries" className={styles.panelActionLink}>
              <span>Full Queue</span>
              <ArrowRightIcon size={12} />
            </Link>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Seeker</th>
                  <th>Purpose</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingInquiries && inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--vm-text-muted)' }}>
                      Loading seeker inquiries…
                    </td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--vm-text-muted)' }}>
                      No seeker enquiries recorded.
                    </td>
                  </tr>
                ) : (
                  inquiries.slice(0, 5).map((inq) => (
                    <tr key={inq.id}>
                      <td>
                        <div className={styles.seekerCell}>
                          <div className={styles.seekerAvatar}>
                            {inq.name.charAt(0)}
                          </div>
                          <div>
                            <strong>{inq.name}</strong>
                            <span className={styles.tdSub}>{inq.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={styles.categoryBadge}>{inq.purpose}</span>
                      </td>
                      <td className={styles.tdDate}>
                        <div className={styles.dateCell}>
                          <span>{formatLocalizedDate(inq.date)}</span>
                          {inq.status === 'New' && (
                            <span className={styles.waitingNotice}>Awaiting review</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles['status_' + inq.status.replace(/\s+/g, '')]}`}>
                          {inq.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Seva Offerings & 80-G Certificate Queue */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <div>
              <h3 className={styles.panelTitle}>Recent Seva Offerings ({isLoadingDonations ? '…' : donations.length})</h3>
              <p className={styles.panelSub}>Vedanta Parmarthic Sewa Trust (80-G Tax Exemption)</p>
            </div>
            <Link href="/admin/seva" className={styles.panelActionLink}>
              <span>All Records</span>
              <ArrowRightIcon size={12} />
            </Link>
          </div>

          {isLoadingDonations && donations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--vm-text-muted)', fontSize: '0.8125rem' }}>
              Loading seva offerings…
            </div>
          ) : donations.length === 0 ? (
            <div className={styles.emptyQueueCard}>
              <div className={styles.emptyQueueIcon}>
                <SevaIcon size={22} />
              </div>
              <h4 className={styles.emptyQueueTitle}>No Seva Offerings in Current Queue</h4>
              <p className={styles.emptyQueueText}>
                {isAdmin
                  ? 'No offering records are currently awaiting bank reconciliation or 80-G tax receipt issuance.'
                  : 'No offering records are currently awaiting payment verification.'}
              </p>
              <div className={styles.emptyQueueActions}>
                <Link href="/admin/seva" className={styles.btnEmptyAction}>
                  <span>{isAdmin ? 'Manage Seva Records' : 'Open Verification Queue'}</span>
                  <ArrowRightIcon size={12} />
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Donor</th>
                    <th>Purpose</th>
                    <th>Amount</th>
                    <th>Verification &amp; 80-G</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.slice(0, 5).map((don) => (
                    <tr key={don.id}>
                      <td>
                        <div>
                          <strong>{don.donorName}</strong>
                          <span className={styles.tdSub}>UTR: {don.utrNumber}</span>
                        </div>
                      </td>
                      <td>
                        <span className={styles.sevaBadge}>{don.category.split(' ')[0]}</span>
                      </td>
                      <td>
                        <strong className={styles.amountText}>₹{don.amount.toLocaleString('en-IN')}</strong>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <span style={{
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            color: don.verificationStatus === 'Verified' ? '#2D4F38' : don.verificationStatus === 'Rejected' ? '#B93826' : '#C07D1E',
                          }}>
                            {don.verificationStatus === 'Verified' ? '✓ Verified' : don.verificationStatus === 'Rejected' ? '✕ Rejected' : '⏳ Pending'}
                          </span>
                          {isAdmin && don.receiptStatus && (
                            <span className={`${styles.statusBadge} ${don.receiptStatus === 'Issued' ? styles.statusIssued : styles.statusPending}`}>
                              {don.receiptStatus === 'Issued' ? '80-G Issued' : '80-G Pending'}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Ashram Operational Notice */}
      <div className={styles.protocolCard}>
        <div className={styles.protocolIcon}>
          <ShieldIcon size={18} />
        </div>
        <div>
          <h4 className={styles.protocolTitle}>Ashram Operational Notice</h4>
          <p className={styles.protocolText}>
            Review seeker stay inquiries and verify Seva offerings against bank reconciliation records before updating administrative statuses. All operations are logged to maintain audit continuity across staff sessions.
          </p>
        </div>
      </div>
    </div>
  );
}

function formatLocalizedDate(dateStr: string): string {
  if (!dateStr) return '—';
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
