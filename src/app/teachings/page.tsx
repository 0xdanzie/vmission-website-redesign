'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
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
    <>
      {/* ======================================================================
          01 — SCENE 1 & 2: THE SACRED THRESHOLD (JNANA GANGA ARRIVAL)
          ====================================================================== */}
      <section className={styles.hero} aria-label="Jnana Ganga — The Living Stream of Vedanta">
        <div className={styles.heroBackdrop}>
          <Image
            src="/images/vmission/ashram/teaching-hall-interior.jpg"
            alt="Teaching sanctum and spiritual library of Vedanta Ashram, Indore"
            fill
            priority
            sizes="100vw"
            quality={90}
            className={styles.heroImage}
          />
          <div className={styles.heroScrim} />
          <div className={styles.heroVignette} />
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            {/* Contemplative Sanskrit Invocation & Eyebrow */}
            <div className={styles.heroIdentity}>
              <span className={styles.sanskritInvocation}>ज्ञानगङ्गा</span>
              <span className={styles.identityDot}>·</span>
              <span className={styles.eyebrowText}>JNANA GANGA</span>
            </div>

            {/* Monumental Primary Heading */}
            <h1 className={styles.heroTitle}>
              The Living Stream<br />
              <span className={styles.heroTitleSub}>of Vedanta</span>
            </h1>

            {/* Quiet, Sacred Subheading */}
            <p className={styles.heroSubtitle}>Scriptural Discourses &amp; Guided Study</p>

            {/* Generous Editorial Supporting Copy */}
            <p className={styles.heroLead}>
              Explore the teachings, discourses and contemplative guidance of Vedanta Ashram, Indore — arranged for beginning inquiry, sustained study and deeper reflection.
            </p>

            {/* Contemplative Action Portal (Dual CTAs) */}
            <div className={styles.heroActionRow}>
              <a href="#begin-inquiry" className={styles.heroPrimaryCta}>
                Begin Your Study ↓
              </a>
              <a href="#study-paths" className={styles.heroSecondaryCta}>
                Browse All Teachings →
              </a>
            </div>

            {/* Delicate Scroll Prompt */}
            <a href="#begin-inquiry" className={styles.heroScrollPrompt} aria-label="Scroll down to begin your inquiry">
              <span className={styles.scrollPromptText}>DESCEND TO STUDY</span>
              <span className={styles.scrollPromptGlyph} aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* Layered Architectural Horizon Descent */}
        <div className={styles.heroTransitionThreshold} aria-hidden="true" />
      </section>

      {/* ======================================================================
          01B — SCENE 3 & 4: THREE DOORWAYS INTO STUDY & LISTENING SANCTUARY
          ====================================================================== */}
      <section className={styles.orientationSection} id="begin-inquiry" aria-label="Begin Your Inquiry">
        <div className="container">
          {/* Sacred Threshold Crest */}
          <div className={styles.thresholdCrest} aria-hidden="true">
            <span className={styles.crestDividerLine} />
            <span className={styles.crestSanskrit}>॥ स्वाध्यायप्रवचने च ॥</span>
            <span className={styles.crestDividerLine} />
          </div>

          {/* Section 01B Header */}
          <div className={styles.doorwaysHeader}>
            <span className={styles.doorwaysPre}>PRATHAMA PRAVESHA · FIRST INQUIRY</span>
            <h2 className={styles.doorwaysTitle}>Begin Your Inquiry</h2>
            <p className={styles.doorwaysLead}>
              A few places to begin, whether you are new to Vedanta or returning to study.
            </p>
          </div>

          {/* Scene 3: Three Sacred Doorways into Study */}
          <div className={styles.doorwaysGrid}>
            {/* Doorway 1: Tattva Bodha */}
            <article className={styles.doorwayCard}>
              <div className={styles.doorwayLintel} aria-hidden="true" />
              <div className={styles.doorwayMeta}>
                <span className={styles.doorwayNumber}>01</span>
                <span className={styles.doorwaySanskrit}>तत्त्वबोधः</span>
              </div>
              <h3 className={styles.doorwayTitle}>Tattva Bodha</h3>
              <span className={styles.doorwayDivider} aria-hidden="true" />
              <p className={styles.doorwayDesc}>
                The essential gateway text defining the qualified seeker, discrimination, and direct Self-knowledge.
              </p>
              <div className={styles.doorwayFooter}>
                <Link href="/learn/tattva-bodha" className={styles.doorwayLink}>
                  <span>Begin Foundational Study</span>
                  <span className={styles.doorwayArrow} aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            {/* Doorway 2: Bhagavad Gita */}
            <article className={styles.doorwayCard}>
              <div className={styles.doorwayLintel} aria-hidden="true" />
              <div className={styles.doorwayMeta}>
                <span className={styles.doorwayNumber}>02</span>
                <span className={styles.doorwaySanskrit}>श्रीमद्भगवद्गीता</span>
              </div>
              <h3 className={styles.doorwayTitle}>Bhagavad Gita</h3>
              <span className={styles.doorwayDivider} aria-hidden="true" />
              <p className={styles.doorwayDesc}>
                Verse-by-verse exposition of Sri Krishna&apos;s dialogue on selfless action, devotion, and supreme truth.
              </p>
              <div className={styles.doorwayFooter}>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('bhagavad-gita', true)}
                  className={styles.doorwayLinkBtn}
                >
                  <span>Explore Available Discourses</span>
                  <span className={styles.doorwayArrow} aria-hidden="true">→</span>
                </button>
              </div>
            </article>

            {/* Doorway 3: Contemplation */}
            <article className={styles.doorwayCard}>
              <div className={styles.doorwayLintel} aria-hidden="true" />
              <div className={styles.doorwayMeta}>
                <span className={styles.doorwayNumber}>03</span>
                <span className={styles.doorwaySanskrit}>निदिध्यासनम्</span>
              </div>
              <h3 className={styles.doorwayTitle}>Contemplation</h3>
              <span className={styles.doorwayDivider} aria-hidden="true" />
              <p className={styles.doorwayDesc}>
                Guided meditative inquiry and Nididhyasana leading intellectual clarity into steady, silent abidance.
              </p>
              <div className={styles.doorwayFooter}>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('meditation', true)}
                  className={styles.doorwayLinkBtn}
                >
                  <span>Explore Meditation Sessions</span>
                  <span className={styles.doorwayArrow} aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          </div>

          {/* Scene 4: Listening Beyond the Ashram (Spotify Podcast Sanctuary) */}
          <div className={styles.spotifyListeningBand} aria-label="Listening Beyond the Ashram">
            <div className={styles.spotifyBandLeft}>
              <div className={styles.spotifyBandMeta}>
                <span className={styles.spotifyBandOverline}>LISTEN BEYOND THE ASHRAM</span>
                <div className={styles.ambientWaveform} aria-hidden="true">
                  <span className={styles.waveBar} />
                  <span className={styles.waveBar} />
                  <span className={styles.waveBar} />
                  <span className={styles.waveBar} />
                  <span className={styles.waveBar} />
                </div>
              </div>
              <h3 className={styles.spotifyBandTitle}>Vedanta Ashram Podcasts</h3>
              <p className={styles.spotifyBandCopy}>
                Discourses and audio satsangs from Vedanta Ashram, Indore.
              </p>
            </div>

            <div className={styles.spotifyBandRight}>
              <a
                href={OFFICIAL_PODCAST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.spotifyPrimaryAction}
                aria-label="Listen to Vedanta Ashram Podcasts on Spotify"
              >
                <svg className={styles.spotifyGlyph} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span>Listen on Spotify ↗</span>
              </a>
              <span className={styles.spotifyFootnote}>
                All discourses are also playable directly within this library.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          02 — FIND YOUR PATH OF STUDY (EDITORIAL STUDY INDEX)
          ====================================================================== */}
      <section className={styles.pathIndexSection} id="study-paths" aria-label="Find Your Path of Study">
        <div className="container">
          <div className={styles.pathIndexHeader}>
            <div className={styles.pathIndexHeadingGroup}>
              <span className={styles.pathIndexOverline}>TRADITIONS OF INQUIRY</span>
              <h2 className={styles.pathIndexTitle}>Find Your Path of Study</h2>
              <p className={styles.pathIndexLead}>
                Seven traditional gateways into the wisdom of Advaita Vedanta — choose an inquiry to focus your study.
              </p>
            </div>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                className={styles.pathResetBtn}
                onClick={() => handleCategorySelect('all', true)}
                aria-label="View all study paths"
              >
                <span>Show All Paths ({teachings.length})</span>
                <span className={styles.resetGlyph} aria-hidden="true">↺</span>
              </button>
            )}
          </div>

          <nav className={styles.pathIndexList} aria-label="Seven Paths of Study">
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
                  <span className={styles.pathRowAccent} aria-hidden="true" />
                  <div className={styles.pathRowLeft}>
                    <span className={styles.pathIndexNum}>{zeroPaddedIndex}</span>
                    <div className={styles.pathTypographyGroup}>
                      <span className={styles.pathNameText}>{cat.name}</span>
                      <span className={styles.pathSanskritText}>{cat.sanskrit}</span>
                    </div>
                  </div>

                  <div className={styles.pathRowRight}>
                    <span className={styles.pathCountTag}>{count} discourses</span>
                    <span className={styles.pathRowDivider} aria-hidden="true" />
                    <span className={styles.pathArrowGlyph} aria-hidden="true">→</span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Active Category Context Bar */}
          {activeCategoryObject && (
            <div className={styles.activeCatNote}>
              <div className={styles.activeCatBadge}>
                <span className={styles.activeCatNumeral}>{activeCategoryObject.romanNumeral}</span>
                <span className={styles.activeCatName}>{activeCategoryObject.name}</span>
                <span className={styles.activeCatDevanagari}>({activeCategoryObject.sanskrit})</span>
              </div>
              <p className={styles.activeCatDesc}>{activeCategoryObject.description}</p>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================================
          02B — SIGNATURE ATMOSPHERIC THRESHOLD: ENTERING THE TEACHING HALL
          (Grand library threshold rendered exclusively in default overview state)
          ====================================================================== */}
      {selectedCategory === 'all' && (
        <section className={styles.hallThresholdSection} aria-label="Entering the Teaching Hall">
          <div className={styles.hallBackdrop}>
            <Image
              src="/images/vmission/ashram/teaching-hall-interior.jpg"
              alt="Teaching sanctum and scriptural study repository of Vedanta Ashram, Indore"
              fill
              sizes="100vw"
              quality={90}
              className={styles.hallImage}
            />
            <div className={styles.hallScrim} />
            <div className={styles.hallVignette} />
          </div>
          <div className="container">
            <div className={styles.hallContent}>
              <div className={styles.hallEyebrow}>
                <span className={styles.hallSanskrit}>॥ स्वाध्यायप्रवचने च ॥</span>
                <span className={styles.hallDot}>·</span>
                <span className={styles.hallOverline}>PRATISHTHA · TEACHING HALL</span>
              </div>
              <h3 className={styles.hallTitle}>The Living Teaching Hall</h3>
              <p className={styles.hallLead}>
                Enter a few of the teaching collections that carry the tradition into sustained study.
              </p>
            </div>
          </div>
          <div className={styles.hallBottomBorder} aria-hidden="true" />
        </section>
      )}

      {/* ======================================================================
          03 — LIVING TEACHINGS & STUDY REPOSITORY
          ====================================================================== */}
      <section className={styles.livingTeachingsSection} id="living-teachings" aria-label="Living Teachings">
        <div className="container">
          {/* Section Introduction */}
          <div className={styles.livingHeader}>
            {selectedCategory === 'all' ? (
              <>
                <span className={styles.livingPre}>DISCOURSE COLLECTIONS</span>
                <h2 className={styles.livingTitle}>Living Teachings</h2>
                <p className={styles.livingLead}>
                  Enter a few of the teaching collections that carry the tradition into sustained study.
                </p>
              </>
            ) : (
              <>
                <div className={styles.livingCategoryTagRow}>
                  <span className={styles.livingCategoryTagNumeral}>
                    TRADITION {activeCategoryObject?.romanNumeral}
                  </span>
                  <span className={styles.livingCategoryTagDivider}>·</span>
                  <span className={styles.livingCategoryTagSanskrit}>
                    {activeCategoryObject?.sanskrit}
                  </span>
                </div>
                <h2 className={styles.livingTitle}>
                  Living Teachings — {activeCategoryObject?.name}
                </h2>
                <p className={styles.livingLead}>
                  {activeCategoryObject?.description}
                </p>
                <div className={styles.livingActiveControls}>
                  <button
                    type="button"
                    className={styles.livingResetPill}
                    onClick={() => handleCategorySelect('all', true)}
                    aria-label="View all study traditions"
                  >
                    <span>← View All Traditions ({teachings.length})</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Controls Bar */}
          <div className={styles.controlsBar}>
            {/* Search Input */}
            <div className={styles.searchWrap}>
              <label htmlFor="teachings-search" className="sr-only">Search Jnana Ganga library</label>
              <div className={styles.searchBox}>
                <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                    className={styles.clearSearchBtn}
                    aria-label="Clear search input"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Format (Type) Segmented Switch */}
            <div className={styles.formatSegment} role="group" aria-label="Filter by media type">
              <button
                type="button"
                className={`${styles.segBtn} ${selectedFormat === 'all' ? styles.activeSegBtn : ''}`}
                onClick={() => handleFormatSelect('all')}
                aria-pressed={selectedFormat === 'all'}
              >
                All ({teachings.length})
              </button>
              <button
                type="button"
                className={`${styles.segBtn} ${selectedFormat === 'Audio' ? styles.activeSegBtn : ''}`}
                onClick={() => handleFormatSelect('Audio')}
                aria-pressed={selectedFormat === 'Audio'}
              >
                Audio ({audioCount})
              </button>
              <button
                type="button"
                className={`${styles.segBtn} ${selectedFormat === 'Video' ? styles.activeSegBtn : ''}`}
                onClick={() => handleFormatSelect('Video')}
                aria-pressed={selectedFormat === 'Video'}
              >
                Video ({videoCount})
              </button>
            </div>

            {/* Teacher Selector */}
            <div className={styles.teacherSelectWrap}>
              <label htmlFor="teacher-filter" className="sr-only">Filter by Teacher</label>
              <select
                id="teacher-filter"
                value={selectedTeacher}
                onChange={handleTeacherChange}
                className={styles.teacherSelect}
              >
                {teachingTeachers.map((tch) => (
                  <option key={tch} value={tch}>{tch}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Metadata Bar */}
          <div className={styles.resultsMetaBar}>
            <p className={styles.resultsCount}>
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
              <button
                type="button"
                className={styles.resetFiltersLink}
                onClick={handleResetAll}
              >
                Reset All Filters ↺
              </button>
            )}
          </div>

          {/* ======================================================================
              04 — SERIES-FIRST PRESENTATION LAYER (CURATED EDITORIAL COMPOSITION)
              ====================================================================== */}
          {seriesItems.length > 0 && (
            <div className={styles.seriesSectionWrap}>
              <div className={styles.sectionHeadingWrap}>
                <span className={styles.sectionPre}>Comprehensive Courses</span>
                <h3 className={styles.sectionMainHeading}>Curated Series &amp; Treatises</h3>
              </div>

              <div className={styles.seriesEditorialGrid}>
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

                  return (
                    <article
                      key={series.id}
                      className={`${styles.seriesEditorialCard} ${!isVerifiedArtwork ? styles.seriesImagelessCard : ''}`}
                      data-morph-source="teaching"
                    >
                      {isVerifiedArtwork ? (
                        <div className={styles.seriesArtworkWrap}>
                          <Image
                            src={series.thumbnailSrc!}
                            alt={series.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={styles.seriesArtworkImage}
                          />
                          <div className={styles.seriesArtworkGrad} />
                          <span className={styles.seriesFormatBadge}>
                            {series.format === 'Video' ? '▶ Video Series' : '🎙️ Audio Series'}
                          </span>
                        </div>
                      ) : (
                        <div className={styles.seriesEditorialManuscriptHeader}>
                          <div className={styles.manuscriptTopRule} aria-hidden="true" />
                          <div className={styles.manuscriptMetaRow}>
                            <span className={styles.manuscriptScriptureTag}>
                              {series.scripture || series.categoryName || 'Vedanta Series'}
                            </span>
                            <span className={styles.manuscriptFormatBadge}>
                              {series.format === 'Video' ? '▶ Video Series' : '🎙️ Audio Series'}
                            </span>
                          </div>
                          <div className={styles.manuscriptGlyphWrap} aria-hidden="true">
                            <span className={styles.manuscriptGlyphRule} />
                            <span className={styles.manuscriptGlyphChar}>― ॥ ―</span>
                            <span className={styles.manuscriptGlyphRule} />
                          </div>
                        </div>
                      )}

                      <div className={styles.seriesCardBody}>
                        {isVerifiedArtwork && (
                          <div className={styles.seriesOverlineRow}>
                            <span className={styles.seriesScriptureOverline}>
                              {series.scripture || series.categoryName || 'Vedanta Series'}
                            </span>
                            {series.duration && (
                              <span className={styles.seriesDurationLabel}>{series.duration}</span>
                            )}
                          </div>
                        )}

                        <h4 className={styles.seriesTitleHeading}>
                          <Link href={detailHref} className={styles.seriesTitleAnchor}>
                            {series.title}
                          </Link>
                        </h4>

                        <div className={styles.seriesTeacherLine}>
                          <span className={styles.teacherNameText}>{series.teacher}</span>
                          <span className={styles.metaDividerDot}>·</span>
                          <span className={styles.languageText}>{series.language}</span>
                          {series.duration && !isVerifiedArtwork && (
                            <>
                              <span className={styles.metaDividerDot}>·</span>
                              <span className={styles.seriesDurationLabel}>{series.duration}</span>
                            </>
                          )}
                        </div>

                        <p className={styles.seriesSynopsisText}>{series.description}</p>

                        <div className={styles.seriesActionsRow}>
                          <Link href={detailHref} className={styles.enterStudyCta}>
                            <span>ENTER STUDY</span>
                            <span className={styles.ctaArrow} aria-hidden="true">→</span>
                          </Link>

                          {spotifyData && (
                            <a
                              href={spotifyData.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.spotifySecondaryLink}
                              title={spotifyData.title}
                              aria-label={`${series.title} on Spotify`}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                              </svg>
                              <span>Spotify ↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================================
              05 — INDIVIDUAL SESSIONS & DISCOURSES (SCHOLARLY CATALOGUE INDEX)
              ====================================================================== */}
          {sessionItems.length > 0 && (
            <div className={styles.sessionsSectionWrap}>
              <div className={styles.sectionHeadingWrap}>
                <span className={styles.sectionPre}>Discourses &amp; Lectures</span>
                <h3 className={styles.sectionMainHeading}>Individual Sessions &amp; Standalone Talks</h3>
              </div>

              <div className={styles.scholarlyCatalogueList} role="feed" aria-label="Discourses catalogue">
                {sessionItems.map((teaching) => {
                  const isPlaying = audioState.track?.id === teaching.id && audioState.isPlaying;
                  const isActive = audioState.track?.id === teaching.id;
                  const detailHref = `/teachings/${teaching.slug || teaching.id}`;

                  return (
                    <article
                      key={teaching.id}
                      className={`${styles.catalogueRow} ${isActive ? styles.catalogueRowActive : ''}`}
                      data-morph-source="teaching"
                    >
                      {/* Media Column */}
                      <div className={styles.mediaCol}>
                        <div
                          className={`${styles.mediaEmblem} ${
                            teaching.format === 'Audio' ? styles.mediaAudio : styles.mediaVideo
                          }`}
                          aria-hidden="true"
                        >
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
                        <span className={styles.mediaTypeLabel}>{teaching.format}</span>
                      </div>

                      {/* Info Column */}
                      <div className={styles.infoCol}>
                        <h4 className={styles.infoTitle}>
                          <Link href={detailHref} className={styles.infoTitleLink}>
                            {teaching.title}
                          </Link>
                        </h4>

                        <div className={styles.infoDetailsRow}>
                          <span className={styles.infoTeacher}>{teaching.teacher}</span>
                          <span className={styles.metaDividerDot}>·</span>
                          <span className={styles.infoScripture}>{teaching.scripture || teaching.categoryName}</span>
                          {teaching.duration && (
                            <>
                              <span className={styles.metaDividerDot}>·</span>
                              <span className={styles.infoDuration}>{teaching.duration}</span>
                            </>
                          )}
                          <span className={styles.metaDividerDot}>·</span>
                          <span className={styles.infoLanguage}>{teaching.language}</span>
                        </div>

                        {teaching.description && (
                          <p className={styles.infoDesc}>{teaching.description}</p>
                        )}
                      </div>

                      {/* Actions Column */}
                      <div className={styles.actionCol}>
                        {teaching.format === 'Audio' && teaching.src ? (
                          <button
                            type="button"
                            className={`${styles.actionPrimaryBtn} ${isPlaying ? styles.actionPlayingBtn : ''}`}
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
                          <Link
                            href={detailHref}
                            className={styles.actionPrimaryBtn}
                            aria-label={`Watch ${teaching.title}`}
                          >
                            <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
                              <path d="M3 1L13 7L3 13V1Z" />
                            </svg>
                            <span>WATCH →</span>
                          </Link>
                        ) : null}

                        <Link
                          href={detailHref}
                          className={styles.actionDeskLink}
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

          {/* Empty Search State */}
          {filteredTeachings.length === 0 && (
            <div className={styles.emptyContainer}>
              <EmptyState
                icon="📜"
                title="No Recordings Found"
                description="No discourses currently match your inquiry terms. Try adjusting your search query or reset your filters to explore by scriptural path."
                actionLabel="Reset All Filters"
                onAction={handleResetAll}
              />
            </div>
          )}

          {/* ======================================================================
              06 — CALM EDITORIAL TRANSITION TO COMPLETE ARCHIVE
              ====================================================================== */}
          <div className={styles.archiveTransitionHeader}>
            <div className={styles.transitionDivider} aria-hidden="true" />
            <span className={styles.transitionOverline}>PRESERVED DISCOURSES &amp; SATSANG</span>
            <h3 className={styles.transitionTitle}>The Complete Teaching Archive</h3>
            <p className={styles.transitionLead}>
              Explore the wider collection of talks, discourses and recordings from Vedanta Ashram — organized by category, teacher, and scripture for deeper academic and spiritual inquiry.
            </p>
          </div>

          {/* Cleansed Deep Archive Explorer (Zero Canonical IDs Rendered) */}
          <TeachingsArchiveExplorer initialCategory={selectedCategory} />

          {/* ======================================================================
              07 — INSTITUTIONAL INTEGRITY PRE-FOOTER
              ====================================================================== */}
          <div className={styles.archiveIntegrityNotice}>
            <div className={styles.noticeIcon} aria-hidden="true">🏛️</div>
            <div className={styles.noticeBody}>
              <h3 className={styles.noticeHeading}>About the Vedanta Mission Digital Repository</h3>
              <p className={styles.noticeText}>
                The Jnana Ganga library is an authentic, non-commercial scriptural repository preserved under the auspices of Vedanta Ashram, Indore. Discourses adhere strictly to the traditional methodology of Shankara Advaita Vedanta. Where direct recordings are undergoing archival preservation, entries are cataloged faithfully without speculative metadata.
              </p>
              <div className={styles.noticeLinks}>
                <Link href="/about" className={styles.noticeLink}>Living History of Vedanta Mission →</Link>
                <Link href="/acharyas" className={styles.noticeLink}>Meet the Acharyas →</Link>
                <Link href="/ashram" className={styles.noticeLink}>Ashram Daily Rhythm &amp; Sanctum →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function TeachingsPage() {
  return (
    <Suspense
      fallback={
        <div className="container" style={{ padding: '8rem 1rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--vm-text-muted)' }}>
            Opening Jnana Ganga Knowledge Library...
          </p>
        </div>
      }
    >
      <TeachingsLibrary />
    </Suspense>
  );
}
