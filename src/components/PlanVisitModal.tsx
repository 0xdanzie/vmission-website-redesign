'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/context/ToastContext';
import styles from './PlanVisitModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlanVisitModal({ isOpen, onClose }: Props) {
  const { showToast } = useToast();
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [guests, setGuests] = useState('1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('Personal Sadhana & Study');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSubmitted(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Visit request submitted! (Simulated)', 'success');
    }, 700);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Plan Your Visit to Vedanta Ashram">
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.tag}>Ashram Stay Inquiry</span>
            <h3 className={styles.title}>Plan Your Visit to Vedanta Ashram</h3>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className={styles.form}>
              <p className={styles.note}>
                Vedanta Ashram offers simple, sattwic accommodation for sincere seekers wishing to study, meditate, or attend satsangs. Please submit your travel dates so we can confirm availability.
              </p>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label" htmlFor="arr-date">Expected Arrival Date *</label>
                  <input
                    id="arr-date"
                    type="date"
                    required
                    className="form-input"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="dep-date">Expected Departure Date</label>
                  <input
                    id="dep-date"
                    type="date"
                    className="form-input"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label" htmlFor="num-guests">Number of Guests</label>
                  <select
                    id="num-guests"
                    className="form-select"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons (Couple/Family)</option>
                    <option value="3">3–4 Persons</option>
                    <option value="group">Group (5+)</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="visit-purpose">Purpose of Visit</label>
                  <select
                    id="visit-purpose"
                    className="form-select"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  >
                    <option value="Personal Sadhana & Study">Personal Sadhana & Study</option>
                    <option value="Meeting Poojya Guruji">Meeting Poojya Guruji</option>
                    <option value="Attending Program/Camp">Attending Program / Camp</option>
                    <option value="Temple Darshan & Aarti">Temple Darshan & Aarti</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="visitor-name">Your Full Name *</label>
                <input
                  id="visitor-name"
                  type="text"
                  required
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                />
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label" htmlFor="visitor-email">Email Address *</label>
                  <input
                    id="visitor-email"
                    type="email"
                    required
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="visitor-phone">Phone / WhatsApp *</label>
                  <input
                    id="visitor-phone"
                    type="tel"
                    required
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9826959480"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="visitor-msg">Additional Notes (Optional)</label>
                <textarea
                  id="visitor-msg"
                  className="form-textarea"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Any dietary needs, arrival time, or special requirements..."
                />
              </div>

              <div className={styles.btnRow}>
                <button type="button" className={styles.btnSecondary} onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Send Visit Request'}
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.successBlock}>
              <div className={styles.successIcon}>✓</div>
              <h4 className={styles.successTitle}>Request Received!</h4>
              <p className={styles.successMsg}>
                Hari Om, <strong>{name}</strong>! Your stay request for <strong>{arrivalDate}</strong> ({guests} {guests === '1' ? 'guest' : 'guests'}) has been registered.
              </p>
              <div className={styles.infoBox}>
                <p><strong>Ashram Address:</strong> 2948, Sector-E, Sudama Nagar, Indore, M.P. – 452009</p>
                <p><strong>Ashram Helpline:</strong> +91 7000361938</p>
                <p><strong>Guruji Contact:</strong> +91 98269 59480</p>
              </div>
              <button type="button" className={styles.btnPrimary} onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
