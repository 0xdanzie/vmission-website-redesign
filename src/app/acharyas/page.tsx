'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { acharyas } from '@/data/acharyas';
import { teachings } from '@/data/teachings';
import { getAssetPath } from '@/utils/assetPath';
import Button from '@/components/Button';
import Magnetic from '@/components/motion/Magnetic';
import TiltCard from '@/components/motion/TiltCard';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
import CinematicPreFooter from '@/components/cinematic/CinematicPreFooter';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

const heroLead =
  'In the traditional lineage of Adi Shankaracharya, the liberating vision of the Upanishads is not grasped by independent speculation alone. It requires an authentic teacher steeped in the traditional methodology (Sampradaya-vit). Meet the monastics guiding seekers at Vedanta Ashram, Indore.';

const paramparaLead =
  'Vedanta is regarded in Indian philosophy as a valid means of knowledge (Pramana)—a mirror capable of revealing the true nature of the conscious Self (Atman) as non-different from the infinite reality (Brahman).';

const lineagePoints = [
  {
    num: '01',
    title: 'Adi Shankaracharya Tradition',
    text: 'Our Acharyas trace their spiritual lineage through the classical monastic order established by Adi Shankaracharya in the 8th century, maintaining faithful allegiance to his commentaries on the Prasthana Traya.',
  },
  {
    num: '02',
    title: 'Dashanami Saraswati Order',
    text: 'Initiated under the vows of classical Sanyas into the Dashanami Saraswati sub-order, dedicated wholly to the pursuit of knowledge, scriptural teaching, and renunciant Gurukula life.',
  },
  {
    num: '03',
    title: 'Systematic Pedagogy (Pramana-vichara)',
    text: 'Teaching through systematic word-by-word exposition (Bhashya) and structured inquiry, without personal dogma, esoteric mystification, or dilution of the non-dual vision.',
  },
];

// Split a sentence into word spans for scroll-driven word lighting.
function Words({ text }: { text: string }) {
  return (
    <span data-words>
      {text.split(' ').map((w, i) => (
        <span key={i} data-word className={styles.word}>
          {w}{' '}
        </span>
      ))}
    </span>
  );
}

export default function AcharyasPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  const founder = acharyas.find((a) => a.isFounder) || acharyas[0];
  const residentAcharyas = acharyas.filter((a) => !a.isFounder);
  const featuredTeachings = teachings.slice(0, 3);

  useScrollReveals(rootRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .fromTo('[data-hero-mask]', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.6 }, 0)
        .fromTo(heroImgRef.current, { scale: 1.2 }, { scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
        .fromTo('[data-hero-line]', { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.13 }, 0.5)
        .fromTo('[data-hero-fade]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.9);

      gsap.to(heroImgRef.current, {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true },
      });

      // Founder portrait: image crossfades with a vertical scrub as the bio passes
      gsap.utils.toArray<HTMLElement>('[data-lineage-point]').forEach((el) => {
        gsap.fromTo(
          el.querySelector('[data-point-bar]'),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: true },
          }
        );
      });

      // Horizontal lineage gallery (desktop only; stacked on smaller screens)
      const mm = gsap.matchMedia();
      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        const wrap = wrapRef.current;
        const pin = pinRef.current;
        const rail = railRef.current;
        if (!track || !wrap || !pin || !rail) return;

        const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);
        const gallery = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            pin,
            pinSpacing: true,
            pinType: 'transform',
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gallery.to(track, { x: () => -distance(), ease: 'none' }, 0);
        gallery.fromTo(rail, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
      });

      // Pointer parallax on the hero image
      const onMove = (e: PointerEvent) => {
        if (!heroImgRef.current || window.innerWidth < 900) return;
        const x = (e.clientX / window.innerWidth - 0.5) * -24;
        const y = (e.clientY / window.innerHeight - 0.5) * -16;
        gsap.to(heroImgRef.current, { x, y, duration: 1.4, ease: 'power3.out', overwrite: 'auto' });
      };
      window.addEventListener('pointermove', onMove);

      return () => window.removeEventListener('pointermove', onMove);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.hall} ref={rootRef}>
      {/* 01. Hero */}
      <section className={styles.hero} data-hero aria-label="The Monastic Lineage Hall">
        <div className={styles.heroMedia} data-hero-mask>
          <img
            ref={heroImgRef}
            src={getAssetPath('/images/vmission/hero/ashram-facade-dome.jpg')}
            alt="Ashram facade and dome of Vedanta Ashram, Indore"
            className={styles.heroImg}
            loading="eager"
          />
          <div className={styles.heroShade} />
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            <nav className={styles.crumbs} aria-label="Breadcrumb" data-hero-fade>
              <Link href="/">Home</Link>
              <span>/</span>
              <span>The Acharyas</span>
            </nav>

            <p className={styles.heroBadge} data-hero-fade>
              Guru-Shishya Parampara · Dashanami Saraswati Order
            </p>

            <p className={styles.heroSanskrit} data-hero-fade>
              सदाशिवसमारम्भां शङ्कराचार्यमध्यमाम् । अस्मदाचार्यपर्यन्तां वन्दे गुरुपरम्पराम् ॥
            </p>

            <h1 className={styles.heroTitle}>
              <span className={styles.lineMask}>
                <span className={styles.lineInner} data-hero-line>The Monastic</span>
              </span>
              <span className={styles.lineMask}>
                <span className={`${styles.lineInner} ${styles.heroItalic}`} data-hero-line>Lineage Hall</span>
              </span>
            </h1>

            <p className={styles.heroSub} data-hero-fade>Living Teachers of the Advaita Tradition</p>
            <p className={styles.heroLead} data-hero-fade>{heroLead}</p>

            <div className={styles.heroCtas} data-hero-fade>
              <Magnetic strength={0.25}>
                <Button href="#founder" variant="primary" size="lg" tone="dark">
                  The Founding Acharya ↓
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button href="#resident-acharyas" variant="outline" size="lg" tone="dark">
                  Resident Acharyas
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Parampara */}
      <section className={styles.parampara} aria-label="Tradition of Parampara">
        <div className="container">
          <div className={styles.paramparaTop}>
            <span className={styles.overline} data-reveal>Unbroken Spiritual Heritage</span>
            <h2 className={styles.h2} data-reveal>The Traditional Method of Knowledge</h2>
          </div>

          <p className={styles.quoteBig}>
            <Words text={paramparaLead} />
          </p>

          <div className={styles.points}>
            {lineagePoints.map((p) => (
              <div key={p.num} className={styles.point} data-lineage-point>
                <span className={styles.pointNum}>{p.num}</span>
                <div className={styles.pointBarWrap}>
                  <span className={styles.pointBar} data-point-bar />
                </div>
                <h3 className={styles.pointTitle}>{p.title}</h3>
                <p className={styles.pointText}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. Founder — sticky portrait, scrolling biography */}
      <section id="founder" className={styles.founder} aria-label="Founding Acharya">
        <div className="container">
          <div className={styles.founderGrid}>
            <div className={styles.founderSticky}>
              <div className={styles.portraitFrame} data-clip>
                <img
                  src={getAssetPath(founder.image)}
                  alt={`Portrait of ${founder.name}`}
                  className={styles.portraitImg}
                  loading="eager"
                  data-zoom
                />
                <span className={styles.portraitTag}>Founding Acharya</span>
              </div>
              <div className={styles.portraitCaption}>
                <strong>{`${founder.honorific} ${founder.name}`}</strong>
                <span>Founder of Vedanta Mission &amp; Vedanta Ashram, Indore</span>
              </div>
              <blockquote className={styles.founderQuote}>
                <p className={styles.founderQuoteSanskrit}>आत्मैव केवलं सत्यं सर्वं मिथ्यैव दृश्यते</p>
                <p className={styles.founderQuoteText}>
                  &ldquo;The Self alone is the sole reality; all that is perceived is transient and dependent.&rdquo;
                </p>
              </blockquote>
            </div>

            <div className={styles.founderBio}>
              <span className={styles.overline} data-reveal>Dashanami Saraswati Order</span>
              <p className={styles.honorific} data-reveal>{founder.honorific}</p>
              <h2 className={styles.founderName} data-reveal>{founder.name}</h2>
              <p className={styles.founderRole} data-reveal>{founder.role}</p>

              <div className={styles.provenance} data-reveal>
                <span className={styles.provLabel}>Monastic Lineage &amp; Training</span>
                <span className={styles.provText}>{founder.lineage}</span>
              </div>

              <div className={styles.prose} data-reveal>
                <p>{founder.shortBio}</p>
                <p>
                  Having completed intensive study of the Upanishads, Bhagavad Gita, and Brahma Sutras with Shankaracharya commentaries at Sandeepany Sadhanalaya in Mumbai, Swamiji dedicated his life to propagating unadulterated Advaita. Under his guidance, the Indore Ashram and its consecrated Sri Gangeshwar Mahadev Mandir have grown into a respected spiritual centre for residential study retreats, monthly journals, and scriptural publications.
                </p>
              </div>

              {founder.milestones && founder.milestones.length > 0 && (
                <div className={styles.milestones} data-stagger>
                  {founder.milestones.map((ms, idx) => (
                    <div key={idx} className={styles.milestone}>
                      <span className={styles.milestoneYear}>{ms.year}</span>
                      <h4 className={styles.milestoneTitle}>{ms.title}</h4>
                      <p className={styles.milestoneDesc}>{ms.description}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.founderCtas} data-reveal>
                <Magnetic strength={0.2}>
                  <Button href={`/acharyas/${founder.slug}`} variant="primary" size="lg">
                    Read Full Spiritual Biography →
                  </Button>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <Button href="/teachings" variant="outline" size="lg">
                    Browse Recorded Discourses
                  </Button>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Resident Acharyas — pinned horizontal gallery on desktop */}
      <section id="resident-acharyas" className={styles.residents} aria-labelledby="residents-title">
        <div className={styles.residentsHeader}>
          <div className="container">
            <span className={styles.overline} data-reveal>Vedanta Ashram Monastic Faculty</span>
            <h2 id="residents-title" className={styles.h2} data-reveal>Resident Acharyas &amp; Teachers</h2>
            <p className={styles.lead} data-reveal>
              Monastic disciples carrying forward daily scriptural classes, Sanskrit foundation, and spiritual guidance under the Shankaracharya tradition at the Indore campus.
            </p>
          </div>
        </div>

        <div className={styles.pinWrap} ref={wrapRef}>
          <div className={styles.pin} ref={pinRef}>
            <div className={styles.progressTrack} aria-hidden="true">
              <div className={styles.progressFill} ref={railRef} />
            </div>

            <div className={styles.track} ref={trackRef}>
              {residentAcharyas.map((acharya, idx) => (
                <article key={acharya.slug} className={styles.card}>
                  <div className={styles.cardIndex}>{String(idx + 1).padStart(2, '0')} / {String(residentAcharyas.length).padStart(2, '0')}</div>
                  <div className={styles.cardImgWrap}>
                    <img
                      src={getAssetPath(acharya.image)}
                      alt={`Portrait of ${acharya.name}`}
                      className={styles.cardImg}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardRole}>{acharya.role}</span>
                    <p className={styles.cardHonorific}>{acharya.honorific}</p>
                    <h3 className={styles.cardName}>{acharya.name}</h3>
                    <p className={styles.cardBio}>{acharya.shortBio}</p>

                    <div className={styles.subjects}>
                      <span className={styles.subjectLabel}>Key Scriptural Disciplines</span>
                      <div className={styles.pills}>
                        {acharya.teachings.map((t, tIdx) => (
                          <span key={tIdx} className={styles.pill}>{t}</span>
                        ))}
                      </div>
                    </div>

                    <Link href={`/acharyas/${acharya.slug}`} className={styles.cardLink}>
                      View Spiritual Service &amp; Guidance Profile →
                    </Link>
                  </div>
                </article>
              ))}
              <div className={styles.trackEnd} aria-hidden="true">
                <span>Parampara</span>
                <span className={styles.trackEndSub}>continues →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Living tradition */}
      <section className={styles.tradition} aria-label="Living Tradition in Action">
        <div className="container">
          <div className={styles.traditionHeader}>
            <span className={styles.overlineLight} data-reveal>Scripture in Practice</span>
            <h2 className={styles.h2Light} data-reveal>The Living Discourse Tradition</h2>
            <p className={styles.leadLight} data-reveal>
              The wisdom of Vedanta is systematically unfolded through sequential lecture series conducted by our Acharyas, preserved and cataloged in the Jnana Ganga archive.
            </p>
          </div>

          <div className={styles.teachingGrid} data-stagger>
            {featuredTeachings.map((teaching) => (
              <TiltCard key={teaching.id} max={6} className={styles.teachingCard}>
                <span className={styles.teachingCat}>{teaching.categoryName}</span>
                <h3 className={styles.teachingTitle}>{teaching.title}</h3>
                <p className={styles.teachingTeacher}>By {teaching.teacher}</p>
                <p className={styles.teachingDesc}>{teaching.description}</p>
                <Link href={`/teachings/${teaching.slug || teaching.id}`} className={styles.teachingLink}>
                  Enter Study Desk →
                </Link>
              </TiltCard>
            ))}
          </div>

          <div className={styles.traditionCta} data-reveal>
            <Magnetic strength={0.2}>
              <Button href="/teachings" variant="primary" size="lg">
                Explore Complete Teaching Catalogue (Jnana Ganga) →
              </Button>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* 06. Pre-footer */}
      <CinematicPreFooter
        tag="Spiritual Guidance & Association"
        sanskrit="सत्सङ्गत्वे निस्सङ्गत्वं निस्सङ्गत्वे निर्मोहत्वम्"
        heading="Visit Vedanta Ashram"
        subheading="Join daily classes and residential retreats in Indore"
        description="Whether attending residential scripture camps, engaging in daily Mandir aarti, or studying classic commentaries, the doors of Vedanta Ashram remain open to every sincere seeker of truth."
        ctas={[
          { label: 'Visit Vedanta Ashram', href: '/ashram', variant: 'primary' },
          { label: 'Explore Published Literature', href: '/publications', variant: 'outline' },
        ]}
        quote={{
          sanskrit: 'नायमात्मा बलहीनेन लभ्यः',
          translation: 'This Self cannot be attained by one devoid of inner strength and steadfast inquiry.',
          source: 'Mundaka Upanishad, 3.2.4',
        }}
      />
    </div>
  );
}
