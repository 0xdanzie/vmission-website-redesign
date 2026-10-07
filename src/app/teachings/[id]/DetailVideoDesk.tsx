'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Teaching } from '@/data/teachings';
import styles from './page.module.css';

interface Props {
  teaching: Teaching;
}

export default function DetailVideoDesk({ teaching }: Props) {
  const [fallbackMode, setFallbackMode] = useState<boolean>(false);

  const hasEmbedId = Boolean(teaching.youtubePlaylistId || teaching.youtubeVideoId);

  // Compute primary watch and embed URLs
  const youtubeWatchUrl = teaching.youtubeVideoId && teaching.youtubePlaylistId
    ? `https://www.youtube.com/watch?v=${teaching.youtubeVideoId}&list=${teaching.youtubePlaylistId}`
    : teaching.youtubePlaylistId
    ? `https://www.youtube.com/playlist?list=${teaching.youtubePlaylistId}`
    : teaching.youtubeVideoId
    ? `https://youtu.be/${teaching.youtubeVideoId}`
    : 'https://www.youtube.com/@VedantaAshram';

  const embedSrc = teaching.youtubeVideoId
    ? `https://www.youtube-nocookie.com/embed/${teaching.youtubeVideoId}?list=${teaching.youtubePlaylistId}&rel=0`
    : `https://www.youtube-nocookie.com/embed/videoseries?list=${teaching.youtubePlaylistId}&rel=0`;

  // Graceful Fallback View (when embed is restricted, unavailable, or missing)
  if (!hasEmbedId || fallbackMode) {
    return (
      <div className={styles.videoFallbackDesk}>
        <div className={styles.videoFallbackPosterWrap}>
          <Image
            src="/images/vmission/teaching/07-vedanta-archive-restored.jpg"
            alt={`${teaching.title} video discourse poster`}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className={styles.videoFallbackPosterImg}
          />
          <div className={styles.videoFallbackScrim} />
          
          <div className={styles.videoFallbackContent}>
            <div className={styles.videoFallbackEyebrow}>
              <span className={styles.fallbackSanskrit}>ज्ञानगङ्गा सत्सङ्ग</span>
              <span className={styles.fallbackDot}>·</span>
              <span>VIDEO DISCOURSE</span>
            </div>

            <h3 className={styles.videoFallbackTitle}>{teaching.title}</h3>

            <p className={styles.videoFallbackMeta}>
              Expounded by {teaching.teacher}
              {teaching.scripture ? ` · ${teaching.scripture}` : ''}
              {teaching.duration ? ` · ${teaching.duration}` : ''}
            </p>

            <p className={styles.videoFallbackNotice}>
              This sequential discourse series is hosted directly on the official Vedanta Ashram YouTube channel.
              If third-party playback is restricted in your browser or region, you can watch the entire series
              with full playlist controls, verified audio-video synchronization, and subtitles directly on YouTube.
            </p>

            <div className={styles.videoFallbackActionRow}>
              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.videoFallbackPrimaryBtn}
                aria-label={`Watch ${teaching.title} on YouTube`}
              >
                <span>Watch on YouTube ↗</span>
              </a>

              {hasEmbedId && (
                <button
                  type="button"
                  onClick={() => setFallbackMode(false)}
                  className={styles.videoFallbackSecondaryBtn}
                >
                  <span>Try In-Page Player ↺</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Interactive 16:9 Video Desk Embed
  return (
    <div className={styles.videoDeskFrame}>
      <div className={styles.videoEmbedWrapper}>
        <iframe
          src={embedSrc}
          title={`${teaching.title} — Verified YouTube Playlist`}
          className={styles.videoIframe}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className={styles.videoDeskCaption}>
        <div className={styles.captionBadgeWrap}>
          <span className={styles.captionBadge}>Complete Sequential Playlist</span>
          <span className={styles.captionSub}>Verified 1:1 Old-Site Video Manifest</span>
          <p className={styles.captionHint}>
            Delivered by {teaching.teacher}. Use the playlist icon in the top right corner of the player to access all sequential lectures in this series.
          </p>
        </div>

        <div className={styles.captionActionCluster}>
          <a
            href={youtubeWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.captionWatchLink}
            aria-label={`Open ${teaching.title} directly on YouTube`}
          >
            Watch on YouTube ↗
          </a>

          <button
            type="button"
            onClick={() => setFallbackMode(true)}
            className={styles.captionFallbackToggle}
            title="Switch to fallback presentation if player shows 'Video Unavailable'"
          >
            Playback restricted?
          </button>
        </div>
      </div>
    </div>
  );
}
