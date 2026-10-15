'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/Button';
import CinematicPreFooter from '@/components/cinematic/CinematicPreFooter';
import Magnetic from '@/components/motion/Magnetic';
import TiltCard from '@/components/motion/TiltCard';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
import type { acharyas } from '@/data/acharyas';
import type { teachings } from '@/data/teachings';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

type Acharya = (typeof acharyas)[number];
type Teaching = (typeof teachings)[number];

interface AcharyaProfileClientProps {
  acharya: Acharya;
  relatedTeachings: Teaching[];
  otherAcharyas: Acharya[];
}

export default function AcharyaProfileClient({
  acharya,
  relatedTeachings,
  otherAcharyas,
}: AcharyaProfileClientProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isFounder = !!acharya.isFounder;

  useScrollReveals(rootRef);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) return;

      // Hero intro: name lines rise through masks, backdrop unveils
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('[data-ap-hero-line]', { yPercent: 110 }, { yPercent: 0, duration: 1.3, stagger: 0.12 })
        .fromTo('[data-ap-hero-fade]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.5)
        .fromTo(
          '[data-ap-hero-img]',
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' },
          0.2
        )
        .fromTo('[data-ap-hero-img] img', { scale: 1.25 }, { scale: 1, duration: 2.2, ease: 'power3.out' }, 0.2);

      // Hero backdrop parallax
      gsap.to('[data-ap-hero-img] img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: '[data-ap-hero]', start: 'top top', end: 'bottom top', scrub: true },
      });

      // Scroll progress rail
      gsap.fromTo(
        '[data-ap-progress]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
        }
      );

      // Milestone timeline: the vertical line draws down as you read
      gsap.fromTo(
        '[data-ap-chron-line]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-ap-chron]',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );

      // Milestone years fill saffron as each enters
      gsap.utils.toArray<HTMLElement>('[data-ap-year]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 82%',
          once: true,
          onEnter: () => el.classList.add(styles.yearOn),
        });
      });

      // Discourses: title lines rise, archive cards draw their rules and cascade
      gsap.fromTo(
        '[data-ap-tline]',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: '#teachings', start: 'top 75%', once: true },
        }
      );
      gsap.fromTo(
        '[data-ap-card-rule]',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-ap-cards]', start: 'top 85%', once: true },
        }
      );

      // Subject tags cascade in
      gsap.fromTo(
        '[data-ap-tag]',
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-ap-tags]', start: 'top 85%', once: true },
        }
      );

      // Portrait settles from a slight zoom as the bio section enters
      gsap.fromTo(
        '[data-ap-portrait] img',
        { scale: 1.12 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-ap-bio]', start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const bioHeading = isFounder
    ? 'The Life & Dedication of Poojya Guruji'
    : `Monastic Discipline & Service of ${acharya.honorific}`;

  return (
    <div ref={rootRef} className={styles.profileWrapper}>
      <div className={styles.progressRail} aria-hidden="true">
        <div className={styles.progressFill} data-ap-progress />
      </div>

      {/* 01. Hero */}
      <header className={styles.hero} data-ap-hero aria-labelledby="ap-hero-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/" className={styles.crumb}>Home</Link>
              <span className={styles.crumbSep} aria-hidden="true">/</span>
              <Link href="/acharyas" className={styles.crumb}>The Acharyas</Link>
              <span className={styles.crumbSep} aria-hidden="true">/</span>
              <span className={styles.crumbCurrent}>{acharya.name}</span>
            </nav>

            <h1 id="ap-hero-title" className={styles.heroTitle}>
              <span className={styles.heroLineMask}>
                <span className={styles.heroLine} data-ap-hero-line>{acharya.name}</span>
              </span>
            </h1>
            <p className={styles.heroSubtitle} data-ap-hero-fade>{acharya.honorific}</p>
            <p className={styles.heroLead} data-ap-hero-fade>{acharya.shortBio}</p>

            <div className={styles.heroCtas} data-ap-hero-fade>
              <Magnetic strength={0.22}>
                <a href="#biography" className={styles.ctaPrimary}>Spiritual Biography ↓</a>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a href="#teachings" className={styles.ctaOutline}>Recorded Teachings</a>
              </Magnetic>
            </div>
          </div>

          <figure className={styles.heroFigure} data-ap-hero-img>
            <img
              src={
                isFounder
                  ? '/images/vmission/hero/ashram-facade-dome.jpg'
                  : '/images/vmission/teaching/05-acharya-lineage-restored.jpg'
              }
              alt={`Ashram grounds and monastic quarters of ${acharya.name}`}
              className={styles.heroImg}
              style={{ objectPosition: isFounder ? '50% 34%' : '50% 28%' }}
            />
          </figure>
        </div>
      </header>

      {/* 02. Biography */}
      <section id="biography" className={styles.bioSection} data-ap-bio aria-labelledby="ap-bio-title">
        <div className="container">
          <div className={styles.bioGrid}>
            <div className={styles.portraitCol} data-ap-portrait>
              <figure className={styles.portraitFrame} data-reveal>
                <img
                  src={acharya.image}
                  alt={`Authentic portrait of ${acharya.name}`}
                  className={styles.portraitImg}
                  style={{ objectPosition: isFounder ? 'center 8%' : 'center 10%' }}
                />
                <figcaption className={styles.portraitCaption}>
                  <span>{acharya.honorific} {acharya.name}</span>
                  <span>{acharya.role}</span>
                </figcaption>
              </figure>

              <div className={styles.lineageCard} data-reveal>
                <span className={styles.lineageBadgeLabel}>Monastic Lineage</span>
                <p className={styles.lineageBadgeVal}>{acharya.lineage}</p>
              </div>

              {acharya.archivalNotice && (
                <div className={styles.archivalNoticeBox} data-reveal>
                  <span className={styles.noticeTag}>Archival Notice</span>
                  <p className={styles.noticeText}>{acharya.archivalNotice}</p>
                </div>
              )}
            </div>

            <div className={styles.bioContentCol}>
              <div className={styles.bioHeader} data-reveal>
                <span className={styles.sectionOverline}>Spiritual Life &amp; Service</span>
                <h2 id="ap-bio-title" className={styles.bioHeading}>{bioHeading}</h2>
              </div>

              <div className={styles.narrativeProse}>
                <p className={styles.leadParagraph} data-reveal>{acharya.fullBio}</p>

                {isFounder && (
                  <>
                    <h3 className={styles.subHeading}>Traditional Training at Sandeepany Sadhanalaya</h3>
                    <p>
                      Swami Atmananda Saraswati underwent intensive Gurukula training in Sanskrit, the Upanishads, Bhagavad Gita, and Brahma Sutras with Adi Shankaracharya’s commentaries under the auspices of Chinmaya Mission at Sandeepany Sadhanalaya, Mumbai. Guided by revered master Swami Chinmayananda, Swamiji was initiated into Brahmacharya in 1983 and embraced Sanyas Deeksha in 1987.
                    </p>

                    <h3 className={styles.subHeading}>Establishment of Vedanta Mission &amp; Indore Gurukula</h3>
                    <p>
                      In 1992, Swamiji conceived and founded Vedanta Mission as an educational and spiritual platform dedicated to transmitting Advaita Vedanta as a valid means of knowledge (<em>Pramana</em>). In 1995, Vedanta Ashram was established in Sudama Nagar, Indore, along with the consecration of Sri Gangeshwar Mahadev Mandir, providing a residential Gurukula for monastics and sincere seekers.
                    </p>

                    <div className={styles.dividerWrap} data-reveal>
                      <span className={styles.dividerGlyph} aria-hidden="true">ॐ</span>
                      <span className={styles.dividerSutra}>सत्यं ज्ञानमनन्तं ब्रह्म</span>
                    </div>

                    <h3 className={styles.subHeading}>Verified Historical Milestones</h3>
                    <div className={styles.chronologyList} data-ap-chron>
                      <span className={styles.chronologyRail} aria-hidden="true">
                        <span className={styles.chronologyRailFill} data-ap-chron-line />
                      </span>
                      {acharya.milestones?.map((ms, idx) => (
                        <div key={idx} className={styles.chronologyItem}>
                          <div className={styles.chronologyYear} data-ap-year>{ms.year}</div>
                          <div className={styles.chronologyBody}>
                            <h4 className={styles.chronologyTitle}>{ms.title}</h4>
                            <p className={styles.chronologyDesc}>{ms.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className={styles.coreSubjectsWrap}>
                  <h3 className={styles.subHeading}>Core Scriptural Disciplines</h3>
                  <div className={styles.subjectTags} data-ap-tags>
                    {acharya.teachings.map((subject, idx) => (
                      <span key={idx} className={styles.subjectTag} data-ap-tag>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Discourses */}
      <section id="teachings" className={styles.teachingsSection} aria-labelledby="ap-teachings-title">
        <div className="container">
          <div className={styles.sectionHeaderWrap}>
            <span className={styles.sectionOverline}>Jnana Ganga Archive</span>
            <h2 id="ap-teachings-title" className={styles.sectionTitle}>
              <span className={styles.titleMask}>
                <span className={styles.titleLine} data-ap-tline>Recorded Discourses by</span>
              </span>
              <span className={styles.titleMask}>
                <span className={styles.titleLine} data-ap-tline>{acharya.name}</span>
              </span>
            </h2>
            <p className={styles.sectionLead} data-reveal>
              Systematic scriptural lectures unfolded in the traditional Gurukula method, available for study in the digital archive.
            </p>
            <div className={styles.archiveMeta} data-reveal>
              <span>{String(relatedTeachings.length).padStart(2, '0')} Recordings</span>
              <span className={styles.archiveMetaRule} aria-hidden="true" />
              <span>Digital Archive</span>
            </div>
          </div>

          {relatedTeachings.length > 0 ? (
            <div className={styles.teachingsGrid} data-stagger data-ap-cards>
              {relatedTeachings.map((t, i) => (
                <TiltCard key={t.id} className={styles.tiltWrap} max={5}>
                  <div className={styles.teachingCard}>
                    <span className={styles.cardRule} aria-hidden="true" data-ap-card-rule />
                    <span className={styles.teachingIndex} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={styles.teachingTop}>
                      <span className={styles.teachingCategoryPill}>{t.categoryName}</span>
                      <span className={styles.teachingFormatPill}>
                        {t.format === 'Video' ? '▶ Video Series' : '🎙️ Audio Discourse'}
                      </span>
                    </div>
                    <h3 className={styles.teachingCardTitle}>{t.title}</h3>
                    {t.scripture && (
                      <p className={styles.teachingScripture}>Scripture: {t.scripture}</p>
                    )}
                    <p className={styles.teachingDescription}>{t.description}</p>
                    <div className={styles.teachingAction}>
                      <Button href={`/teachings/${t.slug || t.id}`} variant="outline" size="sm" tone="dark">
                        Open Study Desk →
                      </Button>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          ) : (
            <div className={styles.noTeachingsCard} data-reveal>
              <p>
                Discourse recordings for {acharya.honorific} are being indexed into the digital archive. Visit the discourse hall or browse the master teaching library.
              </p>
              <Button href="/teachings" variant="primary" tone="dark">
                Browse Master Teaching Library →
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 04. Fellowship */}
      <section className={styles.fellowshipSection} aria-labelledby="ap-fellowship-title">
        <div className="container">
          <div className={styles.fellowshipHeader} data-reveal>
            <span className={styles.sectionOverline}>Living Monastic Fellowship</span>
            <h2 id="ap-fellowship-title" className={styles.fellowshipTitle}>Faculty of Vedanta Ashram</h2>
          </div>

          <div className={styles.fellowshipGrid} data-stagger>
            {otherAcharyas.map((other) => (
              <TiltCard key={other.slug} className={styles.tiltWrap} max={4}>
                <Link href={`/acharyas/${other.slug}`} className={styles.fellowshipCard}>
                  <div className={styles.fellowshipThumbnail}>
                    <img
                      src={other.image}
                      alt={`Portrait of ${other.name}`}
                      className={styles.fellowshipImg}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.fellowshipInfo}>
                    <span className={styles.fellowshipRole}>{other.role}</span>
                    <h3 className={styles.fellowshipName}>{other.name}</h3>
                    <p className={styles.fellowshipHonorific}>{other.honorific}</p>
                    <span className={styles.fellowshipArrow} aria-hidden="true">→</span>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 05. Pre-footer */}
      <CinematicPreFooter
        tag="Traditional Inquiry"
        sanskrit="श्रद्धावाँल्लभते ज्ञानं तत्परः संयतेन्द्रियः"
        heading="Study Scripture with the Acharyas"
        subheading="Systematic guidance in Advaita Vedanta at Indore"
        description="Receive direct instruction in the Upanishads, Bhagavad Gita, and Sanskrit foundation through residential shivirs and daily satsangs at Vedanta Ashram."
        ctas={[
          { label: 'Plan an Ashram Visit', href: '/ashram', variant: 'primary' },
          { label: 'All Acharyas & Lineage', href: '/acharyas', variant: 'outline' },
        ]}
        quote={{
          sanskrit: 'ज्ञानेन तु तदज्ञानं येषां नाशितमात्मनः',
          translation: 'For those whose ignorance is destroyed by knowledge of the Self, that knowledge illuminates the Supreme like the sun.',
          source: 'Bhagavad Gita, 5.16',
        }}
      />
    </div>
  );
}
