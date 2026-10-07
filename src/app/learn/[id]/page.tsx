import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { courses, getCourseBySlug, Course } from '@/data/courses';
import SectionHeader from '@/components/SectionHeader';
import Badge from '@/components/Badge';
import { getAssetPath } from '@/utils/assetPath';
import motionStyles from '@/styles/motion.module.css';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const slugs = courses.map((c) => ({
    id: c.slug,
  }));
  const canonicalIds = courses
    .filter((c) => c.canonicalId && c.canonicalId !== c.slug)
    .map((c) => ({
      id: c.canonicalId as string,
    }));
  return [...slugs, ...canonicalIds];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseBySlug(id) || courses.find((c) => c.id === id || c.canonicalId === id);
  if (!course) {
    return { title: 'Course Not Found — Learn Vedanta | Vedanta Mission' };
  }
  return {
    title: `${course.title} — Study Programs | Vedanta Mission`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const course = getCourseBySlug(id) || courses.find((c) => c.id === id || c.canonicalId === id);

  if (!course) {
    notFound();
  }

  const isTattvaBodha = course.slug === 'tattva-bodha';
  const isResidential = course.slug === 'residential-gita';
  const isGitaOnline = course.slug === 'gita-online';
  const isSangyan = course.slug === 'sangyan-sanatan-dharma';

  const statusBadge = isTattvaBodha
    ? { label: 'Available Now · Open Access Reader', variant: 'open' as const }
    : isResidential
    ? { label: 'Admission-Based · Inquiry Required', variant: 'limited' as const }
    : isGitaOnline
    ? { label: 'Digitization In Progress · Lesson 1 Available', variant: 'default' as const }
    : { label: 'Study Circle · Community Series', variant: 'camp' as const };

  const heroMediaInfo = isResidential
    ? {
        img: '/images/vmission/ashram/teaching-hall-interior.jpg',
        alt: 'Teaching Hall and Shankara Shrine at Vedanta Ashram, Indore',
        caption: 'Full-Time Residential Gurukula',
        sub: 'Vedanta Ashram · Indore',
      }
    : isGitaOnline
    ? {
        img: '/images/vmission/publications/study-text-vibhishana-gita.jpg',
        alt: 'Bhagavad Gita Scriptural Study Manuscript',
        caption: 'Prasthana Traya Study Text',
        sub: 'All 18 Chapters · 40 Lessons',
      }
    : isSangyan
    ? {
        img: '/images/vmission/ashram/gangeshwar-dome-closeup.jpg',
        alt: 'Shri Gangeshwar Mahadev Mandir Shikhara and Sanctum, Indore',
        caption: 'Vedic Cultural Foundation',
        sub: 'Community Study Circle',
      }
    : {
        img: '/images/vmission/publications/study-text-tb-mula.jpg',
        alt: 'Tattva Bodha Mula Study Manuscript',
        caption: 'Authentic Text · Shankaracharya',
        sub: 'Open Access Reader',
      };

  return (
    <article className={styles.coursePage} data-morph-target="course">
      {/* Hero */}
      <header className={styles.hero} aria-label="Course Header">
        <div className="container">
          <div className={`${motionStyles.editorialReveal} ${styles.heroGrid}`}>
            <div className={styles.heroContent}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/learn" prefetch={true} className={styles.backLink}>
                  ← Back to Four Learning Doors
                </Link>
              </nav>

              <div className={styles.badgeRow} data-morph-element="course-door">
                <Badge variant={statusBadge.variant} label={statusBadge.label} />
                <span className={styles.formatBadge}>{course.format} Program</span>
                <span className={styles.feeBadge}>{course.fee.split('(')[0].trim()}</span>
              </div>

              <h1 className={styles.title}>{course.title}</h1>
              <p className={styles.subtitle}>{course.subtitle}</p>
              <p className={styles.lead}>{course.description}</p>

              <div className={styles.quickSpecs}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Faculty</span>
                  <span className={styles.specVal}>{course.teacher}</span>
                </div>
                <div className={styles.specDivider} />
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Program Format</span>
                  <span className={styles.specVal}>{course.format}</span>
                </div>
                <div className={styles.specDivider} />
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Duration</span>
                  <span className={styles.specVal}>{course.duration}</span>
                </div>
                <div className={styles.specDivider} />
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Eligibility</span>
                  <span className={styles.specVal}>{course.eligibility.split('.')[0]}.</span>
                </div>
              </div>

              {/* Direct Study Portal for Tattva Bodha */}
              {isTattvaBodha && (
                <div className={styles.directAccessBanner}>
                  <div>
                    <span className={styles.bannerTag}>Study Threshold Live</span>
                    <h3 className={styles.accessTitle}>Interactive Study Desk Ready</h3>
                    <p className={styles.accessDesc}>
                      Lesson 1 of Tattva Bodha is open to all seekers. Read the original Sanskrit verses, English translation, commentary, and submit reflective exercises for personal review.
                    </p>
                  </div>
                  <Link href="/learn/tattva-bodha" className={styles.accessBtn} id="btn-open-tattva-reader">
                    Enter Interactive Reader →
                  </Link>
                </div>
              )}

              {/* Active Batch Banner for Gita Online */}
              {isGitaOnline && (
                <div className={styles.gatheringBanner}>
                  <div>
                    <span className={styles.bannerTag}>Active Batch · In Progress</span>
                    <h3 className={styles.accessTitle}>Online Batch Commenced Sep 15, 2026</h3>
                    <p className={styles.accessDesc}>
                      A dedicated 6-month online batch of the Bhagavad Gita Course commenced on September 15, 2026 under the personal guidance of Poojya Guruji Swami Atmananda Saraswati. Registration remains open and Lesson 1 is freely accessible.
                    </p>
                  </div>
                  <Link href="/events/online-gita-course-sep-2026" prefetch={true} className={styles.gatheringBtn} id="btn-view-gita-event">
                    View Active Batch &amp; Registration →
                  </Link>
                </div>
              )}
            </div>

            {/* Editorial Hero Media Column */}
            <div className={styles.heroMediaCol}>
              <div className={styles.heroMediaCard}>
                <Image
                  src={getAssetPath(heroMediaInfo.img)}
                  alt={heroMediaInfo.alt}
                  width={240}
                  height={320}
                  className={styles.heroMediaImg}
                  priority
                />
                <div className={styles.heroMediaPlate}>
                  <span className={styles.heroMediaCaption}>{heroMediaInfo.caption}</span>
                  <span className={styles.heroMediaSub}>{heroMediaInfo.sub}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chapter Marker: Transition from Overview to Curriculum */}
      <div className={styles.chapterTransition} aria-hidden="true">
        <div className={styles.chapterLine} />
        <div className={styles.chapterBadge}>
          <span className={styles.chapterNum}>SPECIFICATIONS</span>
          <span className={styles.chapterDot}>◆</span>
          <span className={styles.chapterText}>
            {isResidential
              ? 'RESIDENTIAL GURUKULA PROTOCOL'
              : isGitaOnline
              ? 'CURRICULUM & DIGITIZATION'
              : isSangyan
              ? 'VEDIC AWARENESS PILLARS'
              : 'COURSE SYLLABUS & DESK'}
          </span>
        </div>
        <div className={styles.chapterLine} />
      </div>

      {/* Curriculum & Structural Breakdown */}
      <section className="section" aria-label="Course Curriculum and Prerequisites">
        <div className="container">
          <div className={styles.twoCol}>
            {/* Left: What You Learn & Sample Structure */}
            <div className={styles.cardBox}>
              <SectionHeader
                tag="Curriculum Focus"
                title="What You Will Learn"
              />
              <ul className={styles.learnList}>
                {course.whatYouLearn.map((item, idx) => (
                  <li key={idx} className={styles.learnItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Sample Lessons where data genuinely exists */}
              {course.sampleLessons && course.sampleLessons.length > 0 && (
                <div className={styles.sampleLessonsBlock}>
                  <h4 className={styles.sampleHeader}>Foundational Study Modules</h4>
                  <div className={styles.sampleList}>
                    {course.sampleLessons.map((lesson) => (
                      <div key={lesson.number} className={styles.sampleItem}>
                        <span className={styles.lessonNum}>
                          {String(lesson.number).padStart(2, '0')}
                        </span>
                        <div>
                          <h5 className={styles.lessonTitle}>{lesson.title}</h5>
                          <p className={styles.lessonDesc}>{lesson.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gita Online Digitization Status */}
              {isGitaOnline && (
                <div className={styles.digitizationNotice}>
                  <h4 className={styles.noticeTitle}>Course Digitization In Progress</h4>
                  <p className={styles.noticeText}>
                    The Bhagavad Gita Online Lesson Course is currently being digitized for web delivery. Lesson 1 is available for introductory study. To register for the active online batch (commenced September 15, 2026), please view the Gathering Calendar in Events.
                  </p>
                  <div style={{ marginTop: 'var(--space-4)' }}>
                    <Link href="/events/online-gita-course-sep-2026" prefetch={true} className={styles.eventLinkBtn} id="btn-gita-event-link">
                      View Active Batch in Events Calendar →
                    </Link>
                  </div>
                </div>
              )}

              {/* Residential Gurukula Immersion Callout */}
              {isResidential && (
                <div className={styles.residentialDisciplineBox}>
                  <span className={styles.pillarTag}>Ashram Gurukula Discipline</span>
                  <h4 className={styles.disciplineTitle}>Traditional Monastic Living</h4>
                  <p className={styles.disciplineText}>
                    The Residential Gita Course is an authentic immersion in the living discipline of a traditional Gurukula. Students observe daily meditation, temple upasana, scriptural contemplation, and community seva alongside the resident Acharyas at Vedanta Ashram, Indore.
                  </p>
                </div>
              )}

              {/* Sangyan Community Circle Overview with Editorial Pillars */}
              {isSangyan && (
                <div className={styles.sangyanBlock}>
                  <div className={styles.sangyanPillarsGrid}>
                    <div className={styles.sangyanPillarCard}>
                      <span className={styles.pillarNum}>01</span>
                      <div>
                        <h5 className={styles.pillarTitle}>Vedic Vision &amp; Tenets</h5>
                        <p className={styles.pillarDesc}>
                          Unfolding the core philosophy and universal vision of Sanatan Dharma with classical fidelity.
                        </p>
                      </div>
                    </div>
                    <div className={styles.sangyanPillarCard}>
                      <span className={styles.pillarNum}>02</span>
                      <div>
                        <h5 className={styles.pillarTitle}>Temple Upasana &amp; Festivals</h5>
                        <p className={styles.pillarDesc}>
                          Inner meaning and spiritual purpose of Vedic festivals, samskaras, and temple worship.
                        </p>
                      </div>
                    </div>
                    <div className={styles.sangyanPillarCard}>
                      <span className={styles.pillarNum}>03</span>
                      <div>
                        <h5 className={styles.pillarTitle}>Resolving Common Doubts</h5>
                        <p className={styles.pillarDesc}>
                          Scriptural clarity addressing contemporary misconceptions and questions regarding Vedic lifestyle.
                        </p>
                      </div>
                    </div>
                    <div className={styles.sangyanPillarCard}>
                      <span className={styles.pillarNum}>04</span>
                      <div>
                        <h5 className={styles.pillarTitle}>Living Values in Family</h5>
                        <p className={styles.pillarDesc}>
                          Integrating spiritual ethics, reverent culture, and dharma into daily family and community action.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.sangyanNotice}>
                    <span className={styles.pillarTag}>Community &amp; Family Study</span>
                    <h4 className={styles.noticeTitle}>Vedic Awareness &amp; Dharmic Study</h4>
                    <p className={styles.noticeText}>
                      The Sangyan educational awareness initiative provides grounded scriptural clarity for seekers, youths, and families on the Vedantic vision, temple upasana, and practical values of Sanatan Dharma. You are welcome to explore related audio discourses in the Teachings archive or contact the Ashram for upcoming study circle dates.
                    </p>
                    <div style={{ marginTop: 'var(--space-4)' }}>
                      <Link href="/teachings" prefetch={true} className={styles.sangyanTeachingsLink} id="link-sangyan-teachings">
                        Explore Recorded Satsangs in Teachings →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Structure, Eligibility, Protocol */}
            <div className={styles.detailsCard}>
              <h3 className={styles.detailsTitle}>Course Structure &amp; Protocol</h3>

              <div className={styles.detailBlock}>
                <h4 className={styles.detailHeading}>Structure &amp; Progression</h4>
                <p className={styles.detailText}>{course.structure}</p>
              </div>

              <div className={styles.detailBlock}>
                <h4 className={styles.detailHeading}>Eligibility</h4>
                <p className={styles.detailText}>{course.eligibility}</p>
              </div>

              {course.dressCode && (
                <div className={styles.detailBlock}>
                  <h4 className={styles.detailHeading}>Dress Code / Ashram Protocol</h4>
                  <p className={styles.detailText}>{course.dressCode}</p>
                </div>
              )}

              <div className={styles.detailBlock}>
                <h4 className={styles.detailHeading}>Fee &amp; Contribution</h4>
                <p className={styles.detailText}>{course.fee}</p>
              </div>

              <div className={styles.contactBlock}>
                <h4 className={styles.detailHeading}>
                  {isResidential
                    ? 'Residential Admissions Inquiry'
                    : isTattvaBodha
                    ? 'Student Support & Guidance'
                    : 'Course Inquiry & Guidance'}
                </h4>
                <p className={styles.detailText}>
                  {isResidential
                    ? 'Admissions for the full-time 12-month residential program require preliminary inquiry with the Ashram Academic Office regarding current batch guidelines and boarding contribution.'
                    : isTattvaBodha
                    ? 'Questions concerning Tattva Bodha lessons and reflective exercises are personally addressed by the Ashram Acharyas.'
                    : 'For syllabus guides, study circle schedules, or enrollment assistance, reach out to the Vedanta Ashram academic office.'}
                </p>
                <div className={styles.actionBtns}>
                  <Link href="/contact" prefetch={true} className={styles.inquiryBtn} id="btn-inquire-course">
                    Inquire via Ashram Academic Office →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
