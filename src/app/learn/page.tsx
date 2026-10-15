'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import Magnetic from '@/components/motion/Magnetic';
import TiltCard from '@/components/motion/TiltCard';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
import CourseCard from '@/components/CourseCard';
import FilterBar from '@/components/FilterBar';
import EmptyState from '@/components/EmptyState';
import { useData } from '@/context/DataContext';
import { getAssetPath } from '@/utils/assetPath';
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
  const rootRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  useScrollReveals(rootRef);
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .fromTo('[data-lrn-mask]', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.5 }, 0)
        .fromTo(heroImgRef.current, { scale: 1.18 }, { scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
        .fromTo('[data-lrn-line]', { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.45)
        .fromTo('[data-lrn-fade]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.9);

      gsap.to(heroImgRef.current, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: '[data-lrn-hero]', start: 'top top', end: 'bottom top', scrub: true },
      });

      // Methodology: the progress rail fills as the steps are read
      gsap.fromTo(
        '[data-method-fill]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-method-list]', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
        }
      );

      gsap.utils.toArray<HTMLElement>('[data-method-step]').forEach((step) => {
        gsap.fromTo(
          step.querySelector('[data-method-num]'),
          { color: 'rgba(11,11,11,0.1)' },
          {
            color: '#e06328',
            scrollTrigger: { trigger: step, start: 'top 70%', end: 'top 40%', scrub: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.learn} ref={rootRef}>
      {/* 01. Hero */}
      <section className={styles.hero} data-lrn-hero aria-labelledby="learn-hero-title">
        <div className={styles.heroMedia} data-lrn-mask>
          <img
            ref={heroImgRef}
            src={getAssetPath('/images/vmission/ashram/teaching-hall-interior.jpg')}
            alt="The consecrated Vyasapeeth and Adi Shankaracharya shrine in the Teaching Hall at Vedanta Ashram, Indore"
            className={styles.heroImg}
          />
          <div className={styles.heroShade} />
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            <h1 id="learn-hero-title" className={styles.heroTitle}>
              <span className={styles.lineMask}><span className={styles.lineInner} data-lrn-line>Systematic</span></span>
              <span className={styles.lineMask}><span className={`${styles.lineInner} ${styles.heroItalic}`} data-lrn-line>Scriptural Study</span></span>
            </h1>

            <p className={styles.heroLead} data-lrn-fade>
              Advaita Vedanta is studied not as an abstract speculation, but as a living
              means of knowledge (Pramana) that directly resolves the human sense of
              limitation. Under the unbroken tradition of the Guru-Shishya Parampara,
              Vedanta Mission offers structured self-paced correspondence study and
              intensive residential programs in Indore.
            </p>

            <div className={styles.keypoints} data-stagger>
              <div className={styles.keypoint}>
                <span className={styles.kpNum}>01</span>
                <h4 className={styles.kpTitle}>Prakarana Granthas</h4>
                <p className={styles.kpDesc}>Foundational treatises establishing Vedantic vocabulary and self-inquiry.</p>
              </div>
              <div className={styles.keypoint}>
                <span className={styles.kpNum}>02</span>
                <h4 className={styles.kpTitle}>Prasthana Traya</h4>
                <p className={styles.kpDesc}>The triple canonical texts: Gita, Upanishads &amp; Brahma Sutras.</p>
              </div>
              <div className={styles.keypoint}>
                <span className={styles.kpNum}>03</span>
                <h4 className={styles.kpTitle}>Acharya Guidance</h4>
                <p className={styles.kpDesc}>Traditional exposition by Poojya Guruji Swami Atmananda Saraswati.</p>
              </div>
            </div>

            <p className={styles.heroCaption} data-lrn-fade>
              <span className={styles.captionTag}>Teaching Hall</span>
              The Vyasapeeth &amp; Shankara Shrine · Teaching Hall, Vedanta Ashram, Indore
            </p>
          </div>
        </div>
      </section>

      {/* 02. Featured study desk: Tattva Bodha */}
      <section className={styles.featured} aria-labelledby="featured-title">
        <div className="container">
          <div className={styles.featuredGrid}>
            <div className={styles.deskCol} data-reveal>
              <div className={styles.desk}>
                <div className={styles.bookFrame}>
                  <Image
                    src={getAssetPath('/images/vmission/publications/study-text-tb-mula.jpg')}
                    alt="Tattva Bodha Mula Study Manuscript Cover"
                    width={280}
                    height={400}
                    className={styles.bookImage}
                    priority
                  />
                  <span className={styles.manuscriptBadge}>Authentic Text · Shankaracharya</span>
                </div>
                <div className={styles.deskPlate}>
                  <span className={styles.plateLabel}>Root Manuscript · Sanskrit &amp; English</span>
                  <span className={styles.plateSub}>Complimentary Open Access</span>
                </div>
              </div>
            </div>

            <div className={styles.featuredContent}>
              <div className={styles.featuredTags} data-reveal>
                <span className={styles.statusPill}>Available Now · Open Access Reader</span>
                <span className={styles.outlinePill}>Doorway 01 of 04</span>
                <span className={styles.outlinePill}>Composed by Adi Shankaracharya</span>
              </div>

              <h2 id="featured-title" className={styles.h2} data-reveal>Tattva Bodha</h2>
              <p className={styles.subtitle} data-reveal>An Introduction to Vedanta</p>

              <div className={styles.rule} data-rule />

              <p className={styles.featuredLead} data-reveal>
                For centuries, <em>Tattva Bodha</em> has served as the universal textbook
                for students entering the study of Advaita Vedanta. It unfolds the
                fourfold qualifications of a seeker (Sadhana Chatushtaya), analyzes the
                three bodies and five sheaths of individuality, and reveals the essential
                oneness of the individual (Jiva) and the total (Ishwara) in pure Consciousness (Brahman).
              </p>

              <ul className={styles.highlights} data-stagger>
                <li className={styles.highlight}>
                  <span className={styles.check} aria-hidden="true">✓</span>
                  <span><strong>Sanskrit Mula &amp; Translation:</strong> Interactive root verses with English translation and classical commentary.</span>
                </li>
                <li className={styles.highlight}>
                  <span className={styles.check} aria-hidden="true">✓</span>
                  <span><strong>Immediate Lesson 1 Study:</strong> Freely available to read in your browser without registration prerequisites.</span>
                </li>
                <li className={styles.highlight}>
                  <span className={styles.check} aria-hidden="true">✓</span>
                  <span><strong>Reflective Inquiry Questionnaire:</strong> End-of-lesson questions with guidance from Vedanta Ashram.</span>
                </li>
              </ul>

              <div className={styles.actions} data-reveal>
                <Magnetic strength={0.22}>
                  <Link href="/learn/tattva-bodha" prefetch={true} className={styles.primaryBtn} id="btn-begin-tattva-bodha">
                    Enter Tattva Bodha Interactive Reader →
                  </Link>
                </Magnetic>
                <Link href="/learn/tattva-bodha" prefetch={true} className={styles.secondaryLink} id="btn-outline-tattva-bodha">
                  Explore Course Curriculum (40 Lessons)
                </Link>
              </div>
              <p className={styles.studyNote} data-reveal>Voluntary donation to continue after Lesson 1</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Four learning doors */}
      <section className={styles.doors} id="programs" aria-labelledby="doors-title">
        <div className="container">
          <div className={styles.intro} data-reveal>
            <span className={styles.overline}>Four Learning Doors</span>
            <h2 id="doors-title" className={styles.h2}>The Pathways of Study</h2>
            <div className={styles.rule} data-rule />
            <p className={styles.lead}>
              Four distinct doorways into scriptural inquiry, each representing a unique depth, medium, and commitment of study.
            </p>
          </div>

          <div className={styles.filterRow} data-reveal>
            <FilterBar
              label="Format"
              options={FILTER_OPTIONS}
              selected={selectedFilter}
              onSelect={setSelectedFilter}
            />
          </div>

          {filteredCourses.length > 0 ? (
            <div className={styles.doorGrid} data-stagger>
              {filteredCourses.map((course) => {
                const pathwayIndex = PATHWAY_ORDER.indexOf(course.slug);
                const doorNum = pathwayIndex !== -1 ? String(pathwayIndex + 1).padStart(2, '0') : undefined;
                return (
                  <TiltCard key={course.id} max={4}>
                    <CourseCard course={course} doorNumber={doorNum} />
                  </TiltCard>
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

      {/* 04. Method */}
      <section className={styles.method} aria-labelledby="method-title">
        <div className="container">
          <div className={styles.methodGrid}>
            <div className={styles.methodIntro} data-reveal>
              <span className={styles.overlineLight}>Gurukula Tradition</span>
              <h2 id="method-title" className={styles.h2Light}>The Vedantic Method of Study</h2>
              <p className={styles.leadLight}>
                How classical scriptures are systematically unpacked and assimilated through the Guru-Shishya Parampara.
              </p>
            </div>

            <div className={styles.methodList} data-method-list>
              <span className={styles.methodRail} aria-hidden="true">
                <span className={styles.methodFill} data-method-fill />
              </span>

              <div className={styles.methodItem} data-method-step>
                <span className={styles.methodNum} data-method-num>01</span>
                <h3 className={styles.methodTitle}>Prakarana Granthas (Introductory Treatises)</h3>
                <p className={styles.methodText}>
                  Texts like <em>Tattva Bodha</em> and <em>Atma-bodha</em> define technical
                  Sanskrit vocabulary and establish the logical framework of self-inquiry
                  before approaching advanced canonical scriptures.
                </p>
              </div>

              <div className={styles.methodItem} data-method-step>
                <span className={styles.methodNum} data-method-num>02</span>
                <h3 className={styles.methodTitle}>Prasthana Traya (The Triple Canon)</h3>
                <p className={styles.methodText}>
                  Advanced students undertake rigorous inquiry into the <em>Bhagavad Gita</em>{' '}
                  (Smriti Prasthana), the <em>Principal Upanishads</em> (Sruti Prasthana),
                  and the <em>Brahma Sutras</em> (Nyaya Prasthana).
                </p>
              </div>

              <div className={styles.methodItem} data-method-step>
                <span className={styles.methodNum} data-method-num>03</span>
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
    </div>
  );
}
