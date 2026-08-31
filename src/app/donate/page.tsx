'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { useToast } from '@/context/ToastContext';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

const SEVA_CATEGORIES = [
  {
    id: 'bhiksha',
    title: 'Daily Annadanam & Bhiksha',
    desc: 'Support daily pure sattwic meals served to resident Mahatmas, brahmacharis, and sincere seekers studying at the Ashram.',
    suggestedAmounts: [1100, 2500, 5100, 11000],
  },
  {
    id: 'student',
    title: 'Brahmachari & Student Sponsorship',
    desc: 'Sponsor lodging, scriptures, study materials, and medical care for dedicated students in the 12-Month Residential Gita Course.',
    suggestedAmounts: [5000, 10000, 25000, 50000],
  },
  {
    id: 'temple',
    title: 'Temple Puja & Ashram Upkeep',
    desc: 'Support daily Rudrabhishek, puja offerings at Sri Gangeshwar Mahadev Mandir, and general campus maintenance.',
    suggestedAmounts: [1000, 2100, 5000, 15000],
  },
  {
    id: 'publications',
    title: 'Free Publications & Digital Outreach',
    desc: 'Subsidize the free worldwide digital distribution of Vedanta Sandesh and free online audio discourse streaming.',
    suggestedAmounts: [1000, 3000, 6000, 12000],
  },
];

export default function DonatePage() {
  const { showToast } = useToast();
  const { addDonation } = useData();
  const [selectedCat, setSelectedCat] = useState(SEVA_CATEGORIES[0]);
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(2500);
  const [customAmount, setCustomAmount] = useState('');

  // Receipt submission form state
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'success');
  };

  const handleReceiptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail || !utrNumber) {
      showToast('Please fill in your name, email, and transaction UTR number.', 'error');
      return;
    }
    const finalAmount =
      selectedAmount === 'custom'
        ? Number(customAmount) || 1000
        : selectedAmount;

    setIsSubmitting(true);
    setTimeout(() => {
      addDonation({
        donorName: donorName.trim(),
        category: selectedCat.title,
        amount: finalAmount,
        method: utrNumber.length > 15 ? 'NEFT/RTGS' : 'UPI',
        utrNumber: utrNumber.trim(),
        receiptStatus: 'Pending',
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Payment proof recorded and queued for 80-G certification!', 'success');
    }, 500);
  };

  const currentAmountDisplay =
    selectedAmount === 'custom'
      ? customAmount
        ? `₹${customAmount}`
        : 'Custom Offering'
      : `₹${selectedAmount.toLocaleString('en-IN')}`;

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label="Seva Hero">
        <div className="container">
          <div className="animate-fadeUp" style={{ maxWidth: '760px' }}>
            <span className={styles.badge}>Dana &amp; Selfless Service</span>
            <h1 className={styles.title}>Support Vedanta Mission</h1>
            <p className={styles.lead}>
              In the ancient Gurukula tradition, wisdom is shared freely with all sincere seekers without commercial fees. The Ashram and its educational activities are sustained entirely through voluntary Dana (sacred offerings).
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step Guided Experience */}
      <section className="section" aria-label="Guided Seva Process">
        <div className="container">
          <div className={styles.workspaceGrid}>
            {/* Left Column: Purpose & Amount */}
            <div className={styles.leftCol}>
              <SectionHeader
                tag="Step 1"
                title="Select a Purpose for Your Offering"
              />

              <div className={styles.categoryGrid}>
                {SEVA_CATEGORIES.map((cat) => {
                  const isSelected = selectedCat.id === cat.id;
                  return (
                    <div
                      key={cat.id}
                      className={`${styles.catCard} ${isSelected ? styles.catSelected : ''}`}
                      onClick={() => {
                        setSelectedCat(cat);
                        setSelectedAmount(cat.suggestedAmounts[1]);
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                    >
                      <div className={styles.catHeader}>
                        <span className={styles.catRadio}>{isSelected ? '●' : '○'}</span>
                        <h4 className={styles.catTitle}>{cat.title}</h4>
                      </div>
                      <p className={styles.catDesc}>{cat.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Amount Selection */}
              <div className={styles.amountSection}>
                <div className={styles.stepTitleRow}>
                  <span className={styles.stepNum}>Step 2</span>
                  <h3 className={styles.amountTitle}>Choose Offering Amount</h3>
                </div>

                <div className={styles.amountGrid}>
                  {selectedCat.suggestedAmounts.map((amt) => {
                    const isSelected = selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        className={`${styles.amtBtn} ${isSelected ? styles.amtActive : ''}`}
                        onClick={() => setSelectedAmount(amt)}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    className={`${styles.amtBtn} ${selectedAmount === 'custom' ? styles.amtActive : ''}`}
                    onClick={() => setSelectedAmount('custom')}
                  >
                    Custom Amount
                  </button>
                </div>

                {selectedAmount === 'custom' && (
                  <div className="form-field" style={{ marginTop: 'var(--space-3)' }}>
                    <label className="form-label" htmlFor="custom-amt">Enter Custom Amount (INR)</label>
                    <input
                      id="custom-amt"
                      type="number"
                      min="100"
                      className="form-input"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="e.g. 5000"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Bank/UPI Transfer & 80-G Receipt Form */}
            <div className={styles.rightCol}>
              {/* Payment Details */}
              <div className={styles.paymentCard}>
                <div className={styles.stepTitleRow}>
                  <span className={styles.stepNum}>Step 3</span>
                  <h3 className={styles.paymentTitle}>Transfer via Bank / UPI</h3>
                </div>

                <p className={styles.summaryBanner}>
                  Offering for: <strong>{selectedCat.title}</strong> ({currentAmountDisplay})
                </p>

                {/* Direct Bank Transfer Details */}
                <div className={styles.bankBox}>
                  <h4 className={styles.boxHead}>Direct Bank Transfer (NEFT / RTGS / IMPS)</h4>
                  <div className={styles.bankRow}>
                    <span>Beneficiary Name:</span>
                    <strong>Vedanta Parmarthic Sewa Trust</strong>
                  </div>
                  <div className={styles.bankRow}>
                    <span>Account Number:</span>
                    <div className={styles.copyRow}>
                      <strong>02811000003766</strong>
                      <button
                        type="button"
                        className={styles.btnCopy}
                        onClick={() => copyToClipboard('02811000003766', 'Account Number')}
                        aria-label="Copy Account Number"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <div className={styles.bankRow}>
                    <span>IFSC Code:</span>
                    <div className={styles.copyRow}>
                      <strong>HDFC0001771</strong>
                      <button
                        type="button"
                        className={styles.btnCopy}
                        onClick={() => copyToClipboard('HDFC0001771', 'IFSC Code')}
                        aria-label="Copy IFSC Code"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <div className={styles.bankRow}>
                    <span>Bank &amp; Branch:</span>
                    <span>HDFC Bank, Annapoorna Road, Indore</span>
                  </div>
                </div>

                {/* UPI Transfer Details */}
                <div className={styles.upiBox}>
                  <h4 className={styles.boxHead}>UPI &amp; QR Payment</h4>
                  <div className={styles.upiRow}>
                    <span>UPI ID:</span>
                    <div className={styles.copyRow}>
                      <strong>vmission@hdfcbank</strong>
                      <button
                        type="button"
                        className={styles.btnCopy}
                        onClick={() => copyToClipboard('vmission@hdfcbank', 'UPI ID')}
                        aria-label="Copy UPI ID"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                {/* 80-G Tax Exemption Note */}
                <div className={styles.taxBadge}>
                  ✓ <strong>80-G Tax Exemption:</strong> All donations are eligible for tax exemption under Section 80-G of the Income Tax Act.
                </div>
              </div>

              {/* Receipt Submission Form */}
              <div className={styles.receiptCard}>
                <div className={styles.stepTitleRow}>
                  <span className={styles.stepNum}>Step 4</span>
                  <h3 className={styles.receiptTitle}>Submit Proof for Official 80-G Receipt</h3>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleReceiptSubmit} className={styles.receiptForm}>
                    <div className="form-field">
                      <label className="form-label" htmlFor="donor-name">Donor Full Name *</label>
                      <input
                        id="donor-name"
                        type="text"
                        required
                        className="form-input"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="e.g. Smt. Kamala Devi"
                      />
                    </div>

                    <div className="grid grid--2">
                      <div className="form-field">
                        <label className="form-label" htmlFor="donor-email">Email Address *</label>
                        <input
                          id="donor-email"
                          type="email"
                          required
                          className="form-input"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="kamala@example.com"
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="donor-pan">PAN (for 80-G Exemption)</label>
                        <input
                          id="donor-pan"
                          type="text"
                          className="form-input"
                          value={donorPan}
                          onChange={(e) => setDonorPan(e.target.value)}
                          placeholder="ABCDE1234F"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="form-label" htmlFor="utr-num">Transaction Ref / UTR Number *</label>
                      <input
                        id="utr-num"
                        type="text"
                        required
                        className="form-input"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        placeholder="e.g. 324158920148"
                      />
                    </div>

                    <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
                      {isSubmitting ? 'Recording Proof...' : 'Submit Proof & Request 80-G Receipt →'}
                    </Button>
                  </form>
                ) : (
                  <div className={styles.submittedBox}>
                    <span className={styles.submittedCheck}>✓</span>
                    <h4>Thank You, {donorName}!</h4>
                    <p>
                      Your transaction details (UTR: <strong>{utrNumber}</strong>) for <strong>{currentAmountDisplay}</strong> have been recorded by Vedanta Parmarthic Sewa Trust. An official 80-G certificate will be issued to <strong>{donorEmail}</strong>.
                    </p>
                    <button
                      type="button"
                      className={styles.btnReset}
                      onClick={() => {
                        setIsSubmitted(false);
                        setDonorName('');
                        setDonorEmail('');
                        setUtrNumber('');
                      }}
                    >
                      Record Another Offering
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
