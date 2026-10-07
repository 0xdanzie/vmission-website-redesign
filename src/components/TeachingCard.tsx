'use client';

import React from 'react';
import Link from 'next/link';
import Badge from './Badge';
import type { Teaching } from '@/data/teachings';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import styles from './TeachingCard.module.css';

interface Props {
  teaching: Teaching;
}

export default function TeachingCard({ teaching }: Props) {
  const { play, toggle, state } = useAudioPlayer();
  const isPlaying = state.track?.id === teaching.id && state.isPlaying;
  const isActive = state.track?.id === teaching.id;

  const formatVariant = teaching.format.toLowerCase() as Parameters<typeof Badge>[0]['variant'];
  const detailHref = `/teachings/${teaching.slug || teaching.id}`;

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (teaching.format === 'Audio' && teaching.src) {
      if (isActive) {
        toggle();
      } else {
        play(teaching);
      }
    }
  };

  return (
    <article
      className={`card ${styles.card} ${isActive ? styles.activeCard : ''}`}
      data-morph-source="teaching"
    >
      {/* Top Header Row */}
      <div className={styles.topRow}>
        <div className={styles.iconBadge} aria-hidden="true" data-morph-element="teaching-icon">
          {teaching.format === 'Audio' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          ) : teaching.format === 'Video' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          )}
        </div>
        <div className={styles.tags}>
          <span className={styles.topicTag}>{teaching.categoryName || teaching.topic}</span>
          <Badge variant={formatVariant} label={teaching.format} />
        </div>
      </div>

      {/* Title & Teacher */}
      <h3 className={styles.title}>
        <Link href={detailHref} className={styles.titleLink}>
          {teaching.title}
        </Link>
      </h3>

      <div className={styles.metaRow}>
        <span className={styles.teacher}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '5px' }}>
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          {teaching.teacher}
        </span>
        {teaching.duration && (
          <span className={styles.duration}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {teaching.duration}
          </span>
        )}
      </div>

      <p className={styles.desc}>{teaching.description}</p>

      {/* Action Button */}
      <div className={styles.actionRow}>
        {teaching.format === 'Audio' && teaching.src ? (
          <button
            type="button"
            className={`${styles.playBtn} ${isPlaying ? styles.playingBtn : ''}`}
            onClick={handleAction}
            aria-label={isPlaying ? `Pause: ${teaching.title}` : `Play discourse: ${teaching.title}`}
          >
            {isPlaying ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <rect x="2" y="1" width="4" height="12" rx="1"/>
                  <rect x="8" y="1" width="4" height="12" rx="1"/>
                </svg>
                <span>Pause Discourse</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M3 1L13 7L3 13V1Z"/>
                </svg>
                <span>{isActive ? 'Resume Discourse' : 'Listen Now'}</span>
              </>
            )}
          </button>
        ) : teaching.format === 'Video' ? (
          <Link
            href={detailHref}
            className={styles.playBtn}
            aria-label={`Watch video discourse: ${teaching.title}`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M3 1L13 7L3 13V1Z"/>
            </svg>
            <span>Watch Playlist</span>
          </Link>
        ) : (
          <Link
            href={detailHref}
            className={styles.archivalBtn}
            aria-label={`View archival discourse: ${teaching.title}`}
          >
            <span>Archival Discourse</span>
          </Link>
        )}
        <div className={styles.metaEnd}>
          <span className={styles.lang}>{teaching.language}</span>
          <Link href={detailHref} className={styles.studyDeskLink} aria-label={`Study ${teaching.title} at Digital Study Desk`}>
            Study Desk →
          </Link>
        </div>
      </div>
    </article>
  );
}
