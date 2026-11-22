'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
import { getAssetPath } from '@/utils/assetPath';
import styles from './gita-course.module.css';

export default function GitaCoursePage() {
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
          <span className={styles.breadcrumbCurrent}>Bhagwad Gita Study Course</span>
        </nav>
      </div>

      {/* 01. Hero Section */}
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.overline} data-reveal>Residential Gurukula Immersion</span>
              <h1 className={styles.h1} data-reveal>Bhagwad Gita Study Course</h1>
              <div className={styles.rule} data-rule />
              <p className={styles.lead} data-reveal>
                A comprehensive one-year full-time residential study course covering all 18 chapters of the Bhagavad Gita at Vedanta Ashram, Indore under the direct tutelage of Poojya Guruji Swami Atmananda Saraswatiji.
              </p>
              <div className={styles.heroCtas} data-reveal>
                <a href="#syllabus" className={styles.btnPrimary}>Course Curriculum &darr;</a>
                <a href="#admissions" className={styles.btnGhost}>Admission Guidelines &darr;</a>
              </div>
            </div>

            <div className={styles.heroVisual} data-reveal>
              <figure className={styles.heroFrame}>
                <img
                  src={getAssetPath('/images/vmission/ashram/teaching-hall-interior.jpg')}
                  alt="Pravachan Bhavan — dedicated hall for daily scriptural discourses and satsang"
                />
              </figure>
              <figcaption className={styles.caption}>
                Pravachan Bhavan at Vedanta Ashram, Indore — dedicated lecture hall for daily Gita exposition.
              </figcaption>
            </div>
          </div>
        </div>
      </header>

      {/* 02. Course Syllabus Pillars (Legacy ID 11020) */}
      <section id="syllabus" className={styles.section}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.overline} data-reveal>Academic &amp; Spiritual Curriculum</span>
            <h2 className={styles.h2} data-reveal>Core Subjects of Study</h2>
            <p className={styles.lead} data-reveal>
              The course provides a thorough intellectual and contemplative grounding in the quintessence of the Vedic scriptures.
            </p>
          </header>

          <div className={styles.curriculumGrid} data-stagger>
            <div className={styles.curriculumCard}>
              <div className={styles.curriculumNum}>01 &middot; SCRIPTURAL STUDY</div>
              <h3 className={styles.curriculumTitle}>All 18 Chapters of Bhagwad Gita</h3>
              <p className={styles.curriculumText}>
                Verse-by-verse analytical study of the entire Gita, integrating Sri Adi Shankaracharya&apos;s classical Bhashya to illuminate Karma, Bhakti, and non-dual Jnana.
              </p>
            </div>

            <div className={styles.curriculumCard}>
              <div className={styles.curriculumNum}>02 &middot; SANSKRIT FOUNDATION</div>
              <h3 className={styles.curriculumTitle}>Basic Sanskrit Language</h3>
              <p className={styles.curriculumText}>
                Systematic foundations of Sanskrit grammar, Sandhi rules, Samasa, and Vibhakti noun cases, enabling students to decode original scriptures independently.
              </p>
            </div>

            <div className={styles.curriculumCard}>
              <div className={styles.curriculumNum}>03 &middot; TRADITIONAL PHONETICS</div>
              <h3 className={styles.curriculumTitle}>Gita Shloka Chanting</h3>
              <p className={styles.curriculumText}>
                Mastery of classical Vedic meters (Anushtup and Trishtup), precise Sanskrit pronunciation, and memorization of key canonical chapters.
              </p>
            </div>

            <div className={styles.curriculumCard}>
              <div className={styles.curriculumNum}>04 &middot; DEVOTIONAL DISCIPLINE</div>
              <h3 className={styles.curriculumTitle}>Hindu Rituals, Upasana &amp; Customs</h3>
              <p className={styles.curriculumText}>
                Daily participation in temple worship, Vedic Abhishek, camphor Aarti, and an appreciation of the rationale underlying Sanatan Dharma customs.
              </p>
            </div>

            <div className={styles.curriculumCard}>
              <div className={styles.curriculumNum}>05 &middot; CONTEMPLATION</div>
              <h3 className={styles.curriculumTitle}>Meditation &amp; Nididhyasana</h3>
              <p className={styles.curriculumText}>
                Daily structured practice of Japa, concentration, and contemplative self-inquiry (Atma-Vichara) in the serene environment of the Gurukula.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Admissions Guidelines & Gurukula Discipline (Legacy ID 11020) */}
      <section id="admissions" className={styles.disciplineSection}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.overline} data-reveal>Admissions Framework</span>
            <h2 className={styles.h2} data-reveal>Eligibility &amp; Gurukula Living</h2>
            <p className={styles.lead} data-reveal>
              Authentic guidelines prescribed for seekers joining the one-year residential immersion at Vedanta Ashram, Indore.
            </p>
          </header>

          <div className={styles.guidelinesList} data-stagger>
            <div className={styles.guidelineCard}>
              <h3>Who Can Apply</h3>
              <p>
                Open to any devoted, religious Sanatani seeker (men or women, couples welcome). Candidates should be sincere students seeking genuine scriptural understanding.
              </p>
            </div>

            <div className={styles.guidelineCard}>
              <h3>Full Commitment</h3>
              <p>
                Students must commit to staying for the entire duration of the course. Occasional leave is granted only for unforeseen personal emergencies.
              </p>
            </div>

            <div className={styles.guidelineCard}>
              <h3>Health &amp; Self-Sufficiency</h3>
              <p>
                Applicants must be physically and mentally healthy, self-supporting, and covered by basic medical insurance for the course period.
              </p>
            </div>

            <div className={styles.guidelineCard}>
              <h3>Dress Code &amp; Lifestyle</h3>
              <p>
                Plain white Indian dress (dhoti/kurta for men, saree for women). A simple sattwic vegetarian diet is provided, and strict punctuality for all classes is observed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Faculty & Prospectus Enquiries */}
      <section id="faculty" className={styles.section}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.overline} data-reveal>Teaching Tradition</span>
            <h2 className={styles.h2} data-reveal>Faculty &amp; Admissions Inquiry</h2>
            <p className={styles.lead} data-reveal>
              Conducted under the direct guidance of Poojya Guruji Swami Atmananda Saraswatiji with resident monastics of the Saraswati order.
            </p>
          </header>

          <div className={styles.enquiryBox} data-reveal>
            <div className={styles.enquiryText}>
              <h3>Course Prospectus &amp; Intakes</h3>
              <p>
                Residential batches are announced periodically by the Vedanta Parmarthik Sewa Trust. For prospectus details or admissions inquiries, contact the Ashram office.
              </p>
            </div>
            <div className={styles.enquiryActions}>
              <a
                href="https://wa.me/919826959480"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                WhatsApp Ashram Office &rarr;
              </a>
              <a href="mailto:vmission@gmail.com" className={styles.btnGhost}>
                Email vmission@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
