'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import CinematicHero from '@/components/cinematic/CinematicHero';
import CinematicPreFooter from '@/components/cinematic/CinematicPreFooter';
import { useToast } from '@/context/ToastContext';
import { useData } from '@/context/DataContext';
import { getAssetPath } from '@/utils/assetPath';
import styles from './page.module.css';

interface PathwayItem {
  id: string;
  topicValue: string;
  number: string;
  title: string;
  desc: string;
}

const ENQUIRY_PATHWAYS: PathwayItem[] = [
  {
    id: 'study',
    topicValue: 'Course Enrollment',
    number: '01',
    title: 'Study',
    desc: 'Questions about systematic learning, Gita discourses, Tattva Bodha correspondence, or Upanishad study.',
  },
  {
    id: 'gather',
    topicValue: 'Events and Programmes',
    number: '02',
    title: 'Gather',
    desc: 'Inquiries regarding forthcoming Gyana Yagnas, spiritual retreats, youth workshops, and Ashram assemblies.',
  },
  {
    id: 'publications',
    topicValue: 'Publications & Literature',
    number: '03',
    title: 'Publications',
    desc: 'Requests concerning the monthly Vedanta Sandesh ezine, printed treatises, e-books, and audio archives.',
  },
  {
    id: 'ashram',
    topicValue: 'Ashram Visit / Stay',
    number: '04',
    title: 'Ashram',
    desc: 'Planning a visit to Sri Gangeshwar Mahadev Mandir, requesting temporary guest accommodation, or meeting the Acharyas.',
  },
];

export default function ContactPage() {
  const { showToast } = useToast();
  const { addInquiry } = useData();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Active pathway selection state
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  const handleSelectPathway = (pathway: PathwayItem) => {
    setSelectedPathway(pathway.id);
    setTopic(pathway.topicValue);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      showToast(`${label} copied to clipboard`, 'success');
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required.';
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!message.trim()) {
      errs.message = 'Please write your message or enquiry.';
    } else if (message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please correct the highlighted fields before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        purpose: topic,
        message: message.trim(),
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Enquiry received and logged to Ashram Inquiries.', 'success');
    }, 450);
  };

  const mailtoHref = `mailto:vmission@gmail.com?subject=${encodeURIComponent(
    `[Ashram Enquiry] ${topic} - ${name || 'Seeker'}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nTopic: ${topic}\n\nMessage:\n${message}`
  )}`;

  return (
    <div className={styles.mainWrap}>
      {/* 7.1 Cinematic Editorial Hero */}
      <CinematicHero
        badge="VEDANTA ASHRAM · INDORE"
        title="Connect with the Ashram"
        lead="The doors of Vedanta Ashram are open to sincere seekers of Truth. Whether inquiring about traditional Vedantic study, forthcoming assemblies, publications, or planning a reverent visit to Sri Gangeshwar Mahadev Mandir, reach the Ashram through our direct channels."
        backdropImage="/images/vmission/entrance/ashram-entrance-cinematic.jpg"
        backdropAlt="Entrance gateway to Vedanta Ashram, Indore"
        backdropPositionClass={styles.contactHeroBackdrop}
        focalPoint={{ desktop: { x: 50, y: 35 }, mobile: { x: 50, y: 26 } }}
        ctas={[
          { label: 'SEND AN ENQUIRY', href: '#enquiry-form', variant: 'primary' },
          { label: 'FIND THE ASHRAM', href: '#visit-ashram', variant: 'outline' },
        ]}
      />

      {/* 7.2 Contact Information — Institutional Plate */}
      <section className={styles.plateSection} aria-label="Institutional Contact Plate">
        <div className={styles.plateContainer}>
          <div className={styles.plateCard}>
            <div className={styles.plateHeader}>
              <div>
                <span className={styles.plateEyebrow}>
                  <span aria-hidden="true">🏛️</span> Institutional Directory
                </span>
                <h2 className={styles.plateTitle}>Vedanta Ashram · Indore</h2>
              </div>
              <span className={styles.plateLocationTag}>
                Run by Vedanta Parmarthik Sewa Trust
              </span>
            </div>

            <div className={styles.plateGrid}>
              {/* Left Column: Physical Address */}
              <div className={styles.plateAddressCol}>
                <div>
                  <h3 className={styles.subHeading}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Postal Address &amp; Location
                  </h3>
                  <address className={styles.addressDetails}>
                    <strong>Vedanta Ashram</strong><br />
                    2948, Sector-E, Sudama Nagar<br />
                    Inside Shankaracharya Gate<br />
                    <span className={styles.addressLandmark}>(Between Futi-Kothi and Hawa Bangla)</span>
                    Indore – 452009, Madhya Pradesh, India
                  </address>
                </div>

                <div className={styles.addressActions}>
                  <button
                    type="button"
                    className={`${styles.btnAction} ${styles.btnActionOutline}`}
                    onClick={() =>
                      copyToClipboard(
                        'Vedanta Ashram, 2948, Sector-E, Sudama Nagar, Inside Shankaracharya Gate, Indore – 452009, MP, India',
                        'Ashram Address'
                      )
                    }
                    aria-label="Copy postal address to clipboard"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy Address
                  </button>

                  <a
                    href="https://maps.google.com/?q=Vedanta+Ashram+Indore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.btnAction} ${styles.btnActionPrimary}`}
                    aria-label="Get directions on Google Maps (opens in new tab)"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Right Column: Direct Channels */}
              <div className={styles.plateChannelsCol}>
                <h3 className={styles.subHeading}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Direct Helplines &amp; Electronic Mail
                </h3>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919826959480"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelItem}
                  aria-label="Message Ashram on WhatsApp at +91 98269 59480"
                >
                  <div className={styles.channelIconWrap}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <div className={styles.channelMeta}>
                    <div className={styles.channelHeaderRow}>
                      <span className={styles.channelLabel}>WhatsApp Direct</span>
                      <span className={styles.channelBadge}>Fastest Response</span>
                    </div>
                    <span className={styles.channelValue}>+91 98269 59480</span>
                    <p className={styles.channelDesc}>Direct messaging for urgent enquiries and seva guidance</p>
                  </div>
                </a>

                {/* Office Phone */}
                <a
                  href="tel:+917000361938"
                  className={styles.channelItem}
                  aria-label="Call Ashram office helpline at +91 7000361938"
                >
                  <div className={styles.channelIconWrap}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className={styles.channelMeta}>
                    <div className={styles.channelHeaderRow}>
                      <span className={styles.channelLabel}>Office Helpline</span>
                    </div>
                    <span className={styles.channelValue}>+91 7000361938</span>
                    <p className={styles.channelDesc}>Available daily: 8:00 AM – 7:00 PM IST</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:vmission@gmail.com"
                  className={styles.channelItem}
                  aria-label="Send email to vmission@gmail.com"
                >
                  <div className={styles.channelIconWrap}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className={styles.channelMeta}>
                    <div className={styles.channelHeaderRow}>
                      <span className={styles.channelLabel}>Official Email</span>
                    </div>
                    <span className={styles.channelValue}>vmission@gmail.com</span>
                    <p className={styles.channelDesc}>For admissions, publications, and formal correspondence</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Temple Darshan Hours Bar */}
            <div className={styles.templeHoursBanner}>
              <div className={styles.templeHoursTitle}>
                <span aria-hidden="true">🕉️</span>
                <span>Sri Gangeshwar Mahadev Mandir Darshan</span>
              </div>
              <div className={styles.templeHoursTiming}>
                Morning: <strong>6:30 AM – 12:00 PM IST</strong> &nbsp;|&nbsp; Evening: <strong>4:30 PM – 8:30 PM IST</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.3 Enquiry Pathways (What Brings You Here?) */}
      <section className={styles.pathwaysSection} aria-label="Enquiry Pathways">
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Purpose of Communication</span>
            <h2 className={styles.sectionMainTitle}>What Brings You Here?</h2>
            <p className={styles.sectionLead}>
              Select the area that best describes your inquiry. This preselects the relevant topic in the form below to ensure your message reaches the appropriate Ashram coordinator.
            </p>
          </div>

          <div className={styles.pathwaysGrid}>
            {ENQUIRY_PATHWAYS.map((p) => {
              const isSelected = selectedPathway === p.id || topic === p.topicValue;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`${styles.pathwayCard} ${isSelected ? styles.pathwayActive : ''}`}
                  onClick={() => handleSelectPathway(p)}
                  aria-pressed={isSelected}
                >
                  <span className={styles.pathwayNumber}>{p.number}</span>
                  <h3 className={styles.pathwayTitle}>{p.title}</h3>
                  <p className={styles.pathwayDesc}>{p.desc}</p>
                  <span className={styles.pathwayActionPrompt}>
                    {isSelected ? 'Selected Topic ✓' : 'Select Topic →'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7.4 Functional Enquiry Form */}
      <section
        id="enquiry-form"
        ref={formRef}
        className={styles.enquirySection}
        aria-label="Ashram Enquiry Form"
      >
        <div className={styles.formContainer}>
          <div className={styles.formBox}>
            <div className={styles.formTitleRow}>
              <h2 className={styles.formBoxTitle}>Send a Message to the Ashram</h2>
              <p className={styles.formBoxDesc}>
                All sincere inquiries regarding courses, visits, or seva are reviewed by the Ashram office.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.formGrid}>
                  {/* Full Name */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="enquiry-name">
                      Full Name <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g. Suresh Varma"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                    />
                    {errors.name && (
                      <span id="err-name" className={styles.errorText}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="enquiry-email">
                      Email Address <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="enquiry-email"
                      type="email"
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      placeholder="suresh@example.com"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                    />
                    {errors.email && (
                      <span id="err-email" className={styles.errorText}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.formGrid}>
                  {/* Phone / WhatsApp */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="enquiry-phone">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      className={styles.input}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98261 00000"
                    />
                  </div>

                  {/* Enquiry Topic */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="enquiry-topic">
                      Enquiry Topic
                    </label>
                    <select
                      id="enquiry-topic"
                      className={styles.select}
                      value={topic}
                      onChange={(e) => {
                        setTopic(e.target.value);
                        const match = ENQUIRY_PATHWAYS.find((p) => p.topicValue === e.target.value);
                        setSelectedPathway(match ? match.id : null);
                      }}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Course Enrollment">Study: Course Enrollment (Tattva Bodha / Gita)</option>
                      <option value="Events and Programmes">Gather: Events &amp; Programmes</option>
                      <option value="Publications &amp; Literature">Publications: Books, Sandesh Ezine &amp; Texts</option>
                      <option value="Ashram Visit / Stay">Ashram: Visit / Stay Request</option>
                      <option value="Donation / 80-G Query">Seva: Donation &amp; 80-G Receipt Query</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className={styles.formFieldFull}>
                  <label className={styles.label} htmlFor="enquiry-message">
                    Your Message or Query <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={5}
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                    }}
                    placeholder="Please describe your question, background in Vedanta, or visit dates..."
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'err-msg' : undefined}
                  />
                  {errors.message && (
                    <span id="err-msg" className={styles.errorText}>
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Action Footer */}
                <div className={styles.formFooter}>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ animation: 'spin 1s linear infinite' }}>
                          <line x1="12" y1="2" x2="12" y2="6" />
                          <line x1="12" y1="18" x2="12" y2="22" />
                          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                          <line x1="2" y1="12" x2="6" y2="12" />
                          <line x1="18" y1="12" x2="22" y2="12" />
                        </svg>
                        Logging Message...
                      </>
                    ) : (
                      'Send Enquiry →'
                    )}
                  </button>

                  <div className={styles.mailtoFallbackPrompt}>
                    Prefer your mail app?{' '}
                    <a href={mailtoHref} className={styles.mailtoLink}>
                      Send directly via email client
                    </a>
                  </div>
                </div>
              </form>
            ) : (
              <div className={styles.successBlock} role="alert" aria-live="polite">
                <div className={styles.successIcon} aria-hidden="true">
                  ✓
                </div>
                <h3 className={styles.successTitle}>Enquiry Received</h3>
                <p className={styles.successDesc}>
                  Hari Om, <strong>{name}</strong>. Your enquiry regarding <strong>{topic}</strong> has been logged to the Ashram directory. We will respond to <strong>{email}</strong> shortly.
                </p>
                <button
                  type="button"
                  className={styles.btnResetForm}
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                    setErrors({});
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7.5 Visit the Ashram Section */}
      <section id="visit-ashram" className={styles.visitSection} aria-label="Visit the Physical Ashram">
        <div className={styles.visitContainer}>
          <div className={styles.visitGrid}>
            <div>
              <span className={styles.visitEyebrow}>Physical Threshold</span>
              <h2 className={styles.visitHeading}>Visit Vedanta Ashram</h2>
              <p className={styles.visitLead}>
                Situated in Indore, Madhya Pradesh, the Ashram provides a quiet, dedicated environment for contemplation, scriptural study, and daily worship. Sincere seekers wishing to visit are requested to review travel connections below.
              </p>

              <div className={styles.travelInfoList}>
                {/* Air */}
                <div className={styles.travelInfoItem}>
                  <div className={styles.travelIcon} aria-hidden="true">
                    ✈️
                  </div>
                  <div>
                    <h3 className={styles.travelTextTitle}>By Air</h3>
                    <p className={styles.travelTextDesc}>
                      <strong>Devi Ahilyabai Holkar Airport (IDR):</strong> Located approximately 20–30 minutes away by taxi or auto-rickshaw. Direct flights connect Indore to major Indian metros.
                    </p>
                  </div>
                </div>

                {/* Train */}
                <div className={styles.travelInfoItem}>
                  <div className={styles.travelIcon} aria-hidden="true">
                    🚆
                  </div>
                  <div>
                    <h3 className={styles.travelTextTitle}>By Rail</h3>
                    <p className={styles.travelTextDesc}>
                      <strong>Indore Junction Railway Station:</strong> Approximately 20–25 minutes from the Ashram. Prepaid taxi and auto-rickshaw booths are situated just outside Platform 1.
                    </p>
                  </div>
                </div>

                {/* Road */}
                <div className={styles.travelInfoItem}>
                  <div className={styles.travelIcon} aria-hidden="true">
                    🛺
                  </div>
                  <div>
                    <h3 className={styles.travelTextTitle}>Local Access &amp; Landmark</h3>
                    <p className={styles.travelTextDesc}>
                      Located inside <strong>Shankaracharya Gate</strong> in Sudama Nagar (Sector-E), situated along the ring road between Futi-Kothi and Hawa Bangla.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://maps.google.com/?q=Vedanta+Ashram+Indore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btnAction} ${styles.btnActionPrimary}`}
                  aria-label="Open Vedanta Ashram in Google Maps (opens in new tab)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  Open in Google Maps
                </a>
              </div>
            </div>

            <div>
              <div className={styles.visitImageWrap}>
                <img
                  src={getAssetPath('/images/vmission/ashram/courtyard-with-guruji.jpg')}
                  alt="Courtyard and serene atmosphere of Vedanta Ashram, Indore"
                  className={styles.visitImage}
                  loading="lazy"
                />
                <div className={styles.visitImageCaption}>
                  <span>Vedanta Ashram Campus &amp; Courtyard</span>
                  <span>Sudama Nagar, Indore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.6 Contact Closing */}
      <CinematicPreFooter
        tag="CONNECT"
        sanskrit="स नो बन्धुर्जनिता स विधाता धामानि वेद भुवनानि विश्वा"
        heading="Connecting with the Ashram"
        description="Whether seeking guidance in scriptural study, participating in Ashram assemblies, or supporting educational seva, the Ashram office is available to assist you."
        ctas={[
          { label: 'Explore Teachings', href: '/teachings', variant: 'primary' },
          { label: 'Support Through Seva', href: '/donate', variant: 'outline' },
          { label: 'Forthcoming Events', href: '/events', variant: 'outline' },
        ]}
      />
    </div>
  );
}
