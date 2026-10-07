'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import styles from './dashboard.module.css';

export default function AdminDashboardPage() {
  const { events, courses, teachings, publications, inquiries, donations } = useData();

  const upcomingEvents = events.filter((e) => !e.isPast);
  const pendingInquiries = inquiries.filter((i) => i.status === 'New');
  const pendingDonations = donations.filter((d) => d.receiptStatus === 'Pending');
  const totalVerifiedOfferings = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className={styles.dashboard}>
      {/* Page Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.headerBadgeRow}>
            <span className={styles.locationBadge}>Vedanta Ashram · Indore Operations</span>
            <span className={styles.todayDate}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <h1 className={styles.pageTitle}>Ashram Seva &amp; Operations Dashboard</h1>
          <p className={styles.subtitle}>
            Live operational control for visitor stay inquiries, 80-G tax exemption receipts, academic courses, and published audio discourses.
          </p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/enquiries" className={styles.btnActionSecondary}>
            Inquiry Queue ({pendingInquiries.length})
          </Link>
          <Link href="/admin/events" className={styles.btnActionPrimary}>
            + Schedule Event / Camp
          </Link>
        </div>
      </div>

      {/* Operational KPI Metric Grid */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiTag}>SEEKER ENQUIRIES</span>
            <span className={styles.kpiIcon}>✉️</span>
          </div>
          <div className={styles.kpiMain}>
            <p className={styles.kpiValue}>{pendingInquiries.length}</p>
            <span className={styles.kpiSub}>New / Awaiting Review</span>
          </div>
          <div className={styles.kpiFooter}>
            <Link href="/admin/enquiries" className={styles.kpiLink}>Open Enquiries Queue →</Link>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiTag}>80-G SEVA OFFERINGS</span>
            <span className={styles.kpiIcon}>🧾</span>
          </div>
          <div className={styles.kpiMain}>
            <p className={styles.kpiValue}>₹{totalVerifiedOfferings.toLocaleString('en-IN')}</p>
            <span className={styles.kpiSub}>{pendingDonations.length} Pending 80-G Receipts</span>
          </div>
          <div className={styles.kpiFooter}>
            <Link href="/admin/seva" className={styles.kpiLink}>Manage Seva Records →</Link>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiTag}>ACTIVE RETREATS</span>
            <span className={styles.kpiIcon}>📅</span>
          </div>
          <div className={styles.kpiMain}>
            <p className={styles.kpiValue}>{upcomingEvents.length}</p>
            <span className={styles.kpiSub}>Scheduled Camps &amp; Satsangs</span>
          </div>
          <div className={styles.kpiFooter}>
            <Link href="/admin/events" className={styles.kpiLink}>View Events Calendar →</Link>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiTag}>JNANA GANGA REPOSITORY</span>
            <span className={styles.kpiIcon}>🎙️</span>
          </div>
          <div className={styles.kpiMain}>
            <p className={styles.kpiValue}>{teachings.length + publications.length}</p>
            <span className={styles.kpiSub}>{teachings.length} Discourses · {publications.length} Issues</span>
          </div>
          <div className={styles.kpiFooter}>
            <Link href="/admin/content" className={styles.kpiLink}>Content &amp; Media Index →</Link>
          </div>
        </div>
      </div>

      {/* Two Column Operational Queues */}
      <div className={styles.gridTwo}>
        {/* Left Column: Recent Seeker Inquiries Queue */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <div>
              <h3 className={styles.panelTitle}>Active Seeker Inquiries ({inquiries.length})</h3>
              <p className={styles.panelSub}>Stay reservations, study programs, and darshan requests</p>
            </div>
            <Link href="/admin/contact" className={styles.panelActionLink}>Full Queue →</Link>
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
                {inquiries.slice(0, 5).map((inq) => (
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
                    <td className={styles.tdDate}>{inq.date}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles['status_' + inq.status.replace(/\s+/g, '')]}`}>
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Seva Offerings & 80-G Certificate Queue */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <div>
              <h3 className={styles.panelTitle}>Recent Seva Offerings ({donations.length})</h3>
              <p className={styles.panelSub}>Vedanta Parmarthic Sewa Trust (80-G Tax Exemption)</p>
            </div>
            <Link href="/admin/donations" className={styles.panelActionLink}>All Records →</Link>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Purpose</th>
                  <th>Amount</th>
                  <th>80-G Status</th>
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
                      <span className={`${styles.statusBadge} ${don.receiptStatus === 'Issued' ? styles.statusIssued : styles.statusPending}`}>
                        {don.receiptStatus === 'Issued' ? '✓ Issued' : '⏳ Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Operational Protocol Reference */}
      <div className={styles.protocolCard}>
        <div className={styles.protocolIcon}>ℹ️</div>
        <div>
          <h4 className={styles.protocolTitle}>Ashram Office Standard Protocol</h4>
          <p className={styles.protocolText}>
            All residential stay bookings should be confirmed within 24 hours. For Seva offerings received via UPI/NEFT, issue 80-G certificates with official trust seal after bank reconciliation.
          </p>
        </div>
      </div>
    </div>
  );
}
