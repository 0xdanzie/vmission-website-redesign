import React from 'react';
import styles from './SacredDivider.module.css';

interface SacredDividerProps {
  glyph?: string;
  sutra?: string;
  className?: string;
}

export default function SacredDivider({
  glyph = 'ॐ',
  sutra,
  className = '',
}: SacredDividerProps) {
  return (
    <div className={`${styles.dividerWrap} ${className}`} role="separator" aria-hidden="true">
      <div className={styles.lineLeft} />
      <div className={styles.centerCluster}>
        <span className={styles.glyph}>{glyph}</span>
        {sutra && <span className={styles.sutra}>{sutra}</span>}
      </div>
      <div className={styles.lineRight} />
    </div>
  );
}
