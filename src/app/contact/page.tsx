'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { useToast } from '@/context/ToastContext';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

export default function ContactPage() {
  const { showToast } = useToast();
  const { addInquiry } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill in your name, email, and message.', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      addInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        purpose,
        message: message.trim(),
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Message received and logged to Ashram Inquiries!', 'success');
    }, 500);
  };

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label="Contact Hero">
        <div className="container">
          <div className="animate-fadeUp" style={{ maxWidth: '760px' }}>
            <span className={styles.badge}>Communication &amp; Inquiries</span>
            <h1 className={styles.title}>Contact Vedanta Mission</h1>
            <p className={styles.lead}>
              Whether you have questions regarding our online courses, wish to visit the Ashram in Indore, or seek spiritual guidance, we welcome your communication.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="section" aria-label="Contact Channels & Form">
        <div className="container">
          <div className={styles.twoCol}>
            {/* Left: Priority Channels & Physical Campus */}
            <div>
              <SectionHeader
                tag="Priority Channels"
                title="Ashram Helplines &amp; Direct Actions"
              />

              <div className={styles.channelsList}>
                {/* WhatsApp Quick Chat */}
                <a
                  href="https://wa.me/919826959480"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.channelCard} ${styles.waHighlight}`}
                >
                  <span className={styles.channelIcon}>💬</span>
                  <div className={styles.channelMeta}>
                    <div className={styles.channelHeader}>
                      <h4 className={styles.channelTitle}>WhatsApp Quick Chat</h4>
                      <span className={styles.fastTag}>Fastest Response</span>
                    </div>
                    <p className={styles.channelVal}>+91 98269 59480</p>
                    <p className={styles.channelNote}>Message directly for immediate Ashram inquiries</p>
                  </div>
                </a>

                {/* Ashram Phone */}
                <a href="tel:+917000361938" className={styles.channelCard}>
                  <span className={styles.channelIcon}>📞</span>
                  <div className={styles.channelMeta}>
                    <h4 className={styles.channelTitle}>Ashram Office Helpline</h4>
                    <p className={styles.channelVal}>+91 7000361938</p>
                    <p className={styles.channelNote}>Available 8:00 AM – 7:00 PM IST</p>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:vmission@gmail.com" className={styles.channelCard}>
                  <span className={styles.channelIcon}>✉️</span>
                  <div className={styles.channelMeta}>
                    <h4 className={styles.channelTitle}>Email Inquiries</h4>
                    <p className={styles.channelVal}>vmission@gmail.com</p>
                    <p className={styles.channelNote}>For course enrollment and magazine subscriptions</p>
                  </div>
                </a>
              </div>

              {/* Physical Campus Info */}
              <div className={styles.addressBox}>
                <h4 className={styles.addressHead}>Physical Ashram Location</h4>
                <p className={styles.addressText}>
                  <strong>Vedanta Ashram</strong><br />
                  2948, Sector-E, Sudama Nagar<br />
                  Inside Sankaracharya Gate (between Futi-Kothi &amp; Hawa Bangla)<br />
                  Indore – 452009, Madhya Pradesh, India
                </p>
                <div className={styles.hoursNote}>
                  <span>🕉️ Temple Darshan Hours: 6:30 AM – 12:00 PM &amp; 4:30 PM – 8:30 PM</span>
                </div>
              </div>
            </div>

            {/* Right: Validated Interactive Contact Form */}
            <div>
              <div className={styles.formCard}>
                <h3 className={styles.formTitle}>Send a Message to the Ashram</h3>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className="form-field">
                      <label className="form-label" htmlFor="c-name">Your Full Name *</label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Suresh Varma"
                      />
                    </div>

                    <div className="grid grid--2">
                      <div className="form-field">
                        <label className="form-label" htmlFor="c-email">Email Address *</label>
                        <input
                          id="c-email"
                          type="email"
                          required
                          className="form-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="suresh@example.com"
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="c-phone">Phone / WhatsApp</label>
                        <input
                          id="c-phone"
                          type="tel"
                          className="form-input"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 9876543210"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="form-label" htmlFor="c-purpose">Purpose of Communication</label>
                      <select
                        id="c-purpose"
                        className="form-select"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Ashram Visit / Stay">Ashram Visit / Stay Request</option>
                        <option value="Course Enrollment">Course Enrollment (Tattva Bodha / Gita)</option>
                        <option value="Donation / 80-G Query">Donation / 80-G Tax Query</option>
                        <option value="Meeting with the Acharyas">Meeting with the Acharyas</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="form-label" htmlFor="c-msg">Your Message *</label>
                      <textarea
                        id="c-msg"
                        required
                        className="form-textarea"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please write your query or reflection here..."
                      />
                    </div>

                    <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
                      {isSubmitting ? 'Sending Message...' : 'Send Message →'}
                    </Button>
                  </form>
                ) : (
                  <div className={styles.successBlock}>
                    <span className={styles.successIcon}>✓</span>
                    <h4 className={styles.successTitle}>Message Received!</h4>
                    <p className={styles.successDesc}>
                      Hari Om, <strong>{name}</strong>. Your message regarding <strong>{purpose}</strong> has been received by the Ashram office. We will reply to <strong>{email}</strong> shortly.
                    </p>
                    <button
                      type="button"
                      className={styles.btnReset}
                      onClick={() => {
                        setIsSubmitted(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                      }}
                    >
                      Send Another Message
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
