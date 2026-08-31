'use client';

import React from 'react';
import Badge from './Badge';
import type { Teaching } from '@/data/teachings';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import styles from './TeachingCard.module.css';

interface Props {
  teaching: Teaching;
}

export default function TeachingCard({ teaching }: Props) {
  const { play, pause, toggle, state } = useAudioPlayer();
  const isPlaying = state.track?.id === teaching.id && state.isPlaying;
  const isActive = state.track?.id === teaching.id;

  const formatVariant = teaching.format.toLowerCase() as Parameters<typeof Badge>[0]['variant'];

  const handleAction = () => {
    if (teaching.format === 'Audio') {
      if (isActive) {
        toggle();
      } else {
        play(teaching);
      }
    }
  };

  return (
    <article className={`card ${styles.card} ${isActive ? styles.activeCard : ''}`}>
      {/* Top Header Row */}
      <div className={styles.topRow}>
        <div className={styles.iconBadge}>
          {teaching.format === 'Audio' ? '🎧' : teaching.format === 'Video' ? '🎬' : '📄'}
        </div>
        <div className={styles.tags}>
          <span className={styles.topicTag}>{teaching.topic}</span>
          <Badge variant={formatVariant} label={teaching.format} />
        </div>
      </div>

      {/* Title & Teacher */}
      <h3 className={styles.title}>{teaching.title}</h3>

      <div className={styles.metaRow}>
        <span className={styles.teacher}>🎙️ {teaching.teacher}</span>
        {teaching.duration && (
          <span className={styles.duration}>⏱️ {teaching.duration}</span>
        )}
      </div>

      <p className={styles.desc}>{teaching.description}</p>

      {/* Action Button */}
      <div className={styles.actionRow}>
        {teaching.format === 'Audio' ? (
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
        ) : (
          <span className={styles.docNotice}>
            {teaching.format === 'Video' ? '▶ Video Lecture' : '📄 Reference PDF'}
          </span>
        )}
        <span className={styles.lang}>{teaching.language}</span>
      </div>
    </article>
  );
}
