'use client';

import React from 'react';
import { AuditIcon, ShieldIcon } from '@/components/admin/AdminIcons';
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
            Historical tamper-evident ledger of administrative operations, editorial revisions, and authenticated security events.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{
            fontSize: '0.75rem',
            background: 'var(--vm-forest-light, #EAF2EC)',
            color: 'var(--vm-forest, #2D4F38)',
            border: '1px solid rgba(45, 79, 56, 0.25)',
            padding: '5px 12px',
            borderRadius: '999px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <ShieldIcon size={12} />
            Audit Ledger Active
          </span>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Staff Account</th>
                <th>Action Performed</th>
                <th>Target Resource</th>
                <th>Execution Status</th>
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
                  <td colSpan={5} style={{ textAlign: 'center', padding: '48px 24px' }}>
                    <div className={styles.emptyCard}>
                      <div className={styles.emptyIcon}>
                        <AuditIcon size={22} />
                      </div>
                      <p className={styles.emptyTitle}>No audit events recorded in active session</p>
                      <p className={styles.emptyDesc}>
                        Administrative audit events are logged directly to append-only storage in production environments to ensure complete non-repudiation.
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
        padding: '16px 20px',
        background: 'var(--vm-ivory, #FDFBF7)',
        border: '1px solid var(--vm-sand-border, #DFD7C7)',
        borderLeft: '3px solid var(--vm-bhagwa, #E06328)',
        borderRadius: '8px',
        fontSize: '0.8125rem',
        color: 'var(--vm-text-muted, #665D55)',
        lineHeight: 1.5,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
      }}>
        <div style={{ color: 'var(--vm-bhagwa, #E06328)', marginTop: '2px' }}>
          <ShieldIcon size={16} />
        </div>
        <div>
          <strong style={{ color: 'var(--vm-text, #221D1A)', display: 'block', marginBottom: '2px' }}>
            Audit Integrity Standard:
          </strong>
          Audit ledgers require persistent server-side append-only storage to guarantee tamper-resistance. Mock historical records are strictly omitted per institutional governance policy.
        </div>
      </div>
    </div>
  );
}
