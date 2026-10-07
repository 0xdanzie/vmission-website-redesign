'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { Publication } from '@/data/publications';
import PublicationModal from '@/components/PublicationModal';
import CinematicHero from '@/components/cinematic/CinematicHero';
import SacredDivider from '@/components/cinematic/SacredDivider';
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

  return (
    <div className={styles.archiveWrapper}>
      {/* ======================================================================
          01. SCENE 01 — ARRIVE: THE LITERARY ARCHIVE (GATE 2)
          ====================================================================== */}
      <CinematicHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Literary Archive' },
        ]}
        badge={`${totalCount} Canonical Works · ${minYear}–${maxYear} Documented Corpus`}
        title="The Literary Archive"
        subtitle="Preserving the Living Heritage of Advaita Vedanta"
        lead="Preserving and disseminating the traditional teachings of Advaita Vedanta through authentic monthly journals, foundational treatises, and classical Sanskrit scriptures. Every record in this archive is catalogued with verified source downloads, digital reading editions, or institutional preservation plates."
        backdropImage="/images/vmission/teaching/07-vedanta-archive-restored.jpg"
        backdropAlt="Vedanta Ashram manuscript library and classical publication archives"
        focalPoint={{ desktop: { x: 50, y: 40 }, mobile: { x: 50, y: 32 } }}
        ctas={[
          { label: 'E-Book Vault ↓', href: '#ebook-vault', variant: 'primary' },
          { label: 'Explore Full Archive ↓', href: '#archive-browser', variant: 'outline' },
        ]}
      />

      {/* ======================================================================
          INSTITUTIONAL ARCHIVE REGISTRY STRIP (GATE 2)
          ====================================================================== */}
      <nav className={styles.registryStrip} aria-label="Archive Registry Statistics">
        <div className="container">
          <div className={styles.registryGrid}>
            <button
              type="button"
              className={styles.registryItem}
              onClick={() => {
                setSelectedType('All Archive');
                setSelectedEra('All Eras');
                setSelectedYear('All Years');
                scrollToArchive();
              }}
              title="View all 250 canonical publications"
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

            <div className={styles.registryItemEpoch}>
              <span className={styles.registryNumberEpoch}>{minYear}–{maxYear}</span>
              <span className={styles.registryLabel}>Corpus Epoch</span>
              <span className={styles.registrySub}>Documented Digital Era</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ======================================================================
          02. SCENE 02 — E-BOOK VAULT: CURATED LIBRARY VAULT (GATE 3)
          ====================================================================== */}
      <section id="ebook-vault" className={styles.vaultSection} aria-label="Curated E-Book Vault">
        <div className="container">
          <div className={styles.vaultHeader}>
            <span className={styles.sectionOverline}>Curated Library Vault</span>
            <h2 className={styles.vaultTitle}>Recovered Philosophical Treatises</h2>
            <p className={styles.vaultLead}>
              Six foundational treatises and scriptural monographs authored by Pujya Swami Atmananda Saraswati, preserved with their authentic recovered original artwork and complete PDF scriptural texts.
            </p>
          </div>

          <div className={styles.vaultShelfWrapper}>
            <div className={styles.vaultGrid}>
              {ebooksList.map((book) => {
                const resolvedCover = resolvePublicationCover(book.id, book.type, book.coverImage);
                return (
                  <article key={book.id} className={styles.vaultCard} data-morph-source="publication">
                    <div className={styles.vaultCoverCol}>
                      {resolvedCover ? (
                        <div className={styles.vaultFrameWrapper}>
                          <img
                            src={resolvedCover}
                            alt={`Cover of ${book.title}`}
                            className={styles.vaultCoverImg}
                            loading="lazy"
                          />
                          <div className={styles.vaultSpineShading} aria-hidden="true" />
                          <span className={styles.vaultVerifiedTag}>Authentic Cover</span>
                        </div>
                      ) : (
                        <PublicationPlaceholder publication={book} />
                      )}
                    </div>

                    <div className={styles.vaultContentCol}>
                      <div className={styles.vaultTagRow}>
                        <span className={styles.vaultSeriesBadge}>Canonical E-Book</span>
                        <span className={styles.vaultLangBadge}>{book.language}</span>
                        {book.pageCount && (
                          <span className={styles.vaultPagesBadge}>{book.pageCount} Pages</span>
                        )}
                      </div>

                      <h3 className={styles.vaultItemTitle}>
                        <Link href={`/publications/${book.id}`} className={styles.vaultTitleLink}>
                          {book.title}
                        </Link>
                      </h3>

                      {book.author && <p className={styles.vaultAuthor}>By {book.author}</p>}
                      <p className={styles.vaultSynopsis}>{book.description}</p>

                      <div className={styles.vaultActions}>
                        <a
                          href={book.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.btnVaultDownload}
                          title="Download verified high-resolution PDF"
                        >
                          Download PDF Mirror ↗
                        </a>
                        {book.readOnlineUrl ? (
                          <button
                            type="button"
                            onClick={() => setActiveModalPub(book)}
                            className={styles.btnVaultReader}
                            title="Open Digital Reader"
                          >
                            Digital Reader 📖
                          </button>
                        ) : (
                          <Link
                            href={`/publications/${book.id}`}
                            className={styles.btnVaultReader}
                          >
                            Archival Bookplate →
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className={styles.vaultShelfPlinth} aria-hidden="true">
              <div className={styles.vaultShelfPlinthWood} />
              <div className={styles.vaultShelfPlinthBrass} />
            </div>
          </div>
        </div>
      </section>

      <SacredDivider glyph="ॐ" />

      {/* ======================================================================
          03. SCENE 03 — PERIODICAL TIMELINE: LIVING JOURNALS (GATE 4)
          ====================================================================== */}
      <section className={styles.periodicalsSection} aria-label="Monthly Periodical Journals">
        <div className="container">
          <div className={styles.periodicalsHeader}>
            <span className={styles.sectionOverline}>Living Periodical Tradition</span>
            <h2 className={styles.periodicalsTitle}>Monthly Wisdom Journals</h2>
            <p className={styles.periodicalsLead}>
              Published continuously without interruption since 1995. Explore the latest flagship editions alongside historical epochs.
            </p>
          </div>

          {/* Anchor Issues Spread */}
          <div className={styles.showcaseGrid}>
            {/* Latest Vedanta Sandesh */}
            {latestSandesh && (
              <article className={styles.showcaseCard} data-morph-source="publication">
                <div className={styles.showcaseCoverCol}>
                  {(() => {
                    const resolvedCover = resolvePublicationCover(
                      latestSandesh.id,
                      latestSandesh.type,
                      latestSandesh.coverImage
                    );
                    return resolvedCover ? (
                      <div className={styles.vaultFrameWrapper}>
                        <img
                          src={resolvedCover}
                          alt={`Cover of ${latestSandesh.title}`}
                          className={styles.vaultCoverImg}
                          loading="lazy"
                        />
                        <div className={styles.vaultSpineShading} aria-hidden="true" />
                        <span className={styles.vaultVerifiedTag}>Authentic Cover</span>
                      </div>
                    ) : (
                      <PublicationPlaceholder publication={latestSandesh} />
                    );
                  })()}
                </div>
                <div className={styles.showcaseContentCol}>
                  <div className={styles.showcaseTagRow}>
                    <span className={styles.showcaseTypeBadge}>Vedanta Sandesh</span>
                    <span className={styles.showcaseLangBadge}>{latestSandesh.language}</span>
                    <span className={styles.showcaseLatestTag}>Current Edition</span>
                  </div>

                  <h3 className={styles.showcaseItemTitle}>
                    <Link href={`/publications/${latestSandesh.id}`} className={styles.showcaseTitleLink}>
                      {latestSandesh.title}
                    </Link>
                  </h3>
                  <p className={styles.showcaseIssueMeta}>
                    Issue: {latestSandesh.month} {latestSandesh.year} · {latestSandesh.pageCount || 36} Pages
                  </p>
                  <p className={styles.showcaseDesc}>{latestSandesh.description}</p>

                  <div className={styles.showcaseActions}>
                    <a
                      href={latestSandesh.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnDownload}
                      title="Download verified PDF mirror"
                    >
                      Download PDF Mirror ↗
                    </a>
                    {latestSandesh.readOnlineUrl ? (
                      <button
                        type="button"
                        onClick={() => setActiveModalPub(latestSandesh)}
                        className={styles.btnReadOnline}
                      >
                        Read Online Reader 📖
                      </button>
                    ) : (
                      <Link
                        href={`/publications/${latestSandesh.id}`}
                        className={styles.btnReadOnline}
                      >
                        Archival Bookplate →
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            )}

            {/* Latest Vedanta Piyush */}
            {latestPiyush && (
              <article className={styles.showcaseCard} data-morph-source="publication">
                <div className={styles.showcaseCoverCol}>
                  {(() => {
                    const resolvedCover = resolvePublicationCover(
                      latestPiyush.id,
                      latestPiyush.type,
                      latestPiyush.coverImage
                    );
                    return resolvedCover ? (
                      <div className={styles.vaultFrameWrapper}>
                        <img
                          src={resolvedCover}
                          alt={`Cover of ${latestPiyush.title}`}
                          className={styles.vaultCoverImg}
                          loading="lazy"
                        />
                        <div className={styles.vaultSpineShading} aria-hidden="true" />
                        <span className={styles.vaultVerifiedTag}>Authentic Cover</span>
                      </div>
                    ) : (
                      <PublicationPlaceholder publication={latestPiyush} />
                    );
                  })()}
                </div>
                <div className={styles.showcaseContentCol}>
                  <div className={styles.showcaseTagRow}>
                    <span className={styles.showcaseTypeBadge}>Vedanta Piyush</span>
                    <span className={styles.showcaseLangBadge}>{latestPiyush.language}</span>
                    <span className={styles.showcaseLatestTag}>Current Edition</span>
                  </div>

                  <h3 className={styles.showcaseItemTitle}>
                    <Link href={`/publications/${latestPiyush.id}`} className={styles.showcaseTitleLink}>
                      {latestPiyush.title}
                    </Link>
                  </h3>
                  <p className={styles.showcaseIssueMeta}>
                    Issue: {latestPiyush.month} {latestPiyush.year} · {latestPiyush.pageCount || 36} Pages
                  </p>
                  <p className={styles.showcaseDesc}>{latestPiyush.description}</p>

                  <div className={styles.showcaseActions}>
                    <a
                      href={latestPiyush.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnDownload}
                      title="Download verified PDF mirror"
                    >
                      Download PDF Mirror ↗
                    </a>
                    {latestPiyush.readOnlineUrl ? (
                      <button
                        type="button"
                        onClick={() => setActiveModalPub(latestPiyush)}
                        className={styles.btnReadOnline}
                      >
                        Read Online Reader 📖
                      </button>
                    ) : (
                      <Link
                        href={`/publications/${latestPiyush.id}`}
                        className={styles.btnReadOnline}
                      >
                        Archival Bookplate →
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            )}
          </div>

          {/* Chronological Era Navigation Card */}
          <div className={styles.eraNavCard}>
            <div className={styles.eraNavHeader}>
              <div>
                <h3 className={styles.eraNavLabel}>Chronological Archive Navigation</h3>
                <p className={styles.eraNavSub}>Select a historical era to focus records in the catalogue below</p>
              </div>
              {selectedEra !== 'All Eras' && (
                <button
                  type="button"
                  className={styles.eraClearBtn}
                  onClick={() => setSelectedEra('All Eras')}
                >
                  Show All Eras
                </button>
              )}
            </div>

            <div className={styles.eraButtonRow}>
              <button
                type="button"
                className={`${styles.eraBtn} ${selectedEra === 'All Eras' ? styles.eraBtnActive : ''}`}
                onClick={() => {
                  setSelectedEra('All Eras');
                  scrollToArchive();
                }}
              >
                <span className={styles.eraName}>All Historical Eras</span>
                <span className={styles.eraPillCount}>{totalCount} Works ({minYear}–{maxYear})</span>
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
                <span className={styles.eraPillCount}>{eraCounts.era2020s} Issues</span>
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
                <span className={styles.eraPillCount}>{eraCounts.era2010s} Issues</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          04. SCENE 04 — COMPLETE ARCHIVE: THE FULL CATALOGUE (GATE 5)
          ====================================================================== */}
      <section id="archive-browser" className={styles.browserSection} aria-label="Complete Publication Archive">
        <div className="container">
          <div className={styles.browserHeader}>
            <span className={styles.sectionOverline}>Complete Digital Repository</span>
            <h2 className={styles.browserTitle}>The Full Archive Catalogue</h2>
            <p className={styles.browserLead}>
              Browse all {totalCount} canonical issues, e-books, and classical texts. Each record retains its authentic verified cover image or ashram archival preservation plate.
            </p>
          </div>

          {/* Subordinated Filter Controls */}
          <div className={styles.controlsBar}>
            {/* Category Tabs */}
            <div className={styles.typeTabs} role="tablist" aria-label="Filter by publication category">
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
                    className={`${styles.typeTab} ${selectedType === type ? styles.typeTabActive : ''}`}
                    onClick={() => setSelectedType(type)}
                  >
                    <span>{type}</span>
                    <span className={styles.tabCount}>{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-Filters: Year & Search */}
            <div className={styles.subFilterRow}>
              <div className={styles.yearPills}>
                <span className={styles.filterLabel}>Year:</span>
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
                  placeholder="Search by title, scripture, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  aria-label="Search publications archive"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className={styles.clearSearchBtn}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Counter & Reset */}
          <div className={styles.resultsInfoRow}>
            <span className={styles.resultsCount}>
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
                className={styles.resetFiltersBtn}
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Publications Editorial Archive Grid */}
          {filteredPublications.length > 0 ? (
            <>
              <div className={styles.archiveEditorialGrid}>
                {displayedPublications.map((pub) => {
                  const resolvedCover = resolvePublicationCover(pub.id, pub.type, pub.coverImage);
                  const isVerifiedCover = !!resolvedCover;

                  return (
                    <article key={pub.id} className={styles.pubArchiveItem} data-morph-source="publication">
                      <div className={styles.pubCoverContainer}>
                        {isVerifiedCover ? (
                          <>
                            <img
                              src={resolvedCover}
                              alt={`Cover of ${pub.title}`}
                              className={styles.pubCoverImg}
                              loading="lazy"
                            />
                            <div className={styles.pubCoverScrim} aria-hidden="true" />
                            <span className={styles.pubTypeBadgeFloating}>{pub.type}</span>
                            <span className={styles.statusVerifiedBadge}>Authentic Cover</span>
                          </>
                        ) : (
                          <>
                            <PublicationPlaceholder publication={pub} />
                            <span className={styles.statusArchivalBadge}>Archival Plate</span>
                          </>
                        )}
                      </div>

                      <div className={styles.pubContentBody}>
                        <div className={styles.pubMetaMini}>
                          {pub.year && (
                            <span className={styles.pubDateMini}>
                              {pub.month ? `${pub.month} ${pub.year}` : pub.year}
                            </span>
                          )}
                          <span className={styles.pubLangMini}>{pub.language}</span>
                        </div>

                        <h3 className={styles.pubTitleMini}>
                          <Link href={`/publications/${pub.id}`} className={styles.pubTitleLink}>
                            {pub.title}
                          </Link>
                        </h3>
                        {pub.author && <p className={styles.pubAuthorMini}>By {pub.author}</p>}

                        <p className={styles.pubDescMini}>{pub.description}</p>

                        <div className={styles.pubActionRowMini}>
                          <a
                            href={pub.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.miniDownloadLink}
                            title="Download verified PDF mirror"
                          >
                            PDF Mirror ↗
                          </a>
                          {pub.readOnlineUrl ? (
                            <button
                              type="button"
                              onClick={() => setActiveModalPub(pub)}
                              className={styles.miniReadBtn}
                              title="Read Online"
                            >
                              Read Online 📖
                            </button>
                          ) : (
                            <Link
                              href={`/publications/${pub.id}`}
                              className={styles.miniReadBtn}
                              title="View Publication Plate"
                            >
                              Bookplate →
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Progressive Loading Controls (Gate 5 Performance Optimization) */}
              {hasMore && (
                <div className={styles.loadMoreRow}>
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className={styles.btnLoadMore}
                  >
                    Load Next {Math.min(BATCH_INCREMENT, remainingCount)} Works ({remainingCount} remaining)
                  </button>
                  <button
                    type="button"
                    onClick={handleLoadAll}
                    className={styles.btnLoadAll}
                  >
                    View All {filteredPublications.length} Matching Records
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.emptyArchiveBox}>
              <p className={styles.emptyMessage}>
                No publications found matching the active filter criteria.
              </p>
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

      {/* ======================================================================
          05. PRE-FOOTER INVITATION
          ====================================================================== */}
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

      {/* Reader Modal */}
      {activeModalPub && (
        <PublicationModal
          publication={activeModalPub}
          onClose={() => setActiveModalPub(null)}
        />
      )}
    </div>
  );
}
