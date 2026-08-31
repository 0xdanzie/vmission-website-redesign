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

  return (
    <article className={`card ${styles.card} ${event.isPast ? styles.past : ''}`}>
      {/* Date Badge */}
      <div className={styles.dateBadge} aria-label={`Date: ${event.startDate}`}>
        <span className={styles.month}>{MONTH_ABBR[date.getMonth()]}</span>
        <span className={styles.day}>{date.getDate()}</span>
        {!isSingleDay && (
          <>
            <span className={styles.dateSep}>–</span>
            <span className={styles.day}>{endDate.getDate()}</span>
          </>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.badges}>
          <Badge label={event.type} variant="default" />
          <Badge variant={regVariant} />
        </div>

        <h3 className={styles.title}>{event.title}</h3>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 3v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {event.teacher.replace('Swami ', 'Sw. ').replace('Swamini ', 'Swamini ')}
          </span>
          <span className={styles.metaItem}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1C4 1 2 3 2 5C2 8 6 11 6 11C6 11 10 8 10 5C10 3 8 1 6 1Z" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="6" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            {event.city}
          </span>
        </div>

        <p className={styles.desc}>{event.description.slice(0, 120)}…</p>

        {!event.isPast ? (
          <Link href={`/events/${event.id}`} className={styles.viewLink}>
            View Details →
          </Link>
        ) : (
          <span className={styles.pastTag}>Past event</span>
        )}
      </div>
    </article>
  );
}
