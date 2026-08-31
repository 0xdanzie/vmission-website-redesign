import React from 'react';
import Link from 'next/link';
import Badge from './Badge';
import type { Course } from '@/data/courses';
import styles from './CourseCard.module.css';

interface Props { course: Course; }

const FORMAT_ICONS: Record<string, string> = {
  Online: '🌐',
  Residential: '🏛️',
  Camp: '⛺',
  'Study Group': '📚',
};

export default function CourseCard({ course }: Props) {
  const formatVariant = course.format.toLowerCase().replace(' ', '-') as Parameters<typeof Badge>[0]['variant'];

  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.iconRow}>
        <span className={styles.icon} aria-hidden="true">{FORMAT_ICONS[course.format] || '📖'}</span>
        <Badge variant={formatVariant} />
      </div>
      <h3 className={styles.title}>{course.title}</h3>
      <p className={styles.subtitle}>{course.subtitle}</p>
      <div className={styles.meta}>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Teacher</span>
          <span className={styles.metaVal}>{course.teacher.replace('Swami ', 'Sw. ')}</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Duration</span>
          <span className={styles.metaVal}>{course.duration}</span>
        </div>
      </div>
      <p className={styles.desc}>{course.description.slice(0, 110)}…</p>
      <Link href={`/learn/${course.slug}`} className={styles.link}>
        Learn More →
      </Link>
    </article>
  );
}
