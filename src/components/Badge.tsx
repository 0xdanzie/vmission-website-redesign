import React from 'react';
import styles from './Badge.module.css';

type BadgeVariant = 'online' | 'residential' | 'camp' | 'study' | 'audio' | 'video' | 'pdf' | 'ebook' | 'open' | 'limited' | 'closed' | 'past' | 'default';

const VARIANT_LABELS: Record<string, string> = {
  online: 'Online',
  residential: 'Residential',
  camp: 'Camp',
  study: 'Study Group',
  audio: 'Audio',
  video: 'Video',
  pdf: 'PDF',
  ebook: 'E-Book',
  open: 'Registration Open',
  limited: 'Limited Seats',
  closed: 'Registration Closed',
  past: 'Past Event',
};

interface Props {
  variant?: BadgeVariant;
  label?: string;
  className?: string;
}

export default function Badge({ variant = 'default', label, className = '' }: Props) {
  const displayLabel = label || VARIANT_LABELS[variant] || variant;
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {displayLabel}
    </span>
  );
}
