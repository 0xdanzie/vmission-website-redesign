'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import CourseCard from '@/components/CourseCard';
import FilterBar from '@/components/FilterBar';
import EmptyState from '@/components/EmptyState';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

const FILTER_OPTIONS = ['All Formats', 'Online', 'Residential', 'Camp', 'Study Group'];

export default function LearnPage() {
  const [selectedFilter, setSelectedFilter] = useState('All Formats');
  const { courses } = useData();

  const filteredCourses = courses.filter((c) => {
    if (selectedFilter === 'All Formats') return true;
    return c.format === selectedFilter;
  });

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label="Learn Vedanta Hero">
        <div className="container">
          <div className="animate-fadeUp" style={{ maxWidth: '720px' }}>
            <span className={styles.badge}>Systematic Scriptural Study</span>
            <h1 className={styles.title}>Learn Advaita Vedanta</h1>
            <p className={styles.lead}>
              Explore our structured learning programs designed for sincere seekers worldwide. From free foundational correspondence courses to intensive full-time residential immersions in Indore.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section" aria-label="Course Offerings">
        <div className="container">
          <div className={styles.filterRow}>
            <FilterBar
              label="Format"
              options={FILTER_OPTIONS}
              selected={selectedFilter}
              onSelect={setSelectedFilter}
            />
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid--3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="📚"
              title="No courses in this format"
              description="We currently don't have active courses matching this filter."
              actionLabel="View All Formats"
              onAction={() => setSelectedFilter('All Formats')}
            />
          )}
        </div>
      </section>

      {/* Philosophy of Study */}
      <section className="section section--muted" aria-label="Vedantic Methodology">
        <div className="container container--md">
          <SectionHeader
            tag="Gurukula Tradition"
            title="The Vedantic Method of Study"
            subtitle="How classical texts are unpacked and assimilated through the Guru-Shishya Parampara."
            align="center"
          />

          <div className={styles.methodList}>
            <div className={styles.methodItem}>
              <span className={styles.methodNum}>1</span>
              <div>
                <h4 className={styles.methodTitle}>Prakarana Granths (Introductory Treatises)</h4>
                <p className={styles.methodText}>
                  Texts like <em>Tattva Bodha</em> and <em>Atma-bodha</em> define technical Sanskrit vocabulary and provide the logical framework of self-inquiry before approaching advanced scriptures.
                </p>
              </div>
            </div>

            <div className={styles.methodItem}>
              <span className={styles.methodNum}>2</span>
              <div>
                <h4 className={styles.methodTitle}>Prasthana Traya (The Triple Canon)</h4>
                <p className={styles.methodText}>
                  Advanced students undertake rigorous study of the <em>Bhagavad Gita</em> (Smriti Prasthana), the <em>Principal Upanishads</em> (Sruti Prasthana), and the <em>Brahma Sutras</em> (Nyaya Prasthana).
                </p>
              </div>
            </div>

            <div className={styles.methodItem}>
              <span className={styles.methodNum}>3</span>
              <div>
                <h4 className={styles.methodTitle}>Guidance from Acharyas</h4>
                <p className={styles.methodText}>
                  Vedanta is an oral tradition (Sampradaya). Reading alone cannot resolve subtle paradoxes without systematic exposition from a qualified teacher.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
