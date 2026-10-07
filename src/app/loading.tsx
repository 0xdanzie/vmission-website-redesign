import React from 'react';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer} role="status" aria-label="Loading page">
      <div className={styles.indicatorLine}>
        <div className={styles.indicatorPulse} />
      </div>
      <span className={styles.kicker}>Vedanta Mission</span>
    </div>
  );
}
