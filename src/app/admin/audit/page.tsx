'use client';

import React from 'react';
import styles from '../events/eventsAdmin.module.css';

export default function AdminAuditPage() {
  // Empty state: do not fabricate historical audit records
  const auditRecords: Array<{
    id: string;
    timestamp: string;
    staffUser: string;
    action: string;
    content: string;
    status: string;
  }> = [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>System Audit Log</h1>
          <p className={styles.subtitle}>
            Historical ledger of administrative actions, editorial changes, and security events.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', background: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E0', padding: '4px 10px', borderRadius: '4px', fontWeight: 600 }}>
            Audit Stream Active
          </span>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Staff User</th>
                <th>Action</th>
                <th>Content / Target</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {auditRecords.length > 0 ? (
                auditRecords.map((r) => (
                  <tr key={r.id}>
                    <td>{r.timestamp}</td>
                    <td>{r.staffUser}</td>
                    <td>{r.action}</td>
                    <td>{r.content}</td>
                    <td>{r.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '2rem' }}>📋</span>
                      <strong style={{ fontSize: '0.9375rem', color: '#4A5568' }}>
                        No audit records currently recorded in this session.
                      </strong>
                      <p style={{ fontSize: '0.8125rem', color: '#A0AEC0', maxWidth: '420px', margin: 0, lineHeight: 1.4 }}>
                        Historical records will be stored when real server-side persistence and staff identity logging are connected in production.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{
        marginTop: 'var(--space-4)',
        padding: 'var(--space-4) var(--space-5)',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        fontSize: '0.75rem',
        color: '#718096',
      }}>
        ℹ️ Audit logs require persistent database append-only records to guarantee tamper-resistance. Fake historical audit records are strictly omitted per institutional policy.
      </div>
    </div>
  );
}
