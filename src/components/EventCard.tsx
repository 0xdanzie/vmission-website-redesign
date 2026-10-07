import React from 'react';
import Link from 'next/link';
import Badge from './Badge';
import type { VMEvent } from '@/data/events';
import styles from './EventCard.module.css';

interface Props {
  event: VMEvent;
}

const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function EventCard({ event }: Props) {
  const date = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const isSingleDay = event.startDate === event.endDate;

  const regVariant = event.isPast ? 'past'
    : event.registration === 'open' ? 'open'
    : event.registration === 'limited' ? 'limited'
    : 'closed';

  const regLabel = event.isPast ? 'Concluded'
    : event.registration === 'open' ? 'Registration Open'
    : event.registration === 'limited' ? 'Limited Space'
    : 'Registration Closed';

  return (
    <article className={`${styles.card} ${event.isPast ? styles.pastCard : styles.upcomingCard}`} data-morph-source="event">
      {/* Date Column */}
      <div className={styles.dateCol} aria-label={`Date: ${event.startDate}`} data-morph-element="event-identity">
        <span className={styles.month}>{MONTH_ABBR[date.getMonth()]}</span>
        <span className={styles.day}>{date.getDate()}</span>
        {!isSingleDay && (
          <>
            <span className={styles.dateSep}>–</span>
            <span className={styles.dayEnd}>{endDate.getDate()}</span>
          </>
        )}
        <span className={styles.year}>{date.getFullYear()}</span>
      </div>

      {/* Content Column */}
      <div className={styles.content}>
        <div className={styles.badges}>
          <Badge label={event.type} variant="default" />
          <Badge variant={regVariant} label={regLabel} />
        </div>

        <h3 className={styles.title}>
          <Link href={`/events/${event.id}`} prefetch={true} className={styles.titleLink}>
            {event.title}
          </Link>
        </h3>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 3v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span>{event.teacher.replace('Swami ', 'Sw. ').replace('Swamini ', 'Swamini ')}</span>
          </span>
          <span className={styles.metaItem}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1C4 1 2 3 2 5C2 8 6 11 6 11C6 11 10 8 10 5C10 3 8 1 6 1Z" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="6" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            <span>{event.city}</span>
          </span>
        </div>

        <p className={styles.desc}>{event.description.slice(0, 130)}…</p>

        <div className={styles.ctaRow}>
          {!event.isPast ? (
            <Link href={`/events/${event.id}`} className={styles.viewLink}>
              View Gathering Details →
            </Link>
          ) : (
            <Link href={`/events/${event.id}`} className={styles.pastViewLink}>
              Archival Record →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

