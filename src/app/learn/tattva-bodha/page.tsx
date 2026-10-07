'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import CourseApplicationModal from '@/components/CourseApplicationModal';
import { getCourseBySlug } from '@/data/courses';
import { useToast } from '@/context/ToastContext';
import motionStyles from '@/styles/motion.module.css';
import Image from 'next/image';
import { getAssetPath } from '@/utils/assetPath';
import styles from './page.module.css';

export default function TattvaBodhaDetailPage() {
  const course = getCourseBySlug('tattva-bodha');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  if (!course) return <div>Course not found</div>;

  const copyQuestions = () => {
    if (!course.questionnaire) return;
    const text = course.questionnaire.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    navigator.clipboard.writeText(text);
    showToast('Questionnaire copied to clipboard for offline reflection!', 'success');
  };

  return (
    <article className={styles.studyPage}>
      {/* Hero Header */}
      <header className={styles.hero} aria-label="Course Hero" data-morph-target="course">
        <div className="container">
          <div className={`${motionStyles.editorialReveal} ${styles.heroGrid}`}>
            <div style={{ maxWidth: '680px' }}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/learn" prefetch={true} className={styles.backLink}>
                  ← Back to Four Learning Doors
                </Link>
              </nav>

              {/* Course -> Lesson -> Study Journey Trail */}
              <div className={styles.journeyTrail} aria-label="Study Path Progression">
                <span className={styles.trailCourse}>Course: Tattva Bodha</span>
                <span className={styles.trailSep}>›</span>
                <span className={styles.trailLesson}>Session 1 · Lesson 01</span>
                <span className={styles.trailSep}>›</span>
                <span className={styles.trailStudy}>Study Desk (Mūla Shloka 01)</span>
              </div>

              <div className={styles.badgeRow}>
                <Badge variant="open" label="Available Now · Open Access Reader" />
                <span className={styles.categoryPill}>Prakarana Grantha</span>
                <span className={styles.feeBadge}>Voluntary Donation Model</span>
              </div>

              <h1 className={styles.title}>{course.title}</h1>
              <p className={styles.subtitle}>{course.subtitle}</p>
              <p className={styles.lead}>{course.description}</p>

              <div className={styles.heroBtns}>
                <a href="#lesson-1-study-desk" className={styles.primaryStudyBtn} id="btn-begin-study-desk">
                  Enter Lesson 01 Study Desk ↓
                </a>
                <Button
                  variant="secondary"
                  onClick={() => setIsModalOpen(true)}
                  id="btn-submit-answers-hero"
                >
                  Submit Reflection Answers →
                </Button>
              </div>
            </div>

            <div className={styles.heroCoverCol}>
              <div className={styles.heroBookCard}>
                <Image
                  src={getAssetPath('/images/vmission/publications/study-text-tb-mula.jpg')}
                  alt="Tattva Bodha Mula Study Manuscript"
                  width={200}
                  height={280}
                  className={styles.heroBookImg}
                  priority
                />
                <span className={styles.heroBookCaption}>Mula Text · Adi Shankaracharya</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Curriculum Focus & Meta Specs */}
      <section className="section" aria-label="Course Overview">
        <div className="container">
          <div className={styles.twoCol}>
            <div className={styles.curriculumBox}>
              <SectionHeader
                tag="Course Curriculum"
                title="What You Will Learn in Tattva Bodha"
                subtitle="The foundational framework of Advaita Vedanta unpacked step by step."
              />
              <ul className={styles.learnList}>
                {course.whatYouLearn.map((item, idx) => (
                  <li key={idx} className={styles.learnItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.metaCard}>
              <h3 className={styles.metaCardTitle}>Program Specifications</h3>
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
                <span className={styles.metaLabel}>Course Contribution</span>
                <span className={styles.metaVal}>{course.fee}</span>
              </div>
              <div style={{ marginTop: 'var(--space-5)' }}>
                <Button variant="primary" fullWidth onClick={() => setIsModalOpen(true)} id="btn-enroll-tattva">
                  Enroll in Tattva Bodha →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Marker: Entering Lesson Environment */}
      <div className={styles.chapterTransition} aria-hidden="true" id="lesson-1-study-desk">
        <div className={styles.chapterLine} />
        <div className={styles.chapterBadge}>
          <span className={styles.chapterNum}>LESSON 01 OF 40</span>
          <span className={styles.chapterDot}>◆</span>
          <span className={styles.chapterText}>OPEN ACCESS STUDY DESK</span>
        </div>
        <div className={styles.chapterLine} />
      </div>

      {/* Lesson 1 Study Reader */}
      <section className={`section ${styles.studyDeskSection}`} aria-label="Lesson 1 Open Access Study Reader">
        <div className="container container--md">
          <SectionHeader
            tag="Open Access Study Desk"
            title="Lesson 1: Introduction to Vedanta &amp; Tattva Bodha"
            subtitle="The first lesson of Tattva Bodha is open to all sincere seekers to begin the traditional study of Vedantic inquiry."
            align="center"
          />

          {/* Session Progression Rail */}
          <div className={styles.progressionRail}>
            <div className={styles.railHeader}>
              <span className={styles.railTag}>Session 1 of 4 · Prakarana Grantha</span>
              <span className={styles.railNote}>Lessons 2–10 available sequentially upon teacher review</span>
            </div>
            <div className={styles.railSteps}>
              <span className={`${styles.railStep} ${styles.railActive}`}>
                01 Introduction &amp; Tattva Viveka (Open Now)
              </span>
              <span className={styles.railStep}>
                02 Sadhana Chatushtaya
              </span>
              <span className={styles.railStep}>
                03 Viveka &amp; Vairagya
              </span>
              <span className={styles.railStep}>
                04–10 Sharira Traya &amp; Kosha Viveka
              </span>
            </div>
          </div>

          <div className={styles.lessonReader}>
            <div className={styles.readerHeader}>
              <span className={styles.readerBadge}>Lesson 01 · Prakarana Grantha</span>
              <h3 className={styles.readerTitle}>The Inquiry into the Ultimate Truth (Tattva Vichara)</h3>
            </div>

            {/* In-Desk Study Navigation Rail */}
            <div className={styles.studyNavRail} aria-label="Study Desk Section Navigation">
              <span className={styles.navRailVerse}>
                Mūla Shloka 01: Pratijñā (Proposition)
              </span>
              <div className={styles.navRailLinks}>
                <a href="#mula-shloka" className={styles.navRailLink}>Root Verse</a>
                <a href="#anvaya-translation" className={styles.navRailLink}>Word Analysis &amp; Translation</a>
                <a href="#commentary-exposition" className={styles.navRailLink}>Exposition</a>
                <a href="#reflection-desk" className={styles.navRailLink}>Questionnaire</a>
              </div>
              <span className={styles.navRailMode}>Classical Gurukula Method</span>
            </div>

            <div className={styles.readerBody}>
              {/* Shloka Container */}
              <div className={styles.shlokaBox} id="mula-shloka">
                <span className={styles.shlokaTag}>Root Verse 01 (Mūla Shloka)</span>
                <p className={styles.sanskritVerse}>
                  साधनचतुष्टयसम्पन्नाधिकारिणां मोक्षसाधनभूतं तत्त्वविवेकप्रकारं वक्ष्यामः ॥
                </p>
                <p className={styles.romanVerse}>
                  sādhanacatuṣṭayasampannādhikāriṇāṁ mokṣasādhanabhūtaṁ tattvavivekaprakāraṁ vakṣyāmaḥ ||
                </p>
                <div className={styles.verseDivider} />
                <div className={styles.translationWrap}>
                  <span className={styles.translationLabel}>Prose Translation:</span>
                  <p className={styles.verseTranslation}>
                    &ldquo;We shall explain the method of discrimination of Truth (Tattva Viveka), which is the direct means to liberation (Moksha), for those qualified seekers endowed with the four-fold spiritual qualifications (Sadhana Chatushtaya).&rdquo;
                  </p>
                </div>
              </div>

              {/* Word-by-Word Anvaya Plate */}
              <div className={styles.anvayaBox} id="anvaya-translation">
                <span className={styles.anvayaTag}>Word-by-Word Analysis (Anvaya &amp; Padārtha)</span>
                <ul className={styles.anvayaList}>
                  <li className={styles.anvayaItem}>
                    <strong className={styles.anvayaTerm}>sādhana-catuṣṭaya-sampanna-adhikāriṇām:</strong>
                    <span>For qualified seekers endowed with the fourfold spiritual disciplines</span>
                  </li>
                  <li className={styles.anvayaItem}>
                    <strong className={styles.anvayaTerm}>mokṣa-sādhana-bhūtam:</strong>
                    <span>That which serves as the direct means to spiritual liberation (Moksha)</span>
                  </li>
                  <li className={styles.anvayaItem}>
                    <strong className={styles.anvayaTerm}>tattva-viveka-prakāram:</strong>
                    <span>The methodology of discriminating the Real (Truth) from the unreal</span>
                  </li>
                  <li className={styles.anvayaItem}>
                    <strong className={styles.anvayaTerm}>vakṣyāmaḥ:</strong>
                    <span>We shall systematically unfold and expound</span>
                  </li>
                </ul>
              </div>

              {/* Commentary & Traditional Exposition */}
              <div className={styles.commentarySection} id="commentary-exposition">
                <div className={styles.readingMeasure}>
                  <h4>1. What is Vedanta?</h4>
                  <p>
                    Vedanta literally means the end or culmination (<em>Anta</em>) of the Vedas. It refers to the Upanishads, which reveal the fundamental truth about human existence, the world, and the ultimate reality (Brahman). The study of Vedanta is not an abstract speculative philosophy; it is a valid means of knowledge (<dfn className={styles.vedicTerm}>Pramana</dfn>) specifically operating to free the human mind from the persistent sense of limitation, lack, and fundamental sorrow.
                  </p>

                  <div className={styles.ashramCallout}>
                    <span className={styles.calloutTag}>Gurukula Study Principle</span>
                    <p className={styles.calloutText}>
                      &ldquo;In the Advaita tradition, the scriptures are not an object of mere intellectual curiosity, but a valid means of knowledge (Pramana) that directly removes avidya (ignorance) when heard under the guidance of an Acharya.&rdquo;
                    </p>
                  </div>

                  <h4>2. The Central Question: Who Am I?</h4>
                  <p>
                    Every human being seeks enduring happiness, peace, and freedom from limitation. Yet worldly pursuits yield only transient joy followed by recurring dissatisfaction. Vedanta addresses this universal predicament directly by shifting the inquiry from the known objects to the knower: <strong>Who is the experiencer behind all experiences? What is my true, unconditioned nature?</strong>
                  </p>

                  <h4>3. The Role of Tattva Bodha</h4>
                  <p>
                    Composed by Bhagavan Adi Shankaracharya, <em>Tattva Bodha</em> serves as the indispensable guidebook for every student entering Advaita Vedanta. It systematically introduces essential terminology and insights: the <dfn className={styles.vedicTerm}>Adhikari</dfn> (the qualified seeker), the <dfn className={styles.vedicTerm}>Pancha Koshas</dfn> (the five sheaths of personality), the <dfn className={styles.vedicTerm}>Sharira Traya</dfn> (the three bodies), and the ultimate identity of the individual self (<dfn className={styles.vedicTerm}>Jiva</dfn>) and the universal reality (<dfn className={styles.vedicTerm}>Ishwara</dfn>).
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.readerFooter}>
              <div>
                <p className={styles.rfTitle}>Ready to continue with Lesson 2?</p>
                <p className={styles.rfDesc}>Submit your reflections to the questionnaire below to receive personal feedback from the Ashram Acharyas and continue your study.</p>
              </div>
              <Button variant="primary" onClick={() => setIsModalOpen(true)} id="btn-submit-reader-answers">
                Submit Lesson 1 Answers →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson 1 Reflection Questions Desk */}
      <section className="section" aria-label="Reflection Questions" id="reflection-desk">
        <div className="container container--md">
          <SectionHeader
            tag="Student Questionnaire"
            title="Lesson 1 Reflection Questions"
            subtitle="After contemplating Lesson 1, students reflect upon these five core questions before submitting their responses to the Ashram."
          />

          <div className={styles.guidanceBox}>
            <span className={styles.guidanceTag}>Ashram Review Protocol</span>
            <p className={styles.guidanceText}>
              Contemplate each question thoughtfully. Once submitted, your reflections are personally reviewed by the Acharyas of Vedanta Ashram, Indore, who will provide guidance for continuing into Lesson 2.
            </p>
          </div>

          <div className={styles.questionHeaderActions}>
            <button
              type="button"
              onClick={copyQuestions}
              className={styles.copyQuestionsBtn}
              id="btn-copy-questionnaire"
              aria-label="Copy reflection questions to clipboard"
            >
              <span>📋 Copy Questions for Offline Contemplation</span>
            </button>
          </div>

          <div className={styles.questionList}>
            {course.questionnaire?.map((q, idx) => (
              <div key={idx} className={styles.questionItem}>
                <span className={styles.qNum}>0{idx + 1}</span>
                <p className={styles.qText}>{q}</p>
              </div>
            ))}
          </div>

          <div className={styles.submissionCtaWrap}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
              id="btn-open-application-modal"
            >
              Open Submission Form &amp; Send Responses →
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
    </article>
  );
}
