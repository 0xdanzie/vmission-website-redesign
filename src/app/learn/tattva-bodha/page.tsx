'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import CourseApplicationModal from '@/components/CourseApplicationModal';
import { getCourseBySlug } from '@/data/courses';
import styles from './page.module.css';

export default function TattvaBodhaDetailPage() {
  const course = getCourseBySlug('tattva-bodha');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!course) return <div>Course not found</div>;

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label="Course Hero">
        <div className="container">
          <div className="animate-fadeUp" style={{ maxWidth: '780px' }}>
            <div className={styles.breadcrumb}>
              <Link href="/learn">← Back to All Courses</Link>
            </div>
            <div className={styles.badgeRow}>
              <Badge variant="online" label="Online Course" />
              <span className={styles.feeBadge}>Free Initial Access</span>
            </div>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.subtitle}>{course.subtitle}</p>
            <p className={styles.lead}>{course.description}</p>
            <div className={styles.heroBtns}>
              <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
                Apply / Submit Lesson 1 Answers →
              </Button>
              <a href="#lesson-1-preview" className={styles.anchorLink}>
                Read Lesson 1 Below ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Structure */}
      <section className="section" aria-label="Course Overview">
        <div className="container">
          <div className={styles.twoCol}>
            <div>
              <SectionHeader
                tag="Course Curriculum"
                title="What You Will Learn in Tattva Bodha"
              />
              <ul className={styles.learnList}>
                {course.whatYouLearn.map((item, idx) => (
                  <li key={idx}>
                    <span>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.metaCard}>
              <h3 className={styles.metaCardTitle}>Course Information</h3>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Faculty</span>
                <span className={styles.metaVal}>{course.teacher}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Format</span>
                <span className={styles.metaVal}>{course.format} (Self-paced correspondence)</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Duration</span>
                <span className={styles.metaVal}>{course.duration}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Eligibility</span>
                <span className={styles.metaVal}>{course.eligibility}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Course Fee</span>
                <span className={styles.metaVal}>{course.fee}</span>
              </div>
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Button variant="primary" fullWidth onClick={() => setIsModalOpen(true)}>
                  Enroll in Tattva Bodha →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson 1 Preview */}
      <section id="lesson-1-preview" className="section section--muted" aria-label="Lesson 1 Open Access">
        <div className="container container--md">
          <SectionHeader
            tag="Open Access Lesson"
            title="Lesson 1 Preview: Introduction to Vedanta"
            subtitle="The first lesson of Tattva Bodha is freely open to everyone to understand the spirit and purpose of this study."
            align="center"
          />

          <div className={styles.lessonReader}>
            <div className={styles.readerHeader}>
              <span className={styles.readerBadge}>Lesson 01 / 40</span>
              <h3 className={styles.readerTitle}>The Inquiry into the Ultimate Truth (Tattva Vichara)</h3>
            </div>

            <div className={styles.readerBody}>
              <p className={styles.sanskritVerse}>
                साधनचतुष्टयसम्पन्नाधिकारिणां मोक्षसाधनभूतं तत्त्वविवेकप्रकारं वक्ष्यामः ॥
              </p>
              <p className={styles.verseTranslation}>
                <em>&ldquo;We shall explain the method of discrimination of Truth (Tattva Viveka), which is the means to liberation (Moksha), for those qualified seekers endowed with the four-fold spiritual qualifications.&rdquo;</em>
              </p>

              <h4>1. What is Vedanta?</h4>
              <p>
                Vedanta literally means the end or culmination (Anta) of the Vedas. It refers to the Upanishads, which reveal the fundamental truth about life, human existence, and the ultimate reality. The study of Vedanta is not an intellectual hobby; it is a serious inquiry designed to free the mind from sorrow, fear, and fundamental limitation.
              </p>

              <h4>2. The Central Question</h4>
              <p>
                Every human being seeks enduring happiness, peace, and freedom from limitation. Yet worldly pursuits yield only transient joy followed by recurring dissatisfaction. Vedanta addresses this universal predicament directly by posing the question: <strong>Who is the experiencer behind all experiences? What is my true nature?</strong>
              </p>

              <h4>3. The Role of Tattva Bodha</h4>
              <p>
                Composed by Bhagavan Adi Shankaracharya, <em>Tattva Bodha</em> serves as a guidebook for the beginner. It introduces essential concepts: the <em>Adhikari</em> (the qualified student), the <em>Pancha Koshas</em> (five sheaths of personality), the <em>Sharira Traya</em> (three bodies), and the ultimate identity of <em>Jiva</em> (individual soul) and <em>Ishwara</em> (universal consciousness).
              </p>
            </div>

            <div className={styles.readerFooter}>
              <div>
                <p className={styles.rfTitle}>Ready to continue with Lesson 2?</p>
                <p className={styles.rfDesc}>Submit your answers to the questionnaire below to receive personal feedback and the next lesson.</p>
              </div>
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Submit Lesson 1 Answers →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson 1 Questionnaire Preview */}
      <section className="section" aria-label="Questionnaire Preview">
        <div className="container container--md">
          <SectionHeader
            tag="Student Questionnaire"
            title="Lesson 1 Reflection Questions"
            subtitle="After reading Lesson 1, students reflect upon these five core questions before submitting their responses."
          />

          <div className={styles.questionList}>
            {course.questionnaire?.map((q, idx) => (
              <div key={idx} className={styles.questionItem}>
                <span className={styles.qNum}>Q{idx + 1}</span>
                <p className={styles.qText}>{q}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
              Open Application Form &amp; Submit Answers →
            </Button>
          </div>
        </div>
      </section>

      {/* Course Application Modal */}
      <CourseApplicationModal
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
