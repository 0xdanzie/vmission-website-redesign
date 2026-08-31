import React from 'react';
import styles from './TimelineItem.module.css';

interface Props {
  timeOrYear: string;
  title: string;
  description: string;
  isLast?: boolean;
}

export default function TimelineItem({
  timeOrYear,
  title,
  description,
  isLast = false,
}: Props) {
  return (
    <div className={`${styles.item} ${isLast ? styles.last : ''}`}>
      <div className={styles.leftCol}>
        <span className={styles.timeBadge}>{timeOrYear}</span>
        <div className={styles.line} aria-hidden="true" />
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
