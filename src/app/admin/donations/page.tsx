'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import {
  RefreshIcon,
  SearchIcon,
  CloseIcon,
  ShieldIcon,
  TrashIcon,
} from '@/components/admin/AdminIcons';
import styles from '../events/eventsAdmin.module.css';

export default function AdminDonationsPage() {
  const {
    donations,
    logAdminDonation,
    updateDonationStatus,
    updateDonationVerification,
    deleteDonation,
    refreshDonations,
    isLoadingDonations,
    isAdmin,
  } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationFilter, setVerificationFilter] = useState<string>('all');

  const [donorName, setDonorName] = useState('');
  const [category, setCategory] = useState('Daily Annadanam & Bhiksha');
  const [amount, setAmount] = useState('5100');
  const [method, setMethod] = useState<string>('UPI');
  const [utrNumber, setUtrNumber] = useState('');

  // Verified offerings only count records explicitly marked 'Verified'
  const verifiedDonations = donations.filter((d) => d.verificationStatus === 'Verified');
  const totalVerifiedCollected = verifiedDonations.reduce((sum, d) => sum + d.amount, 0);
  const pendingVerificationCount = donations.filter((d) => d.verificationStatus === 'Pending').length;
  const pendingReceiptCount = donations.filter((d) => d.receiptStatus === 'Pending').length;

  const filteredDonations = donations.filter((d) => {
    const matchesSearch =
      d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.utrNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      verificationFilter === 'all' || (d.verificationStatus || 'Pending') === verificationFilter;
    return matchesSearch && matchesFilter;
  });

  const handleOpenAdd = () => {
    if (!isAdmin) {
      showToast('Logging internal offerings requires Administrator permissions.', 'error');
      return;
    }
    setDonorName('');
    setCategory('Daily Annadanam & Bhiksha');
    setAmount('5100');
    setMethod('UPI');
    setUtrNumber('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      showToast('Only administrators can log verified offerings.', 'error');
      return;
    }
    if (!donorName.trim() || !utrNumber.trim()) {
      showToast('Please enter donor name and UTR reference.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      await logAdminDonation({
        donorName: donorName.trim(),
        category,
        amount: parseInt(amount, 10) || 1000,
        method,
        utrNumber: utrNumber.trim(),
        verificationStatus: 'Verified',
        receiptStatus: 'Issued',
      });
      showToast('Donation verified and 80-G receipt registered!', 'success');
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save offering record to Supabase. Administrator permissions required.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleVerificationChange = async (id: string, status: 'Pending' | 'Verified' | 'Rejected') => {
    try {
      if (updateDonationVerification) {
        await updateDonationVerification(id, status);
      }
      showToast(`Offering payment marked as "${status}".`, 'success');
    } catch {
      showToast('Failed to update verification status. Staff permissions required.', 'error');
    }
  };

  const handleToggleReceiptStatus = async (id: string, current: 'Issued' | 'Pending' | undefined) => {
    if (!isAdmin) {
      showToast('Managing 80-G receipts is restricted to Administrators.', 'error');
      return;
    }
    const next = current === 'Issued' ? 'Pending' : 'Issued';
    try {
      await updateDonationStatus(id, next);
      showToast(`80-G receipt status changed to "${next}".`, 'info');
    } catch {
      showToast('Failed to update receipt status in Supabase. Admin access required.', 'error');
    }
  };

  const handleDelete = async (id: string, donor: string) => {
    if (!isAdmin) {
      showToast('Deleting donation records is restricted to Administrators.', 'error');
      return;
    }
    if (confirm(`Are you sure you want to delete donation record for "${donor}"?`)) {
      try {
        await deleteDonation(id);
        showToast(`Offering record for "${donor}" deleted.`, 'info');
      } catch {
        showToast('Failed to delete donation from Supabase. Admin access required.', 'error');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {isAdmin ? 'Donations & 80-G Certificate Records' : 'Donations Verification Queue'}
          </h1>
          <p className={styles.subtitle}>
            {isAdmin
              ? 'Administer donor offerings and 80-G tax exemption receipts for Vedanta Parmarthic Sewa Trust.'
              : 'Review seeker donation acknowledgements and verify bank transfer references.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            className={styles.btnEdit}
            onClick={() => refreshDonations()}
            title="Reload from database"
          >
            <RefreshIcon size={13} />
            <span>{isLoadingDonations ? 'Synchronizing…' : 'Refresh DB'}</span>
          </button>
          {isAdmin && (
            <button type="button" className={styles.btnAdd} onClick={handleOpenAdd}>
              + Log Verified Offering
            </button>
          )}
        </div>
      </div>

      {/* Summary KPI Banner */}
      <div style={{
        background: '#FFFFFF',
        padding: '20px 24px',
        borderRadius: '10px',
        border: '1px solid var(--vm-sand-border, #DFD7C7)',
        boxShadow: '0 1px 3px rgba(34, 29, 26, 0.04)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
      }}>
        <div>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--vm-text-faint, #8E847A)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Total Verified Offerings
          </span>
          <p style={{
            fontFamily: 'var(--font-serif, "Cormorant Garamond", serif)',
            fontSize: '1.875rem',
            fontWeight: 700,
            color: 'var(--vm-forest, #2D4F38)',
            margin: '4px 0 2px',
          }}>
            ₹{totalVerifiedCollected.toLocaleString('en-IN')}
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--vm-text-muted, #665D55)' }}>
            {verifiedDonations.length} Verified Records · {pendingVerificationCount} Pending Bank Verification
          </span>
        </div>

        <div>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--vm-text-faint, #8E847A)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Trust Certification
          </span>
          <p style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--vm-text, #221D1A)',
            margin: '6px 0 4px',
          }}>
            Vedanta Parmarthic Sewa Trust (80-G Certified)
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--vm-text-muted, #665D55)' }}>
            {isAdmin ? `${pendingReceiptCount} Pending 80-G Tax Receipts` : 'Editor View: Verification Access Only'}
          </span>
        </div>
      </div>

      {/* Search and Filter */}
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
            placeholder="Search records by donor name, UTR reference, or seva category…"
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
          <label htmlFor="verify-filter" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--vm-text-muted, #665D55)' }}>
            Payment Status:
          </label>
          <select
            id="verify-filter"
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            style={{
              padding: '7px 12px',
              border: '1px solid var(--vm-sand-border, #DFD7C7)',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              color: 'var(--vm-text, #221D1A)',
              background: '#FFFFFF',
            }}
          >
            <option value="all">All Records ({donations.length})</option>
            <option value="Verified">Verified Payments</option>
            <option value="Pending">Pending Verification</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Donations Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Seva Category</th>
                <th>Amount</th>
                <th>Received Date</th>
                <th>Mode &amp; UTR</th>
                <th>Payment Verification</th>
                <th>80-G Certificate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingDonations && donations.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px', color: 'var(--vm-text-muted)' }}>
                    Loading offering records from database…
                  </td>
                </tr>
              ) : filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px' }}>
                    <div className={styles.emptyCard}>
                      <p className={styles.emptyTitle}>No matching donation records</p>
                      <p className={styles.emptyDesc}>
                        {searchTerm || verificationFilter !== 'all'
                          ? 'Try adjusting your search query or verification filter.'
                          : 'No offering records currently recorded.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDonations.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <strong style={{ color: 'var(--vm-text, #221D1A)' }}>{d.donorName}</strong>
                      {isAdmin && d.donorEmail && (
                        <span className={styles.tdSub}>{d.donorEmail}</span>
                      )}
                    </td>
                    <td>
                      <span className={styles.categoryBadge}>{d.category}</span>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--vm-forest, #2D4F38)', fontFeatureSettings: '"tnum"' }}>
                        ₹{d.amount.toLocaleString('en-IN')}
                      </strong>
                    </td>
                    <td>
                      <span className={styles.dateText}>{d.date}</span>
                    </td>
                    <td>
                      <span>{d.method}</span>
                      <span className={styles.tdSub}>UTR: {d.utrNumber}</span>
                    </td>
                    <td>
                      <select
                        style={{
                          padding: '5px 10px',
                          fontSize: '0.75rem',
                          borderRadius: '6px',
                          fontWeight: 600,
                          border: `1px solid ${
                            d.verificationStatus === 'Verified'
                              ? 'rgba(45, 79, 56, 0.3)'
                              : d.verificationStatus === 'Rejected'
                              ? 'rgba(185, 56, 38, 0.3)'
                              : 'rgba(192, 125, 30, 0.3)'
                          }`,
                          background:
                            d.verificationStatus === 'Verified'
                              ? 'var(--vm-forest-light, #EAF2EC)'
                              : d.verificationStatus === 'Rejected'
                              ? 'var(--vm-error-bg, #FDF1EF)'
                              : 'var(--vm-warning-bg, #FEF8ED)',
                          color:
                            d.verificationStatus === 'Verified'
                              ? 'var(--vm-forest, #2D4F38)'
                              : d.verificationStatus === 'Rejected'
                              ? 'var(--vm-error, #B93826)'
                              : 'var(--vm-warning, #C07D1E)',
                        }}
                        value={d.verificationStatus || 'Pending'}
                        onChange={(e) => handleVerificationChange(d.id, e.target.value as any)}
                        title="Payment verification status"
                      >
                        <option value="Verified">✓ Verified</option>
                        <option value="Pending">⏳ Pending</option>
                        <option value="Rejected">✕ Rejected</option>
                      </select>
                    </td>
                    <td>
                      {isAdmin ? (
                        <button
                          type="button"
                          className={`${styles.statusToggle} ${d.receiptStatus === 'Issued' ? styles.isUpcoming : styles.isPast}`}
                          onClick={() => handleToggleReceiptStatus(d.id, d.receiptStatus)}
                          title="Click to toggle 80-G status"
                        >
                          {d.receiptStatus === 'Issued' ? '✓ 80-G Issued' : '⏳ Pending'}
                        </button>
                      ) : (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            fontSize: '0.71875rem',
                            borderRadius: '4px',
                            background: 'var(--vm-sand, #FAF6EE)',
                            color: 'var(--vm-text-muted, #665D55)',
                            border: '1px solid var(--vm-sand-border, #DFD7C7)',
                            fontWeight: 500,
                          }}
                          title="80-G receipt issuance is restricted to Administrators"
                        >
                          🔒 Admin Only
                        </span>
                      )}
                    </td>
                    <td>
                      {isAdmin ? (
                        <button
                          type="button"
                          className={styles.btnDelete}
                          onClick={() => handleDelete(d.id, d.donorName)}
                          title="Delete record"
                        >
                          <TrashIcon size={12} />
                          <span>Delete</span>
                        </button>
                      ) : (
                        <span style={{ color: 'var(--vm-text-faint, #8E847A)', fontSize: '0.875rem' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Log Verified Seva Contribution</h3>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className="form-field">
                <label className="form-label">Donor Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Smt. Gayatri Devi"
                />
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Seva Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Daily Annadanam & Bhiksha">Daily Annadanam &amp; Bhiksha</option>
                    <option value="Sadhu Seva & Bhandara">Sadhu Seva &amp; Bhandara</option>
                    <option value="Gita Gyan Yagna Sponsorship">Gita Gyan Yagna Sponsorship</option>
                    <option value="Ashram Mandir Seva">Ashram Mandir Seva</option>
                    <option value="General Ashram Maintenance">General Ashram Maintenance</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Amount (INR) *</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Transfer Method</label>
                  <select
                    className="form-select"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                  >
                    <option value="UPI">UPI Transfer</option>
                    <option value="NEFT / RTGS">NEFT / RTGS NetBanking</option>
                    <option value="Cheque">Demand Draft / Cheque</option>
                    <option value="Cash Offering">Cash at Ashram Office</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Bank UTR / Transaction Ref *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="e.g. 326718902812"
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnSave} disabled={isSaving}>
                  {isSaving ? 'Registering Offering…' : 'Record & Verify Offering'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
