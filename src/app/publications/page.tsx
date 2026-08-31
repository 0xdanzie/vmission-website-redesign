'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import PublicationCard from '@/components/PublicationCard';
import PublicationModal from '@/components/PublicationModal';
import FilterBar from '@/components/FilterBar';
import EmptyState from '@/components/EmptyState';
import { useData } from '@/context/DataContext';
import { Publication, availableYears } from '@/data/publications';
import styles from './page.module.css';

const TYPE_FILTERS = ['All Publications', 'Vedanta Sandesh', 'Vedanta Piyush'];
const YEAR_FILTERS = ['All Years', ...availableYears.map(String)];

export default function PublicationsPage() {
  const { publications } = useData();
  const [selectedType, setSelectedType] = useState('All Publications');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [activeModalPub, setActiveModalPub] = useState<Publication | null>(null);

  const filteredPubs = publications.filter((p) => {
    if (selectedType !== 'All Publications' && p.type !== selectedType) {
      return false;
    }
    if (selectedYear !== 'All Years' && p.year !== parseInt(selectedYear, 10)) {
      return false;
    }
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label="Publications Hero">
        <div className="container">
          <div className="animate-fadeUp" style={{ maxWidth: '720px' }}>
            <span className={styles.badge}>Monthly Digital Ezines</span>
            <h1 className={styles.title}>Publications &amp; E-Magazines</h1>
            <p className={styles.lead}>
              Read and download <em>Vedanta Sandesh</em> and <em>Vedanta Piyush</em> — monthly journals published continuously for over two decades, sharing profound commentaries on Vedanta, Sanskrit verses, and Ashram updates.
            </p>
          </div>
        </div>
      </section>

      {/* Publications Grid & Filters */}
      <section className="section" aria-label="Magazines Library">
        <div className="container">
          {/* Filters */}
          <div className={styles.filtersGroup}>
            <FilterBar
              label="Publication"
              options={TYPE_FILTERS}
              selected={selectedType}
              onSelect={setSelectedType}
            />

            <FilterBar
              label="Archive Year"
              options={YEAR_FILTERS}
              selected={selectedYear}
              onSelect={setSelectedYear}
            />
          </div>

          {/* Grid */}
          {filteredPubs.length > 0 ? (
            <div className="grid grid--3">
              {filteredPubs.map((pub) => (
                <PublicationCard
                  key={pub.id}
                  publication={pub}
                  onReadOnline={(p) => setActiveModalPub(p)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="📰"
              title="No Publications Found for this Filter"
              description="Please select a different publication title or archive year."
              actionLabel="View All Issues"
              onAction={() => {
                setSelectedType('All Publications');
                setSelectedYear('All Years');
              }}
            />
          )}
        </div>
      </section>

      {/* Free Subscription Box */}
      <section className="section section--muted" aria-label="Free Subscription">
        <div className="container container--md">
          <div className={styles.subCard}>
            <span className={styles.subOm}>📬</span>
            <h3 className={styles.subTitle}>Receive Monthly Issues in Your Inbox</h3>
            <p className={styles.subDesc}>
              Vedanta Sandesh and Vedanta Piyush are distributed freely to spiritual seekers around the world at the start of every month.
            </p>
            <div className={styles.subNote}>
              <p>
                To subscribe for free, please send an email to <strong>vmission@gmail.com</strong> or message us on WhatsApp with the subject &ldquo;Subscribe to Vedanta Sandesh&rdquo;.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* In-App Reader Modal */}
      <PublicationModal
        publication={activeModalPub}
        onClose={() => setActiveModalPub(null)}
      />
    </>
  );
}
