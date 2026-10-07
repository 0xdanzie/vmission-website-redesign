'use client';

import React, { useState } from 'react';
import type { Publication } from '@/data/publications';
import { resolvePublicationCover } from '@/lib/media-identity';
import PublicationPlaceholder from '@/components/PublicationPlaceholder';
import styles from './PublicationCard.module.css';

interface Props {
  publication: Publication;
  onReadOnline?: (pub: Publication) => void;
}

export default function PublicationCard({ publication, onReadOnline }: Props) {
  const [imgError, setImgError] = useState(false);

  // Validate cover via strict media ownership pipeline
  const resolvedCover = resolvePublicationCover(
    publication.id,
    publication.type,
    publication.coverImage
  );

  const showPlaceholder = !resolvedCover || imgError;

  return (
    <article className={`card ${styles.card}`} data-morph-source="publication">
      {/* Cover / Restrained Editorial Placeholder */}
      <div className={styles.cover} aria-label={`Cover of ${publication.title}`}>
        {showPlaceholder ? (
          <PublicationPlaceholder publication={publication} />
        ) : (
          <img
            src={resolvedCover}
            alt={publication.title}
            className={styles.coverImg}
            loading="lazy"
            data-morph-element="cover"
            onError={() => setImgError(true)}
          />
        )}
        {publication.isLatest && (
          <span className={styles.latestBadge} aria-label="Latest issue">Latest</span>
        )}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <p className={styles.lang}>{publication.language}</p>
        <h3 className={styles.title}>{publication.title}</h3>
        {publication.pageCount && (
          <p className={styles.pages}>{publication.pageCount} pages</p>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.readBtn}
            onClick={() => onReadOnline?.(publication)}
            aria-label={`Read ${publication.title} online`}
          >
            Read Online
          </button>
          <a
            href={publication.downloadUrl !== '#' ? publication.downloadUrl : undefined}
            className={styles.downloadBtn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${publication.title}`}
            aria-disabled={publication.downloadUrl === '#'}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download PDF
          </a>
        </div>
      </div>
    </article>
  );
}
