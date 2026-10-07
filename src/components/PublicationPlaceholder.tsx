import React from 'react';
import type { Publication } from '@/data/publications';
import styles from './PublicationPlaceholder.module.css';

interface Props {
  publication: Pick<Publication, 'id' | 'type' | 'title' | 'month' | 'year' | 'language' | 'author'>;
  className?: string;
  variant?: 'card' | 'detail';
}

export default function PublicationPlaceholder({ publication, className = '', variant = 'card' }: Props) {
  // Derive category and labels dynamically from canonical entity
  let seriesName = 'LITERARY ARCHIVE';
  let seriesSublabel = 'Vedanta Mission Literary Collection';
  let catClass = '';

  switch (publication.type) {
    case 'Vedanta Sandesh':
      seriesName = 'VEDANTA SANDESH';
      seriesSublabel = 'Monthly English Spiritual Journal';
      catClass = styles.catSandesh;
      break;
    case 'Vedanta Piyush':
      seriesName = 'VEDANTA PIYUSH';
      seriesSublabel = 'मासिक हिन्दी पत्रिका';
      catClass = styles.catPiyush;
      break;
    case 'E-Books':
      seriesName = 'CANONICAL E-BOOK';
      seriesSublabel = publication.author ? `By ${publication.author}` : 'Vedanta Publication Series';
      catClass = styles.catEbook;
      break;
    case 'Study & Chant Texts':
      seriesName = 'ARCHIVAL SANSKRIT TEXT';
      seriesSublabel = 'मूल एवं स्वाध्याय पाठ';
      catClass = styles.catStudyText;
      break;
  }

  // Format issue date or archival tag
  let dateText = '';
  if (publication.month && publication.year) {
    dateText = `${publication.month} ${publication.year}`;
  } else if (publication.year) {
    dateText = `Edition · ${publication.year}`;
  } else if (publication.type === 'Study & Chant Texts') {
    dateText = 'Mūla Scripture';
  } else {
    dateText = 'Archival Preservation';
  }

  return (
    <div
      className={`${styles.placeholder} ${catClass} ${variant === 'detail' ? styles.detailVariant : ''} ${className}`}
      aria-label={`Archival preservation plate for ${publication.title} (${publication.type}, ${dateText})`}
      role="img"
    >
      <div className={styles.innerBorder} aria-hidden="true" />

      {/* Dynamic Series Header */}
      <header className={styles.topSection}>
        <span className={styles.seriesBadge}>{seriesName}</span>
        <span className={styles.seriesSublabel}>{seriesSublabel}</span>
      </header>

      {/* Central Sacred Glyph & Title */}
      <div className={styles.centerSection}>
        <span className={styles.omGlyph} aria-hidden="true">ॐ</span>
        <h4 className={styles.title}>{publication.title}</h4>
        {publication.author && (
          <p className={styles.author}>{publication.author}</p>
        )}
        <span className={styles.issueDate}>{dateText}</span>
        <span className={styles.archivalNotice}>
          Archival Record · Digital Cover Not Scanned
        </span>
      </div>

      {/* Dynamic Archival Footer */}
      <footer className={styles.bottomSection}>
        <span className={styles.languageBadge}>{publication.language || 'Archival'}</span>
        <span className={styles.archiveSeal}>VM ARCHIVE</span>
      </footer>
    </div>
  );
}

