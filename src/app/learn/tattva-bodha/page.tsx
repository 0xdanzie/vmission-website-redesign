'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/motion/Magnetic';
import TiltCard from '@/components/motion/TiltCard';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import CourseApplicationModal from '@/components/CourseApplicationModal';
import { getCourseBySlug } from '@/data/courses';
import { useToast } from '@/context/ToastContext';
import Image from 'next/image';
import { getAssetPath } from '@/utils/assetPath';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function TattvaBodhaDetailPage() {
  const course = getCourseBySlug('tattva-bodha');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();
  const rootRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  useScrollReveals(rootRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .fromTo('[data-tb-mask]', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.4 }, 0)
        .fromTo('[data-tb-line]', { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.4)
        .fromTo('[data-tb-fade]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.85)
        .fromTo('[data-tb-book]', { rotateY: -18, opacity: 0, x: 40 }, { rotateY: -6, opacity: 1, x: 0, duration: 1.6, ease: 'power3.out' }, 0.3);

      // Reading progress along the top of the study desk
      gsap.fromTo(
        '[data-read-progress]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-study-desk]', start: 'top top', end: 'bottom bottom', scrub: 0.3 },
        }
      );

      // Shloka and the sanskrit verse settle in as the desk is entered
      gsap.utils.toArray<HTMLElement>('[data-verse]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        );
      });

      // Sticky lesson rail: the active step is highlighted as the reader moves through the sections
      gsap.utils.toArray<HTMLElement>('[data-rail-section]').forEach((section) => {
        const id = section.id;
        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) {
              document.querySelectorAll('[data-rail-link]').forEach((link) => {
                link.classList.toggle('is-current', link.getAttribute('href') === `#${id}`);
              });
            }
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  if (!course) return <div>Course not found</div>;

  const copyQuestions = () => {
    if (!course.questionnaire) return;
    const text = course.questionnaire.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    navigator.clipboard.writeText(text);
    showToast('Questionnaire copied to clipboard for offline reflection!', 'success');
  };

  return (
    <article className={styles.study} ref={rootRef}>
      <div className={styles.readProgress} aria-hidden="true">
        <span className={styles.readProgressFill} data-read-progress />
      </div>

      {/* 01. Hero */}
      <header className={styles.hero} aria-labelledby="tb-title">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb" data-tb-fade>
                <Link href="/learn" prefetch={true} className={styles.backLink}>
                  ← Back to Four Learning Doors
                </Link>
              </nav>

              <div className={styles.trail} aria-label="Study Path Progression" data-tb-fade>
                <span className={styles.trailCourse}>Course: Tattva Bodha</span>
                <span className={styles.trailSep}>›</span>
                <span>Session 1 · Lesson 01</span>
                <span className={styles.trailSep}>›</span>
                <span>Study Desk (Mūla Shloka 01)</span>
              </div>

              <div className={styles.badgeRow} data-tb-fade>
                <Badge variant="open" label="Available Now · Open Access Reader" />
                <span className={styles.pill}>Prakarana Grantha</span>
                <span className={styles.pillOutline}>Voluntary Donation Model</span>
              </div>

              <h1 id="tb-title" className={styles.title}>
                <span className={styles.lineMask}><span className={styles.lineInner} data-tb-line>{course.title}</span></span>
              </h1>
              <p className={styles.subtitle} data-tb-fade>{course.subtitle}</p>
              <p className={styles.lead} data-tb-fade>{course.description}</p>

              <div className={styles.heroBtns} data-tb-fade>
                <Magnetic strength={0.22}>
                  <a href="#lesson-1-study-desk" className={styles.primaryBtn} id="btn-begin-study-desk">
                    Enter Lesson 01 Study Desk ↓
                  </a>
                </Magnetic>
                <Button variant="outline" tone="dark" onClick={() => setIsModalOpen(true)} id="btn-submit-answers-hero">
                  Submit Reflection Answers →
                </Button>
              </div>
            </div>

            <div className={styles.heroCover}>
              <TiltCard max={6} className={styles.bookTilt}>
                <div className={styles.bookWrap} data-tb-book>
                  <Image
                    src={getAssetPath('/images/vmission/publications/study-text-tb-mula.jpg')}
                    alt="Tattva Bodha Mula Study Manuscript"
                    width={200}
                    height={280}
                    className={styles.bookImg}
                    priority
                  />
                </div>
              </TiltCard>
              <span className={styles.bookCaption} data-tb-fade>Mula Text · Adi Shankaracharya</span>
            </div>
          </div>
        </div>
      </header>

      {/* 02. Curriculum & specs */}
      <section className={styles.overview} aria-labelledby="curriculum-title">
        <div className="container">
          <div className={styles.overviewGrid}>
            <div data-reveal>
              <span className={styles.overline}>Course Curriculum</span>
              <h2 id="curriculum-title" className={styles.h2}>What You Will Learn in Tattva Bodha</h2>
              <div className={styles.rule} data-rule />
              <p className={styles.lead}>The foundational framework of Advaita Vedanta unpacked step by step.</p>

              <ul className={styles.learnList} data-stagger>
                {course.whatYouLearn.map((item, idx) => (
                  <li key={idx} className={styles.learnItem}>
                    <span className={styles.checkIcon} aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className={styles.specs} data-reveal>
              <h3 className={styles.specsTitle}>Program Specifications</h3>
              <dl className={styles.specList}>
                <div className={styles.specRow}>
                  <dt>Faculty</dt>
                  <dd>{course.teacher}</dd>
                </div>
                <div className={styles.specRow}>
                  <dt>Format</dt>
                  <dd>{course.format} (Self-paced correspondence)</dd>
                </div>
                <div className={styles.specRow}>
                  <dt>Duration</dt>
                  <dd>{course.duration}</dd>
                </div>
                <div className={styles.specRow}>
                  <dt>Eligibility</dt>
                  <dd>{course.eligibility}</dd>
                </div>
                <div className={styles.specRow}>
                  <dt>Course Contribution</dt>
                  <dd>{course.fee}</dd>
                </div>
              </dl>
              <div className={styles.specCta}>
                <Button variant="primary" fullWidth onClick={() => setIsModalOpen(true)} id="btn-enroll-tattva">
                  Enroll in Tattva Bodha →
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Chapter marker */}
      <div className={styles.marker} aria-hidden="true" id="lesson-1-study-desk">
        <span className={styles.markerLine} />
        <span className={styles.markerText}>
          <span className={styles.markerNum}>Lesson 01 of 40</span>
          <span className={styles.markerDot}>◆</span>
          Open Access Study Desk
        </span>
        <span className={styles.markerLine} />
      </div>

      {/* 03. Study desk */}
      <section className={styles.desk} aria-labelledby="desk-title" data-study-desk>
        <div className="container">
          <div className={styles.deskHeader} data-reveal>
            <span className={styles.overline}>Open Access Study Desk</span>
            <h2 id="desk-title" className={styles.h2}>Lesson 1: Introduction to Vedanta &amp; Tattva Bodha</h2>
            <p className={styles.lead}>
              The first lesson of Tattva Bodha is open to all sincere seekers to begin the traditional study of Vedantic inquiry.
            </p>
          </div>

          <div className={styles.progression} data-reveal>
            <div className={styles.progHeader}>
              <span className={styles.progTag}>Session 1 of 4 · Prakarana Grantha</span>
              <span className={styles.progNote}>Lessons 2–10 available sequentially upon teacher review</span>
            </div>
            <div className={styles.progSteps}>
              <span className={`${styles.progStep} ${styles.progActive}`}>01 Introduction &amp; Tattva Viveka (Open Now)</span>
              <span className={styles.progStep}>02 Sadhana Chatushtaya</span>
              <span className={styles.progStep}>03 Viveka &amp; Vairagya</span>
              <span className={styles.progStep}>04–10 Sharira Traya &amp; Kosha Viveka</span>
            </div>
          </div>

          <div className={styles.reader}>
            <aside className={styles.railCol}>
              <nav className={styles.rail} aria-label="Study Desk Section Navigation">
                <span className={styles.railVerse}>Mūla Shloka 01: Pratijñā (Proposition)</span>
                <a href="#mula-shloka" className={styles.railLink} data-rail-link>Root Verse</a>
                <a href="#anvaya-translation" className={styles.railLink} data-rail-link>Word Analysis &amp; Translation</a>
                <a href="#commentary-exposition" className={styles.railLink} data-rail-link>Exposition</a>
                <a href="#reflection-desk" className={styles.railLink} data-rail-link>Questionnaire</a>
                <span className={styles.railMode}>Classical Gurukula Method</span>
              </nav>
            </aside>

            <div className={styles.readerMain}>
              <div className={styles.readerHead}>
                <span className={styles.readerBadge}>Lesson 01 · Prakarana Grantha</span>
                <h3 className={styles.readerTitle}>The Inquiry into the Ultimate Truth (Tattva Vichara)</h3>
              </div>

              <section className={styles.shloka} id="mula-shloka" data-rail-section aria-label="Root verse">
                <span className={styles.tag}>Root Verse 01 (Mūla Shloka)</span>
                <p className={styles.sanskrit} data-verse>
                  साधनचतुष्टयसम्पन्नाधिकारिणां मोक्षसाधनभूतं तत्त्वविवेकप्रकारं वक्ष्यामः ॥
                </p>
                <p className={styles.roman} data-verse>
                  sādhanacatuṣṭayasampannādhikāriṇāṁ mokṣasādhanabhūtaṁ tattvavivekaprakāraṁ vakṣyāmaḥ ||
                </p>
                <div className={styles.verseRule} />
                <span className={styles.tagSmall}>Prose Translation:</span>
                <p className={styles.translation}>
                  &ldquo;We shall explain the method of discrimination of Truth (Tattva Viveka), which is the direct means to liberation (Moksha), for those qualified seekers endowed with the four-fold spiritual qualifications (Sadhana Chatushtaya).&rdquo;
                </p>
              </section>

              <section className={styles.anvaya} id="anvaya-translation" data-rail-section aria-label="Word-by-word analysis">
                <span className={styles.tag}>Word-by-Word Analysis (Anvaya &amp; Padārtha)</span>
                <ul className={styles.anvayaList} data-stagger>
                  <li className={styles.anvayaItem}>
                    <strong className={styles.term}>sādhana-catuṣṭaya-sampanna-adhikāriṇām:</strong>
                    <span>For qualified seekers endowed with the fourfold spiritual disciplines</span>
                  </li>
                  <li className={styles.anvayaItem}>
                    <strong className={styles.term}>mokṣa-sādhana-bhūtam:</strong>
                    <span>That which serves as the direct means to spiritual liberation (Moksha)</span>
                  </li>
                  <li className={styles.anvayaItem}>
                    <strong className={styles.term}>tattva-viveka-prakāram:</strong>
                    <span>The methodology of discriminating the Real (Truth) from the unreal</span>
                  </li>
                  <li className={styles.anvayaItem}>
                    <strong className={styles.term}>vakṣyāmaḥ:</strong>
                    <span>We shall systematically unfold and expound</span>
                  </li>
                </ul>
              </section>

              <section className={styles.exposition} id="commentary-exposition" data-rail-section aria-label="Exposition">
                <h4 className={styles.expH}>1. What is Vedanta?</h4>
                <p className={styles.expP}>
                  Vedanta literally means the end or culmination (<em>Anta</em>) of the Vedas. It refers to the Upanishads, which reveal the fundamental truth about human existence, the world, and the ultimate reality (Brahman). The study of Vedanta is not an abstract speculative philosophy; it is a valid means of knowledge (<dfn className={styles.dfn}>Pramana</dfn>) specifically operating to free the human mind from the persistent sense of limitation, lack, and fundamental sorrow.
                </p>

                <blockquote className={styles.callout} data-reveal>
                  <span className={styles.calloutTag}>Gurukula Study Principle</span>
                  <p className={styles.calloutText}>
                    &ldquo;In the Advaita tradition, the scriptures are not an object of mere intellectual curiosity, but a valid means of knowledge (Pramana) that directly removes avidya (ignorance) when heard under the guidance of an Acharya.&rdquo;
                  </p>
                </blockquote>

                <h4 className={styles.expH}>2. The Central Question: Who Am I?</h4>
                <p className={styles.expP}>
                  Every human being seeks enduring happiness, peace, and freedom from limitation. Yet worldly pursuits yield only transient joy followed by recurring dissatisfaction. Vedanta addresses this universal predicament directly by shifting the inquiry from the known objects to the knower: <strong>Who is the experiencer behind all experiences? What is my true, unconditioned nature?</strong>
                </p>

                <h4 className={styles.expH}>3. The Role of Tattva Bodha</h4>
                <p className={styles.expP}>
                  Composed by Bhagavan Adi Shankaracharya, <em>Tattva Bodha</em> serves as the indispensable guidebook for every student entering Advaita Vedanta. It systematically introduces essential terminology and insights: the <dfn className={styles.dfn}>Adhikari</dfn> (the qualified seeker), the <dfn className={styles.dfn}>Pancha Koshas</dfn> (the five sheaths of personality), the <dfn className={styles.dfn}>Sharira Traya</dfn> (the three bodies), and the ultimate identity of the individual self (<dfn className={styles.dfn}>Jiva</dfn>) and the universal reality (<dfn className={styles.dfn}>Ishwara</dfn>).
                </p>
              </section>

              <div className={styles.readerFoot} data-reveal>
                <div>
                  <p className={styles.footTitle}>Ready to continue with Lesson 2?</p>
                  <p className={styles.footDesc}>Submit your reflections to the questionnaire below to receive personal feedback from the Ashram Acharyas and continue your study.</p>
                </div>
                <Button variant="primary" onClick={() => setIsModalOpen(true)} id="btn-submit-reader-answers">
                  Submit Lesson 1 Answers →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Questionnaire */}
      <section className={styles.questions} id="reflection-desk" data-rail-section aria-labelledby="q-title">
        <div className="container">
          <div className={styles.intro} data-reveal>
            <span className={styles.overlineLight}>Student Questionnaire</span>
            <h2 id="q-title" className={styles.h2Light}>Lesson 1 Reflection Questions</h2>
            <p className={styles.leadLight}>
              After contemplating Lesson 1, students reflect upon these five core questions before submitting their responses to the Ashram.
            </p>
          </div>

          <div className={styles.protocol} data-reveal>
            <span className={styles.protocolTag}>Ashram Review Protocol</span>
            <p className={styles.protocolText}>
              Contemplate each question thoughtfully. Once submitted, your reflections are personally reviewed by the Acharyas of Vedanta Ashram, Indore, who will provide guidance for continuing into Lesson 2.
            </p>
          </div>

          <div className={styles.copyRow}>
            <button
              type="button"
              onClick={copyQuestions}
              className={styles.copyBtn}
              id="btn-copy-questionnaire"
              aria-label="Copy reflection questions to clipboard"
            >
              📋 Copy Questions for Offline Contemplation
            </button>
          </div>

          <ol className={styles.qList} data-stagger>
            {course.questionnaire?.map((q, idx) => (
              <li key={idx} className={styles.qItem}>
                <span className={styles.qNum}>0{idx + 1}</span>
                <p className={styles.qText}>{q}</p>
              </li>
            ))}
          </ol>

          <div className={styles.submitWrap} data-reveal>
            <Magnetic strength={0.2}>
              <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)} id="btn-open-application-modal">
                Open Submission Form &amp; Send Responses →
              </Button>
            </Magnetic>
          </div>
        </div>
      </section>

      <CourseApplicationModal
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </article>
  );
}
