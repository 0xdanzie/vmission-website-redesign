'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import TeachingCard from '@/components/TeachingCard';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import EmptyState from '@/components/EmptyState';
import { useData } from '@/context/DataContext';
import { teachingTopics, teachingFormats, teachingTeachers } from '@/data/teachings';
import styles from './page.module.css';

export default function TeachingsPage() {
  const { teachings } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedFormat, setSelectedFormat] = useState<string>('All Formats');
  const [selectedTeacher, setSelectedTeacher] = useState('All Teachers');

  const formatOptions = ['All Formats', ...teachingFormats];

  const filteredTeachings = teachings.filter((t) => {
    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchScripture = t.scripture.toLowerCase().includes(q);
      const matchTeacher = t.teacher.toLowerCase().includes(q);
      const matchDesc = t.description.toLowerCase().includes(q);
      if (!matchTitle && !matchScripture && !matchTeacher && !matchDesc) return false;
    }

    // Topic match
    if (selectedTopic !== 'All Topics' && t.topic !== selectedTopic) {
      return false;
    }

    // Format match
    if (selectedFormat !== 'All Formats' && t.format !== selectedFormat) {
      return false;
    }

    // Teacher match
    if (selectedTeacher !== 'All Teachers' && t.teacher !== selectedTeacher) {
      return false;
    }

    return true;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTopic('All Topics');
    setSelectedFormat('All Formats');
    setSelectedTeacher('All Teachers');
  };

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label="Teachings Library Hero">
        <div className="container">
          <div className="animate-fadeUp" style={{ maxWidth: '720px' }}>
            <span className={styles.badge}>Jnana Ganga · Knowledge Archive</span>
            <h1 className={styles.title}>Teachings &amp; Audio Library</h1>
            <p className={styles.lead}>
              Explore our comprehensive collection of discourses, classes, and scriptural commentaries on the Upanishads, Bhagavad Gita, and Prakarana Granths by Swami Atmananda Saraswati and the Acharyas.
            </p>
          </div>
        </div>
      </section>

      {/* Library Controls & Grid */}
      <section className="section" aria-label="Search & Teachings Catalog">
        <div className="container">
          {/* Search & Stats */}
          <div className={styles.searchRow}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by text, scripture, or topic..."
              onClear={() => setSearchQuery('')}
            />
            <span className={styles.countText}>
              Showing <strong>{filteredTeachings.length}</strong> of {teachings.length} resources
            </span>
          </div>

          {/* Filter Bars */}
          <div className={styles.filtersGroup}>
            <FilterBar
              label="Topic"
              options={teachingTopics}
              selected={selectedTopic}
              onSelect={setSelectedTopic}
            />

            <FilterBar
              label="Format"
              options={formatOptions}
              selected={selectedFormat}
              onSelect={setSelectedFormat}
            />

            <FilterBar
              label="Teacher"
              options={teachingTeachers}
              selected={selectedTeacher}
              onSelect={setSelectedTeacher}
            />
          </div>

          {/* Grid */}
          {filteredTeachings.length > 0 ? (
            <div className="grid grid--3">
              {filteredTeachings.map((teaching) => (
                <TeachingCard key={teaching.id} teaching={teaching} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🔍"
              title="No Teachings Match Your Criteria"
              description="Try adjusting your search keywords or resetting your active topic and format filters."
              actionLabel="Reset All Filters"
              onAction={handleResetFilters}
            />
          )}
        </div>
      </section>
    </>
  );
}
