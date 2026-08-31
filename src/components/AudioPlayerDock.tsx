'use client';

import React, { useCallback, useState } from 'react';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import styles from './AudioPlayerDock.module.css';

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayerDock() {
  const { state, toggle, seek, setSpeed, minimize, expand, close } = useAudioPlayer();
  const [isMuted, setIsMuted] = useState(false);

  const handleScrub = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  }, [seek]);

  if (!state.isVisible || !state.track) return null;

  const progress = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

  return (
    <div
      className={`${styles.dock} ${state.isMinimized ? styles.minimized : ''}`}
      role="region"
      aria-label="Vedanta Discourse Audio Player"
    >
      {state.isMinimized ? (
        /* Minimized Floating Bar */
        <div className={styles.minBar} onClick={expand} role="button" tabIndex={0} aria-label="Expand audio player">
          <button
            type="button"
            className={styles.playBtnSm}
            onClick={(e) => { e.stopPropagation(); toggle(); }}
            aria-label={state.isPlaying ? 'Pause discourse' : 'Play discourse'}
          >
            {state.isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <rect x="3" y="2" width="4" height="12" rx="1"/>
                <rect x="9" y="2" width="4" height="12" rx="1"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2L14 8L4 14V2Z"/>
              </svg>
            )}
          </button>
          <div className={styles.minTrack}>
            <p className={styles.minTitle}>{state.track.title}</p>
            <div className={styles.miniProgress}>
              <div className={styles.miniBar} style={{ width: `${progress}%` }} />
            </div>
          </div>
          <button
            type="button"
            className={styles.expandBtn}
            onClick={(e) => { e.stopPropagation(); expand(); }}
            aria-label="Expand player"
          >
            ↑
          </button>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close audio player"
          >
            ✕
          </button>
        </div>
      ) : (
        /* Full Persistent Player */
        <div className={styles.player}>
          {/* Track Info */}
          <div className={styles.trackInfo}>
            <div className={`${styles.trackIcon} ${state.isPlaying ? styles.iconPulse : ''}`} aria-hidden="true">
              {state.isPlaying ? (
                <div className={styles.equalizer}>
                  <span />
                  <span />
                  <span />
                </div>
              ) : (
                '🎙️'
              )}
            </div>
            <div className={styles.trackMeta}>
              <p className={styles.trackTitle}>{state.track.title}</p>
              <p className={styles.trackTeacher}>
                {state.track.teacher} · <span className={styles.topicBadge}>{state.track.topic}</span>
              </p>
            </div>
          </div>

          {/* Center Controls & Scrubber */}
          <div className={styles.controls}>
            <div className={styles.playRow}>
              <button
                type="button"
                className={styles.playBtn}
                onClick={toggle}
                aria-label={state.isPlaying ? 'Pause discourse' : 'Play discourse'}
              >
                {state.isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <rect x="4" y="3" width="5" height="14" rx="1.5"/>
                    <rect x="11" y="3" width="5" height="14" rx="1.5"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3L17 10L5 17V3Z"/>
                  </svg>
                )}
              </button>

              <div className={styles.scrubber}>
                <span className={styles.time}>{formatTime(state.currentTime)}</span>
                <div className={styles.track}>
                  <div className={styles.fill} style={{ width: `${progress}%` }} />
                  <input
                    type="range"
                    min={0}
                    max={state.duration || 100}
                    value={state.currentTime}
                    onChange={handleScrub}
                    className={styles.range}
                    aria-label="Seek position"
                    aria-valuemin={0}
                    aria-valuemax={state.duration}
                    aria-valuenow={state.currentTime}
                    aria-valuetext={formatTime(state.currentTime)}
                  />
                </div>
                <span className={styles.time}>{formatTime(state.duration)}</span>
              </div>
            </div>

            {/* Speed Selector */}
            <div className={styles.speedGroup}>
              <span className={styles.speedLabel}>Speed:</span>
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`${styles.speedBtn} ${state.speed === s ? styles.activeSpeed : ''}`}
                  onClick={() => setSpeed(s)}
                  aria-pressed={state.speed === s}
                  aria-label={`Playback speed ${s}x`}
                >
                  {s}×
                </button>
              ))}
            </div>
          </div>

          {/* Minimize / Close Actions */}
          <div className={styles.dockActions}>
            <button
              type="button"
              className={styles.actionBtn}
              onClick={minimize}
              title="Minimize player"
              aria-label="Minimize player to bar"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 10L8 5L13 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              type="button"
              className={styles.actionBtn}
              onClick={close}
              title="Close player"
              aria-label="Close audio player"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
