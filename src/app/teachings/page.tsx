'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import EmptyState from '@/components/EmptyState';
import { useData } from '@/context/DataContext';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import {
  CANONICAL_CATEGORIES,
  CanonicalCategorySlug,
  teachingTeachers,
  Teaching,
} from '@/data/teachings';
import { CANONICAL_AUDIO_ARCHIVE } from '@/data/audioArchive';
import { publicVideoArchive } from '@/data/videoArchive';
import TeachingsArchiveExplorer from '@/components/TeachingsArchiveExplorer';
import Magnetic from '@/components/motion/Magnetic';
import TiltCard from '@/components/motion/TiltCard';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
import styles from './page.module.css';

// Spotify verified resource mappings
const SPOTIFY_SERIES_MAP: Record<string, { title: string; url: string }> = {
  'atma-bodha-01': {
    title: 'Atma Bodha Online Class on Spotify',
    url: 'https://open.spotify.com/playlist/66U9xuUqtgavAmNSU6wE8F',
  },
  'atma-bodha-lessons': {
    title: 'Atma Bodha Online Class on Spotify',
    url: 'https://open.spotify.com/playlist/66U9xuUqtgavAmNSU6wE8F',
  },
  'inspiring-stories': {
    title: 'Inspiring Stories on Spotify',
    url: 'https://open.spotify.com/playlist/0SQKCyMVPazw5A7j6TpTmH',
  },
};

const OFFICIAL_PODCAST_URL = 'https://open.spotify.com/show/4mfYPGmWxGszpWeseMfVPk';

function TeachingsLibrary() {
  const { teachings } = useData();
  const { play, toggle, state: audioState } = useAudioPlayer();
  const searchParams = useSearchParams();
  const router = useRouter();

  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveals(rootRef);

  // Hero intro and image parallax
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const delay = document.documentElement.classList.contains('vm-entry-seen') ? 0.15 : 0.4;
      gsap.set('[data-hero-line] > span', { yPercent: 115 });
      gsap.set('[data-hero-fade]', { opacity: 0, y: 26 });
      gsap
        .timeline({ delay, defaults: { ease: 'expo.out' } })
        .fromTo('[data-hero-img]', { scale: 1.18 }, { scale: 1, duration: 2.4, ease: 'power3.out' }, 0)
        .to('[data-hero-line] > span', { yPercent: 0, duration: 1.4, stagger: 0.14 }, 0.1)
        .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.5);

      gsap.to('[data-hero-img]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.fromTo(
        '[data-parallax-img]',
        { yPercent: -10 },
        { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '[data-parallax-img]', start: 'top bottom', end: 'bottom top', scrub: true } }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  // URL state synchronization
  const categoryParam = searchParams.get('category') as CanonicalCategorySlug | null;
  const typeParam = searchParams.get('type') as 'audio' | 'video' | null;
  const searchParam = searchParams.get('q') || '';
  const teacherParam = searchParams.get('teacher') || 'All Teachers';

  const [selectedCategory, setSelectedCategory] = useState<CanonicalCategorySlug | 'all'>(
    categoryParam && CANONICAL_CATEGORIES.some((c) => c.id === categoryParam) ? categoryParam : 'all'
  );
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'Audio' | 'Video'>(
    typeParam === 'audio' ? 'Audio' : typeParam === 'video' ? 'Video' : 'all'
  );
  const [selectedTeacher, setSelectedTeacher] = useState<string>(teacherParam);
  const [searchQuery, setSearchQuery] = useState<string>(searchParam);

  // Sync state when URL params change (e.g. browser back/forward)
  useEffect(() => {
    if (categoryParam && CANONICAL_CATEGORIES.some((c) => c.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    } else if (!categoryParam) {
      setSelectedCategory('all');
    }

    if (typeParam === 'audio') setSelectedFormat('Audio');
    else if (typeParam === 'video') setSelectedFormat('Video');
    else if (!typeParam) setSelectedFormat('all');

    if (searchParam) setSearchQuery(searchParam);
    if (teacherParam) setSelectedTeacher(teacherParam);
  }, [categoryParam, typeParam, searchParam, teacherParam]);

  // Update URL query parameters helper
  const updateUrlParams = (
    newCategory: CanonicalCategorySlug | 'all',
    newFormat: 'all' | 'Audio' | 'Video',
    newTeacher: string,
    newSearch: string
  ) => {
    const params = new URLSearchParams();
    if (newCategory !== 'all') params.set('category', newCategory);
    if (newFormat !== 'all') params.set('type', newFormat.toLowerCase());
    if (newTeacher !== 'All Teachers') params.set('teacher', newTeacher);
    if (newSearch.trim()) params.set('q', newSearch.trim());

    const queryString = params.toString();
    const newPath = queryString ? `/teachings?${queryString}` : '/teachings';
    router.replace(newPath, { scroll: false });
  };

  const handleCategorySelect = (
    catId: CanonicalCategorySlug | 'all',
    shouldScroll: boolean = false
  ) => {
    setSelectedCategory(catId);
    updateUrlParams(catId, selectedFormat, selectedTeacher, searchQuery);
    if (shouldScroll && typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        const target = document.getElementById('living-teachings');
        if (target) {
          const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          target.scrollIntoView({
            behavior: isReducedMotion ? 'auto' : 'smooth',
            block: 'start',
          });
        }
      });
    }
  };

  const handleFormatSelect = (format: 'all' | 'Audio' | 'Video') => {
    setSelectedFormat(format);
    updateUrlParams(selectedCategory, format, selectedTeacher, searchQuery);
  };

  const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedTeacher(val);
    updateUrlParams(selectedCategory, selectedFormat, val, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    updateUrlParams(selectedCategory, selectedFormat, selectedTeacher, val);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateUrlParams(selectedCategory, selectedFormat, selectedTeacher, '');
  };

  const handleResetAll = () => {
    setSelectedCategory('all');
    setSelectedFormat('all');
    setSelectedTeacher('All Teachers');
    setSearchQuery('');
    router.replace('/teachings', { scroll: false });
  };

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: teachings.length };
    CANONICAL_CATEGORIES.forEach((cat) => {
      counts[cat.id] = teachings.filter((t) => t.category === cat.id).length;
    });
    return counts;
  }, [teachings]);

  // Format counts
  const audioCount = useMemo(() => teachings.filter((t) => t.format === 'Audio').length, [teachings]);
  const videoCount = useMemo(() => teachings.filter((t) => t.format === 'Video').length, [teachings]);

  // Filtered teachings
  const filteredTeachings = useMemo(() => {
    return teachings.filter((t: Teaching) => {
      // Category filter
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }

      // Format filter
      if (selectedFormat !== 'all' && t.format !== selectedFormat) {
        return false;
      }

      // Teacher filter
      if (selectedTeacher !== 'All Teachers' && t.teacher !== selectedTeacher) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchScripture = (t.scripture || '').toLowerCase().includes(q);
        const matchTeacher = (t.teacher || '').toLowerCase().includes(q);
        const matchDesc = (t.description || '').toLowerCase().includes(q);
        const matchCategory = (t.categoryName || '').toLowerCase().includes(q);
        const matchLanguage = (t.language || '').toLowerCase().includes(q);
        if (!matchTitle && !matchScripture && !matchTeacher && !matchDesc && !matchCategory && !matchLanguage) {
          return false;
        }
      }

      return true;
    });
  }, [teachings, selectedCategory, selectedFormat, selectedTeacher, searchQuery]);

  // Split into Series vs Individual Sessions
  const { seriesItems, sessionItems } = useMemo(() => {
    const series: Teaching[] = [];
    const sessions: Teaching[] = [];

    filteredTeachings.forEach((item) => {
      const isSeries = Boolean(
        item.youtubePlaylistId ||
        item.duration?.toLowerCase().includes('series') ||
        item.duration?.toLowerCase().includes('part') ||
        item.duration?.toLowerCase().includes('sessions')
      );
      if (isSeries) {
        series.push(item);
      } else {
        sessions.push(item);
      }
    });

    return { seriesItems: series, sessionItems: sessions };
  }, [filteredTeachings]);

  const activeCategoryObject = CANONICAL_CATEGORIES.find((c) => c.id === selectedCategory);

  // Audio player handler for individual catalogue items
  const handleAudioAction = (e: React.MouseEvent, item: Teaching) => {
    e.stopPropagation();
    if (item.format === 'Audio' && item.src) {
      if (audioState.track?.id === item.id) {
        toggle();
      } else {
        play(item);
      }
    }
  };

  return (
    <div className={styles.page} ref={rootRef}>
      {/* ==================================================================
          01 — ARRIVAL
          ================================================================== */}
      <section className={styles.hero} data-hero aria-label="Jnana Ganga — The Living Stream of Vedanta">
        <div className={styles.heroMedia}>
          <Image
            src="/images/vmission/ashram/teaching-hall-interior.jpg"
            alt="Teaching sanctum and spiritual library of Vedanta Ashram, Indore"
            fill
            priority
            sizes="100vw"
            quality={90}
            className={styles.heroImg}
            data-hero-img
          />
          <div className={styles.heroShade} />
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroIdentity} data-hero-fade>
            <span className={styles.sanskritInvocation}>ज्ञानगङ्गा</span>
            <span className={styles.eyebrowText}>JNANA GANGA</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.lineMask} data-hero-line>
              <span>The Living Stream</span>
            </span>
            <span className={styles.lineMask} data-hero-line>
              <span className={styles.heroTitleSub}>of Vedanta</span>
            </span>
          </h1>

          <div className={styles.heroFoot}>
            <div className={styles.heroCopy} data-hero-fade>
              <p className={styles.heroSubtitle}>Scriptural Discourses &amp; Guided Study</p>
              <p className={styles.heroLead}>
                Explore the teachings, discourses and contemplative guidance of Vedanta Ashram, Indore — arranged for beginning inquiry, sustained study and deeper reflection.
              </p>
              <div className={styles.heroCtas}>
                <Magnetic>
                  <a href="#begin-inquiry" className={styles.btnPrimary}>
                    Begin Your Study <span aria-hidden="true">↓</span>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#study-paths" className={styles.btnGhost}>
                    Browse All Teachings →
                  </a>
                </Magnetic>
              </div>
            </div>

            <a href="#begin-inquiry" className={styles.scrollPrompt} data-hero-fade aria-label="Scroll down to begin your inquiry">
              <span>DESCEND TO STUDY</span>
              <span className={styles.scrollArrow} aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================================
          02 — BEGIN YOUR INQUIRY
          ================================================================== */}
      <section className={styles.begin} id="begin-inquiry">
        <div className="container">
          <header className={styles.head}>
            <span className={styles.overline} data-reveal>PRATHAMA PRAVESHA · FIRST INQUIRY</span>
            <h2 className={styles.h2} data-reveal>Begin Your Inquiry</h2>
            <p className={styles.lead} data-reveal>
              A few places to begin, whether you are new to Vedanta or returning to study.
            </p>
          </header>

          <div className={styles.doorways} data-stagger>
            <TiltCard className={styles.doorway}>
              <div className={styles.doorwayTop}>
                <span className={styles.doorwayNum}>01</span>
                <span className={styles.doorwaySanskrit}>तत्त्वबोधः</span>
              </div>
              <h3 className={styles.doorwayTitle}>Tattva Bodha</h3>
              <p className={styles.doorwayDesc}>
                The essential gateway text defining the qualified seeker, discrimination, and direct Self-knowledge.
              </p>
              <Link href="/learn/tattva-bodha" className={styles.doorwayLink}>
                <span>Begin Foundational Study</span>
                <span aria-hidden="true">→</span>
              </Link>
            </TiltCard>

            <TiltCard className={styles.doorway}>
              <div className={styles.doorwayTop}>
                <span className={styles.doorwayNum}>02</span>
                <span className={styles.doorwaySanskrit}>श्रीमद्भगवद्गीता</span>
              </div>
              <h3 className={styles.doorwayTitle}>Bhagavad Gita</h3>
              <p className={styles.doorwayDesc}>
                Verse-by-verse exposition of Sri Krishna&apos;s dialogue on selfless action, devotion, and supreme truth.
              </p>
              <button
                type="button"
                onClick={() => handleCategorySelect('bhagavad-gita', true)}
                className={styles.doorwayLink}
              >
                <span>Explore Available Discourses</span>
                <span aria-hidden="true">→</span>
              </button>
            </TiltCard>

            <TiltCard className={styles.doorway}>
              <div className={styles.doorwayTop}>
                <span className={styles.doorwayNum}>03</span>
                <span className={styles.doorwaySanskrit}>निदिध्यासनम्</span>
              </div>
              <h3 className={styles.doorwayTitle}>Contemplation</h3>
              <p className={styles.doorwayDesc}>
                Guided meditative inquiry and Nididhyasana leading intellectual clarity into steady, silent abidance.
              </p>
              <button
                type="button"
                onClick={() => handleCategorySelect('meditation', true)}
                className={styles.doorwayLink}
              >
                <span>Explore Meditation Sessions</span>
                <span aria-hidden="true">→</span>
              </button>
            </TiltCard>
          </div>

          {/* Listening band (podcast) */}
          <div className={styles.podcast} aria-label="Listening Beyond the Ashram" data-reveal>
            <div className={styles.podcastLeft}>
              <span className={styles.overlineLight}>LISTEN BEYOND THE ASHRAM</span>
              <div className={styles.wave} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <h3 className={styles.podcastTitle}>Vedanta Ashram Podcasts</h3>
              <p className={styles.podcastCopy}>
                Discourses and audio satsangs from Vedanta Ashram, Indore.
              </p>
            </div>

            <div className={styles.podcastRight}>
              <a
                href={OFFICIAL_PODCAST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnLight}
                aria-label="Listen to Vedanta Ashram Podcasts on Spotify"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span>Listen on Spotify ↗</span>
              </a>
              <span className={styles.footnote}>
                All discourses are also playable directly within this library.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          03 — FIND YOUR PATH OF STUDY
          ================================================================== */}
      <section className={styles.paths} id="study-paths" aria-label="Find Your Path of Study">
        <div className="container">
          <header className={styles.pathsHead}>
            <div>
              <span className={styles.overline} data-reveal>TRADITIONS OF INQUIRY</span>
              <h2 className={styles.h2} data-reveal>Find Your Path of Study</h2>
              <p className={styles.lead} data-reveal>
                Seven traditional gateways into the wisdom of Advaita Vedanta — choose an inquiry to focus your study.
              </p>
            </div>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                className={styles.btnGhostDark}
                onClick={() => handleCategorySelect('all', true)}
                aria-label="View all study paths"
              >
                <span>Show All Paths ({teachings.length})</span>
                <span aria-hidden="true">↺</span>
              </button>
            )}
          </header>

          <nav className={styles.pathList} aria-label="Seven Paths of Study" data-stagger>
            {CANONICAL_CATEGORIES.map((cat, index) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              const zeroPaddedIndex = String(index + 1).padStart(2, '0');

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`${styles.pathRow} ${isSelected ? styles.pathRowActive : ''}`}
                  onClick={() => handleCategorySelect(cat.id, true)}
                  aria-pressed={isSelected}
                  title={cat.description}
                >
                  <span className={styles.pathNum}>{zeroPaddedIndex}</span>
                  <span className={styles.pathName}>
                    <span className={styles.pathNameText}>{cat.name}</span>
                    <span className={styles.pathSanskrit}>{cat.sanskrit}</span>
                  </span>
                  <span className={styles.pathCount}>{count} discourses</span>
                  <span className={styles.pathArrow} aria-hidden="true">→</span>
                </button>
              );
            })}
          </nav>

          {activeCategoryObject && (
            <div className={styles.activeNote}>
              <div className={styles.activeBadge}>
                <span className={styles.activeNumeral}>{activeCategoryObject.romanNumeral}</span>
                <span className={styles.activeName}>{activeCategoryObject.name}</span>
                <span className={styles.activeSanskrit}>({activeCategoryObject.sanskrit})</span>
              </div>
              <p className={styles.activeDesc}>{activeCategoryObject.description}</p>
            </div>
          )}
        </div>
      </section>

      {/* ==================================================================
          03B — TEACHING HALL THRESHOLD (overview only)
          ================================================================== */}
      {selectedCategory === 'all' && (
        <section className={styles.hall} aria-label="Entering the Teaching Hall">
          <div className={styles.hallMedia}>
            <Image
              src="/images/vmission/ashram/teaching-hall-interior.jpg"
              alt="Teaching sanctum and scriptural study repository of Vedanta Ashram, Indore"
              fill
              sizes="100vw"
              quality={90}
              className={styles.hallImg}
              data-parallax-img
            />
            <div className={styles.hallShade} />
          </div>
          <div className="container">
            <div className={styles.hallContent} data-reveal>
              <span className={styles.hallEyebrow}>॥ स्वाध्यायप्रवचने च ॥ · PRATISHTHA · TEACHING HALL</span>
              <h3 className={styles.hallTitle}>The Living Teaching Hall</h3>
              <p className={styles.hallLead}>
                Enter a few of the teaching collections that carry the tradition into sustained study.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================================
          04 — LIVING TEACHINGS LIBRARY
          ================================================================== */}
      <section className={styles.library} id="living-teachings" aria-label="Living Teachings">
        <div className="container">
          <header className={styles.head}>
            {selectedCategory === 'all' ? (
              <>
                <span className={styles.overline} data-reveal>DISCOURSE COLLECTIONS</span>
                <h2 className={styles.h2} data-reveal>Living Teachings</h2>
                <p className={styles.lead} data-reveal>
                  Enter a few of the teaching collections that carry the tradition into sustained study.
                </p>
              </>
            ) : (
              <>
                <div className={styles.tagRow}>
                  <span className={styles.tagNumeral}>TRADITION {activeCategoryObject?.romanNumeral}</span>
                  <span aria-hidden="true">·</span>
                  <span className={styles.tagSanskrit}>{activeCategoryObject?.sanskrit}</span>
                </div>
                <h2 className={styles.h2}>Living Teachings — {activeCategoryObject?.name}</h2>
                <p className={styles.lead}>{activeCategoryObject?.description}</p>
                <button
                  type="button"
                  className={styles.btnGhostDark}
                  onClick={() => handleCategorySelect('all', true)}
                  aria-label="View all study traditions"
                  style={{ marginTop: '1.6rem' }}
                >
                  <span>← View All Traditions ({teachings.length})</span>
                </button>
              </>
            )}
          </header>

          {/* Controls */}
          <div className={styles.controls} data-reveal>
            <div className={styles.searchBox}>
              <label htmlFor="teachings-search" className="sr-only">Search Jnana Ganga library</label>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="teachings-search"
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by treatise, speaker, scripture, or inquiry keywords..."
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className={styles.clearBtn}
                  aria-label="Clear search input"
                >
                  ✕
                </button>
              )}
            </div>

            <div className={styles.segment} role="group" aria-label="Filter by media type">
              <button
                type="button"
                className={`${styles.segBtn} ${selectedFormat === 'all' ? styles.segActive : ''}`}
                onClick={() => handleFormatSelect('all')}
                aria-pressed={selectedFormat === 'all'}
              >
                All ({teachings.length})
              </button>
              <button
                type="button"
                className={`${styles.segBtn} ${selectedFormat === 'Audio' ? styles.segActive : ''}`}
                onClick={() => handleFormatSelect('Audio')}
                aria-pressed={selectedFormat === 'Audio'}
              >
                Audio ({audioCount})
              </button>
              <button
                type="button"
                className={`${styles.segBtn} ${selectedFormat === 'Video' ? styles.segActive : ''}`}
                onClick={() => handleFormatSelect('Video')}
                aria-pressed={selectedFormat === 'Video'}
              >
                Video ({videoCount})
              </button>
            </div>

            <div className={styles.selectWrap}>
              <label htmlFor="teacher-filter" className="sr-only">Filter by Teacher</label>
              <select
                id="teacher-filter"
                value={selectedTeacher}
                onChange={handleTeacherChange}
                className={styles.select}
              >
                {teachingTeachers.map((tch) => (
                  <option key={tch} value={tch}>{tch}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results meta */}
          <div className={styles.meta}>
            <p className={styles.count}>
              Showing <strong>{filteredTeachings.length}</strong> {filteredTeachings.length === 1 ? 'teaching' : 'teachings'}
              {selectedCategory !== 'all' && (
                <> in <em>{activeCategoryObject?.name}</em></>
              )}
              {selectedFormat !== 'all' && (
                <> · {selectedFormat} format</>
              )}
              {selectedTeacher !== 'All Teachers' && (
                <> · by {selectedTeacher}</>
              )}
            </p>

            {(selectedCategory !== 'all' || selectedFormat !== 'all' || selectedTeacher !== 'All Teachers' || searchQuery) && (
              <button type="button" className={styles.resetLink} onClick={handleResetAll}>
                Reset All Filters ↺
              </button>
            )}
          </div>

          {/* Series */}
          {seriesItems.length > 0 && (
            <div className={styles.seriesBlock}>
              <div className={styles.subhead} data-reveal>
                <span className={styles.overline}>Comprehensive Courses</span>
                <h3 className={styles.h3}>Curated Series &amp; Treatises</h3>
              </div>

              <div className={styles.seriesGrid} data-stagger>
                {seriesItems.map((series) => {
                  const detailHref = `/teachings/${series.slug || series.id}`;
                  const spotifyData = SPOTIFY_SERIES_MAP[series.slug || ''] || SPOTIFY_SERIES_MAP[series.id];
                  const isVerifiedArtwork = Boolean(
                    series.thumbnailSrc &&
                    !series.thumbnailSrc.includes('01-swami-atmananda-teaching-restored.jpg') &&
                    !series.thumbnailSrc.includes('02-swami-atmananda-wisdom-restored.jpg') &&
                    !series.thumbnailSrc.includes('03-swamini-teaching-01-restored.jpg') &&
                    !series.thumbnailSrc.includes('04-swamini-teaching-02-restored.jpg') &&
                    !series.thumbnailSrc.includes('07-vedanta-archive-restored.jpg')
                  );
                  const formatLabel = series.format === 'Video' ? 'Video Series' : 'Audio Series';

                  return (
                    <TiltCard key={series.id} className={styles.series}>
                      {isVerifiedArtwork ? (
                        <div className={styles.seriesArt}>
                          <Image
                            src={series.thumbnailSrc!}
                            alt={series.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={styles.seriesImg}
                          />
                          <div className={styles.seriesArtShade} />
                          <span className={styles.seriesBadge}>{formatLabel}</span>
                        </div>
                      ) : (
                        <div className={styles.seriesManuscript}>
                          <div className={styles.manuscriptMeta}>
                            <span>{series.scripture || series.categoryName || 'Vedanta Series'}</span>
                            <span className={styles.seriesBadgeDark}>{formatLabel}</span>
                          </div>
                          <span className={styles.manuscriptGlyph} aria-hidden="true">― ॥ ―</span>
                        </div>
                      )}

                      <div className={styles.seriesBody}>
                        {isVerifiedArtwork && (
                          <div className={styles.seriesOverline}>
                            <span>{series.scripture || series.categoryName || 'Vedanta Series'}</span>
                            {series.duration && <span>{series.duration}</span>}
                          </div>
                        )}

                        <h4 className={styles.seriesTitle}>
                          <Link href={detailHref} className={styles.titleLink}>
                            {series.title}
                          </Link>
                        </h4>

                        <div className={styles.infoLine}>
                          <span className={styles.strong}>{series.teacher}</span>
                          <span aria-hidden="true">·</span>
                          <span>{series.language}</span>
                          {series.duration && !isVerifiedArtwork && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{series.duration}</span>
                            </>
                          )}
                        </div>

                        <p className={styles.synopsis}>{series.description}</p>

                        <div className={styles.seriesActions}>
                          <Link href={detailHref} className={styles.enterLink}>
                            <span>ENTER STUDY</span>
                            <span aria-hidden="true">→</span>
                          </Link>

                          {spotifyData && (
                            <a
                              href={spotifyData.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.spotifyChip}
                              title={spotifyData.title}
                              aria-label={`${series.title} on Spotify`}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                              </svg>
                              <span>Spotify ↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sessions */}
          {sessionItems.length > 0 && (
            <div className={styles.sessionsBlock}>
              <div className={styles.subhead} data-reveal>
                <span className={styles.overline}>Discourses &amp; Lectures</span>
                <h3 className={styles.h3}>Individual Sessions &amp; Standalone Talks</h3>
              </div>

              <div className={styles.catalogue} role="feed" aria-label="Discourses catalogue" data-stagger>
                {sessionItems.map((teaching) => {
                  const isPlaying = audioState.track?.id === teaching.id && audioState.isPlaying;
                  const isActive = audioState.track?.id === teaching.id;
                  const detailHref = `/teachings/${teaching.slug || teaching.id}`;

                  return (
                    <article
                      key={teaching.id}
                      className={`${styles.row} ${isActive ? styles.rowActive : ''}`}
                      data-morph-source="teaching"
                    >
                      <div className={styles.mediaCol}>
                        <div className={`${styles.mediaIcon} ${teaching.format === 'Audio' ? styles.mediaAudio : styles.mediaVideo}`} aria-hidden="true">
                          {teaching.format === 'Audio' ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="23 7 16 12 23 17 23 7" />
                              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                          )}
                        </div>
                        <span className={styles.mediaLabel}>{teaching.format}</span>
                      </div>

                      <div className={styles.infoCol}>
                        <h4 className={styles.rowTitle}>
                          <Link href={detailHref} className={styles.titleLink}>
                            {teaching.title}
                          </Link>
                        </h4>

                        <div className={styles.infoLine}>
                          <span className={styles.strong}>{teaching.teacher}</span>
                          <span aria-hidden="true">·</span>
                          <span>{teaching.scripture || teaching.categoryName}</span>
                          {teaching.duration && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{teaching.duration}</span>
                            </>
                          )}
                          <span aria-hidden="true">·</span>
                          <span>{teaching.language}</span>
                        </div>

                        {teaching.description && (
                          <p className={styles.rowDesc}>{teaching.description}</p>
                        )}
                      </div>

                      <div className={styles.actionCol}>
                        {teaching.format === 'Audio' && teaching.src ? (
                          <button
                            type="button"
                            className={`${styles.playBtn} ${isPlaying ? styles.playBtnActive : ''}`}
                            onClick={(e) => handleAudioAction(e, teaching)}
                            aria-label={isPlaying ? `Pause: ${teaching.title}` : `Listen to ${teaching.title}`}
                          >
                            {isPlaying ? (
                              <>
                                <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
                                  <rect x="2" y="1" width="4" height="12" rx="1" />
                                  <rect x="8" y="1" width="4" height="12" rx="1" />
                                </svg>
                                <span>PAUSE</span>
                              </>
                            ) : (
                              <>
                                <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
                                  <path d="M3 1L13 7L3 13V1Z" />
                                </svg>
                                <span>{isActive ? 'RESUME' : 'LISTEN →'}</span>
                              </>
                            )}
                          </button>
                        ) : teaching.format === 'Video' ? (
                          <Link href={detailHref} className={styles.playBtn} aria-label={`Watch ${teaching.title}`}>
                            <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
                              <path d="M3 1L13 7L3 13V1Z" />
                            </svg>
                            <span>WATCH →</span>
                          </Link>
                        ) : null}

                        <Link
                          href={detailHref}
                          className={styles.deskLink}
                          aria-label={`Study ${teaching.title} at Study Desk`}
                        >
                          Study Desk →
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {filteredTeachings.length === 0 && (
            <div className={styles.empty}>
              <EmptyState
                icon="📜"
                title="No Recordings Found"
                description="No discourses currently match your inquiry terms. Try adjusting your search query or reset your filters to explore by scriptural path."
                actionLabel="Reset All Filters"
                onAction={handleResetAll}
              />
            </div>
          )}

          {/* Archive */}
          <div className={styles.archiveHead} data-reveal>
            <span className={styles.overline}>PRESERVED DISCOURSES &amp; SATSANG</span>
            <h3 className={styles.h2Sm}>The Complete Teaching Archive</h3>
            <p className={styles.lead}>
              Explore the wider collection of talks, discourses and recordings from Vedanta Ashram — organized by category, teacher, and scripture for deeper academic and spiritual inquiry.
            </p>
          </div>

          <TeachingsArchiveExplorer initialCategory={selectedCategory} />

          {/* Notice */}
          <div className={styles.notice} data-reveal>
            <h3>About the Vedanta Mission Digital Repository</h3>
            <p>
              The Jnana Ganga library is an authentic, non-commercial scriptural repository preserved under the auspices of Vedanta Ashram, Indore. Discourses adhere strictly to the traditional methodology of Shankara Advaita Vedanta. Where direct recordings are undergoing archival preservation, entries are cataloged faithfully without speculative metadata.
            </p>
            <div className={styles.noticeLinks}>
              <Link href="/about">Living History of Vedanta Mission →</Link>
              <Link href="/acharyas">Meet the Acharyas →</Link>
              <Link href="/ashram">Ashram Daily Rhythm &amp; Sanctum →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export default function TeachingsPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.fallback}>Opening Jnana Ganga Knowledge Library...</div>
      }
    >
      <TeachingsLibrary />
    </Suspense>
  );
}
