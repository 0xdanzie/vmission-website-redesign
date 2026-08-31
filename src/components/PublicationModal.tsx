'use client';

import React, { useEffect, useState } from 'react';
import type { Publication } from '@/data/publications';
import styles from './PublicationModal.module.css';

interface Props {
  publication: Publication | null;
  onClose: () => void;
}

export default function PublicationModal({ publication, onClose }: Props) {
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  useEffect(() => {
    if (publication) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [publication]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!publication) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Digital Reader: ${publication.title}`}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className={styles.header}>
          <div>
            <span className={styles.typeBadge}>{publication.type}</span>
            <h2 className={styles.title}>{publication.title}</h2>
            <p className={styles.meta}>
              Language: <strong>{publication.language}</strong> · Issue: {publication.month} {publication.year}
            </p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.readControls}>
              <button
                type="button"
                className={`${styles.sizeBtn} ${fontSize === 'normal' ? styles.activeSize : ''}`}
                onClick={() => setFontSize('normal')}
                title="Normal text size"
                aria-label="Normal text size"
              >
                A
              </button>
              <button
                type="button"
                className={`${styles.sizeBtn} ${fontSize === 'large' ? styles.activeSize : ''}`}
                onClick={() => setFontSize('large')}
                title="Large text size"
                aria-label="Large text size"
              >
                A+
              </button>
            </div>
            {publication.downloadUrl !== '#' && (
              <a
                href={publication.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.downloadLink}
                aria-label="Download full PDF"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v10M4 8l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download PDF
              </a>
            )}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close magazine reader"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Reader Document Body */}
        <div className={`${styles.readerBody} ${fontSize === 'large' ? styles.largeText : ''}`}>
          {/* Magazine Cover Preview Banner */}
          <div className={styles.coverSpread}>
            <div className={styles.coverVisual}>
              <span className={styles.omWatermark}>ॐ</span>
              <div className={styles.coverSpreadMeta}>
                <span className={styles.ezineTag}>E-Magazine</span>
                <h3>{publication.type}</h3>
                <p>{publication.month} {publication.year}</p>
              </div>
            </div>

            <div className={styles.coverIntro}>
              <h3 className={styles.introHeading}>In This Edition</h3>
              <ul className={styles.tocList}>
                <li>
                  <strong>Satsang Pravachan:</strong> &ldquo;The Discrimination of the Real and Unreal&rdquo; by Poojya Swami Atmananda Saraswati.
                </li>
                <li>
                  <strong>Upanishad Vahini:</strong> Reflections on the Kena Upanishad and the Nature of Mind.
                </li>
                <li>
                  <strong>Ashram Vrittanta:</strong> News and reports on recent celebrations and residential Gita course inmates.
                </li>
                <li>
                  <strong>Sadhana Path:</strong> Questions from seekers on daily meditation and contemplation practice.
                </li>
              </ul>
            </div>
          </div>

          {/* Sample Article Content */}
          <div className={styles.articleSection}>
            <h3 className={styles.articleTitle}>
              Lead Article: The Nature of Non-Dual Inquiry (Atma Vichara)
            </h3>
            <p className={styles.articleAuthor}>
              By <strong>Poojya Swami Atmananda Saraswati</strong>
            </p>

            <blockquote className={styles.articleQuote}>
              &ldquo;Self-knowledge is not an acquisition of something foreign or new. It is the removal of the false superimposition that limits our eternal, ever-present consciousness.&rdquo;
            </blockquote>

            <p className={styles.paragraph}>
              In the tradition of Advaita Vedanta, spiritual study begins with understanding the difference between the &lsquo;Seer&rsquo; (Drig) and the &lsquo;Seen&rsquo; (Drushya). The body, the sensations, and the fluctuating modifications of the mind are all objects of awareness. That which illumines them is the unattached, changeless Witness (Sakshi).
            </p>

            <p className={styles.paragraph}>
              Through regular study of classical prakarana granths such as <em>Tattva Bodha</em> and <em>Drig Drushya Viveka</em>, the sincere seeker develops the discrimination (Viveka) necessary to remain anchored in this self-evident truth amidst worldly responsibilities.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            {publication.archiveUrl !== '#' && (
              <a
                href={publication.archiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.archiveRef}
              >
                View on Archive.org Repository ↗
              </a>
            )}
          </div>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
}
