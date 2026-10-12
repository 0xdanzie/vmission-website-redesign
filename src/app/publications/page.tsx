'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useData } from '@/context/DataContext';
import { Publication } from '@/data/publications';
import PublicationModal from '@/components/PublicationModal';
import Magnetic from '@/components/motion/Magnetic';
import TiltCard from '@/components/motion/TiltCard';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
import { getAssetPath } from '@/utils/assetPath';
import CinematicPreFooter from '@/components/cinematic/CinematicPreFooter';
import Button from '@/components/Button';
import PublicationPlaceholder from '@/components/PublicationPlaceholder';
import { resolvePublicationCover } from '@/lib/media-identity';
import styles from './page.module.css';

const PUBLICATION_TYPES = [
  'All Archive',
  'Vedanta Sandesh',
  'Vedanta Piyush',
  'E-Books',
  'Study & Chant Texts',
] as const;

const INITIAL_BATCH_SIZE = 24;
const BATCH_INCREMENT = 24;

export default function PublicationsPage() {
  const { publications } = useData();
  const rootRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  useScrollReveals(rootRef);
  const [selectedType, setSelectedType] = useState<string>('All Archive');
  const [selectedEra, setSelectedEra] = useState<string>('All Eras');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalPub, setActiveModalPub] = useState<Publication | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);

  // =========================================================================
  // GATE 1 — AUTHORITATIVE DYNAMIC DATA DERIVATION (NEVER HARDCODED)
  // =========================================================================
  const totalCount = publications.length;

  const sandeshCount = useMemo(
    () => publications.filter((p) => p.type === 'Vedanta Sandesh').length,
    [publications]
  );
  const piyushCount = useMemo(
    () => publications.filter((p) => p.type === 'Vedanta Piyush').length,
    [publications]
  );
  const ebooksCount = useMemo(
    () => publications.filter((p) => p.type === 'E-Books').length,
    [publications]
  );
  const studyTextsCount = useMemo(
    () => publications.filter((p) => p.type === 'Study & Chant Texts').length,
    [publications]
  );

  // Derive distinct valid years and era distributions dynamically
  const { minYear, maxYear, availableYearsList, eraCounts } = useMemo(() => {
    const validYears = publications
      .map((p) => p.year)
      .filter((y): y is number => typeof y === 'number' && !isNaN(y));
    const uniqueYears = Array.from(new Set(validYears)).sort((a, b) => b - a);
    const min = validYears.length > 0 ? Math.min(...validYears) : 2019;
    const max = validYears.length > 0 ? Math.max(...validYears) : 2022;
    const era2020s = publications.filter((p) => p.year && p.year >= 2020).length;
    const era2010s = publications.filter((p) => p.year && p.year < 2020).length;
    return {
      minYear: min,
      maxYear: max,
      availableYearsList: uniqueYears,
      eraCounts: { era2020s, era2010s },
    };
  }, [publications]);

  // Year counts mapping for quick-filter labels
  const yearCountsMap = useMemo(() => {
    const counts: Record<number, number> = {};
    publications.forEach((p) => {
      if (typeof p.year === 'number') {
        counts[p.year] = (counts[p.year] || 0) + 1;
      }
    });
    return counts;
  }, [publications]);

  // =========================================================================
  // GATE 3 — THE SIX AUTHENTIC RECOVERED E-BOOKS
  // =========================================================================
  const ebooksList = useMemo(
    () => publications.filter((p) => p.type === 'E-Books'),
    [publications]
  );

  // =========================================================================
  // GATE 4 — LATEST VERIFIED ANCHOR PERIODICALS
  // =========================================================================
  const latestSandesh = useMemo(() => {
    const verified = publications.filter(
      (p) => p.type === 'Vedanta Sandesh' && resolvePublicationCover(p.id, p.type, p.coverImage)
    );
    return verified.sort((a, b) => (b.year || 0) - (a.year || 0))[0] ||
      publications.filter((p) => p.type === 'Vedanta Sandesh')[0];
  }, [publications]);

  const latestPiyush = useMemo(() => {
    const verified = publications.filter(
      (p) => p.type === 'Vedanta Piyush' && resolvePublicationCover(p.id, p.type, p.coverImage)
    );
    return verified.sort((a, b) => (b.year || 0) - (a.year || 0))[0] ||
      publications.filter((p) => p.type === 'Vedanta Piyush')[0];
  }, [publications]);

  // Reset pagination batch when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH_SIZE);
  }, [selectedType, selectedEra, selectedYear, searchQuery]);

  // =========================================================================
  // GATE 5 — FILTERING ACROSS THE COMPLETE 250-RECORD DATASET
  // =========================================================================
  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      // Type filter
      if (selectedType !== 'All Archive' && pub.type !== selectedType) {
        return false;
      }
      // Era filter
      if (selectedEra === '2020s' && (!pub.year || pub.year < 2020)) {
        return false;
      }
      if (selectedEra === '2010s' && (!pub.year || pub.year < 2010 || pub.year >= 2020)) {
        return false;
      }
      // Year filter
      if (selectedYear !== 'All Years' && pub.year && pub.year !== parseInt(selectedYear, 10)) {
        return false;
      }
      if (selectedYear !== 'All Years' && !pub.year) {
        return false;
      }
      // Search query across title, description, author, language
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = pub.title.toLowerCase().includes(q);
        const matchDesc = pub.description?.toLowerCase().includes(q) || false;
        const matchAuthor = pub.author?.toLowerCase().includes(q) || false;
        const matchLang = pub.language?.toLowerCase().includes(q) || false;
        if (!matchTitle && !matchDesc && !matchAuthor && !matchLang) {
          return false;
        }
      }
      return true;
    });
  }, [publications, selectedType, selectedEra, selectedYear, searchQuery]);

  // Sliced items for safe progressive DOM mounting (Gate 5 performance optimization)
  const displayedPublications = useMemo(() => {
    return filteredPublications.slice(0, visibleCount);
  }, [filteredPublications, visibleCount]);

  const hasMore = visibleCount < filteredPublications.length;
  const remainingCount = filteredPublications.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, filteredPublications.length));
  };

  const handleLoadAll = () => {
    setVisibleCount(filteredPublications.length);
  };

  const scrollToArchive = () => {
    const el = document.getElementById('archive-browser');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .fromTo('[data-pub-mask]', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.5 }, 0)
        .fromTo(heroImgRef.current, { scale: 1.18 }, { scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
        .fromTo('[data-pub-line]', { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.45)
        .fromTo('[data-pub-fade]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.9);

      gsap.to(heroImgRef.current, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: '[data-pub-hero]', start: 'top top', end: 'bottom top', scrub: true },
      });

      // Shelf plinth: the e-book shelf draws in as it arrives
      gsap.utils.toArray<HTMLElement>('[data-shelf-line]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }
        );
      });

      // Cover reveal: each cover lifts out of its frame as it enters view
      gsap.utils.toArray<HTMLElement>('[data-cover-lift]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 6, opacity: 0.4 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 55%', scrub: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.archive} ref={rootRef}>
      {/* 01. Hero */}
      <section className={styles.hero} data-pub-hero aria-labelledby="pub-hero-title">
        <div className={styles.heroMedia} data-pub-mask>
          <img
            ref={heroImgRef}
            src={getAssetPath('/images/vmission/teaching/07-vedanta-archive-restored.jpg')}
            alt="Vedanta Ashram manuscript library and classical publication archives"
            className={styles.heroImg}
          />
          <div className={styles.heroShade} />
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            <nav className={styles.crumbs} aria-label="Breadcrumb" data-pub-fade>
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Literary Archive</span>
            </nav>

            <p className={styles.heroBadge} data-pub-fade>
              {totalCount} Canonical Works · {minYear}–{maxYear} Documented Corpus
            </p>

            <h1 id="pub-hero-title" className={styles.heroTitle}>
              <span className={styles.lineMask}><span className={styles.lineInner} data-pub-line>The Literary</span></span>
              <span className={styles.lineMask}><span className={`${styles.lineInner} ${styles.heroItalic}`} data-pub-line>Archive</span></span>
            </h1>

            <p className={styles.heroSub} data-pub-fade>Preserving the Living Heritage of Advaita Vedanta</p>
            <p className={styles.heroLead} data-pub-fade>
              Preserving and disseminating the traditional teachings of Advaita Vedanta through authentic monthly journals, foundational treatises, and classical Sanskrit scriptures. Every record in this archive is catalogued with verified source downloads, digital reading editions, or institutional preservation plates.
            </p>

            <div className={styles.heroCtas} data-pub-fade>
              <Magnetic strength={0.25}>
                <a href="#ebook-vault" className={styles.ctaPrimary}>E-Book Vault ↓</a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a href="#archive-browser" className={styles.ctaGhost}>Explore Full Archive ↓</a>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* Registry strip */}
      <nav className={styles.registry} aria-label="Archive Registry Statistics">
        <div className="container">
          <div className={styles.registryGrid} data-stagger>
            <button
              type="button"
              className={styles.registryItem}
              onClick={() => {
                setSelectedType('All Archive');
                setSelectedEra('All Eras');
                setSelectedYear('All Years');
                scrollToArchive();
              }}
              title="View all canonical publications"
            >
              <span className={styles.registryNumber}>{totalCount}</span>
              <span className={styles.registryLabel}>Catalogued Works</span>
              <span className={styles.registrySub}>All Canonical Entries</span>
            </button>

            <button
              type="button"
              className={styles.registryItem}
              onClick={() => {
                setSelectedType('Vedanta Sandesh');
                scrollToArchive();
              }}
              title="Filter archive to Vedanta Sandesh"
            >
              <span className={styles.registryNumber}>{sandeshCount}</span>
              <span className={styles.registryLabel}>Vedanta Sandesh</span>
              <span className={styles.registrySub}>English Monthly Issues</span>
            </button>

            <button
              type="button"
              className={styles.registryItem}
              onClick={() => {
                setSelectedType('Vedanta Piyush');
                scrollToArchive();
              }}
              title="Filter archive to Vedanta Piyush"
            >
              <span className={styles.registryNumber}>{piyushCount}</span>
              <span className={styles.registryLabel}>Vedanta Piyush</span>
              <span className={styles.registrySub}>Hindi Monthly Issues</span>
            </button>

            <button
              type="button"
              className={styles.registryItem}
              onClick={() => {
                const el = document.getElementById('ebook-vault');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              title="Jump to Curated E-Book Vault"
            >
              <span className={styles.registryNumber}>{ebooksCount}</span>
              <span className={styles.registryLabel}>E-Book Treatises</span>
              <span className={styles.registrySub}>Recovered Authentic Volumes</span>
            </button>

            <button
              type="button"
              className={styles.registryItem}
              onClick={() => {
                setSelectedType('Study & Chant Texts');
                scrollToArchive();
              }}
              title="Filter archive to Study & Chant Texts"
            >
              <span className={styles.registryNumber}>{studyTextsCount}</span>
              <span className={styles.registryLabel}>Study Texts</span>
              <span className={styles.registrySub}>Sanskrit Mūla &amp; Chants</span>
            </button>

            <div className={styles.registryItemStatic}>
              <span className={styles.registryNumber}>{minYear}–{maxYear}</span>
              <span className={styles.registryLabel}>Corpus Epoch</span>
              <span className={styles.registrySub}>Documented Digital Era</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 02. E-book vault */}
      <section id="ebook-vault" className={styles.vault} aria-labelledby="vault-title">
        <div className="container">
          <div className={styles.intro} data-reveal>
            <span className={styles.overline}>Curated Library Vault</span>
            <h2 id="vault-title" className={styles.h2}>Recovered Philosophical Treatises</h2>
            <div className={styles.rule} data-rule />
            <p className={styles.lead}>
              Six foundational treatises and scriptural monographs authored by Pujya Swami Atmananda Saraswati, preserved with their authentic recovered original artwork and complete PDF scriptural texts.
            </p>
          </div>

          <div className={styles.vaultGrid} data-stagger>
            {ebooksList.map((book) => {
              const resolvedCover = resolvePublicationCover(book.id, book.type, book.coverImage);
              return (
                <TiltCard key={book.id} max={5} className={styles.vaultCard}>
                  <div className={styles.vaultCover} data-cover-lift>
                    {resolvedCover ? (
                      <>
                        <img src={resolvedCover} alt={`Cover of ${book.title}`} className={styles.coverImg} loading="lazy" />
                        <span className={styles.verifiedTag}>Authentic Cover</span>
                      </>
                    ) : (
                      <PublicationPlaceholder publication={book} />
                    )}
                  </div>

                  <div className={styles.vaultBody}>
                    <div className={styles.tagRow}>
                      <span className={styles.tagAccent}>Canonical E-Book</span>
                      <span className={styles.tag}>{book.language}</span>
                      {book.pageCount && <span className={styles.tag}>{book.pageCount} Pages</span>}
                    </div>

                    <h3 className={styles.vaultTitle}>
                      <Link href={`/publications/${book.id}`} className={styles.titleLink}>
                        {book.title}
                      </Link>
                    </h3>

                    {book.author && <p className={styles.byline}>By {book.author}</p>}
                    <p className={styles.synopsis}>{book.description}</p>

                    <div className={styles.actions}>
                      <a
                        href={book.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionPrimary}
                        title="Download verified high-resolution PDF"
                      >
                        Download PDF Mirror ↗
                      </a>
                      {book.readOnlineUrl ? (
                        <button
                          type="button"
                          onClick={() => setActiveModalPub(book)}
                          className={styles.actionGhost}
                          title="Open Digital Reader"
                        >
                          Digital Reader
                        </button>
                      ) : (
                        <Link href={`/publications/${book.id}`} className={styles.actionGhost}>
                          Archival Bookplate →
                        </Link>
                      )}
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>

          <div className={styles.shelf} aria-hidden="true">
            <span className={styles.shelfLine} data-shelf-line />
          </div>
        </div>
      </section>

      {/* 03. Periodicals */}
      <section className={styles.periodicals} aria-labelledby="periodicals-title">
        <div className="container">
          <div className={styles.intro} data-reveal>
            <span className={styles.overline}>Living Periodical Tradition</span>
            <h2 id="periodicals-title" className={styles.h2}>Monthly Wisdom Journals</h2>
            <div className={styles.rule} data-rule />
            <p className={styles.lead}>
              Published continuously without interruption since 1995. Explore the latest flagship editions alongside historical epochs.
            </p>
          </div>

          <div className={styles.showcase} data-stagger>
            {[latestSandesh, latestPiyush].map((issue) => {
              if (!issue) return null;
              const resolvedCover = resolvePublicationCover(issue.id, issue.type, issue.coverImage);
              return (
                <article key={issue.id} className={styles.issue}>
                  <div className={styles.issueCover} data-cover-lift>
                    {resolvedCover ? (
                      <>
                        <img src={resolvedCover} alt={`Cover of ${issue.title}`} className={styles.coverImg} loading="lazy" />
                        <span className={styles.verifiedTag}>Authentic Cover</span>
                      </>
                    ) : (
                      <PublicationPlaceholder publication={issue} />
                    )}
                  </div>
                  <div className={styles.issueBody}>
                    <div className={styles.tagRow}>
                      <span className={styles.tagAccent}>{issue.type}</span>
                      <span className={styles.tag}>{issue.language}</span>
                      <span className={styles.tagOutline}>Current Edition</span>
                    </div>
                    <h3 className={styles.issueTitle}>
                      <Link href={`/publications/${issue.id}`} className={styles.titleLink}>
                        {issue.title}
                      </Link>
                    </h3>
                    <p className={styles.issueMeta}>
                      Issue: {issue.month} {issue.year} · {issue.pageCount || 36} Pages
                    </p>
                    <p className={styles.synopsis}>{issue.description}</p>
                    <div className={styles.actions}>
                      <a
                        href={issue.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionPrimary}
                        title="Download verified PDF mirror"
                      >
                        Download PDF Mirror ↗
                      </a>
                      {issue.readOnlineUrl ? (
                        <button type="button" onClick={() => setActiveModalPub(issue)} className={styles.actionGhost}>
                          Read Online
                        </button>
                      ) : (
                        <Link href={`/publications/${issue.id}`} className={styles.actionGhost}>
                          Archival Bookplate →
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Era navigation */}
          <div className={styles.eraCard} data-reveal>
            <div className={styles.eraHeader}>
              <div>
                <h3 className={styles.eraTitle}>Chronological Archive Navigation</h3>
                <p className={styles.eraSub}>Select a historical era to focus records in the catalogue below</p>
              </div>
              {selectedEra !== 'All Eras' && (
                <button type="button" className={styles.eraClear} onClick={() => setSelectedEra('All Eras')}>
                  Show All Eras
                </button>
              )}
            </div>

            <div className={styles.eraRow}>
              <button
                type="button"
                className={`${styles.eraBtn} ${selectedEra === 'All Eras' ? styles.eraBtnActive : ''}`}
                onClick={() => {
                  setSelectedEra('All Eras');
                  scrollToArchive();
                }}
              >
                <span className={styles.eraName}>All Historical Eras</span>
                <span className={styles.eraCount}>{totalCount} Works ({minYear}–{maxYear})</span>
              </button>
              <button
                type="button"
                className={`${styles.eraBtn} ${selectedEra === '2020s' ? styles.eraBtnActive : ''}`}
                onClick={() => {
                  setSelectedEra('2020s');
                  scrollToArchive();
                }}
              >
                <span className={styles.eraName}>2020–2022 Archive</span>
                <span className={styles.eraCount}>{eraCounts.era2020s} Issues</span>
              </button>
              <button
                type="button"
                className={`${styles.eraBtn} ${selectedEra === '2010s' ? styles.eraBtnActive : ''}`}
                onClick={() => {
                  setSelectedEra('2010s');
                  scrollToArchive();
                }}
              >
                <span className={styles.eraName}>2019 Archive</span>
                <span className={styles.eraCount}>{eraCounts.era2010s} Issues</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Full catalogue */}
      <section id="archive-browser" className={styles.browser} aria-labelledby="browser-title">
        <div className="container">
          <div className={styles.intro} data-reveal>
            <span className={styles.overline}>Complete Digital Repository</span>
            <h2 id="browser-title" className={styles.h2}>The Full Archive Catalogue</h2>
            <div className={styles.rule} data-rule />
            <p className={styles.lead}>
              Browse all {totalCount} canonical issues, e-books, and classical texts. Each record retains its authentic verified cover image or ashram archival preservation plate.
            </p>
          </div>

          <div className={styles.controls} data-reveal>
            <div className={styles.tabs} role="tablist" aria-label="Filter by publication category">
              {PUBLICATION_TYPES.map((type) => {
                const count =
                  type === 'All Archive'
                    ? totalCount
                    : publications.filter((p) => p.type === type).length;
                return (
                  <button
                    key={type}
                    type="button"
                    role="tab"
                    aria-selected={selectedType === type}
                    className={`${styles.tab} ${selectedType === type ? styles.tabActive : ''}`}
                    onClick={() => setSelectedType(type)}
                  >
                    <span>{type}</span>
                    <span className={styles.tabCount}>{count}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.subRow}>
              <div className={styles.yearRow}>
                <span className={styles.filterLabel}>Year</span>
                <button
                  type="button"
                  className={`${styles.yearPill} ${selectedYear === 'All Years' ? styles.yearPillActive : ''}`}
                  onClick={() => setSelectedYear('All Years')}
                >
                  All ({totalCount})
                </button>
                {availableYearsList.map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    className={`${styles.yearPill} ${selectedYear === String(yr) ? styles.yearPillActive : ''}`}
                    onClick={() => setSelectedYear(String(yr))}
                  >
                    {yr} ({yearCountsMap[yr] || 0})
                  </button>
                ))}
              </div>

              <div className={styles.searchWrap}>
                <input
                  type="search"
                  placeholder="Search by title, scripture, or topic…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  aria-label="Search publications archive"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className={styles.clearBtn} aria-label="Clear search">
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={styles.resultsRow}>
            <span className={styles.resultsText}>
              Showing <strong>{Math.min(visibleCount, filteredPublications.length)}</strong> of{' '}
              <strong>{filteredPublications.length}</strong> matching records ({totalCount} total in corpus)
            </span>
            {(selectedType !== 'All Archive' || selectedEra !== 'All Eras' || selectedYear !== 'All Years' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedType('All Archive');
                  setSelectedEra('All Eras');
                  setSelectedYear('All Years');
                  setSearchQuery('');
                }}
                className={styles.resetBtn}
              >
                Reset All Filters
              </button>
            )}
          </div>

          {filteredPublications.length > 0 ? (
            <>
              <div className={styles.grid} data-stagger>
                {displayedPublications.map((pub) => {
                  const resolvedCover = resolvePublicationCover(pub.id, pub.type, pub.coverImage);
                  return (
                    <article key={pub.id} className={styles.item}>
                      <div className={styles.itemCover}>
                        {resolvedCover ? (
                          <>
                            <img src={resolvedCover} alt={`Cover of ${pub.title}`} className={styles.coverImg} loading="lazy" />
                            <span className={styles.typeFloat}>{pub.type}</span>
                          </>
                        ) : (
                          <>
                            <PublicationPlaceholder publication={pub} />
                            <span className={styles.typeFloat}>Archival Plate</span>
                          </>
                        )}
                      </div>

                      <div className={styles.itemBody}>
                        <div className={styles.meta}>
                          {pub.year && (
                            <span>{pub.month ? `${pub.month} ${pub.year}` : pub.year}</span>
                          )}
                          <span>{pub.language}</span>
                        </div>

                        <h3 className={styles.itemTitle}>
                          <Link href={`/publications/${pub.id}`} className={styles.titleLink}>
                            {pub.title}
                          </Link>
                        </h3>
                        {pub.author && <p className={styles.byline}>By {pub.author}</p>}
                        <p className={styles.itemDesc}>{pub.description}</p>

                        <div className={styles.itemActions}>
                          <a
                            href={pub.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.miniLink}
                            title="Download verified PDF mirror"
                          >
                            PDF Mirror ↗
                          </a>
                          {pub.readOnlineUrl ? (
                            <button type="button" onClick={() => setActiveModalPub(pub)} className={styles.miniBtn} title="Read Online">
                              Read Online
                            </button>
                          ) : (
                            <Link href={`/publications/${pub.id}`} className={styles.miniBtn} title="View Publication Plate">
                              Bookplate →
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {hasMore && (
                <div className={styles.loadRow}>
                  <button type="button" onClick={handleLoadMore} className={styles.loadBtn}>
                    Load Next {Math.min(BATCH_INCREMENT, remainingCount)} Works ({remainingCount} remaining)
                  </button>
                  <button type="button" onClick={handleLoadAll} className={styles.loadAllBtn}>
                    View All {filteredPublications.length} Matching Records
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyText}>No publications found matching the active filter criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedType('All Archive');
                  setSelectedEra('All Eras');
                  setSelectedYear('All Years');
                  setSearchQuery('');
                }}
              >
                Show All Publications
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 05. Pre-footer */}
      <CinematicPreFooter
        tag="Literary Transmission"
        heading="Never Neglect Scriptural Study"
        subheading="Monthly journals and scriptural treatises distributed freely to seekers"
        description="All Vedanta Mission publications are distributed freely in the spirit of non-profit spiritual service. Download back issues or access our online readers."
        ctas={[
          { label: 'Explore Audio & Video Teachings', href: '/teachings', variant: 'primary' },
          { label: 'Visit Vedanta Ashram', href: '/ashram', variant: 'outline' },
        ]}
      />

      {activeModalPub && (
        <PublicationModal publication={activeModalPub} onClose={() => setActiveModalPub(null)} />
      )}
    </div>
  );
}
