'use client';

import React from 'react';
import { useData } from '@/context/DataContext';
import styles from '../events/eventsAdmin.module.css';

export default function AdminAcharyasPage() {
  const { acharyas } = useData();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Acharyas &amp; Monastic Lineage Records</h1>
          <p className={styles.subtitle}>
            Verified profiles of the Acharyas of Vedanta Mission and Vedanta Ashram, Indore.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', background: '#F0FDF4', color: '#15803D', border: '1px solid #DCFCE7', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>
            Source: Official Ashram Archive
          </span>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Acharya Name</th>
                <th>Role &amp; Title</th>
                <th>Monastic Lineage</th>
                <th>Verification State</th>
                <th>Focus Areas</th>
              </tr>
            </thead>
            <tbody>
              {acharyas.map((a) => (
                <tr key={a.slug}>
                  <td>
                    <strong>{a.name}</strong>
                    <span className={styles.tdSub}>{a.honorific}</span>
                  </td>
                  <td>
                    <span className={styles.categoryBadge}>{a.role}</span>
                  </td>
                  <td style={{ maxWidth: '320px', fontSize: '0.75rem', color: '#4A5568' }}>
                    {a.lineage}
                  </td>
                  <td>
                    <span
                      className={styles.regBadge}
                      style={{
                        background: a.verificationState === 'SOURCE-VERIFIED' ? '#D1FAE5' : '#FEF3C7',
                        color: a.verificationState === 'SOURCE-VERIFIED' ? '#065F46' : '#92400E',
                      }}
                    >
                      {a.verificationState}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {a.teachings.slice(0, 3).map((t) => (
                        <span key={t} style={{ background: '#F1F5F9', color: '#475569', fontSize: '0.6875rem', padding: '2px 6px', borderRadius: '4px' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{
        marginTop: 'var(--space-6)',
        padding: 'var(--space-5)',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
      }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
          Institutional Lineage Notice
        </h3>
        <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5 }}>
          Acharya profiles are synchronized with the canonical archives established in <code>acharyas.ts</code>.
          Historical milestones, Sanyas Deeksha dates, and institutional chronologies are preserved without unauthorized modification.
        </p>
      </div>
    </div>
  );
}
