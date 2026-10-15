'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeachingCard from '@/components/TeachingCard';
import EventCard from '@/components/EventCard';
import Magnetic from '@/components/motion/Magnetic';
import TiltCard from '@/components/motion/TiltCard';
import { useData } from '@/context/DataContext';
import { getAssetPath } from '@/utils/assetPath';
import CinematicEntryOverlay from '@/components/cinematic/CinematicEntryOverlay';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE = [
  'Upanishads',
  'Bhagavad Gita',
  'Brahma Sutras',
  'Tattva Bodha',
  'Vivekachudamani',
  'Atma Bodha',
  'Drig Drushya Viveka',
];

/** Splits copy into words so each one can be revealed on scroll. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} className={styles.word} data-word>
          {word}{' '}
        </span>
      ))}
    </>
  );
}

export default function HomePage() {
  const { events, teachings } = useData();
  const rootRef = useRef<HTMLDivElement>(null);

  const upcomingEvents = events.filter((e) => !e.isPast).slice(0, 2);
  const featuredTeachings = teachings.slice(0, 3);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      /* ---------- Hero intro ---------- */
      // First visit plays the entry overlay (≈1.7s desktop, ≈1.0s mobile); wait for it to clear.
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const introDelay = document.documentElement.classList.contains('vm-entry-seen')
        ? 0.15
        : isMobile
        ? 0.95
        : 1.5;
      gsap.set('[data-hero-line] > span', { yPercent: 115 });
      gsap.set('[data-hero-fade]', { opacity: 0, y: 26 });

      gsap
        .timeline({ delay: introDelay, defaults: { ease: 'expo.out' } })
        .fromTo('[data-hero-img]', { scale: 1.18 }, { scale: 1, duration: 2.4, ease: 'power3.out' }, 0)
        .to('[data-hero-line] > span', { yPercent: 0, duration: 1.4, stagger: 0.14 }, 0.1)
        .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.5);

      /* ---------- Hero parallax ---------- */
      gsap.to('[data-hero-img]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true },
      });

      /* ---------- Image reveals (clip + zoom) ---------- */
      gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(14% 10% 14% 10%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.6,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-zoom] img').forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.22 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      /* ---------- Founder background parallax ---------- */
      gsap.fromTo(
        '[data-founder-bg]',
        { yPercent: -9 },
        {
          yPercent: 9,
          ease: 'none',
          scrollTrigger: { trigger: '[data-founder]', start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );

      /* ---------- Scroll-linked word reveal for the lineage quote ---------- */
      const quote = root.querySelector<HTMLElement>('[data-words]');
      if (quote) {
        gsap.fromTo(
          quote.querySelectorAll('[data-word]'),
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: 'none',
            scrollTrigger: { trigger: quote, start: 'top 78%', end: 'bottom 55%', scrub: true },
          }
        );
      }

      /* ---------- Generic reveals ---------- */
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      /* ---------- Staggered groups ---------- */
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        gsap.fromTo(
          Array.from(group.children),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          }
        );
      });

      /* ---------- Rules that draw in ---------- */
      gsap.utils.toArray<HTMLElement>('[data-rule]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }
        );
      });
    }, root);

    // Recalculate trigger positions once fonts and images have settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = window.setTimeout(refresh, 400);

    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.home} ref={rootRef}>
      <CinematicEntryOverlay />

      {/* ==================================================================
          01 — ARRIVAL
          ================================================================== */}
      <section className={styles.hero} data-hero>
        <div className={styles.heroMedia}>
          <img
            data-hero-img
            src={getAssetPath('/images/vmission/hero/vmission-hero-cinematic.jpg')}
            alt="Vedanta Mission Ashram, Sri Gangeshwar Mahadev Shivling Dome in Indore"
            className={styles.heroImg}
            loading="eager"
          />
          <div className={styles.heroShade} />
        </div>

        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            <span className={styles.lineMask} data-hero-line>
              <span>Vedanta</span>
            </span>{' '}
            <span className={styles.lineMask} data-hero-line>
              <span>Mission</span>
            </span>
          </h1>

          <div className={styles.heroFoot}>
            <p className={styles.heroSanskrit} data-hero-fade>
              सत्यं ज्ञानमनन्तं ब्रह्म
            </p>
            <div className={styles.heroCopy} data-hero-fade>
              <p className={styles.heroDescription}>
                A residential Gurukula in Indore, Central India, dedicated to the systematic study of the Upanishads, Bhagavad Gita, and Brahma Sutras under the guidance of Poojya Swami Atmananda Saraswati.
              </p>
              <div className={styles.heroCtas}>
                <Magnetic>
                  <Link href="/teachings" className={styles.btnPrimary} data-cursor-text="Listen">
                    Explore the Teachings
                    <span aria-hidden="true">→</span>
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link href="/ashram" className={styles.btnGhost}>
                    About the Ashram
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={`${item}-${i}`}>
                {item}
                <i>✦</i>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          02 — THE PLACE
          ================================================================== */}
      <section className={styles.ashram}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.eyebrow} data-reveal>Ashram &amp; Mandir · Est. 1995</span>
            <h2 className={styles.h2} data-reveal>
              Sri Gangeshwar Mahadev <em>&amp; Vedanta Ashram</em>
            </h2>
            <p className={styles.lead} data-reveal>
              Nestled in Indore, Central India, Vedanta Ashram is a living residential Gurukula where full-time Brahmacharis and visiting seekers dedicate themselves to traditional Vedic study, daily worship, and contemplative silence.
            </p>
          </header>

          <div className={styles.ashramGrid}>
            <figure className={styles.landmark}>
              <div className={styles.landmarkFrame} data-clip data-zoom>
                <img
                  src={getAssetPath('/images/vmission/ashram/gangeshwar-dome-closeup.jpg')}
                  alt="Sri Gangeshwar Mahadev Monumental Shivling Dome at Vedanta Ashram"
                  loading="lazy"
                />
              </div>
              <figcaption className={styles.caption}>
                <strong>Sri Gangeshwar Mahadev Mandir</strong>
                <span>Towering white architectural emblem of contemplative stillness</span>
              </figcaption>
            </figure>

            <div className={styles.ashramCol}>
              <p className={styles.bodyLarge} data-reveal>
                At the heart of the Ashram rises the unique white dome structure modeled as a monumental Shiva Linga, consecrated in 1995. It stands as a living testament to the primordial Guru, Lord Shiva, whose grace guides all sincere inquirers toward non-dual Self-knowledge.
              </p>

              <div className={styles.schedule} data-reveal>
                <div className={styles.scheduleHead}>
                  <h3>Daily Ashram Rhythm of Worship</h3>
                  <span>Open Daily to All Seekers</span>
                </div>
                <div data-rule className={styles.rule} />
                <ul className={styles.scheduleList}>
                  <li className={styles.scheduleRow}>
                    <span className={styles.time}>07:00 AM</span>
                    <div>
                      <strong>Morning Vedic Abhishek &amp; Shiva Sahasranama</strong>
                      <span>Traditional Bilva offerings, Stotram chanting, and morning prayers</span>
                    </div>
                  </li>
                  <li className={styles.scheduleRow}>
                    <span className={styles.time}>06:30 PM</span>
                    <div>
                      <strong>Sandhya Aarti &amp; Silent Upanishadic Reflection</strong>
                      <span>Evening lamp offering, Stotram singing, and contemplative meditation</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className={styles.vignettes} data-stagger>
                <div className={styles.vignette} data-cursor-text="View">
                  <div className={styles.vignetteImg} data-zoom>
                    <img
                      src={getAssetPath('/images/vmission/ashram/sanctum-doors-threshold.jpg')}
                      alt="Carved Teakwood Sanctum Doors"
                      loading="lazy"
                    />
                  </div>
                  <h4>Mandir Entrance</h4>
                  <span>Hand-carved teakwood sanctum entrance</span>
                </div>
                <div className={styles.vignette} data-cursor-text="View">
                  <div className={styles.vignetteImg} data-zoom>
                    <img
                      src={getAssetPath('/images/vmission/worship/morning-aarti.jpg')}
                      alt="Morning Aarti at Sri Gangeshwar Temple"
                      loading="lazy"
                    />
                  </div>
                  <h4>Morning Aarti</h4>
                  <span>Daily Vedic chanting &amp; evening prayers</span>
                </div>
              </div>

              <div className={styles.actions} data-reveal>
                <Magnetic>
                  <Link href="/ashram" className={styles.btnPrimary}>
                    Plan Ashram Visit &amp; Darshan <span aria-hidden="true">→</span>
                  </Link>
                </Magnetic>
                <Link href="/contact" className={styles.textLink}>
                  Directions &amp; Campus Map →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          03 — THE VISION (dark)
          ================================================================== */}
      <section className={styles.lineage}>
        <div className="container">
          <div className={styles.lineageHead}>
            <span className={styles.eyebrowLight} data-reveal>Unbroken Guru-Shishya Parampara</span>
            <h2 className={styles.h2Light} data-reveal>The Vision of Advaita Vedanta</h2>
          </div>

          <blockquote className={styles.quote} data-words>
            <Words text="“Advaita Vedanta is not a speculative philosophy or belief system, but a direct means of knowledge (Pramana) that resolves the fundamental human yearning for freedom. Through systematic inquiry into the Upanishads, the seeker discovers the non-dual Self: pure Consciousness, limitless and untouched by sorrow.”" />
          </blockquote>

          <ol className={styles.pillars} data-stagger>
            <li className={styles.pillar}>
              <span className={styles.pillarNumeral}>I</span>
              <h3>Shastra Pramana</h3>
              <p>
                The Upanishads, Bhagavad Gita, and Brahma Sutras (Prasthanatraya) serving as the authoritative means of knowledge (Pramana) for resolving the notion of individuality.
              </p>
            </li>
            <li className={styles.pillar}>
              <span className={styles.pillarNumeral}>II</span>
              <h3>Guru-Shishya Lineage</h3>
              <p>
                The unbroken oral transmission of the methodology of Self-inquiry handed down from Sri Adi Shankaracharya and traditional preceptors through direct teaching.
              </p>
            </li>
            <li className={styles.pillar}>
              <span className={styles.pillarNumeral}>III</span>
              <h3>Adhyaropa-Apavada</h3>
              <p>
                The classical pedagogy of deliberate superimposition followed by systematic negation, guiding the inquirer beyond all mental constructs to direct recognition of the non-dual Self.
              </p>
            </li>
          </ol>

          <p className={styles.bridge} data-reveal>
            In this unbroken stream of wisdom, meet the Acharya whose dedicated life and sadhana manifested Vedanta Mission.
          </p>
        </div>
      </section>

      {/* ==================================================================
          04 — THE FOUNDING ACHARYA (full-bleed)
          ================================================================== */}
      <section className={styles.founder} data-founder>
        <div className={styles.founderMedia}>
          <img
            data-founder-bg
            src={getAssetPath('/images/vmission/acharyas/swami-atmananda-saraswati/founder-portrait.png')}
            alt="Poojya Guruji Swami Atmananda Saraswati in natural Bhagwa robes beside the river"
            className={styles.founderImg}
            loading="lazy"
          />
          <div className={styles.founderShade} />
        </div>

        <div className={`container ${styles.founderContainer}`}>
          <div className={styles.founderCol}>
            <span className={styles.eyebrowLight} data-reveal>Founding Acharya</span>
            <h2 className={styles.founderName} data-reveal>
              Swami Atmananda
              <br />
              Saraswati
            </h2>
            <div className={styles.honorific} data-reveal>
              <span className={styles.devanagari}>पूज्य गुरुजी</span>
              <span className={styles.honorificSep}>/</span>
              <span>Poojya Guruji</span>
            </div>
            <p className={styles.founderBio} data-reveal>
              Renowned scholar of Advaita Vedanta and founder of <strong>Vedanta Mission (1992)</strong>, dedicated to unfolding the traditional teachings of the Bhagavad Gita, Upanishads, and classical Vedantic texts through authentic Guru-shishya parampara in India and abroad.
            </p>

            <div className={styles.timeline} data-stagger>
              <div className={styles.timelineItem}>
                <span>1987</span>
                <strong>Sanyas Deeksha</strong>
              </div>
              <div className={styles.timelineItem}>
                <span>1992</span>
                <strong>Vedanta Mission</strong>
              </div>
              <div className={styles.timelineItem}>
                <span>1995</span>
                <strong>Indore Gurukula</strong>
              </div>
            </div>

            <div className={styles.actions} data-reveal>
              <Magnetic>
                <Link href="/acharyas/swami-atmananda-saraswati" className={styles.btnLight}>
                  Meet Poojya Guruji <span aria-hidden="true">→</span>
                </Link>
              </Magnetic>
              <Link href="/teachings" className={styles.textLinkLight}>
                Explore His Teachings →
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.provenance}>Canonical Ashram Archive · Riverside Satsang</div>
      </section>

      {/* ==================================================================
          05 — JNANA GANGA (teachings)
          ================================================================== */}
      <section className={styles.teachings}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.eyebrow} data-reveal>Jnana Ganga · The Repository of Wisdom</span>
            <h2 className={styles.h2} data-reveal>Systematic Scriptural Study</h2>
            <p className={styles.lead} data-reveal>
              Poojya Guruji&apos;s four decades of sadhana culminate in the systematic, verse-by-verse unfolding of the Prasthanatraya. Explore the verified discourses cataloged within the Jnana Ganga archive.
            </p>
          </header>

          <div className={styles.shastraGrid} data-stagger>
            <TiltCard className={styles.shastraCard}>
              <span className={styles.cardNum}>I</span>
              <h3>Bhagavad Gita</h3>
              <p>
                Expositions on Karma Yoga, Bhakti Yoga, and Jnana Yoga, clarifying the integration of selfless action and devotion in daily life.
              </p>
              <Link href="/teachings?category=bhagavad-gita" className={styles.cardLink}>
                Explore Gita Pravachans <span aria-hidden="true">→</span>
              </Link>
            </TiltCard>

            <TiltCard className={styles.shastraCard}>
              <span className={styles.cardNum}>II</span>
              <h3>Principal Upanishads</h3>
              <p>
                Deep audio inquiries into Mandukya, Taittiriya, and Katha Upanishads, revealing the non-dual Self beyond waking, dream, and deep sleep.
              </p>
              <Link href="/teachings?category=upanishads" className={styles.cardLink}>
                Explore Upanishad Series <span aria-hidden="true">→</span>
              </Link>
            </TiltCard>

            <TiltCard className={styles.shastraCard}>
              <span className={styles.cardNum}>III</span>
              <h3>Prakarana Granths</h3>
              <p>
                Foundational introductory treatises including Vivekachudamani, Atma Bodha, and Drig Drushya Viveka for systematic Self-inquiry.
              </p>
              <Link href="/teachings?category=prakarana-granth" className={styles.cardLink}>
                Access Prakarana Lectures <span aria-hidden="true">→</span>
              </Link>
            </TiltCard>
          </div>

          <div className={styles.audioHead} data-reveal>
            <h3>Recent Discourses in Jnana Ganga</h3>
            <Link href="/teachings" className={styles.textLink}>
              View All Discourses &amp; Playlists →
            </Link>
          </div>

          <div className={styles.cardGrid3} data-stagger>
            {featuredTeachings.map((teaching) => (
              <TeachingCard key={teaching.id} teaching={teaching} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          06 — LITERARY HERITAGE
          ================================================================== */}
      <section className={styles.publications}>
        <div className="container">
          <header className={styles.sectionHeadCenter}>
            <span className={styles.eyebrow} data-reveal>Free Digital Literature</span>
            <h2 className={styles.h2} data-reveal>
              Monthly Ezines <em>&amp; Vedantic Treatises</em>
            </h2>
            <p className={styles.lead} data-reveal>
              Spreading the traditional teachings of the Upanishads through monthly digital magazines distributed freely to seekers globally for over 25 years.
            </p>
          </header>

          <div className={styles.covers} data-stagger>
            <TiltCard className={styles.pubCard}>
              <div className={`${styles.cover} ${styles.coverInk}`}>
                <span className={styles.coverBadge}>English &amp; Hindi · Continuous since 2000</span>
                <div className={styles.coverBody}>
                  <div className={styles.coverEmblem}>ॐ</div>
                  <h4>VEDANTA SANDESH</h4>
                  <p>A Monthly Journal of Advaita Vedanta</p>
                  <span className={styles.coverIssue}>March 2026 Issue</span>
                </div>
              </div>
              <div className={styles.pubDetails}>
                <h3>Vedanta Sandesh</h3>
                <p>
                  Published continuously every month for over a quarter century. Features verse-by-verse Gita commentaries, Upanishadic reflections, and articles by Swami Atmananda Saraswati.
                </p>
                <div className={styles.pubMeta}>
                  <span>300+ Issues Archived</span>
                  <span>Free Global PDF Access</span>
                </div>
                <Link href="/publications" className={styles.textLink}>
                  Read Current Issue &amp; Archives →
                </Link>
              </div>
            </TiltCard>

            <TiltCard className={styles.pubCard}>
              <div className={`${styles.cover} ${styles.coverPaper}`}>
                <span className={styles.coverBadgeDark}>Hindi &amp; Gujarati · Monthly</span>
                <div className={styles.coverBody}>
                  <div className={styles.coverEmblemDark}>वेदान्त</div>
                  <h4>VEDANTA PIYUSH</h4>
                  <p>Spiritual Reflections in Regional Languages</p>
                  <span className={styles.coverIssueDark}>Monthly Edition</span>
                </div>
              </div>
              <div className={styles.pubDetails}>
                <h3>Vedanta Piyush</h3>
                <p>
                  A dedicated regional language monthly publication offering lucid elucidations of Sanskrit verses, traditional Stotrams, and practical sadhana guidance for regional seekers.
                </p>
                <div className={styles.pubMeta}>
                  <span>Complete Digital Edition</span>
                  <span>Free Distribution</span>
                </div>
                <Link href="/publications" className={styles.textLink}>
                  Browse Piyush Archives →
                </Link>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ==================================================================
          07 — RETREATS & SATSANG
          ================================================================== */}
      <section className={styles.events}>
        <div className="container">
          <header className={styles.sectionHeadCenter}>
            <span className={styles.eyebrow} data-reveal>Satsang &amp; Camps</span>
            <h2 className={styles.h2} data-reveal>
              Residential Retreats <em>&amp; Yagnas</em>
            </h2>
            <p className={styles.lead} data-reveal>
              Participate in intensive scripture study camps, Gyana Yagnas, and annual festival celebrations at Vedanta Ashram, Indore.
            </p>
          </header>

          <div className={styles.cardGrid2} data-stagger>
            {upcomingEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>

          <div className={styles.centerLink} data-reveal>
            <Link href="/events" className={styles.textLink}>
              View Complete Events Calendar →
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================
          08 — SEVA
          ================================================================== */}
      <section className={styles.seva}>
        <div className="container">
          <div className={styles.sevaInner}>
            <p className={styles.sevaKicker} data-reveal>SEVA &amp; SUPPORT</p>
            <h2 className={styles.sevaTitle} data-reveal>
              Support the Gurukula <em>&amp; Mission</em>
            </h2>
            <div className={styles.sevaGrid}>
              <p className={styles.sevaText} data-reveal>
                Vedanta Mission is sustained by the voluntary offerings of devotees and seekers. Your seva directly supports full-time Vedanta Brahmacharis, daily Annadanam, the free global distribution of spiritual literature, and the maintenance of Sri Gangeshwar Mahadev Mandir.
              </p>
              <div className={styles.sevaActions} data-reveal>
                <Magnetic>
                  <Link href="/donate" className={styles.btnLight}>
                    Support the Ashram <span aria-hidden="true">→</span>
                  </Link>
                </Magnetic>
                <Link href="/ashram" className={styles.btnGhostLight}>
                  Plan Ashram Visit
                </Link>
              </div>
            </div>
            <p className={styles.sevaTrust} data-reveal>
              Administered through registered <strong>Vedanta Parmarthic Sewa Trust</strong> · Eligible for 80-G Income Tax Exemption
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
