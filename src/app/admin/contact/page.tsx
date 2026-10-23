'use client';

import React, { useState } from 'react';
import { useData, Inquiry } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import {
  RefreshIcon,
  SearchIcon,
  MailIcon,
  PhoneIcon,
  CheckIcon,
  CloseIcon,
  EyeIcon,
} from '@/components/admin/AdminIcons';
import styles from '../events/eventsAdmin.module.css';

export default function AdminContactPage() {
  const { inquiries, updateInquiryStatus, refreshInquiries, isLoadingInquiries } = useData();
  const { showToast } = useToast();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleStatusChange = async (id: string, status: Inquiry['status']) => {
    try {
      await updateInquiryStatus(id, status);
      showToast(`Inquiry status updated to "${status}".`, 'success');
    } catch {
      showToast('Failed to update status in database. Check staff permissions.', 'error');
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Visitor &amp; Seeker Inquiries</h1>
          <p className={styles.subtitle}>
            Review and respond to incoming ashram stay bookings, study enrollment requests, and spiritual questions.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnEdit}
            onClick={() => refreshInquiries()}
            title="Reload from database"
          >
            <RefreshIcon size={13} />
            <span>{isLoadingInquiries ? 'Synchronizing…' : 'Refresh DB'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexWrap: 'wrap',
        background: '#FFFFFF',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid var(--vm-sand-border, #DFD7C7)',
      }}>
        <div style={{
          position: 'relative',
          flex: '1',
          minWidth: '240px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{ position: 'absolute', left: '12px', color: 'var(--vm-text-faint, #8E847A)' }}>
            <SearchIcon size={15} />
          </span>
          <input
            type="search"
            placeholder="Search inquiries by seeker name, email, purpose, or text…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              border: '1px solid var(--vm-sand-border, #DFD7C7)',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              color: 'var(--vm-text, #221D1A)',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="inquiry-status-filter" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--vm-text-muted, #665D55)' }}>
            Queue Status:
          </label>
          <select
            id="inquiry-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '7px 12px',
              border: '1px solid var(--vm-sand-border, #DFD7C7)',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              color: 'var(--vm-text, #221D1A)',
              background: '#FFFFFF',
            }}
          >
            <option value="all">All Inquiries ({inquiries.length})</option>
            <option value="New">New / Unreviewed</option>
            <option value="In Review">In Review</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Seeker Name</th>
                <th>Inquiry Purpose</th>
                <th>Contact Information</th>
                <th>Received Date</th>
                <th>Review Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingInquiries && inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: 'var(--vm-text-muted)' }}>
                    Loading seeker inquiries from database…
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '36px' }}>
                    <div className={styles.emptyCard}>
                      <p className={styles.emptyTitle}>No matching inquiries in queue</p>
                      <p className={styles.emptyDesc}>
                        {searchTerm || statusFilter !== 'all'
                          ? 'Try adjusting your search query or status filter.'
                          : 'No incoming seeker inquiries at this time.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <strong style={{ color: 'var(--vm-text, #221D1A)' }}>{inq.name}</strong>
                    </td>
                    <td>
                      <span className={styles.categoryBadge}>{inq.purpose}</span>
                    </td>
                    <td>
                      <span>{inq.email}</span>
                      {inq.phone && <span className={styles.tdSub}>{inq.phone}</span>}
                    </td>
                    <td>
                      <span className={styles.dateText}>{inq.date}</span>
                    </td>
                    <td>
                      <select
                        style={{
                          padding: '5px 10px',
                          fontSize: '0.75rem',
                          borderRadius: '6px',
                          fontWeight: 600,
                          border: `1px solid ${
                            inq.status === 'Resolved'
                              ? 'rgba(45, 79, 56, 0.3)'
                              : inq.status === 'In Review'
                              ? 'rgba(200, 78, 23, 0.3)'
                              : 'rgba(192, 125, 30, 0.3)'
                          }`,
                          background:
                            inq.status === 'Resolved'
                              ? 'var(--vm-forest-light, #EAF2EC)'
                              : inq.status === 'In Review'
                              ? 'var(--vm-bhagwa-subtle, rgba(224, 99, 40, 0.08))'
                              : 'var(--vm-warning-bg, #FEF8ED)',
                          color:
                            inq.status === 'Resolved'
                              ? 'var(--vm-forest, #2D4F38)'
                              : inq.status === 'In Review'
                              ? 'var(--vm-gerua, #C84E17)'
                              : 'var(--vm-warning, #C07D1E)',
                        }}
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                        title="Update inquiry status"
                      >
                        <option value="New">● New / Awaiting Review</option>
                        <option value="In Review">◐ In Review</option>
                        <option value="Resolved">✓ Resolved</option>
                      </select>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.btnEdit}
                        onClick={() => setSelectedInquiry(inq)}
                        title={`View message from ${inq.name}`}
                      >
                        <EyeIcon size={12} />
                        <span>View Message</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className={styles.modalOverlay} onClick={() => setSelectedInquiry(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className={styles.modalHeader}>
              <h3>Inquiry from {selectedInquiry.name}</h3>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setSelectedInquiry(null)}
                aria-label="Close modal"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span className={styles.categoryBadge}>{selectedInquiry.purpose}</span>
                <p style={{ fontSize: '0.8125rem', color: 'var(--vm-text-muted, #665D55)', marginTop: '4px' }}>
                  Received: {selectedInquiry.date} · Current Status: <strong>{selectedInquiry.status}</strong>
                </p>
              </div>

              <div style={{
                background: 'var(--vm-ivory, #FDFBF7)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--vm-sand-border, #DFD7C7)',
              }}>
                <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--vm-text, #221D1A)', marginBottom: '6px' }}>
                  Message Content:
                </p>
                <p style={{ fontSize: '0.9375rem', color: 'var(--vm-text, #221D1A)', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>
                  {selectedInquiry.message}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className={styles.btnAdd}
                  style={{ textDecoration: 'none' }}
                >
                  <MailIcon size={14} />
                  <span>Reply via Email</span>
                </a>
                {selectedInquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnEdit}
                    style={{ textDecoration: 'none', padding: '8px 16px', fontSize: '0.84375rem' }}
                  >
                    <PhoneIcon size={14} />
                    <span>WhatsApp Seeker</span>
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
                  <CheckIcon size={13} />
                  <span>Mark as Resolved</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
