'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import EventCard from '@/components/EventCard';
import FilterBar from '@/components/FilterBar';
import EmptyState from '@/components/EmptyState';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

const TAB_OPTIONS = ['Upcoming Events', 'Annual Calendar', 'Past Events'];

export default function EventsPage() {
  const [selectedTab, setSelectedTab] = useState('Upcoming Events');
  const { events } = useData();

  const upcoming = events.filter((e) => !e.isPast);
  const past = events.filter((e) => e.isPast);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label="Events Hero">
        <div className="container">
          <div className="animate-fadeUp" style={{ maxWidth: '720px' }}>
            <span className={styles.badge}>Satsangs, Camps &amp; Festivals</span>
            <h1 className={styles.title}>Spiritual Events &amp; Programs</h1>
            <p className={styles.lead}>
              Join Poojya Guruji Swami Atmananda Saraswati and the Acharyas for residential Vedanta camps, Gyana Yagnas, festive celebrations, and public spiritual discourses.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs & Content */}
      <section className="section" aria-label="Events List">
        <div className="container">
          <div className={styles.tabsRow}>
            <FilterBar
              options={TAB_OPTIONS}
              selected={selectedTab}
              onSelect={setSelectedTab}
            />
          </div>

          {selectedTab === 'Upcoming Events' && (
            <div>
              <div className="grid grid--2">
                {upcoming.map((evt) => (
                  <EventCard key={evt.id} event={evt} />
                ))}
              </div>
              {upcoming.length === 0 && (
                <EmptyState
                  icon="📅"
                  title="No Upcoming Events Scheduled"
                  description="Please check back soon or explore our online courses and audio library."
                />
              )}
            </div>
          )}

          {selectedTab === 'Annual Calendar' && (
            <div className={styles.calendarWrapper}>
              <SectionHeader
                tag="Yearly Spiritual Rhythm"
                title="Major Annual Observances at Vedanta Ashram"
                subtitle="Traditional Hindu festivals and spiritual observances celebrated at the Ashram each year."
              />

              <div className={styles.calendarList}>
                <div className={styles.calItem}>
                  <div className={styles.calDate}>July (Ashadha Poornima)</div>
                  <div className={styles.calContent}>
                    <h4>Guru Poornima Celebrations</h4>
                    <p>Puja at Gangeshwar Mahadev Temple, public discourse by Poojya Guruji, Pada Puja, and collective prasadam distribution.</p>
                  </div>
                </div>

                <div className={styles.calItem}>
                  <div className={styles.calDate}>August / September</div>
                  <div className={styles.calContent}>
                    <h4>Residential Meditation &amp; Silence Retreat</h4>
                    <p>4-day residential camp focusing on meditation techniques, self-inquiry, and internal stillness.</p>
                  </div>
                </div>

                <div className={styles.calItem}>
                  <div className={styles.calDate}>February / March (Maha Shivaratri)</div>
                  <div className={styles.calContent}>
                    <h4>Maha Shivaratri Celebrations</h4>
                    <p>All-night vigil, 4 prahar Rudrabhishekam, Shiva stotram chanting, and continuous satsang at Gangeshwar Mahadev Mandir.</p>
                  </div>
                </div>

                <div className={styles.calItem}>
                  <div className={styles.calDate}>December (Gita Jayanti)</div>
                  <div className={styles.calContent}>
                    <h4>Gita Jayanti &amp; Gyana Yagna</h4>
                    <p>Chanting of all 18 chapters of Bhagavad Gita and evening discourses on Gita teachings.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'Past Events' && (
            <div>
              <p className={styles.pastNote}>
                Archive of earlier Gyana Yagnas, camps, and celebrations conducted by Vedanta Mission across India.
              </p>
              <div className="grid grid--2">
                {past.map((evt) => (
                  <EventCard key={evt.id} event={evt} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
