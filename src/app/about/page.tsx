'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { getAssetPath } from '@/utils/assetPath';
import Button from '@/components/Button';
import Magnetic from '@/components/motion/Magnetic';
import TiltCard from '@/components/motion/TiltCard';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
import styles from './page.module.css';

const verifiedMilestones = [
  {
    year: '1983',
    title: 'Brahmacharya Initiation',
    detail: 'Completed intensive scriptural study in Advaita Vedanta at Sandeepany Sadhanalaya, Mumbai, under the Chinmaya Mission.',
  },
  {
    year: '1987',
    title: 'Sanyas Deeksha',
    detail: 'Embraced the sacred vows of Sanyas into the Dashanami Saraswati monastic order as a dedicated, full-time teacher of the Upanishads.',
  },
  {
    year: '1992',
    title: 'Founding of Vedanta Mission',
    detail: 'Conceived and established Vedanta Mission as a non-profit spiritual and educational organization dedicated to the authentic transmission of Vedanta.',
  },
  {
    year: '1995',
    title: 'Indore Gurukula Establishment',
    detail: 'Consecrated Vedanta Ashram and the monumental Sri Gangeshwar Mahadev Mandir in Sudama Nagar, Indore, initiating residential Gurukula training.',
  },
];

const pillars = [
  {
    numeral: 'I',
    tag: 'Discernment',
    heading: 'Swadhyaya',
    sanskrit: 'स्वाध्याय · Scriptural Inquiry',
    desc: 'Rigorous, systematic study of the Upanishads, Bhagavad Gita, and Brahma Sutras (Prasthanatraya). The scriptures are approached not as dogma, but as a valid means of knowledge (Pramana) that directly removes self-ignorance.',
  },
  {
    numeral: 'II',
    tag: 'Association',
    heading: 'Satsanga',
    sanskrit: 'सत्संग · Living Contemplation',
    desc: 'Direct communion with truth in the company of qualified Acharyas. Through daily discourses, informal question-and-answer satsangs, and silent meditation, the seeker’s doubts are systematically dissolved.',
  },
  {
    numeral: 'III',
    tag: 'Dedication',
    heading: 'Seva',
    sanskrit: 'सेवा · Selfless Action',
    desc: 'Dedicated, non-commercial service performed as Ishwara-arpanam (offering to the Divine). Seva purifies the mind (Chitta-shuddhi), cultivating the inner humility and detachment essential for direct spiritual appreciation.',
  },
];

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveals(rootRef);

  // Hero intro + scrubbed timeline spine
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('[data-about-hero-img]', { scale: 1.18, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out' })
        .fromTo('[data-about-hero-line]', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.3)
        .fromTo('[data-about-hero-fade]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.8);

      gsap.to('[data-about-hero-img]', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: '[data-about-hero]', start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.fromTo(
        '[data-timeline-fill]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
        }
      );

      gsap.utils.toArray<HTMLElement>('[data-pillar-num]').forEach((num) => {
        gsap.fromTo(
          num,
          { color: 'transparent', WebkitTextStroke: '1.5px #f4f1ea' },
          {
            color: '#e06328',
            WebkitTextStroke: '1.5px #e06328',
            scrollTrigger: { trigger: num, start: 'top 75%', end: 'top 40%', scrub: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.about} ref={rootRef}>
      {/* 01. Arrival hero */}
      <section className={styles.hero} aria-label="About Vedanta Mission Hero" data-about-hero>
        <div className={styles.heroBackdrop}>
          <img
            src={getAssetPath('/images/vmission/entrance/ashram-entrance-cinematic.jpg')}
            alt="Courtyard and consecrated temple entrance of Vedanta Ashram, Indore"
            className={styles.heroImg}
            data-about-hero-img
            loading="eager"
          />
          <div className={styles.heroShade} />
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroIdentity} data-about-hero-fade>
              <span>Traditional Advaita Vedanta</span>
              <span className={styles.heroDot}>·</span>
              <span>Lineage of Adi Shankaracharya</span>
              <span className={styles.heroDot}>·</span>
              <span>Founded 1992</span>
            </div>

            <p className={styles.heroSanskrit} data-about-hero-fade>सत्यं ज्ञानमनन्तं ब्रह्म</p>

            <h1 className={styles.heroTitle}>
              <span className={styles.lineMask}>
                <span className={styles.lineInner} data-about-hero-line>Revealing the Eternal</span>
              </span>
              <span className={styles.lineMask}>
                <span className={`${styles.lineInner} ${styles.heroSubTitle}`} data-about-hero-line>Oneness of All Life</span>
              </span>
            </h1>

            <p className={styles.heroDescription} data-about-hero-fade>
              Founded in 1992 by Poojya Swami Atmananda Saraswati, Vedanta Mission is an authentic Gurukula dedicated to the traditional, unadulterated unfolding of Advaita Vedanta as a valid means of knowledge (Pramana) for sincere seekers worldwide.
            </p>

            <div className={styles.heroCtas} data-about-hero-fade>
              <Magnetic strength={0.25}>
                <Button href="#vision" variant="primary" size="lg" tone="dark">
                  The Vision ↓
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button href="#journey" variant="outline" size="lg" tone="dark">
                  Living History &amp; Milestones
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Vision */}
      <section id="vision" className={styles.vision} aria-label="Sacred Purpose & Vision">
        <div className="container">
          <div className={styles.visionGrid}>
            <div className={styles.landmark} data-clip>
              <div className={styles.frame}>
                <img
                  src={getAssetPath('/images/vmission/ashram/courtyard-with-guruji.jpg')}
                  alt="Poojya Swami Atmananda Saraswati in the peaceful ashram courtyard at Indore"
                  className={styles.frameImg}
                  loading="lazy"
                  data-zoom
                />
                <div className={styles.cornerOm} aria-hidden="true">ॐ</div>
              </div>
              <div className={styles.caption}>
                <strong>A Living Gurukula Tradition</strong>
                <span>Poojya Swami Atmananda Saraswati at Vedanta Ashram, Indore</span>
              </div>
            </div>

            <div className={styles.narrative}>
              <span className={styles.eyebrow} data-reveal>Our Sacred Purpose</span>
              <h2 className={styles.h2} data-reveal>Spreading &lsquo;Love &amp; Light&rsquo;</h2>

              <div className={styles.motto} data-reveal>
                <blockquote className={styles.mottoText}>
                  &ldquo;Spreading &lsquo;Love &amp; Light&rsquo; by revealing the basic oneness of all.&rdquo;
                </blockquote>
                <cite className={styles.mottoCite}>— Official Motto of Vedanta Mission</cite>
              </div>

              <div className={styles.verse} data-reveal>
                <p className={styles.verseText}>
                  आत्मैव हि परं ब्रह्म नान्यदस्तीति निश्चयः ।<br />
                  ज्ञानेनानेन मुच्यन्ते भवबन्धविवर्जिताः ॥
                </p>
                <p className={styles.verseMeaning}>
                  &ldquo;The Self alone is the Supreme Reality (Brahman); there is nothing else. By this knowledge alone, seekers are freed from all bondage.&rdquo;
                </p>
              </div>

              <div className={styles.prose} data-reveal>
                <p>
                  Vedanta Mission stands upon the teaching of the Upanishads: that the essential nature of the individual seeker (<em>Jiva</em>), the cosmic creator (<em>Ishwara</em>), and the world (<em>Jagat</em>) is non-different—one undivided, self-luminous Consciousness (<em>Brahman</em>).
                </p>
                <p>
                  Spiritual confusion and sorrow are born of mistaken identity. By methodically unfolding the sacred scriptures under the traditional guidance of qualified Acharyas, the Mission works to remove fundamental ignorance, illuminating the innate peace inherent in every human heart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Threefold Sadhana */}
      <section className={styles.pillars} aria-label="The Threefold Sadhana">
        <div className="container">
          <div className={styles.intro}>
            <span className={styles.eyebrow} data-reveal>Core Pedagogy</span>
            <h2 className={styles.h2} data-reveal>The Threefold Sadhana of the Mission</h2>
            <div className={styles.rule} data-rule />
            <p className={styles.lead} data-reveal>
              The path of spiritual inquiry according to the Shankara tradition harmonizes systematic study, living contemplation, and dedicated selfless service.
            </p>
          </div>

          <div className={styles.pillarGrid} data-stagger>
            {pillars.map((p) => (
              <div key={p.heading} className={styles.pillar}>
                <div className={styles.pillarTop}>
                  <span className={styles.pillarNum} data-pillar-num>{p.numeral}</span>
                  <span className={styles.pillarTag}>{p.tag}</span>
                </div>
                <h3 className={styles.pillarHeading}>{p.heading}</h3>
                <p className={styles.pillarSanskrit}>{p.sanskrit}</p>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. Living history */}
      <section id="journey" className={styles.journey} aria-label="Historical Milestones">
        <div className="container">
          <div className={styles.intro}>
            <span className={styles.eyebrow} data-reveal>Living History</span>
            <h2 className={styles.h2} data-reveal>Four Decades of Unbroken Dedication</h2>
            <div className={styles.rule} data-rule />
            <p className={styles.lead} data-reveal>
              Trace the verified chronological milestones of Poojya Swami Atmananda Saraswati and the establishment of the Indore Gurukula.
            </p>
          </div>

          <div className={styles.journeyGrid}>
            <div className={styles.timeline} data-timeline>
              <div className={styles.spine}>
                <div className={styles.spineFill} data-timeline-fill />
              </div>
              {verifiedMilestones.map((m) => (
                <div key={m.year} className={styles.milestone} data-reveal>
                  <div className={styles.milestoneYear}>{m.year}</div>
                  <div className={styles.milestoneBody}>
                    <h3 className={styles.milestoneTitle}>{m.title}</h3>
                    <p className={styles.milestoneDetail}>{m.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.archive}>
              <div className={styles.frame} data-clip>
                <img
                  src={getAssetPath('/images/vmission/teaching/07-vedanta-archive-restored.jpg')}
                  alt="Historical Vedanta Pravachan Archive photograph illustrating decades of scriptural teaching"
                  className={styles.frameImg}
                  loading="lazy"
                  data-zoom
                />
                <div className={styles.cornerOm} aria-hidden="true">ॐ</div>
              </div>
              <div className={styles.caption}>
                <strong>Historical Pravachan Archive</strong>
                <span>Decades of systematic Upanishad discourses and monastic teaching in the tradition of Adi Shankaracharya</span>
              </div>

              <div className={styles.heritage} data-reveal>
                <span className={styles.heritageTag}>Tradition of Shankaracharya</span>
                <p className={styles.heritageText}>
                  From Sandeepany Sadhanalaya in 1983 to the consecration of the white Shivling dome at Vedanta Ashram in 1995, every chapter reflects a single commitment: preserving the authentic methodology of Advaita Vedanta without commercial compromise.
                </p>
                <Link href="/acharyas" className={styles.heritageLink}>
                  Meet the Living Acharyas of the Lineage →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Trusts */}
      <section id="trusts" className={styles.trusts} aria-label="Registered Public Charitable Trusts">
        <div className="container">
          <div className={styles.intro}>
            <span className={styles.eyebrow} data-reveal>Governance &amp; Fiduciary Integrity</span>
            <h2 className={styles.h2} data-reveal>Registered Public Charitable Trusts</h2>
            <div className={styles.rule} data-rule />
            <p className={styles.lead} data-reveal>
              All spiritual, cultural, and educational activities of Vedanta Mission are conducted under registered, non-profit public charitable trusts in India.
            </p>
          </div>

          <div className={styles.trustGrid} data-stagger>
            <TiltCard max={5} className={styles.trustCard}>
              <span className={styles.trustNumeral}>Trust I</span>
              <h3 className={styles.trustName}>Vedanta Parmarthik Seva Trust</h3>
              <p className={styles.trustSub}>वेदान्त पारमार्थिक सेवा ट्रस्ट · Indore, MP</p>
              <p className={styles.trustPurpose}>
                The primary operational trust governing the facilities of Vedanta Ashram, Sri Gangeshwar Mahadev Mandir, Gurukula accommodation, and daily worship.
              </p>
              <dl className={styles.charter}>
                <div className={styles.charterRow}>
                  <dt>Jurisdiction</dt>
                  <dd>Registrar of Public Trusts, Indore, Madhya Pradesh</dd>
                </div>
                <div className={styles.charterRow}>
                  <dt>Focus Areas</dt>
                  <dd>Temple maintenance, daily Annakshetra, residential Gurukula care, monastic seva</dd>
                </div>
              </dl>
            </TiltCard>

            <TiltCard max={5} className={styles.trustCard}>
              <span className={styles.trustNumeral}>Trust II</span>
              <h3 className={styles.trustName}>Vedanta Mission Trust</h3>
              <p className={styles.trustSub}>वेदान्त मिशन ट्रस्ट · Educational &amp; Outreach</p>
              <p className={styles.trustPurpose}>
                The educational and publications trust dedicated to the global dissemination of Vedantic knowledge through free literature, monthly e-magazines, and digital audio-video archives.
              </p>
              <dl className={styles.charter}>
                <div className={styles.charterRow}>
                  <dt>Jurisdiction</dt>
                  <dd>Public Charitable Trust Registered in India</dd>
                </div>
                <div className={styles.charterRow}>
                  <dt>Focus Areas</dt>
                  <dd>Free scriptural publications, Vedanta Sandesh e-magazine, recorded discourses, outreach</dd>
                </div>
              </dl>
            </TiltCard>
          </div>

          <div className={styles.governance} data-reveal>
            <div className={styles.governanceIcon} aria-hidden="true">🏛️</div>
            <div>
              <h4 className={styles.governanceTitle}>Honorary Stewardship &amp; Ethical Governance</h4>
              <p className={styles.governanceText}>
                All trustees and monastic directors serve entirely in an honorary capacity. Vedanta Mission operates strictly on a non-commercial, voluntary seva basis. Detailed audited financial statements and banking channels are maintained under Indian regulatory standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06. Pre-footer */}
      <section className={styles.preFooter} aria-label="Continue Exploration">
        <div className="container">
          <div className={styles.preFooterInner}>
            <span className={styles.eyebrow} data-reveal>Explore Vedanta Mission</span>
            <h2 className={styles.preFooterTitle} data-reveal>Visit the Ashram &amp; Listen to Discourses</h2>
            <p className={styles.preFooterLead} data-reveal>
              Whether seeking systematic scriptural study in our digital library or planning a peaceful visit to the Indore sanctum, the doors of the Gurukula are open.
            </p>
            <div className={styles.preFooterCtas} data-reveal>
              <Magnetic strength={0.25}>
                <Button href="/teachings" variant="primary" size="lg">
                  Explore Jnana Ganga Library →
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button href="/ashram" variant="outline" size="lg">
                  Visit Vedanta Ashram, Indore
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
