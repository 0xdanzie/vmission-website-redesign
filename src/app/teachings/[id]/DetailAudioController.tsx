'use client';

import React from 'react';
import type { Teaching } from '@/data/teachings';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import styles from './page.module.css';

interface Props {
  teaching: Teaching;
}

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function DetailAudioController({ teaching }: Props) {
  const { play, toggle, state, setSpeed } = useAudioPlayer();
  const isCurrentTrack = state.track?.id === teaching.id;
  const isPlaying = isCurrentTrack && state.isPlaying;

  const handlePlayToggle = () => {
    if (isCurrentTrack) {
      toggle();
    } else {
      play(teaching);
    }
  };

  if (!teaching.src) {
    // Archival State: Legacy WordPress MP3 harvesting in progress
    return (
      <div className={styles.archivalAudioDesk}>
        <div className={styles.archivalDeskHeader}>
          <div className={styles.archivalBadge}>
            <span className={styles.statusDotPending} />
            <span>Archival Recording (Digitization in Progress)</span>
          </div>
          <span className={styles.archivalHost}>Host: {teaching.sourceHost}</span>
        </div>

        <div className={styles.archivalDeskBody}>
          <div className={styles.archivalIconWrap}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="22"/>
            </svg>
          </div>
          <div className={styles.archivalInfo}>
            <h3 className={styles.archivalTitle}>{teaching.title}</h3>
            <p className={styles.archivalText}>
              This discourse from the Vedanta Ashram archive is cataloged in the Jnana Ganga library. Archival digitisation of audio recordings is currently in progress. Direct audio streaming will be available soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Playable Audio Desk
  const progressPercent = isCurrentTrack && state.duration > 0
    ? (state.currentTime / state.duration) * 100
    : 0;

  return (
    <div className={styles.playableAudioDesk}>
      <div className={styles.audioDeskTop}>
        <div className={styles.audioDeskMeta}>
          <span className={styles.audioDeskLabel}>Primary Audio Discourse</span>
          <h3 className={styles.audioDeskTitle}>{teaching.title}</h3>
          <p className={styles.audioDeskTeacher}>Speaker: {teaching.teacher} · {teaching.language}</p>
        </div>

        <div className={styles.audioDeskActions}>
          <button
            type="button"
            className={`${styles.mainPlayBtn} ${isPlaying ? styles.mainPlayBtnActive : ''}`}
            onClick={handlePlayToggle}
            aria-label={isPlaying ? `Pause discourse: ${teaching.title}` : `Play discourse: ${teaching.title}`}
          >
            {isPlaying ? (
              <>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="3" y="2" width="4" height="12" rx="1"/>
                  <rect x="9" y="2" width="4" height="12" rx="1"/>
                </svg>
                <span>Pause Discourse</span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 2L14 8L4 14V2Z"/>
                </svg>
                <span>{isCurrentTrack ? 'Resume Discourse' : 'Listen to Full Discourse'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress & Timing */}
      <div className={styles.audioDeskProgressWrap}>
        <div className={styles.progressBarBg}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className={styles.progressTimeRow}>
          <span>{isCurrentTrack ? formatTime(state.currentTime) : '0:00'}</span>
          <div className={styles.playbackControls}>
            <span className={styles.speedLabel}>Speed:</span>
            {[1, 1.25, 1.5].map((spd) => (
              <button
                key={spd}
                type="button"
                className={`${styles.speedBtn} ${isCurrentTrack && state.speed === spd ? styles.speedBtnActive : ''}`}
                onClick={() => setSpeed(spd)}
              >
                {spd}x
              </button>
            ))}
          </div>
          <span>{isCurrentTrack && state.duration > 0 ? formatTime(state.duration) : teaching.duration || 'Full Session'}</span>
        </div>
      </div>
    </div>
  );
}
