'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { getEventById, getUpcomingEvents, VMEvent } from '@/data/events';
import { useToast } from '@/context/ToastContext';
import { getAssetPath } from '@/utils/assetPath';
import motionStyles from '@/styles/motion.module.css';
import styles from './page.module.css';

interface EventMediaResult {
  src: string;
  alt: string;
  caption: string;
  focalPoint?: { x: number; y: number };
}

function getVerifiedEventMedia(event: VMEvent): EventMediaResult | null {
  const idLower = event.id.toLowerCase();
  const titleLower = event.title.toLowerCase();
  const cityLower = event.city.toLowerCase();

  // 1. Event-specific verified historical photography
  if (idLower.includes('moscow') || titleLower.includes('advaita congress') || cityLower.includes('moscow')) {
    return {
      src: '/images/vmission/events/advaita-congress-moscow.jpg',
      alt: 'Swami Atmananda Saraswati addressing the International Advaita Congress in Moscow',
      caption: 'Archival Photo: Keynote address at the International Advaita Congress, Moscow',
      focalPoint: { x: 40, y: 22 },
    };
  }

  if (idLower.includes('bandra') || (cityLower.includes('mumbai') && titleLower.includes('bandra'))) {
    return {
      src: '/images/vmission/events/bandra-talk-2010.jpg',
      alt: 'Discourse gathering in Bandra, Mumbai',
      caption: 'Archival Photo: Public discourse assembly, Bandra, Mumbai',
      focalPoint: { x: 50, y: 30 },
    };
  }

  if (idLower.includes('rotary') || titleLower.includes('rotary')) {
    return {
      src: '/images/vmission/events/rotary-club-mumbai-talk.jpg',
      alt: 'Discourse assembly at Rotary Club, Mumbai',
      caption: 'Archival Photo: Discourse assembly at Rotary Club, Mumbai',
      focalPoint: { x: 50, y: 24 },
    };
  }

  // 2. Verified Ashram contextual photograph for events hosted at the Indore Ashram
  if (event.location.includes('Vedanta Ashram') || cityLower === 'indore') {
    if (event.type === 'Camp') {
      return {
        src: '/images/vmission/ashram/teaching-hall-interior.jpg',
        alt: 'Teaching Hall Interior, Vedanta Ashram, Indore',
        caption: 'Ashram Venue: The Teaching Hall (Pravachan Hall), Vedanta Ashram, Indore',
        focalPoint: { x: 50, y: 40 },
      };
    }
    if (event.type === 'Celebration') {
      return {
        src: '/images/vmission/ashram/gangeshwar-dome-closeup.jpg',
        alt: 'Shri Gangeshwar Mahadev Mandir dome, Vedanta Ashram, Indore',
        caption: 'Ashram Venue: Shri Gangeshwar Mahadev Mandir, Vedanta Ashram, Indore',
        focalPoint: { x: 50, y: 15 },
      };
    }
    return {
      src: '/images/vmission/ashram/sanctum-interior-stage.jpg',
      alt: 'Pravachan dais and sanctum, Vedanta Ashram, Indore',
      caption: 'Ashram Venue: Pravachan dais, Vedanta Ashram, Indore',
      focalPoint: { x: 50, y: 35 },
    };
  }

  // 3. Editorial image-less treatment for all other events
  return null;
}

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
        <div className={styles.notFoundCard}>
          <span className={styles.notFoundBadge}>Vedanta Mission Archive</span>
          <h2>Event Not Found</h2>
          <p>The requested event record could not be found in our calendar or archive.</p>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <Link href="/events" className={styles.backLink}>← Return to All Gatherings</Link>
          </div>
        </div>
      </div>
    );
  }

  const media = getVerifiedEventMedia(event);
  const isSingleDay = event.startDate === event.endDate;
  const otherEvents = getUpcomingEvents().filter((e) => e.id !== event.id).slice(0, 2);

  // Reconciled reference date: September 19, 2026
  const CURRENT_DATE = '2026-09-19';
  const isConcluded = event.isPast || event.endDate < CURRENT_DATE;
  const isActive = !event.isPast && event.startDate <= CURRENT_DATE && event.endDate >= CURRENT_DATE;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Please provide your name and email address.', 'error');
      return;
    }
    setIsRegistered(true);
    showToast('Registration inquiry recorded! The Ashram office will be in touch.', 'success');
  };

  return (
    <article className={styles.eventArticle} data-morph-target="event">
      {/* Hero Header */}
      <header className={styles.hero} aria-label="Event Header">
        <div className="container">
          <div className={motionStyles.editorialReveal} style={{ maxWidth: '820px' }}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/events" className={styles.backLink}>
                ← Back to Gatherings &amp; Archive
              </Link>
            </nav>

            <div className={styles.badgeRow} data-morph-element="event-identity">
              <Badge label={event.type} variant="default" />
              {isConcluded ? (
                <span className={styles.archivalBadge}>Archival Record · Concluded</span>
              ) : isActive ? (
                <>
                  <Badge variant="default" label="Active Gathering · In Progress" />
                  {event.registration === 'open' && (
                    <Badge variant="open" label="Registration Open" />
                  )}
                </>
              ) : (
                <Badge
                  variant={
                    event.registration === 'open'
                      ? 'open'
                      : event.registration === 'limited'
                      ? 'limited'
                      : 'closed'
                  }
                  label={
                    event.registration === 'open'
                      ? 'Registration Open'
                      : event.registration === 'limited'
                      ? 'Limited Space'
                      : 'Registration Closed'
                  }
                />
              )}
              {event.city && <span className={styles.cityPlaque}>{event.city}</span>}
            </div>

            <h1 className={styles.title}>{event.title}</h1>

            <div className={styles.metaGrid}>
              <div className={styles.metaCell}>
                <span className={styles.metaCellLabel}>Date &amp; Duration</span>
                <span className={styles.metaCellVal}>
                  {event.startDate}
                  {!isSingleDay && ` to ${event.endDate}`}
                </span>
              </div>

              <div className={styles.metaCell}>
                <span className={styles.metaCellLabel}>Conducted By</span>
                <span className={styles.metaCellVal}>{event.teacher}</span>
              </div>

              <div className={styles.metaCell}>
                <span className={styles.metaCellLabel}>Venue Location</span>
                <span className={styles.metaCellVal}>
                  {event.location}, {event.city}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="section" aria-label="Event Program and Details">
        <div className="container">
          <div className={styles.twoCol}>
            {/* Left: Overview, Schedule, Guidelines */}
            <div className={styles.mainCol}>
              <SectionHeader
                tag={isConcluded ? 'Archival Record' : isActive ? 'Active Gathering' : 'Program Overview'}
                title={isConcluded ? 'Historical Assembly Overview' : isActive ? 'Active Gathering Overview' : 'About this Gathering'}
              />
              <p className={styles.leadText}>{event.description}</p>

              {/* Media Block: Verified Photo OR Editorial Image-less Card */}
              {media ? (
                <figure className={styles.mediaFigure}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={getAssetPath(media.src)}
                      alt={media.alt}
                      width={800}
                      height={450}
                      className={styles.eventImage}
                      style={{
                        objectPosition: media.focalPoint
                          ? `${media.focalPoint.x}% ${media.focalPoint.y}%`
                          : 'center 30%',
                      }}
                      priority
                    />
                  </div>
                  <figcaption className={styles.mediaCaption}>
                    <span>📷 {media.caption}</span>
                  </figcaption>
                </figure>
              ) : (
                <div className={styles.editorialCard}>
                  <div className={styles.editorialBorder}>
                    <span className={styles.editorialInvocation}>Vedanta Mission Assembly Record</span>
                    <h3 className={styles.editorialTitle}>{event.title}</h3>
                    <p className={styles.editorialLocation}>
                      {event.location} · {event.city}
                    </p>
                    <span className={styles.editorialTeacher}>Conducted by {event.teacher}</span>
                  </div>
                </div>
              )}

              {/* Schedule Block (if verified in source data) */}
              {event.schedule && event.schedule.length > 0 && (
                <div className={styles.scheduleBox}>
                  <h3 className={styles.scheduleHead}>Daily Program Schedule</h3>
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

              {/* Participation Guidelines */}
              <div className={styles.infoSection}>
                <h3 className={styles.infoHead}>Participation Guidelines</h3>
                <p className={styles.infoText}>
                  All sincere spiritual seekers, devotees, and students of Vedanta are welcome to participate. Participants are requested to maintain the contemplative silence and decorum appropriate for scriptural inquiry.
                </p>
                {event.fee && (
                  <div className={styles.feeBox}>
                    <span className={styles.feeLabel}>Contribution / Fee:</span>
                    <span className={styles.feeVal}>{event.fee}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Registration / Archival Box */}
            <aside className={styles.sidebarCol} aria-label="Event Status and Actions">
              <div className={styles.regCard}>
                {!isConcluded ? (
                  !isRegistered ? (
                    <div>
                      <span className={styles.sidebarTag}>{isActive ? 'Active Batch' : 'Participation'}</span>
                      <h3 className={styles.regTitle}>{isActive ? 'Course Enrollment' : 'Gathering Registration'}</h3>
                      <p className={styles.regDesc}>
                        {event.registration === 'closed'
                          ? 'Registration for this event is currently closed. You may contact the Ashram office for inquiries regarding waiting lists.'
                          : isActive
                          ? 'This lesson batch commenced on September 15, 2026 and is currently in progress. Lesson 1 is freely available to all seekers.'
                          : 'Reserve your attendance for this gathering. Space is managed to ensure a quiet, contemplative atmosphere.'}
                      </p>

                      {event.registration !== 'closed' && (
                        <>
                          {!showRegForm ? (
                            <Button
                              variant="primary"
                              fullWidth
                              onClick={() => setShowRegForm(true)}
                              id="btn-open-event-reg"
                            >
                              Register for Gathering →
                            </Button>
                          ) : (
                            <form onSubmit={handleRegister} className={styles.form}>
                              <div className="form-field">
                                <label className="form-label" htmlFor="reg-name">
                                  Full Name *
                                </label>
                                <input
                                  id="reg-name"
                                  type="text"
                                  required
                                  className="form-input"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="e.g. Anand Sharma"
                                />
                              </div>

                              <div className="form-field">
                                <label className="form-label" htmlFor="reg-email">
                                  Email Address *
                                </label>
                                <input
                                  id="reg-email"
                                  type="email"
                                  required
                                  className="form-input"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="e.g. anand@example.com"
                                />
                              </div>

                              <div className="form-field">
                                <label className="form-label" htmlFor="reg-phone">
                                  Phone / WhatsApp
                                </label>
                                <input
                                  id="reg-phone"
                                  type="tel"
                                  className="form-input"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  placeholder="e.g. +91 98260 12345"
                                />
                              </div>

                              <Button type="submit" variant="primary" fullWidth id="btn-submit-reg">
                                Submit Registration Inquiry
                              </Button>
                            </form>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className={styles.confirmedBox}>
                      <span className={styles.checkIcon}>✓</span>
                      <h4>Registration Recorded</h4>
                      <p>
                        Thank you, {name}. Your inquiry has been registered. The Ashram office will communicate arrival guidelines.
                      </p>
                    </div>
                  )
                ) : (
                  <div className={styles.archivalBox}>
                    <span className={styles.archivalStamp}>Archival Record</span>
                    <h3 className={styles.regTitle}>Concluded Event</h3>
                    <p className={styles.archivalText}>
                      This gathering concluded on {event.endDate || event.startDate}. You may explore recordings and commentaries from earlier programs in our Teachings study archive.
                    </p>
                    <div style={{ marginTop: 'var(--space-4)' }}>
                      <Link href="/teachings" className={styles.teachingsLink}>
                        Explore Teachings Archive →
                      </Link>
                    </div>
                  </div>
                )}

                <div className={styles.contactHelp}>
                  <p className={styles.contactPrompt}>Questions or travel assistance?</p>
                  <Link href="/contact" className={styles.contactLink}>
                    Contact Ashram Office →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Other Upcoming Gatherings */}
      {otherEvents.length > 0 && (
        <section className={styles.moreSection} aria-label="Other Upcoming Gatherings">
          <div className="container">
            <SectionHeader
              tag="Satsang &amp; Camps"
              title="Other Upcoming Gatherings"
              subtitle="Explore further retreats and seasonal assemblies conducted at Vedanta Ashram."
            />
            <div className="grid grid--2">
              {otherEvents.map((e) => (
                <article key={e.id} className={`card ${styles.otherCard}`}>
                  <div className={styles.otherBadges}>
                    <Badge label={e.type} variant="default" />
                    <Badge
                      variant={
                        e.registration === 'open'
                          ? 'open'
                          : e.registration === 'limited'
                          ? 'limited'
                          : 'closed'
                      }
                      label={
                        e.registration === 'open'
                          ? 'Open'
                          : e.registration === 'limited'
                          ? 'Limited'
                          : 'Closed'
                      }
                    />
                  </div>
                  <h3 className={styles.otherTitle}>{e.title}</h3>
                  <p className={styles.otherMeta}>
                    <span>📅 {e.startDate}</span> · <span>📍 {e.city}</span>
                  </p>
                  <p className={styles.otherDesc}>{e.description.slice(0, 110)}…</p>
                  <div style={{ marginTop: 'var(--space-4)' }}>
                    <Link href={`/events/${e.id}`} className={styles.otherLink}>
                      View Gathering Details →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
