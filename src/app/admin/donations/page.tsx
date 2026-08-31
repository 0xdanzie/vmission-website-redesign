'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import styles from '../events/eventsAdmin.module.css';

export default function AdminDonationsPage() {
  const { donations, addDonation, updateDonationStatus } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [category, setCategory] = useState('Daily Annadanam & Bhiksha');
  const [amount, setAmount] = useState('5100');
  const [method, setMethod] = useState<'UPI' | 'NEFT/RTGS' | 'Cheque'>('UPI');
  const [utrNumber, setUtrNumber] = useState('');

  const totalCollected = donations.reduce((sum, d) => sum + d.amount, 0);

  const handleOpenAdd = () => {
    setDonorName('');
    setCategory('Daily Annadanam & Bhiksha');
    setAmount('5100');
    setMethod('UPI');
    setUtrNumber('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !utrNumber.trim()) {
      showToast('Please enter donor name and UTR reference.', 'error');
      return;
    }

    addDonation({
      donorName,
      category,
      amount: parseInt(amount, 10) || 1000,
      method,
      utrNumber,
      receiptStatus: 'Issued',
    });

    showToast('Donation record logged and 80-G receipt registered!', 'success');
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string, current: 'Issued' | 'Pending') => {
    const next = current === 'Issued' ? 'Pending' : 'Issued';
    updateDonationStatus(id, next);
    showToast(`80-G receipt status changed to "${next}".`, 'info');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Donations &amp; 80-G Certificate Records</h1>
          <p className={styles.subtitle}>
            Administer donor offerings and 80-G tax exemption receipts for Vedanta Parmarthic Sewa Trust.
          </p>
        </div>
        <button type="button" className={styles.btnAdd} onClick={handleOpenAdd}>
          + Log Verified Offering
        </button>
      </div>

      <div style={{ background: '#FFFFFF', padding: 'var(--space-4) var(--space-5)', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', gap: 'var(--space-6)' }}>
        <div>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase' }}>Total Demo Offerings</span>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#065F46' }}>
            ₹{totalCollected.toLocaleString('en-IN')}
          </p>
        </div>
        <div>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase' }}>Trust Registration</span>
          <p style={{ fontSize: '0.875rem', color: '#2D3748', marginTop: '2px' }}>
            Vedanta Parmarthic Sewa Trust (80-G Certified)
          </p>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Seva Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Payment Mode &amp; UTR</th>
                <th>80-G Receipt</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id}>
                  <td>
                    <strong>{d.donorName}</strong>
                  </td>
                  <td>{d.category}</td>
                  <td>
                    <strong>₹{d.amount.toLocaleString('en-IN')}</strong>
                  </td>
                  <td>{d.date}</td>
                  <td>
                    <span>{d.method}</span>
                    <span className={styles.tdSub}>UTR: {d.utrNumber}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`${styles.statusToggle} ${d.receiptStatus === 'Issued' ? styles.isUpcoming : styles.isPast}`}
                      onClick={() => handleToggleStatus(d.id, d.receiptStatus)}
                      title="Click to toggle 80-G status"
                    >
                      {d.receiptStatus === 'Issued' ? '✓ 80-G Issued' : '⏳ Pending'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Log Verified Seva Contribution</h3>
              <button type="button" className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>✕</button>
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
                    <option value="Brahmachari & Student Sponsorship">Student Sponsorship</option>
                    <option value="Temple Puja & Ashram Upkeep">Temple Puja &amp; Upkeep</option>
                    <option value="Free Publications & Digital Outreach">Publications &amp; Media</option>
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
                  <label className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    value={method}
                    onChange={(e) => setMethod(e.target.value as any)}
                  >
                    <option value="UPI">UPI</option>
                    <option value="NEFT/RTGS">NEFT / RTGS</option>
                    <option value="Cheque">Cheque</option>
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
                    placeholder="e.g. 324158920148"
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.btnSave}>Save Offering Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
