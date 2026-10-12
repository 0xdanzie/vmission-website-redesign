'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Teaching, CanonicalCategory } from '@/data/teachings';
import type { Acharya } from '@/data/acharyas';
import DetailAudioController from './DetailAudioController';
import DetailVideoDesk from './DetailVideoDesk';
import TactileFrame from '@/components/cinematic/TactileFrame';
import SacredDivider from '@/components/cinematic/SacredDivider';
import CinematicPreFooter from '@/components/cinematic/CinematicPreFooter';
import Button from '@/components/Button';
import Magnetic from '@/components/motion/Magnetic';
import TiltCard from '@/components/motion/TiltCard';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

interface TeachingDetailClientProps {
  teaching: Teaching;
  categoryObj?: CanonicalCategory;
  relatedTeachings: Teaching[];
  matchedAcharya?: Acharya;
  totalTeachings: number;
}

export default function TeachingDetailClient({
  teaching,
  categoryObj,
  relatedTeachings,
  matchedAcharya,
  totalTeachings,
}: TeachingDetailClientProps) {
  const rootRef = useRef<HTMLElement>(null);

  useScrollReveals(rootRef);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) return;

      // Hero: title lines rise through masks, meta fades in
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('[data-td-line]', { yPercent: 110 }, { yPercent: 0, duration: 1.3, stagger: 0.12 })
        .fromTo('[data-td-fade]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, stagger: 0.09 }, 0.4)
        .fromTo('[data-td-meta]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 }, 0.7);

      // Hero backdrop drifts on scroll
      gsap.to('[data-td-backdrop]', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: '[data-td-hero]', start: 'top top', end: 'bottom top', scrub: true },
      });

      // Page progress rail
      gsap.fromTo(
        '[data-td-progress]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
        }
      );

      // Paddhati: outlined numerals fill saffron, items rise in
      gsap.utils.toArray<HTMLElement>('[data-td-paddhati]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
        const num = el.querySelector<HTMLElement>('[data-td-num]');
        if (num) {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 80%',
            once: true,
            onEnter: () => num.classList.add(styles.numOn),
          });
        }
      });

      // Sanskrit quote: the rule draws across before the verse
      gsap.fromTo(
        '[data-td-quote-rule]',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-td-quote]', start: 'top 80%', once: true },
        }
      );

      // Media desk frame lifts into place
      gsap.fromTo(
        '[data-td-media]',
        { clipPath: 'inset(8% 0% 8% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-td-media]', start: 'top 85%', once: true },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const youtubeOrSpotifyAtmaBodha =
    teaching.slug?.includes('atma-bodha') || teaching.id.includes('atma-bodha');

  return (
    <article ref={rootRef} className={styles.studyDeskPage} data-morph-target="teaching">
      <div className={styles.progressRail} aria-hidden="true">
        <div className={styles.progressFill} data-td-progress />
      </div>

      {/* 01. Study desk hero */}
      <header className={styles.studyDeskHero} data-td-hero aria-labelledby="td-title">
        <div className={styles.heroBackdrop} aria-hidden="true" data-td-backdrop>
          <Image
            src="/images/vmission/teaching/07-vedanta-archive-restored.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroBackdropImg}
          />
          <div className={styles.heroBackdropGradient} />
          <div className={styles.heroBackdropTexture} />
        </div>

        <div className="container">
          <div className={styles.heroContentWrap}>
            <nav className={styles.breadcrumbsNav} aria-label="Breadcrumb">
              <ol className={styles.breadcrumbList}>
                <li>
                  <Link href="/" className={styles.breadcrumbLink}>Home</Link>
                </li>
                <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
                <li>
                  <Link href="/teachings" className={styles.breadcrumbLink}>Jnana Ganga</Link>
                </li>
                <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
                <li>
                  <Link href={`/teachings?category=${teaching.category}`} className={styles.breadcrumbLink}>
                    {teaching.categoryName}
                  </Link>
                </li>
                <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
                <li className={styles.breadcrumbCurrent} aria-current="page">
                  {teaching.title}
                </li>
              </ol>
            </nav>

            <div className={styles.metaBadgeRow} data-morph-element="teaching-icon" data-td-fade>
              {categoryObj && (
                <span className={styles.pathBadge}>
                  Path {categoryObj.romanNumeral} · {teaching.categoryName}
                </span>
              )}
              <span className={styles.formatBadge}>
                {teaching.format === 'Video' ? '▶ Sequential Video Series' : '🎙️ Audio Discourse'}
              </span>
              {teaching.scripture && (
                <span className={styles.scriptureBadge}>{teaching.scripture}</span>
              )}
            </div>

            <h1 id="td-title" className={styles.studyTitle}>
              <span className={styles.titleMask}>
                <span className={styles.titleLine} data-td-line>{teaching.title}</span>
              </span>
            </h1>

            <div className={styles.studyMetaStrip}>
              <div className={styles.metaCell} data-td-meta>
                <span className={styles.metaCellLabel}>Expounded By</span>
                {matchedAcharya ? (
                  <Link href={`/acharyas/${matchedAcharya.slug}`} className={styles.teacherLink}>
                    {teaching.teacher} ↗
                  </Link>
                ) : (
                  <span className={styles.metaCellVal}>{teaching.teacher}</span>
                )}
              </div>

              <div className={styles.metaDivider} aria-hidden="true" />

              <div className={styles.metaCell} data-td-meta>
                <span className={styles.metaCellLabel}>Language</span>
                <span className={styles.metaCellVal}>{teaching.language}</span>
              </div>

              {teaching.duration && (
                <>
                  <div className={styles.metaDivider} aria-hidden="true" />
                  <div className={styles.metaCell} data-td-meta>
                    <span className={styles.metaCellLabel}>Duration / Sessions</span>
                    <span className={styles.metaCellVal}>{teaching.duration}</span>
                  </div>
                </>
              )}

              <div className={styles.metaDivider} aria-hidden="true" />

              <div className={styles.metaCell} data-td-meta>
                <span className={styles.metaCellLabel}>Archive Status</span>
                {teaching.format === 'Video' ? (
                  <span className={styles.statusVerified}>Verified YouTube Playlist</span>
                ) : teaching.src ? (
                  <span className={styles.statusVerified}>Playable Digital Audio</span>
                ) : (
                  <span className={styles.statusArchival}>Archival Recording (Digitization in Progress)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 02. Media desk */}
      <section className={styles.mediaDeskSection} aria-labelledby="td-media-title">
        <h2 id="td-media-title" className={styles.visuallyHidden}>Media Presentation</h2>
        <div className="container">
          <div data-td-media>
            {teaching.format === 'Video' ? (
              <DetailVideoDesk teaching={teaching} />
            ) : teaching.format === 'Audio' ? (
              <div className={styles.audioDeskFrame}>
                <DetailAudioController teaching={teaching} />
              </div>
            ) : null}
          </div>

          {youtubeOrSpotifyAtmaBodha || teaching.category === 'inspiring-stories' ? (
            <div className={styles.spotifyDeskBanner} data-reveal>
              <div className={styles.spotifyBannerIcon} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1DB954">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <div className={styles.spotifyBannerText}>
                <h4 className={styles.spotifyBannerHeading}>Also Available on Spotify</h4>
                <p className={styles.spotifyBannerDesc}>
                  Listen to this sequential audio series in background audio mode or offline on the official Vedanta Ashram Spotify channel.
                </p>
              </div>
              <a
                href={
                  youtubeOrSpotifyAtmaBodha
                    ? 'https://open.spotify.com/playlist/66U9xuUqtgavAmNSU6wE8F'
                    : 'https://open.spotify.com/playlist/0SQKCyMVPazw5A7j6TpTmH'
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles.spotifyBannerBtn}
                aria-label={`Listen to ${teaching.title} on Spotify`}
              >
                Listen on Spotify ↗
              </a>
            </div>
          ) : null}
        </div>
      </section>

      {/* 03. Exposition */}
      <section className={styles.expositionSection} aria-labelledby="td-exposition-title">
        <div className="container">
          <div className={styles.studyGrid}>
            <div className={styles.expositionCol}>
              <div className={styles.manuscriptCard} data-reveal>
                <span className={styles.sectionOverline}>Philosophical Synopsis</span>
                <h2 id="td-exposition-title" className={styles.expositionHeading}>Exposition of the Treatise</h2>

                <p className={styles.descriptionLead}>{teaching.description}</p>

                <SacredDivider glyph="ॐ" sutra="तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया" />

                <h3 className={styles.paddhatiHeading}>Traditional Study Discipline (Paddhati)</h3>
                <p className={styles.paddhatiBody}>
                  In accordance with the traditional methodology of Adi Shankaracharya, Vedanta is not approached as mere theoretical philosophy, but as a direct means of knowledge (<em>Pramana</em>) to be assimilated through the classical three-fold spiritual discipline:
                </p>

                <div className={styles.paddhatiGrid}>
                  <div className={styles.paddhatiItem} data-td-paddhati>
                    <span className={styles.paddhatiNum} data-td-num>01</span>
                    <h4 className={styles.paddhatiTitle}>Shravana (श्रवण)</h4>
                    <p className={styles.paddhatiDesc}>
                      Systematic, uninterrupted listening to the scriptural words unfolded by an authentic teacher who understands the methodology.
                    </p>
                  </div>

                  <div className={styles.paddhatiItem} data-td-paddhati>
                    <span className={styles.paddhatiNum} data-td-num>02</span>
                    <h4 className={styles.paddhatiTitle}>Manana (मनन)</h4>
                    <p className={styles.paddhatiDesc}>
                      Logical reflection upon the teachings, resolving every doubt until intellectual conviction becomes steady and complete.
                    </p>
                  </div>

                  <div className={styles.paddhatiItem} data-td-paddhati>
                    <span className={styles.paddhatiNum} data-td-num>03</span>
                    <h4 className={styles.paddhatiTitle}>Nididhyasana (निदिध्यासन)</h4>
                    <p className={styles.paddhatiDesc}>
                      Deep contemplative meditation upon the assimilated non-dual vision until habitual identification with the body-mind complex drops away.
                    </p>
                  </div>
                </div>

                <div className={styles.scriptureQuoteBox} data-td-quote>
                  <span className={styles.quoteRule} aria-hidden="true" data-td-quote-rule />
                  <p className={styles.scriptureSanskrit}>आचार्यवान् पुरुषो वेद</p>
                  <p className={styles.scriptureTranslation}>
                    &ldquo;One who is blessed with an authentic teacher truly knows the supreme truth.&rdquo;
                  </p>
                  <span className={styles.scriptureRef}>— Chandogya Upanishad, 6.14.2</span>
                </div>
              </div>

              {teaching.relatedStudyText && (
                <div className={styles.companionTextCard} data-reveal>
                  <div className={styles.companionHeader}>
                    <span className={styles.companionTag}>Companion Root Scripture</span>
                    <h3 className={styles.companionTitle}>{teaching.relatedStudyText.title}</h3>
                  </div>
                  <p className={styles.companionDesc}>
                    This discourse series references the original Sanskrit verses. Sincere seekers are encouraged to consult the root study text and commentaries while following the lectures.
                  </p>
                  <div className={styles.companionActionRow}>
                    <span className={styles.companionBadgeType}>{teaching.relatedStudyText.type}</span>
                    <Link href="/publications" className={styles.companionLink}>
                      Browse Root Texts in Literary Archive →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <aside className={styles.studySidebar} aria-label="Study context">
              {matchedAcharya && (
                <div className={styles.acharyaSidebarCard} data-reveal>
                  <span className={styles.sidebarOverline}>Teacher of the Tradition</span>
                  <TactileFrame
                    src={matchedAcharya.image}
                    alt={`Portrait of ${matchedAcharya.name}`}
                    caption={`${matchedAcharya.honorific} ${matchedAcharya.name}`}
                    aspectRatio="portrait"
                    showOmBadge={false}
                  />
                  <h3 className={styles.sidebarAcharyaName}>{matchedAcharya.name}</h3>
                  <p className={styles.sidebarAcharyaRole}>{matchedAcharya.role}</p>
                  <p className={styles.sidebarAcharyaBio}>{matchedAcharya.shortBio}</p>
                  <Link href={`/acharyas/${matchedAcharya.slug}`} className={styles.sidebarLink}>
                    View Spiritual Biography &amp; Profile →
                  </Link>
                </div>
              )}

              {categoryObj && (
                <div className={styles.pathSidebarCard} data-reveal>
                  <span className={styles.sidebarOverline}>Canonical Taxonomy</span>
                  <h3 className={styles.pathTitle}>
                    Path {categoryObj.romanNumeral}: {categoryObj.name}
                  </h3>
                  <p className={styles.pathSanskrit}>{categoryObj.sanskrit}</p>
                  <p className={styles.pathDesc}>{categoryObj.description}</p>
                  <Link href={`/teachings?category=${categoryObj.id}`} className={styles.sidebarLink}>
                    All Discourses in this Path →
                  </Link>
                </div>
              )}

              <div className={styles.ashramDeskCard} data-reveal>
                <span className={styles.sidebarOverline}>Gurukula Seat</span>
                <h3 className={styles.ashramDeskTitle}>Vedanta Ashram, Indore</h3>
                <p className={styles.ashramDeskDesc}>
                  Residential Gurukula for traditional study in Sudama Nagar, Indore. Regular classes conducted at Sri Gangeshwar Mahadev Mandir.
                </p>
                <Link href="/ashram" className={styles.sidebarLink}>
                  Visit Vedanta Ashram →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 04. Related discourses */}
      {relatedTeachings.length > 0 && (
        <section className={styles.relatedSection} aria-labelledby="td-related-title">
          <div className="container">
            <div className={styles.relatedHeaderRow} data-reveal>
              <div>
                <span className={styles.sectionOverline}>Deeper Scriptural Study</span>
                <h2 id="td-related-title" className={styles.relatedHeading}>Related Discourses in Jnana Ganga</h2>
              </div>
              <Magnetic strength={0.2}>
                <Button href="/teachings" variant="outline" size="sm" tone="dark">
                  View Entire Library ({totalTeachings}) →
                </Button>
              </Magnetic>
            </div>

            <div className={styles.relatedGrid} data-stagger>
              {relatedTeachings.map((rel: Teaching, i: number) => (
                <TiltCard key={rel.id} className={styles.tiltWrap} max={5}>
                  <article className={styles.relatedItemCard}>
                    <span className={styles.relatedIndex} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={styles.relatedCardMeta}>
                      <span className={styles.relatedCardCat}>{rel.categoryName}</span>
                      <span className={styles.relatedCardFormat}>{rel.format}</span>
                    </div>
                    <h3 className={styles.relatedCardTitle}>
                      <Link href={`/teachings/${rel.slug || rel.id}`} className={styles.relatedTitleLink}>
                        {rel.title}
                      </Link>
                    </h3>
                    <p className={styles.relatedCardTeacher}>By {rel.teacher}</p>
                    <p className={styles.relatedCardDesc}>{rel.description}</p>
                    <div className={styles.relatedCardFooter}>
                      <Link href={`/teachings/${rel.slug || rel.id}`} className={styles.relatedDeskLink}>
                        Open Study Desk →
                      </Link>
                    </div>
                  </article>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 05. Pre-footer */}
      <CinematicPreFooter
        tag="Jnana Ganga Archive"
        sanskrit="ब्रह्म सत्यं जगन्मिथ्या जीवो ब्रह्मैव नापरः"
        heading="Deepen Your Scriptural Inquiry"
        subheading="Systematic Advaita Vedanta study at your own pace"
        description="The Jnana Ganga archive preserves decades of traditional expositions by our Acharyas. Access sequential courses, downloadable study texts, and monthly e-journals."
        ctas={[
          { label: 'Browse Complete Teaching Library', href: '/teachings', variant: 'primary' },
          { label: 'Explore Published Literature', href: '/publications', variant: 'outline' },
        ]}
        quote={{
          sanskrit: 'तरति शोकमात्मवित्',
          translation: 'The knower of the Self crosses beyond all grief and sorrow.',
          source: 'Chandogya Upanishad, 7.1.3',
        }}
      />
    </article>
  );
}
