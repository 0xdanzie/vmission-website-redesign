'use client';

import React, { useState, useMemo } from 'react';
import { CANONICAL_AUDIO_ARCHIVE, CanonicalAudioEntity } from '@/data/audioArchive';
import { publicVideoArchive, CanonicalVideoEntity } from '@/data/videoArchive';
import { CANONICAL_CATEGORIES, CanonicalCategorySlug } from '@/data/teachings';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import styles from './TeachingsArchiveExplorer.module.css';

interface Props {
  initialCategory?: CanonicalCategorySlug | 'all';
}

export default function TeachingsArchiveExplorer({ initialCategory = 'all' }: Props) {
  const { play, toggle, state: audioState } = useAudioPlayer();
  const [activeTab, setActiveTab] = useState<'audio' | 'video'>('audio');
  const [selectedCategory, setSelectedCategory] = useState<CanonicalCategorySlug | 'all'>(initialCategory);
  const [containerFilter, setContainerFilter] = useState<'all' | 'series' | 'tracks'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Filter Audio
  const filteredAudio = useMemo(() => {
    return CANONICAL_AUDIO_ARCHIVE.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (containerFilter === 'series' && !item.isContainer) return false;
      if (containerFilter === 'tracks' && item.isContainer) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchTeacher = item.teacher.toLowerCase().includes(q);
        const matchCategory = item.categoryName.toLowerCase().includes(q);
        const matchCollection = item.parentCollection.toLowerCase().includes(q);
        const matchLang = item.language.toLowerCase().includes(q);
        if (!matchTitle && !matchTeacher && !matchCategory && !matchCollection && !matchLang) return false;
      }
      return true;
    });
  }, [selectedCategory, containerFilter, searchQuery]);

  // Filter Video
  const filteredVideo = useMemo(() => {
    return publicVideoArchive.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (containerFilter === 'series' && !item.isContainer) return false;
      if (containerFilter === 'tracks' && item.isContainer) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchTeacher = item.teacher.toLowerCase().includes(q);
        const matchCategory = item.categoryName.toLowerCase().includes(q);
        const matchCollection = item.parentCollection.toLowerCase().includes(q);
        const matchLang = item.language.toLowerCase().includes(q);
        if (!matchTitle && !matchTeacher && !matchCategory && !matchCollection && !matchLang) return false;
      }
      return true;
    });
  }, [selectedCategory, containerFilter, searchQuery]);

  const activeItems = activeTab === 'audio' ? filteredAudio : filteredVideo;
  const totalPages = Math.ceil(activeItems.length / pageSize) || 1;
  const pagedItems = activeItems.slice((page - 1) * pageSize, page * pageSize);

  const handleTabSwitch = (tab: 'audio' | 'video') => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleCategorySwitch = (cat: CanonicalCategorySlug | 'all') => {
    setSelectedCategory(cat);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleDirectAudioPlay = (item: CanonicalAudioEntity) => {
    if (item.audioUrl) {
      if (audioState.track?.id === item.canonicalId) {
        toggle();
      } else {
        play({
          id: item.canonicalId,
          title: item.title,
          teacher: item.teacher,
          format: 'Audio',
          language: item.language as any,
          topic: item.categoryName,
          src: item.audioUrl,
          audioUrl: item.audioUrl,
          description: `Discourse from ${item.parentCollection}.`,
          scripture: item.categoryName,
        });
      }
    }
  };

  return (
    <section className={styles.explorerSection} id="teaching-archive" aria-label="Complete Teaching Archive">
      <div className={styles.explorerHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.overline}>THE COMPLETE TEACHING ARCHIVE</span>
          <h2 className={styles.title}>Explore the Teachings</h2>
          <p className={styles.lead}>
            The comprehensive repository of audio discourses and video lectures preserved under the traditional lineage of Vedanta Ashram, Indore.
          </p>
        </div>

        {/* Tab Switcher: Audio vs Video */}
        <div className={styles.tabSwitcher} role="tablist" aria-label="Archive Media Format">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'audio'}
            className={`${styles.tabBtn} ${activeTab === 'audio' ? styles.tabBtnActive : ''}`}
            onClick={() => handleTabSwitch('audio')}
          >
            <span>Audio Discourses</span>
            <span className={styles.tabBadge}>{CANONICAL_AUDIO_ARCHIVE.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'video'}
            className={`${styles.tabBtn} ${activeTab === 'video' ? styles.tabBtnActive : ''}`}
            onClick={() => handleTabSwitch('video')}
          >
            <span>Video Lectures</span>
            <span className={styles.tabBadge}>{publicVideoArchive.length}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={styles.controlsBar}>
        {/* Primary: Category Selectors */}
        <div className={styles.categoryPills} role="group" aria-label="Filter by Teaching Path">
          <button
            type="button"
            className={`${styles.pillBtn} ${selectedCategory === 'all' ? styles.pillActive : ''}`}
            onClick={() => handleCategorySwitch('all')}
          >
            All Traditions
          </button>
          {CANONICAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.pillBtn} ${selectedCategory === cat.id ? styles.pillActive : ''}`}
              onClick={() => handleCategorySwitch(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Secondary: Sub-Filters & Search */}
        <div className={styles.searchRow}>
          <div className={styles.filterGroup} role="group" aria-label="Filter by Collection Structure">
            <button
              type="button"
              className={`${styles.subFilterBtn} ${containerFilter === 'all' ? styles.subFilterActive : ''}`}
              onClick={() => { setContainerFilter('all'); setPage(1); }}
            >
              All Types
            </button>
            <button
              type="button"
              className={`${styles.subFilterBtn} ${containerFilter === 'series' ? styles.subFilterActive : ''}`}
              onClick={() => { setContainerFilter('series'); setPage(1); }}
            >
              {activeTab === 'audio' ? 'Series Collections' : 'Video Series'}
            </button>
            <button
              type="button"
              className={`${styles.subFilterBtn} ${containerFilter === 'tracks' ? styles.subFilterActive : ''}`}
              onClick={() => { setContainerFilter('tracks'); setPage(1); }}
            >
              {activeTab === 'audio' ? 'Individual Tracks' : 'Lectures'}
            </button>
          </div>

          <div className={styles.searchWrapper}>
            <label htmlFor="archive-search-input" className="sr-only">
              Search {activeTab === 'audio' ? 'audio discourses' : 'video lectures'}
            </label>
            <input
              id="archive-search-input"
              type="search"
              placeholder={`Search ${activeTab === 'audio' ? 'audio discourses' : 'video lectures'} by title, teacher, scripture...`}
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => { setSearchQuery(''); setPage(1); }}
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Context Banner */}
      <div className={styles.resultsBanner}>
        <span className={styles.resultsBannerText}>
          Showing <strong>{activeItems.length}</strong> {activeTab === 'audio' ? 'audio discourses' : 'video lectures'}
          {selectedCategory !== 'all' ? ` in ${CANONICAL_CATEGORIES.find(c => c.id === selectedCategory)?.name}` : ''}
          {containerFilter !== 'all' ? ` (${containerFilter === 'series' ? 'Series Collections' : 'Individual Sessions'})` : ''}
        </span>
        {totalPages > 1 && (
          <span className={styles.resultsBannerPage}>
            Page {page} of {totalPages}
          </span>
        )}
      </div>

      {/* Grid of Clean Scholarly Folio Entries */}
      {pagedItems.length > 0 ? (
        <div className={styles.itemsGrid} role="feed" aria-label="Archive results">
          {activeTab === 'audio'
            ? (pagedItems as CanonicalAudioEntity[]).map((item) => {
                const isPlaying = audioState.track?.id === item.canonicalId && audioState.isPlaying;

                return (
                  <article key={item.canonicalId} className={`${styles.archiveCard} ${isPlaying ? styles.cardPlaying : ''}`}>
                    <div className={styles.cardHeader}>
                      <span className={styles.categoryOverline}>{item.categoryName}</span>
                      <span className={styles.typeIndicator}>
                        {item.isContainer ? 'Series Collection' : 'Audio Track'}
                      </span>
                    </div>

                    <h3 className={styles.cardTitle}>{item.title}</h3>

                    <div className={styles.cardMeta}>
                      <span className={styles.metaSpeaker}>{item.teacher}</span>
                      <span className={styles.metaDivider}>·</span>
                      <span className={styles.metaLang}>{item.language}</span>
                      {item.year && (
                        <>
                          <span className={styles.metaDivider}>·</span>
                          <span className={styles.metaYear}>{item.year}</span>
                        </>
                      )}
                    </div>

                    <div className={styles.cardSourceRow}>
                      <span className={styles.collectionName}>{item.parentCollection}</span>
                    </div>

                    <div className={styles.cardActions}>
                      {item.isDirectMp3 ? (
                        <button
                          type="button"
                          className={`${styles.playActionBtn} ${isPlaying ? styles.playActive : ''}`}
                          onClick={() => handleDirectAudioPlay(item)}
                          aria-label={isPlaying ? `Pause discourse: ${item.title}` : `Listen to discourse: ${item.title}`}
                        >
                          {isPlaying ? (
                            <>
                              <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                                <rect x="2" y="1" width="4" height="12" rx="1" />
                                <rect x="8" y="1" width="4" height="12" rx="1" />
                              </svg>
                              <span>PAUSE</span>
                            </>
                          ) : (
                            <>
                              <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                                <path d="M3 1L13 7L3 13V1Z" />
                              </svg>
                              <span>LISTEN →</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <a
                          href={item.canonicalSource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.openLinkBtn}
                        >
                          Explore Collection ↗
                        </a>
                      )}

                      {item.alternateSources.length > 0 && (
                        <a
                          href={item.alternateSources[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.mirrorBtn}
                          title="Alternative Preserved Source"
                        >
                          Alternate ↗
                        </a>
                      )}
                    </div>
                  </article>
                );
              })
            : (pagedItems as CanonicalVideoEntity[]).map((item) => {
                return (
                  <article key={item.canonicalId} className={styles.archiveCard}>
                    <div className={styles.cardHeader}>
                      <span className={styles.categoryOverline}>{item.categoryName}</span>
                      <span className={styles.typeIndicator}>
                        {item.isContainer ? 'Video Series' : 'Lecture'}
                      </span>
                    </div>

                    <h3 className={styles.cardTitle}>{item.title}</h3>

                    <div className={styles.cardMeta}>
                      <span className={styles.metaSpeaker}>{item.teacher}</span>
                      <span className={styles.metaDivider}>·</span>
                      <span className={styles.metaLang}>{item.language}</span>
                    </div>

                    <div className={styles.cardSourceRow}>
                      <span className={styles.collectionName}>{item.parentCollection}</span>
                    </div>

                    <div className={styles.cardActions}>
                      <a
                        href={item.canonicalSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.openLinkBtn}
                      >
                        {item.isContainer ? 'WATCH SERIES ↗' : 'WATCH LECTURE ↗'}
                      </a>

                      {item.alternateSources.length > 0 && (
                        <a
                          href={item.alternateSources[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.mirrorBtn}
                          title="Alternative Preserved Source"
                        >
                          Alternate ↗
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
        </div>
      ) : (
        <div className={styles.emptyResults}>
          <p className={styles.emptyText}>No archival recordings match your selected criteria and inquiry terms.</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => { setSelectedCategory('all'); setContainerFilter('all'); setSearchQuery(''); setPage(1); }}
          >
            Reset Filters ↺
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav className={styles.paginationBar} aria-label="Archive pagination">
          <button
            type="button"
            className={styles.pageNavBtn}
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            ← Previous
          </button>
          <span className={styles.pageInfo}>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className={styles.pageNavBtn}
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Next page"
          >
            Next →
          </button>
        </nav>
      )}
    </section>
  );
}
