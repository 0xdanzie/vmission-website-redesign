'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import {
  PublicationsIcon,
  TeachingsIcon,
  EventsIcon,
  CoursesIcon,
  AcharyasIcon,
  ArrowRightIcon,
} from '@/components/admin/AdminIcons';
import styles from '../events/eventsAdmin.module.css';

export default function AdminContentOverviewPage() {
  const { publications, teachings, events, courses, acharyas } = useData();

  const activeEventsCount = events.filter((e) => !e.isPast).length;
  const latestPubsCount = publications.filter((p) => p.isLatest).length;

  const contentModules = [
    {
      title: 'Publications & Ezines',
      category: 'Monthly Archive',
      icon: PublicationsIcon,
      desc: 'Vedanta Sandesh (English / Hindi) & Vedanta Piyush (Hindi / Gujarati) digital e-journals.',
      stat: `${publications.length} Issues`,
      statSub: `${latestPubsCount} Current Editions`,
      href: '/admin/publications',
      action: 'Manage Publications',
    },
    {
      title: 'Teachings & Discourses',
      category: 'Jnana Ganga Audio',
      icon: TeachingsIcon,
      desc: 'Discourses covering Bhagavad Gita, Principal Upanishads, Prakarana Granthas, and Meditation.',
      stat: `${teachings.length} Discourses`,
      statSub: 'Scriptural Series & Audio',
      href: '/admin/teachings',
      action: 'Manage Teachings',
    },
    {
      title: 'Events & Study Camps',
      category: 'Retreats & Satsangs',
      icon: EventsIcon,
      desc: 'Residential study camps, Mandir festival commemorations, and regional lecture tours.',
      stat: `${events.length} Scheduled`,
      statSub: `${activeEventsCount} Upcoming Camps`,
      href: '/admin/events',
      action: 'Manage Events',
    },
    {
      title: 'Gurukula Courses',
      category: 'Systematic Study',
      icon: CoursesIcon,
      desc: 'Structured correspondence lessons, Tattva Bodha curriculum, and Gita study circles.',
      stat: `${courses.length} Courses`,
      statSub: 'Correspondence & Online',
      href: '/admin/courses',
      action: 'Manage Courses',
    },
    {
      title: 'Acharyas & Lineage',
      category: 'Teacher Lineage',
      icon: AcharyasIcon,
      desc: 'Traditional Dashanami Saraswati lineage profiles and milestone chronologies.',
      stat: `${acharyas.length} Acharyas`,
      statSub: 'Biographies & Lineage',
      href: '/admin/acharyas',
      action: 'View Acharya Profiles',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Content Management Library</h1>
          <p className={styles.subtitle}>
            Editorial overview of verified publications, audio teachings, ashram retreat schedules, and academic courses.
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--space-5, 20px)',
      }}>
        {contentModules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.title}
              style={{
                background: '#FFFFFF',
                padding: '24px',
                borderRadius: '10px',
                border: '1px solid var(--vm-sand-border, #DFD7C7)',
                boxShadow: '0 1px 3px rgba(34, 29, 26, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all var(--vm-ease-fast, 150ms ease)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--vm-sand, #FAF6EE)',
                    color: 'var(--vm-bhagwa, #E06328)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon size={19} />
                  </div>
                  <span className={styles.categoryBadge}>{mod.category}</span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif, "Cormorant Garamond", serif)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--vm-text, #221D1A)',
                }}>
                  {mod.title}
                </h3>
                <p style={{
                  fontSize: '0.8125rem',
                  color: 'var(--vm-text-muted, #665D55)',
                  marginTop: '6px',
                  lineHeight: 1.45,
                }}>
                  {mod.desc}
                </p>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{
                    fontFamily: 'var(--font-serif, "Cormorant Garamond", serif)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--vm-text, #221D1A)',
                  }}>
                    {mod.stat}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--vm-text-faint, #8E847A)' }}>
                    ({mod.statSub})
                  </span>
                </div>
              </div>

              <Link
                href={mod.href}
                className={styles.btnAdd}
                style={{
                  marginTop: '20px',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{mod.action}</span>
                <ArrowRightIcon size={13} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
