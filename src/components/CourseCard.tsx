import React from 'react';
import Link from 'next/link';
import Badge from './Badge';
import type { Course } from '@/data/courses';
import styles from './CourseCard.module.css';

interface Props {
  course: Course;
  doorNumber?: string;
}

export default function CourseCard({ course, doorNumber }: Props) {
  const isTattvaBodha = course.slug === 'tattva-bodha';
  const isResidential = course.slug === 'residential-gita';
  const isGitaOnline = course.slug === 'gita-online';
  const isSangyan = course.slug === 'sangyan-sanatan-dharma';

  // Derived door index if not explicitly provided
  const index = doorNumber || (
    isTattvaBodha ? '01'
    : isResidential ? '02'
    : isGitaOnline ? '03'
    : '04'
  );

  // Truthful status attribution based on real project state
  const statusInfo = isTattvaBodha
    ? {
        label: 'Available Now · Open Access Reader',
        variant: 'open' as const,
        cta: 'Enter Interactive Study Reader →',
        href: '/learn/tattva-bodha',
        doorType: 'Classical Introductory Text · Adi Shankaracharya',
        feeDisplay: 'Voluntary donation after Lesson 1',
        isPrimaryAction: true,
      }
    : isResidential
    ? {
        label: 'Admission-Based · Inquiry Required',
        variant: 'limited' as const,
        cta: 'Review Admission Guidelines →',
        href: `/learn/${course.slug}`,
        doorType: 'Full-Time Residential Program · 12 Months',
        feeDisplay: 'Fee details on inquiry (Institutional Guidelines Apply)',
        isPrimaryAction: false,
      }
    : isGitaOnline
    ? {
        label: 'Digitization In Progress · Lesson 1 Available',
        variant: 'default' as const,
        cta: 'Explore Course Syllabus in Learn →',
        href: `/learn/${course.slug}`,
        doorType: 'Correspondence Course · 40 Structured Lessons',
        feeDisplay: 'Lesson 1 open · Voluntary donation model',
        isPrimaryAction: false,
      }
    : {
        label: 'Study Circle · Community Series',
        variant: 'camp' as const,
        cta: 'Explore Study Circle Series →',
        href: `/learn/${course.slug}`,
        doorType: 'Cultural & Scriptural Awareness Series',
        feeDisplay: 'Open cultural awareness initiative',
        isPrimaryAction: false,
      };

  return (
    <article
      className={`${styles.doorCard} ${isTattvaBodha ? styles.doorActive : ''}`}
      aria-label={`Learning Doorway ${index}: ${course.title}`}
      data-morph-source="course"
    >
      {/* Door Header with Architectural Numeral */}
      <div className={styles.doorHeader} data-morph-element="course-door">
        <div className={styles.doorNumeralWrap}>
          <span className={styles.doorNumeral}>{index}</span>
          <div className={styles.doorPlaque}>
            <span className={styles.doorType}>{statusInfo.doorType}</span>
            <span className={styles.doorFormatBadge}>{course.format}</span>
          </div>
        </div>
        <div className={styles.doorStatusWrap}>
          <Badge variant={statusInfo.variant} label={statusInfo.label} />
        </div>
      </div>

      {/* Doorway Title & Subtitle */}
      <div className={styles.titleBlock}>
        <h3 className={styles.title}>
          <Link href={statusInfo.href} prefetch={true} className={styles.titleLink}>
            {course.title}
          </Link>
        </h3>
        <p className={styles.subtitle}>{course.subtitle}</p>
      </div>

      {/* Metadata Rail */}
      <div className={styles.metaRail}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Faculty</span>
          <span className={styles.metaVal}>{course.teacher}</span>
        </div>
        <div className={styles.metaDivider} />
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Duration</span>
          <span className={styles.metaVal}>{course.duration}</span>
        </div>
        <div className={styles.metaDivider} />
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Eligibility</span>
          <span className={styles.metaVal}>{course.eligibility.split('.')[0]}.</span>
        </div>
      </div>

      <p className={styles.desc}>{course.description.slice(0, 140)}…</p>

      {/* Door Footer with Fee Notice and Primary Action */}
      <div className={styles.footerRow}>
        <span className={styles.feeNotice}>{statusInfo.feeDisplay}</span>
        <Link
          href={statusInfo.href}
          prefetch={true}
          className={`${styles.doorActionBtn} ${statusInfo.isPrimaryAction ? styles.doorPrimaryBtn : ''}`}
          id={`btn-door-${course.slug}`}
        >
          {statusInfo.cta}
        </Link>
      </div>
    </article>
  );
}
