'use client';

import React, { useState } from 'react';
import { useData, Inquiry } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import styles from '../events/eventsAdmin.module.css';

export default function AdminContactPage() {
  const { inquiries, updateInquiryStatus } = useData();
  const { showToast } = useToast();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const handleStatusChange = (id: string, status: Inquiry['status']) => {
    updateInquiryStatus(id, status);
    showToast(`Inquiry status updated to "${status}".`, 'success');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Visitor &amp; Seeker Inquiries</h1>
          <p className={styles.subtitle}>
            Manage incoming stay bookings, course enrollment questions, and spiritual inquiries.
          </p>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Seeker Name</th>
                <th>Purpose</th>
                <th>Contact Info</th>
                <th>Received Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td>
                    <strong>{inq.name}</strong>
                  </td>
                  <td>
                    <span className={styles.categoryBadge}>{inq.purpose}</span>
                  </td>
                  <td>
                    <span>{inq.email}</span>
                    {inq.phone && <span className={styles.tdSub}>{inq.phone}</span>}
                  </td>
                  <td>{inq.date}</td>
                  <td>
                    <select
                      className="form-select"
                      style={{ padding: '4px 8px', fontSize: '0.75rem', height: 'auto', minHeight: '30px' }}
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                    >
                      <option value="New">🟡 New</option>
                      <option value="In Review">🔵 In Review</option>
                      <option value="Resolved">🟢 Resolved</option>
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.btnEdit}
                      onClick={() => setSelectedInquiry(inq)}
                    >
                      View Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedInquiry && (
        <div className={styles.modalOverlay} onClick={() => setSelectedInquiry(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Inquiry from {selectedInquiry.name}</h3>
              <button type="button" className={styles.closeBtn} onClick={() => setSelectedInquiry(null)}>✕</button>
            </div>

            <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <span className={styles.categoryBadge}>{selectedInquiry.purpose}</span>
                <p style={{ fontSize: '0.8125rem', color: '#718096', marginTop: '4px' }}>
                  Received: {selectedInquiry.date} · Status: <strong>{selectedInquiry.status}</strong>
                </p>
              </div>

              <div style={{ background: '#F8FAFC', padding: 'var(--space-4)', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1A202C' }}>Message Content:</p>
                <p style={{ fontSize: '0.9375rem', color: '#4A5568', marginTop: '6px', lineHeight: 1.6 }}>
                  {selectedInquiry.message}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className={styles.btnAdd}
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  ✉️ Reply via Email
                </a>
                {selectedInquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnEdit}
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '8px 16px', fontSize: '0.875rem' }}
                  >
                    💬 WhatsApp Seeker
                  </a>
                )}
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.btnSave}
                  onClick={() => {
                    handleStatusChange(selectedInquiry.id, 'Resolved');
                    setSelectedInquiry(null);
                  }}
                >
                  Mark as Resolved ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
