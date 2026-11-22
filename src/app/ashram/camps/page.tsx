'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
import { getAssetPath } from '@/utils/assetPath';
import styles from './camps.module.css';

export default function SadhnaCampsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveals(rootRef);

  return (
    <article className={styles.page} ref={rootRef}>
      {/* Breadcrumb Bar */}
      <div className="container">
        <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/ashram">Ashram</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>Sadhna Camps</span>
        </nav>
      </div>

      {/* 01. Hero Section */}
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.overline} data-reveal>Residential Spiritual Retreats</span>
              <h1 className={styles.h1} data-reveal>Vedanta Sadhna Camps</h1>
              <div className={styles.rule} data-rule />
              <p className={styles.lead} data-reveal>
                Intensive 5 to 7 days residential spiritual camps organized at Vedanta Ashram, Indore and designated outstation centers under the direct guidance of traditional Advaita Acharyas.
              </p>
              <div className={styles.heroCtas} data-reveal>
                <a href="#taxonomy" className={styles.btnPrimary}>Explore Retreat Formats &darr;</a>
                <a href="#schedule" className={styles.btnGhost}>Contemplative Daily Rhythm &darr;</a>
              </div>
            </div>

            <div className={styles.heroVisual} data-reveal>
              <figure className={styles.heroFrame}>
                <img
                  src={getAssetPath('/images/vmission/community/residential-camp-gathering.jpg')}
                  alt="Seekers gathered for residential scripture shivir at Vedanta Ashram, Indore"
                />
              </figure>
              <figcaption className={styles.caption}>
                Residential camp sadhakas in the contemplative courtyard of Vedanta Ashram, Indore.
              </figcaption>
            </div>
          </div>
        </div>
      </header>

      {/* 02. Kinds of Learning Activities (Legacy ID 287) */}
      <section id="taxonomy" className={styles.section}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.overline} data-reveal>Vedic Learning Pathways</span>
            <h2 className={styles.h2} data-reveal>Retreat Formats &amp; Activities</h2>
            <p className={styles.lead} data-reveal>
              Rooted in the unbroken Guru-Shishya tradition, Vedanta Mission organizes structured programs catering to seekers across different stages of scriptural inquiry.
            </p>
          </header>

          <div className={styles.cardGrid} data-stagger>
            <div className={styles.card}>
              <div className={styles.cardNum}>01 &middot; PUBLIC EXPOSITION</div>
              <h3 className={styles.cardTitle}>Gita Gyana Yagnas</h3>
              <p className={styles.cardText}>
                5 to 7 days morning and evening public discourse series on foundational Vedantic texts, conducted in cities across India and internationally.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardNum}>02 &middot; RESIDENTIAL RETREAT</div>
              <h3 className={styles.cardTitle}>Vedanta Camps</h3>
              <p className={styles.cardText}>
                5 to 7 days intensive residential camps held at Vedanta Ashram, Indore or quiet outstation centers, focusing on a specific Upanishad, Prakarana Grantha, or Gita chapter.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardNum}>03 &middot; ONGOING SATSANG</div>
              <h3 className={styles.cardTitle}>Study Groups</h3>
              <p className={styles.cardText}>
                Weekly localized study sessions where students listen to recorded audio and video discourses, analyze Sanskrit shlokas, and resolve doubts through peer reflection.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardNum}>04 &middot; PRACTICAL APPLICATION</div>
              <h3 className={styles.cardTitle}>Holistic Living Workshops</h3>
              <p className={styles.cardText}>
                One-day intensive seminars and weekend workshops translating profound Vedantic self-knowledge into emotional poise, stress-free work, and family harmony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Daily Contemplative Camp Routine (Legacy ID 3040) */}
      <section id="schedule" className={styles.scheduleSection}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.overline} data-reveal>Immersion Discipline</span>
            <h2 className={styles.h2} data-reveal>The Contemplative Daily Rhythm</h2>
            <p className={styles.lead} data-reveal>
              A disciplined, uplifting sequence of meditation, chanting, lectures, and reflective silence observed during residential camps.
            </p>
          </header>

          <div className={styles.scheduleList} data-stagger>
            <div className={styles.scheduleRow}>
              <span className={styles.schedulePeriod}>Brahma Muhurta</span>
              <div className={styles.scheduleDetails}>
                <h3>Pratah Smaran, Dhyana &amp; Abhishek</h3>
                <p>Silent morning meditation followed by Vedic Abhishek and prayer at Shiv Mandir.</p>
              </div>
            </div>

            <div className={styles.scheduleRow}>
              <span className={styles.schedulePeriod}>Morning</span>
              <div className={styles.scheduleDetails}>
                <h3>Shloka Chanting &amp; First Discourse Session</h3>
                <p>Systematic Sanskrit recitation of the camp text followed by in-depth philosophical exposition by the Acharya.</p>
              </div>
            </div>

            <div className={styles.scheduleRow}>
              <span className={styles.schedulePeriod}>Midday</span>
              <div className={styles.scheduleDetails}>
                <h3>Sattwic Bhojan &amp; Personal Swadhyaya</h3>
                <p>Wholesome vegetarian meals served with devotion, followed by dedicated rest and quiet self-study.</p>
              </div>
            </div>

            <div className={styles.scheduleRow}>
              <span className={styles.schedulePeriod}>Afternoon</span>
              <div className={styles.scheduleDetails}>
                <h3>Satsanga &amp; Question-Answer Session</h3>
                <p>Interactive spiritual dialogue where camp participants clarify conceptual doubts and discuss practical application.</p>
              </div>
            </div>

            <div className={styles.scheduleRow}>
              <span className={styles.schedulePeriod}>Evening</span>
              <div className={styles.scheduleDetails}>
                <h3>Temple Sandhya Aarti &amp; Second Discourse Session</h3>
                <p>Evening camphor aarti at the sanctum altar followed by concluding discourse and silent contemplation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Camp Acharyas & Registration Guidelines (Legacy ID 3040) */}
      <section id="guidelines" className={styles.section}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.overline} data-reveal>Faculty &amp; Participation</span>
            <h2 className={styles.h2} data-reveal>Camp Acharyas &amp; Guidelines</h2>
            <p className={styles.lead} data-reveal>
              Teaching at Vedanta Mission camps is imparted in the traditional spirit of Jnana Yagna without commercialization or course fees.
            </p>
          </header>

          <div className={styles.acharyasGrid} data-stagger>
            <div className={styles.acharyaCard}>
              <span className={styles.acharyaRole}>Founder &amp; Preceptor</span>
              <h3 className={styles.acharyaName}>Poojya Guruji Swami Atmananda Saraswati</h3>
              <p className={styles.acharyaBio}>
                Direct disciple of Brahmaleen Swami Chinmayanandaji. Renowned exponent of the Prasthanatraya scriptures, conducting intensive residential camps across India and abroad for over three decades.
              </p>
            </div>

            <div className={styles.acharyaCard}>
              <span className={styles.acharyaRole}>Senior Monastic Faculty</span>
              <h3 className={styles.acharyaName}>Poojya Swamini Amitananda Saraswati</h3>
              <p className={styles.acharyaBio}>
                Senior monastic disciple of Swami Atmanandaji. Leads regular classes on Prakarana Granthas, Sanskrit chanting, and guided meditation for residential students and camp participants.
              </p>
            </div>
          </div>

          {/* Registration & Voluntary Contribution Callout */}
          <div className={styles.enquiryBox} data-reveal>
            <div className={styles.enquiryText}>
              <h3>Camp Participation &amp; Registration</h3>
              <p>
                All scriptural lectures and classes are offered freely. Participants collectively share the actual boarding, lodging, and direct food expenses of the retreat through voluntary donation.
              </p>
            </div>
            <div className={styles.enquiryActions}>
              <a
                href="https://wa.me/919826959480"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                WhatsApp Camp Desk &rarr;
              </a>
              <a href="mailto:vmission@gmail.com" className={styles.btnGhost}>
                Email Ashram Office
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
