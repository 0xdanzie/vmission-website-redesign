'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/motion/Magnetic';
import TiltCard from '@/components/motion/TiltCard';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
import Badge from '@/components/Badge';
import type { Course } from '@/data/courses';
import { getAssetPath } from '@/utils/assetPath';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

const SANGYAN_PILLARS = [
  {
    title: 'Vedic Vision & Tenets',
    desc: 'Unfolding the core philosophy and universal vision of Sanatan Dharma with classical fidelity.',
  },
  {
    title: 'Temple Upasana & Festivals',
    desc: 'Inner meaning and spiritual purpose of Vedic festivals, samskaras, and temple worship.',
  },
  {
    title: 'Resolving Common Doubts',
    desc: 'Scriptural clarity addressing contemporary misconceptions and questions regarding Vedic lifestyle.',
  },
  {
    title: 'Living Values in Family',
    desc: 'Integrating spiritual ethics, reverent culture, and dharma into daily family and community action.',
  },
];

export default function CourseDetailClient({ course }: { course: Course }) {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const curriculumRef = useRef<HTMLElement>(null);

  useScrollReveals(rootRef);

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

  const chapterLabel = isResidential
    ? 'RESIDENTIAL GURUKULA PROTOCOL'
    : isGitaOnline
      ? 'CURRICULUM & DIGITIZATION'
      : isSangyan
        ? 'VEDIC AWARENESS PILLARS'
        : 'COURSE SYLLABUS & DESK';

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) return;

      // Hero: staggered rise, media clip-reveal, spec ticker-in
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo(
        '[data-cd-rise]',
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.09 }
      )
        .fromTo(
          '[data-cd-media]',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' },
          0.15
        )
        .fromTo(
          '[data-cd-media] img',
          { scale: 1.3 },
          { scale: 1, duration: 2, ease: 'power3.out' },
          0.15
        )
        .fromTo(
          '[data-cd-spec]',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.07 },
          0.6
        );

      // Hero media parallax on scroll
      gsap.to('[data-cd-media]', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-cd-hero]',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Chapter rule draws itself on arrival
      gsap.fromTo(
        '[data-cd-chapter-line]',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-cd-chapter]', start: 'top 85%', once: true },
        }
      );

      // Curriculum: scrubbed read-progress rail tied to the section
      if (progressRef.current && curriculumRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: curriculumRef.current,
              start: 'top 60%',
              end: 'bottom 70%',
              scrub: true,
            },
          }
        );
      }

      // Lesson numerals: outline → saffron fill as each lesson enters
      gsap.utils.toArray<HTMLElement>('[data-cd-num]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 82%',
          once: true,
          onEnter: () => el.classList.add(styles.numOn),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <article ref={rootRef} className={styles.coursePage} data-morph-target="course">
      {/* Hero */}
      <header className={styles.hero} data-cd-hero aria-labelledby="course-title">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/learn" prefetch={true} className={styles.backLink} data-cd-rise>
                  ← Back to Four Learning Doors
                </Link>
              </nav>

              <div className={styles.badgeRow} data-morph-element="course-door" data-cd-rise>
                <Badge variant={statusBadge.variant} label={statusBadge.label} />
                <span className={styles.formatBadge}>{course.format} Program</span>
                <span className={styles.feeBadge}>{course.fee.split('(')[0].trim()}</span>
              </div>

              <div className={styles.titleMask}>
                <h1 id="course-title" className={styles.title} data-cd-rise>
                  {course.title}
                </h1>
              </div>
              <p className={styles.subtitle} data-cd-rise>{course.subtitle}</p>
              <p className={styles.lead} data-cd-rise>{course.description}</p>

              <div className={styles.quickSpecs}>
                <div className={styles.specItem} data-cd-spec>
                  <span className={styles.specLabel}>Faculty</span>
                  <span className={styles.specVal}>{course.teacher}</span>
                </div>
                <div className={styles.specItem} data-cd-spec>
                  <span className={styles.specLabel}>Program Format</span>
                  <span className={styles.specVal}>{course.format}</span>
                </div>
                <div className={styles.specItem} data-cd-spec>
                  <span className={styles.specLabel}>Duration</span>
                  <span className={styles.specVal}>{course.duration}</span>
                </div>
                <div className={styles.specItem} data-cd-spec>
                  <span className={styles.specLabel}>Eligibility</span>
                  <span className={styles.specVal}>{course.eligibility.split('.')[0]}.</span>
                </div>
              </div>

              {/* Direct Study Portal for Tattva Bodha */}
              {isTattvaBodha && (
                <div className={styles.directAccessBanner} data-reveal>
                  <div>
                    <span className={styles.bannerTag}>Study Threshold Live</span>
                    <h3 className={styles.accessTitle}>Interactive Study Desk Ready</h3>
                    <p className={styles.accessDesc}>
                      Lesson 1 of Tattva Bodha is open to all seekers. Read the original Sanskrit verses, English translation, commentary, and submit reflective exercises for personal review.
                    </p>
                  </div>
                  <Magnetic strength={0.2}>
                    <Link href="/learn/tattva-bodha" className={styles.accessBtn} id="btn-open-tattva-reader">
                      Enter Interactive Reader →
                    </Link>
                  </Magnetic>
                </div>
              )}

              {/* Active Batch Banner for Gita Online */}
              {isGitaOnline && (
                <div className={styles.gatheringBanner} data-reveal>
                  <div>
                    <span className={styles.bannerTag}>Active Batch · In Progress</span>
                    <h3 className={styles.accessTitle}>Online Batch Commenced Sep 15, 2026</h3>
                    <p className={styles.accessDesc}>
                      A dedicated 6-month online batch of the Bhagavad Gita Course commenced on September 15, 2026 under the personal guidance of Poojya Guruji Swami Atmananda Saraswati. Registration remains open and Lesson 1 is freely accessible.
                    </p>
                  </div>
                  <Magnetic strength={0.2}>
                    <Link href="/events/online-gita-course-sep-2026" prefetch={true} className={styles.gatheringBtn} id="btn-view-gita-event">
                      View Active Batch &amp; Registration →
                    </Link>
                  </Magnetic>
                </div>
              )}
            </div>

            {/* Editorial Hero Media */}
            <div className={styles.heroMediaCol}>
              <div className={styles.heroMediaCard} data-cd-media>
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

      {/* Chapter marker */}
      <div className={styles.chapterTransition} data-cd-chapter aria-hidden="true">
        <div className={styles.chapterLine} data-cd-chapter-line />
        <div className={styles.chapterBadge}>
          <span className={styles.chapterNum}>SPECIFICATIONS</span>
          <span className={styles.chapterDot}>◆</span>
          <span className={styles.chapterText}>{chapterLabel}</span>
        </div>
        <div className={styles.chapterLine} data-cd-chapter-line />
      </div>

      {/* Curriculum & structure */}
      <section ref={curriculumRef} className={styles.curriculum} aria-labelledby="curriculum-title">
        <div className={styles.progressRail} aria-hidden="true">
          <div ref={progressRef} className={styles.progressFill} />
        </div>

        <div className="container">
          <div className={styles.twoCol}>
            {/* Left: What you learn & sample structure */}
            <div className={styles.cardBox} data-reveal>
              <p className={styles.eyebrow}>Curriculum Focus</p>
              <h2 id="curriculum-title" className={styles.sectionTitle}>What You Will Learn</h2>

              <ul className={styles.learnList} data-stagger>
                {course.whatYouLearn.map((item, idx) => (
                  <li key={idx} className={styles.learnItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {course.sampleLessons && course.sampleLessons.length > 0 && (
                <div className={styles.sampleLessonsBlock}>
                  <h4 className={styles.sampleHeader}>Foundational Study Modules</h4>
                  <div className={styles.sampleList}>
                    {course.sampleLessons.map((lesson) => (
                      <div key={lesson.number} className={styles.sampleItem} data-stagger-item>
                        <span className={styles.lessonNum} data-cd-num>
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

              {/* Gita Online digitization status */}
              {isGitaOnline && (
                <div className={styles.digitizationNotice}>
                  <h4 className={styles.noticeTitle}>Course Digitization In Progress</h4>
                  <p className={styles.noticeText}>
                    The Bhagavad Gita Online Lesson Course is currently being digitized for web delivery. Lesson 1 is available for introductory study. To register for the active online batch (commenced September 15, 2026), please view the Gathering Calendar in Events.
                  </p>
                  <div className={styles.noticeAction}>
                    <Magnetic strength={0.2}>
                      <Link href="/events/online-gita-course-sep-2026" prefetch={true} className={styles.eventLinkBtn} id="btn-gita-event-link">
                        View Active Batch in Events Calendar →
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              )}

              {/* Residential Gurukula immersion */}
              {isResidential && (
                <div className={styles.residentialDisciplineBox} data-reveal>
                  <span className={styles.pillarTag}>Ashram Gurukula Discipline</span>
                  <h4 className={styles.disciplineTitle}>Traditional Monastic Living</h4>
                  <p className={styles.disciplineText}>
                    The Residential Gita Course is an authentic immersion in the living discipline of a traditional Gurukula. Students observe daily meditation, temple upasana, scriptural contemplation, and community seva alongside the resident Acharyas at Vedanta Ashram, Indore.
                  </p>
                </div>
              )}

              {/* Sangyan pillars */}
              {isSangyan && (
                <div className={styles.sangyanBlock}>
                  <div className={styles.sangyanPillarsGrid} data-stagger>
                    {SANGYAN_PILLARS.map((p, i) => (
                      <div key={p.title} className={styles.sangyanPillarCard}>
                        <span className={styles.pillarNum} data-cd-num>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h5 className={styles.pillarTitle}>{p.title}</h5>
                          <p className={styles.pillarDesc}>{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.sangyanNotice}>
                    <span className={styles.pillarTag}>Community &amp; Family Study</span>
                    <h4 className={styles.noticeTitle}>Vedic Awareness &amp; Dharmic Study</h4>
                    <p className={styles.noticeText}>
                      The Sangyan educational awareness initiative provides grounded scriptural clarity for seekers, youths, and families on the Vedantic vision, temple upasana, and practical values of Sanatan Dharma. You are welcome to explore related audio discourses in the Teachings archive or contact the Ashram for upcoming study circle dates.
                    </p>
                    <div className={styles.noticeAction}>
                      <Magnetic strength={0.2}>
                        <Link href="/teachings" prefetch={true} className={styles.sangyanTeachingsLink} id="link-sangyan-teachings">
                          Explore Recorded Satsangs in Teachings →
                        </Link>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: structure, eligibility, protocol */}
            <TiltCard className={styles.detailsTilt} max={4}>
              <div className={styles.detailsCard} data-reveal>
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
                    <Magnetic strength={0.2}>
                      <Link href="/contact" prefetch={true} className={styles.inquiryBtn} id="btn-inquire-course">
                        Inquire via Ashram Academic Office →
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>
    </article>
  );
}
