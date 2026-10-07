'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/SectionHeader';
import CourseCard from '@/components/CourseCard';
import FilterBar from '@/components/FilterBar';
import EmptyState from '@/components/EmptyState';
import { useData } from '@/context/DataContext';
import { getAssetPath } from '@/utils/assetPath';
import motionStyles from '@/styles/motion.module.css';
import styles from './page.module.css';

const FILTER_OPTIONS = ['All Formats', 'Online', 'Residential', 'Study Group'];

const PATHWAY_ORDER = [
  'tattva-bodha',
  'residential-gita',
  'gita-online',
  'sangyan-sanatan-dharma',
];

export default function LearnPage() {
  const [selectedFilter, setSelectedFilter] = useState('All Formats');
  const { courses } = useData();

  const filteredCourses = useMemo(() => {
    const list = courses.filter((c) => {
      if (selectedFilter === 'All Formats') return true;
      return c.format === selectedFilter;
    });

    return [...list].sort((a, b) => {
      const idxA = PATHWAY_ORDER.indexOf(a.slug);
      const idxB = PATHWAY_ORDER.indexOf(b.slug);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
  }, [courses, selectedFilter]);

  return (
    <>
      {/* Scene 1 — Gurukula Threshold Hero: Enter the Gurukula */}
      <section className={styles.hero} aria-label="Learn Vedanta Hero">
        <div className={styles.heroAtmosphere}>
          <Image
            src={getAssetPath('/images/vmission/ashram/teaching-hall-interior.jpg')}
            alt="The consecrated Vyasapeeth and Adi Shankaracharya shrine in the Teaching Hall at Vedanta Ashram, Indore"
            fill
            sizes="100vw"
            className={styles.heroAtmosphereImg}
            priority
          />
          <div className={styles.heroScrim} />
          <div className={styles.heroVignette} />
        </div>

        <div className="container">
          <div className={`${motionStyles.editorialReveal} ${styles.heroInner}`}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadgeRow}>
                <span className={styles.badge}>The Digital Gurukula</span>
                <span className={styles.badgeDivider}>·</span>
                <span className={styles.badgeSub}>Enter · Study · Progress</span>
                <span className={styles.badgeDivider}>·</span>
                <span className={styles.sanctumStamp}>Vedanta Ashram · Indore</span>
              </div>
              
              <h1 className={styles.title}>Systematic Scriptural Study</h1>
              
              <p className={styles.lead}>
                Advaita Vedanta is studied not as an abstract speculation, but as a living
                means of knowledge (Pramana) that directly resolves the human sense of
                limitation. Under the unbroken tradition of the Guru-Shishya Parampara,
                Vedanta Mission offers structured self-paced correspondence study and
                intensive residential programs in Indore.
              </p>

              <div className={styles.heroKeypoints}>
                <div className={styles.keypoint}>
                  <span className={styles.kpNum}>01</span>
                  <div>
                    <h4 className={styles.kpTitle}>Prakarana Granthas</h4>
                    <p className={styles.kpDesc}>Foundational treatises establishing Vedantic vocabulary and self-inquiry.</p>
                  </div>
                </div>
                <div className={styles.kpDivider} />
                <div className={styles.keypoint}>
                  <span className={styles.kpNum}>02</span>
                  <div>
                    <h4 className={styles.kpTitle}>Prasthana Traya</h4>
                    <p className={styles.kpDesc}>The triple canonical texts: Gita, Upanishads &amp; Brahma Sutras.</p>
                  </div>
                </div>
                <div className={styles.kpDivider} />
                <div className={styles.keypoint}>
                  <span className={styles.kpNum}>03</span>
                  <div>
                    <h4 className={styles.kpTitle}>Acharya Guidance</h4>
                    <p className={styles.kpDesc}>Traditional exposition by Poojya Guruji Swami Atmananda Saraswati.</p>
                  </div>
                </div>
              </div>

              <div className={styles.heroCaptionPlate}>
                <span className={styles.heroMediaBadge}>Teaching Hall</span>
                <span className={styles.heroMediaText}>
                  The Vyasapeeth &amp; Shankara Shrine · Teaching Hall, Vedanta Ashram, Indore
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Marker: Transition from Threshold to Study */}
      <div className={styles.chapterTransition} aria-hidden="true">
        <div className={styles.chapterLine} />
        <div className={styles.chapterBadge}>
          <span className={styles.chapterNum}>THRESHOLD 01</span>
          <span className={styles.chapterDot}>◆</span>
          <span className={styles.chapterText}>OPEN ACCESS STUDY DESK</span>
        </div>
        <div className={styles.chapterLine} />
      </div>

      {/* Scene 2 — Featured Study Portal: Tattva Bodha (Available Now) */}
      <section className={styles.featuredSection} aria-label="Featured Study Portal">
        <div className="container">
          <div className={styles.featuredBox}>
            <div className={styles.featuredGrid}>
              {/* Manuscript Cover & Artwork */}
              <div className={styles.manuscriptCol}>
                <div className={styles.bookDeskStand}>
                  <div className={styles.bookFrame}>
                    <Image
                      src={getAssetPath('/images/vmission/publications/study-text-tb-mula.jpg')}
                      alt="Tattva Bodha Mula Study Manuscript Cover"
                      width={280}
                      height={400}
                      className={styles.bookImage}
                      priority
                    />
                    <div className={styles.manuscriptBadge}>
                      <span>Authentic Text · Shankaracharya</span>
                    </div>
                  </div>
                  <div className={styles.manuscriptPlate}>
                    <span className={styles.plateLabel}>Root Manuscript · Sanskrit &amp; English</span>
                    <span className={styles.plateSub}>Complimentary Open Access</span>
                  </div>
                </div>
              </div>

              {/* Text & Action */}
              <div className={styles.featuredContent}>
                <div className={styles.featuredHeaderRow}>
                  <span className={styles.featuredStatusBadge}>
                    Available Now · Open Access Reader
                  </span>
                  <span className={styles.doorwayTag}>
                    Doorway 01 of 04
                  </span>
                  <span className={styles.authorBadge}>Composed by Adi Shankaracharya</span>
                </div>

                <h2 className={styles.featuredTitle}>Tattva Bodha</h2>
                <p className={styles.featuredSubtitle}>
                  An Introduction to Vedanta
                </p>

                <p className={styles.featuredLead}>
                  For centuries, <em>Tattva Bodha</em> has served as the universal textbook
                  for students entering the study of Advaita Vedanta. It unfolds the
                  fourfold qualifications of a seeker (Sadhana Chatushtaya), analyzes the
                  three bodies and five sheaths of individuality, and reveals the essential
                  oneness of the individual (Jiva) and the total (Ishwara) in pure Consciousness (Brahman).
                </p>

                <div className={styles.featureHighlights}>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightCheck}>✓</span>
                    <span><strong>Sanskrit Mula &amp; Translation:</strong> Interactive root verses with English translation and classical commentary.</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightCheck}>✓</span>
                    <span><strong>Immediate Lesson 1 Study:</strong> Freely available to read in your browser without registration prerequisites.</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightCheck}>✓</span>
                    <span><strong>Reflective Inquiry Questionnaire:</strong> End-of-lesson questions with guidance from Vedanta Ashram.</span>
                  </div>
                </div>

                <div className={styles.featuredActionRow}>
                  <Link href="/learn/tattva-bodha" prefetch={true} className={styles.primaryStudyBtn} id="btn-begin-tattva-bodha">
                    Enter Tattva Bodha Interactive Reader →
                  </Link>
                  <Link href="/learn/tattva-bodha" prefetch={true} className={styles.secondaryStudyLink} id="btn-outline-tattva-bodha">
                    Explore Course Curriculum (40 Lessons)
                  </Link>
                  <span className={styles.studyNote}>Voluntary donation to continue after Lesson 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Marker: Four Learning Doors */}
      <div className={styles.chapterTransitionSecond} aria-hidden="true">
        <div className={styles.chapterLine} />
        <div className={styles.chapterBadge}>
          <span className={styles.chapterNum}>CURRICULUM</span>
          <span className={styles.chapterDot}>◆</span>
          <span className={styles.chapterText}>FOUR LEARNING DOORS</span>
        </div>
        <div className={styles.chapterLine} />
      </div>

      {/* Scene 3 — Four Learning Pathways as Architectural Doors */}
      <section className="section" aria-label="Four Learning Doors" id="programs">
        <div className="container">
          <div className={styles.catalogHeaderWrap}>
            <SectionHeader
              tag="Four Learning Doors"
              title="The Pathways of Study"
              subtitle="Four distinct doorways into scriptural inquiry, each representing a unique depth, medium, and commitment of study."
            />
          </div>

          <div className={styles.filterRow}>
            <FilterBar
              label="Format"
              options={FILTER_OPTIONS}
              selected={selectedFilter}
              onSelect={setSelectedFilter}
            />
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid--2">
              {filteredCourses.map((course) => {
                const pathwayIndex = PATHWAY_ORDER.indexOf(course.slug);
                const doorNum = pathwayIndex !== -1 ? String(pathwayIndex + 1).padStart(2, '0') : undefined;
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    doorNumber={doorNum}
                  />
                );
              })}
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

      {/* Scene 4 — The Vedantic Method of Study */}
      <section className={`section ${styles.methodologySection}`} aria-label="Vedantic Methodology">
        <div className="container container--md">
          <SectionHeader
            tag="Gurukula Tradition"
            title="The Vedantic Method of Study"
            subtitle="How classical scriptures are systematically unpacked and assimilated through the Guru-Shishya Parampara."
            align="center"
          />

          <div className={styles.methodList}>
            <div className={styles.methodItem}>
              <span className={styles.methodNum}>01</span>
              <div>
                <h3 className={styles.methodTitle}>Prakarana Granthas (Introductory Treatises)</h3>
                <p className={styles.methodText}>
                  Texts like <em>Tattva Bodha</em> and <em>Atma-bodha</em> define technical
                  Sanskrit vocabulary and establish the logical framework of self-inquiry
                  before approaching advanced canonical scriptures.
                </p>
              </div>
            </div>

            <div className={styles.methodItem}>
              <span className={styles.methodNum}>02</span>
              <div>
                <h3 className={styles.methodTitle}>Prasthana Traya (The Triple Canon)</h3>
                <p className={styles.methodText}>
                  Advanced students undertake rigorous inquiry into the <em>Bhagavad Gita</em>{' '}
                  (Smriti Prasthana), the <em>Principal Upanishads</em> (Sruti Prasthana),
                  and the <em>Brahma Sutras</em> (Nyaya Prasthana).
                </p>
              </div>
            </div>

            <div className={styles.methodItem}>
              <span className={styles.methodNum}>03</span>
              <div>
                <h3 className={styles.methodTitle}>Guidance from Acharyas</h3>
                <p className={styles.methodText}>
                  Vedanta is an oral tradition (Sampradaya). Reading alone cannot resolve
                  subtle paradoxes without systematic exposition and personal clarification
                  from a qualified traditional teacher.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
