import React from 'react';
import styles from './SectionHeader.module.css';

interface Props {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeader({ tag, title, subtitle, align = 'left', light = false }: Props) {
  return (
    <div className={`${styles.header} ${styles[align]} ${light ? styles.light : ''}`}>
      {tag && <p className={styles.tag}>{tag}</p>}
      <h2 className={`text-h1 ${styles.title}`}>{title}</h2>
      <hr className={`divider ${align === 'center' ? 'divider--center' : ''}`} />
      {subtitle && <p className={`text-lead ${styles.subtitle}`}>{subtitle}</p>}
    </div>
  );
}
