'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { getEventById, getUpcomingEvents } from '@/data/events';
import { useToast } from '@/context/ToastContext';
import { getAssetPath } from '@/utils/assetPath';
import styles from './page.module.css';

export default function EventDetailClient({ eventId }: { eventId: string }) {
  const event = getEventById(eventId || 'guru-poornima-2026');
  const { showToast } = useToast();

  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showRegForm, setShowRegForm] = useState(false);

  if (!event) {
    return (
      <div className="container section">
        <h2>Event Not Found</h2>
        <Link href="/events">← Back to Events</Link>
      </div>
    );
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Please provide your name and email.', 'error');
      return;
    }
    setIsRegistered(true);
    showToast('Registration confirmed! (Simulated)', 'success');
  };

  const otherEvents = getUpcomingEvents().filter((e) => e.id !== event.id).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label="Event Hero">
        <div className="container">
          <div className="animate-fadeUp" style={{ maxWidth: '780px' }}>
            <div className={styles.breadcrumb}>
              <Link href="/events">← Back to All Events</Link>
            </div>
            <div className={styles.badgeRow}>
              <Badge label={event.type} variant="default" />
              <Badge variant={event.isPast ? 'past' : event.registration} />
            </div>
            <h1 className={styles.title}>{event.title}</h1>
            <div className={styles.metaRow}>
              <span>📅 {event.startDate}</span>
              <span>📍 {event.location}, {event.city}</span>
              <span>🎙️ {event.teacher}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content & Registration */}
      <section className="section" aria-label="Event Details">
        <div className="container">
          <div className={styles.twoCol}>
            {/* Left Col: Overview & Schedule */}
            <div>
              <SectionHeader
                tag="Program Overview"
                title="About this Event"
              />
              <p className="text-lead">{event.description}</p>

              {/* Authentic Event Photography */}
              <div style={{ marginBlock: 'var(--space-6)', borderRadius: 'var(--vm-radius-lg)', overflow: 'hidden', border: '1px solid var(--vm-brass-border)', boxShadow: 'var(--vm-shadow-xs)' }}>
                <img
                  src={getAssetPath(event.type === 'Celebration' ? '/images/vmission/events/rotary-club-mumbai-talk.jpg' : '/images/vmission/events/advaita-congress-moscow.jpg')}
                  alt={`Vedanta Mission ${event.title} Assembly`}
                  style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
                <div style={{ padding: '8px 16px', background: 'var(--vm-bg-sandalwood)', fontSize: '0.75rem', color: 'var(--vm-text-muted)', borderTop: '1px solid var(--vm-border-light)' }}>
                  <span>📸 Official Vedanta Mission Satsang &amp; Camp Assembly · Indore</span>
                </div>
              </div>

              {event.schedule && event.schedule.length > 0 && (
                <div className={styles.scheduleBox}>
                  <h3 className={styles.scheduleHead}>Day Schedule</h3>
                  <div className={styles.scheduleList}>
                    {event.schedule.map((item, idx) => (
                      <div key={idx} className={styles.scheduleItem}>
                        <span className={styles.schedTime}>{item.time}</span>
                        <span className={styles.schedAct}>{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.infoSection}>
                <h3 className={styles.infoHead}>Who Can Attend?</h3>
                <p className={styles.infoText}>
                  All sincere spiritual seekers, devotees, and students of Vedanta are welcome to participate. Family members and newcomers to Vedanta are warmly encouraged to attend.
                </p>
                {event.fee && (
                  <p className={styles.feeInfo}>
                    <strong>Fee / Dakshina:</strong> {event.fee}
                  </p>
                )}
              </div>
            </div>

            {/* Right Col: Registration Card */}
            <div>
              <div className={styles.regCard}>
                <h3 className={styles.regTitle}>Event Registration</h3>
                {!event.isPast ? (
                  !isRegistered ? (
                    <div>
                      <p className={styles.regDesc}>
                        Reserve your seat for this event. Space is limited to ensure a quiet, contemplative atmosphere.
                      </p>
                      {!showRegForm ? (
                        <Button variant="primary" fullWidth onClick={() => setShowRegForm(true)}>
                          Register for Event →
                        </Button>
                      ) : (
                        <form onSubmit={handleRegister} className={styles.form}>
                          <div className="form-field">
                            <label className="form-label" htmlFor="reg-name">Your Name *</label>
                            <input
                              id="reg-name"
                              type="text"
                              required
                              className="form-input"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g. Meera Patel"
                            />
                          </div>

                          <div className="form-field">
                            <label className="form-label" htmlFor="reg-email">Email Address *</label>
                            <input
                              id="reg-email"
                              type="email"
                              required
                              className="form-input"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="e.g. meera@example.com"
                            />
                          </div>

                          <div className="form-field">
                            <label className="form-label" htmlFor="reg-phone">Phone / WhatsApp</label>
                            <input
                              id="reg-phone"
                              type="tel"
                              className="form-input"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="e.g. +91 98765 43210"
                            />
                          </div>

                          <Button type="submit" variant="primary" fullWidth>
                            Confirm Registration
                          </Button>
                        </form>
                      )}
                    </div>
                  ) : (
                    <div className={styles.confirmedBox}>
                      <span className={styles.checkIcon}>✓</span>
                      <h4>You are Registered!</h4>
                      <p>A confirmation email has been dispatched with details and arrival guidelines.</p>
                    </div>
                  )
                ) : (
                  <div className={styles.pastEventBox}>
                    <p>This event has concluded. View recordings in our Teachings archive.</p>
                    <Button href="/teachings" variant="outline" fullWidth>
                      Browse Teachings Archive
                    </Button>
                  </div>
                )}

                <div className={styles.contactHelp}>
                  <p>Questions about this event?</p>
                  <Link href="/contact">Contact Ashram Office →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Events */}
      {otherEvents.length > 0 && (
        <section className="section section--muted" aria-label="Other Events">
          <div className="container">
            <SectionHeader
              tag="More Programs"
              title="Other Upcoming Events"
            />
            <div className="grid grid--2">
              {otherEvents.map((e) => (
                <div key={e.id} className="card" style={{ padding: 'var(--space-6)' }}>
                  <Badge label={e.type} variant="default" />
                  <h3 style={{ marginBlock: 'var(--space-2)' }}>{e.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--vm-text-muted)' }}>
                    📅 {e.startDate} · 📍 {e.city}
                  </p>
                  <div style={{ marginTop: 'var(--space-4)' }}>
                    <Button href={`/events/${e.id}`} variant="outline">
                      View Event →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
