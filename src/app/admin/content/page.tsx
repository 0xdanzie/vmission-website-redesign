'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import styles from '../events/eventsAdmin.module.css';

export default function AdminContentOverviewPage() {
  const { publications, teachings, events, courses, acharyas } = useData();

  const activeEventsCount = events.filter((e) => !e.isPast).length;
  const latestPubsCount = publications.filter((p) => p.isLatest).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Content Management Index</h1>
          <p className={styles.subtitle}>
            Editorial overview of verified publications, teachings, events, courses, and Acharya lineages.
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-5)',
      }}>
        {/* Publications Card */}
        <div style={{ background: '#FFFFFF', padding: 'var(--space-6)', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.25rem' }}>📰</span>
              <span className={styles.categoryBadge}>MONTHLY ARCHIVE</span>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1A202C' }}>Publications</h3>
            <p style={{ fontSize: '0.8125rem', color: '#718096', marginTop: '4px', lineHeight: 1.4 }}>
              Vedanta Sandesh (English / Hindi) &amp; Vedanta Piyush (Hindi / Gujarati) digital e-journals.
            </p>
            <p style={{ marginTop: '12px', fontSize: '1.25rem', fontWeight: 700, color: '#2D3748' }}>
              {publications.length} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#718096' }}>Total Issues ({latestPubsCount} Current)</span>
            </p>
          </div>
          <Link href="/admin/publications" className={styles.btnAdd} style={{ marginTop: '16px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
            Manage Publications →
          </Link>
        </div>

        {/* Teachings Card */}
        <div style={{ background: '#FFFFFF', padding: 'var(--space-6)', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.25rem' }}>🎙️</span>
              <span className={styles.categoryBadge}>AUDIO &amp; DISCOURSES</span>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1A202C' }}>Teachings &amp; Jnana Ganga</h3>
            <p style={{ fontSize: '0.8125rem', color: '#718096', marginTop: '4px', lineHeight: 1.4 }}>
              Discourses covering the Gita, Principal Upanishads, Prakarana Granthas, and Meditation.
            </p>
            <p style={{ marginTop: '12px', fontSize: '1.25rem', fontWeight: 700, color: '#2D3748' }}>
              {teachings.length} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#718096' }}>Active Discourse Series</span>
            </p>
          </div>
          <Link href="/admin/teachings" className={styles.btnAdd} style={{ marginTop: '16px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
            Manage Teachings →
          </Link>
        </div>

        {/* Events Card */}
        <div style={{ background: '#FFFFFF', padding: 'var(--space-6)', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.25rem' }}>📅</span>
              <span className={styles.categoryBadge}>RETREATS &amp; SATSANGS</span>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1A202C' }}>Events &amp; Gyana Yagnas</h3>
            <p style={{ fontSize: '0.8125rem', color: '#718096', marginTop: '4px', lineHeight: 1.4 }}>
              Residential study camps, Mandir festival commemorations, and regional lecture tours.
            </p>
            <p style={{ marginTop: '12px', fontSize: '1.25rem', fontWeight: 700, color: '#2D3748' }}>
              {events.length} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#718096' }}>Scheduled ({activeEventsCount} Upcoming)</span>
            </p>
          </div>
          <Link href="/admin/events" className={styles.btnAdd} style={{ marginTop: '16px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
            Manage Events →
          </Link>
        </div>

        {/* Courses Card */}
        <div style={{ background: '#FFFFFF', padding: 'var(--space-6)', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.25rem' }}>📚</span>
              <span className={styles.categoryBadge}>SYSTEMATIC GURUKULA</span>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1A202C' }}>Study Courses</h3>
            <p style={{ fontSize: '0.8125rem', color: '#718096', marginTop: '4px', lineHeight: 1.4 }}>
              Structured correspondence lessons, Tattva Bodha curriculum, and Gita study circles.
            </p>
            <p style={{ marginTop: '12px', fontSize: '1.25rem', fontWeight: 700, color: '#2D3748' }}>
              {courses.length} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#718096' }}>Curriculum Offerings</span>
            </p>
          </div>
          <Link href="/admin/courses" className={styles.btnAdd} style={{ marginTop: '16px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
            Manage Courses →
          </Link>
        </div>

        {/* Acharyas Card */}
        <div style={{ background: '#FFFFFF', padding: 'var(--space-6)', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.25rem' }}>🪔</span>
              <span className={styles.categoryBadge}>TEACHER LINEAGE</span>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1A202C' }}>Acharyas</h3>
            <p style={{ fontSize: '0.8125rem', color: '#718096', marginTop: '4px', lineHeight: 1.4 }}>
              Traditional Dashanami Saraswati lineage profiles and milestone chronologies.
            </p>
            <p style={{ marginTop: '12px', fontSize: '1.25rem', fontWeight: 700, color: '#2D3748' }}>
              {acharyas.length} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#718096' }}>Verified Acharyas</span>
            </p>
          </div>
          <Link href="/admin/acharyas" className={styles.btnAdd} style={{ marginTop: '16px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
            View Acharya Profiles →
          </Link>
        </div>
      </div>
    </div>
  );
}
