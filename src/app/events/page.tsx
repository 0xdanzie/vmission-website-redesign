'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/SectionHeader';
import EventCard from '@/components/EventCard';
import FilterBar from '@/components/FilterBar';
import EmptyState from '@/components/EmptyState';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { useData } from '@/context/DataContext';
import { getAssetPath } from '@/utils/assetPath';
import motionStyles from '@/styles/motion.module.css';
import styles from './page.module.css';

const TYPE_FILTER_OPTIONS = [
  'All Assemblies',
  'Gyana Yagna',
  'Camp',
  'Satsang',
  'Celebration',
  'Course',
];

// Current reconciled project review date: September 19, 2026
const CURRENT_RECONCILED_DATE = '2026-09-19';

// Month name helpers for pure data-driven display
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_ABBR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function formatEventPeriod(startDateStr: string, endDateStr: string) {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const isSingleDay = startDateStr === endDateStr;
  
  const startMonth = MONTH_ABBR[start.getMonth()];
  const endMonth = MONTH_ABBR[end.getMonth()];
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (isSingleDay) {
    return {
      yearText: `${startYear}`,
      monthText: `${startMonth} ${startDay}`,
      dayText: `${startDay}`,
      statusSub: `${MONTH_NAMES[start.getMonth()]} ${startDay}, ${startYear}`,
      periodRange: `${MONTH_NAMES[start.getMonth()]} ${startDay}, ${startYear}`,
    };
  }

  const yearRange = startYear === endYear ? `${startYear}` : `${startYear} – ${endYear}`;
  const monthRange = startMonth === endMonth
    ? `${startMonth} ${startDay} – ${endDay}`
    : `${startMonth} ${startDay} – ${endMonth} ${endDay}`;

  return {
    yearText: yearRange,
    monthText: monthRange,
    dayText: `${startDay} – ${endDay}`,
    statusSub: `Commenced ${startMonth} ${startDay}, ${startYear}`,
    periodRange: `${MONTH_NAMES[start.getMonth()]} ${startDay}, ${startYear} – ${MONTH_NAMES[end.getMonth()]} ${endDay}, ${endYear}`,
  };
}

export default function EventsPage() {
  const { events } = useData();
  const [selectedType, setSelectedType] = useState('All Assemblies');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically segment events based strictly on reconciled dates and isPast flag
  const activeEvents = useMemo(() => {
    return events.filter(
      (e) => !e.isPast && e.startDate <= CURRENT_RECONCILED_DATE && e.endDate >= CURRENT_RECONCILED_DATE
    );
  }, [events]);

  const upcomingEvents = useMemo(() => {
    return events.filter(
      (e) => !e.isPast && e.startDate > CURRENT_RECONCILED_DATE
    );
  }, [events]);

  const concludedEvents = useMemo(() => {
    return events.filter(
      (e) => e.isPast || e.endDate < CURRENT_RECONCILED_DATE
    );
  }, [events]);

  // Primary active/focal gathering spread
  const focalGathering = activeEvents[0] || upcomingEvents[0] || events.find((e) => !e.isPast);

  const focalPeriod = useMemo(() => {
    if (!focalGathering) return null;
    return formatEventPeriod(focalGathering.startDate, focalGathering.endDate);
  }, [focalGathering]);

  const focalStatus = useMemo(() => {
    if (!focalGathering) return null;
    const isLive = !focalGathering.isPast && focalGathering.startDate <= CURRENT_RECONCILED_DATE && focalGathering.endDate >= CURRENT_RECONCILED_DATE;
    const isUpcoming = !focalGathering.isPast && focalGathering.startDate > CURRENT_RECONCILED_DATE;

    if (isLive) {
      return {
        badge: 'Active Gathering · In Progress',
        pill: 'Current Program',
        titlePrefix: 'Current Study Gathering — In Progress',
        sub: focalPeriod?.statusSub || 'Commenced recently',
        isLive: true,
      };
    }
    if (isUpcoming) {
      return {
        badge: 'Upcoming Gathering · Open for Participation',
        pill: 'Upcoming Gathering',
        titlePrefix: 'Upcoming Gathering — Scheduled',
        sub: `Commences ${focalPeriod?.monthText}`,
        isLive: false,
      };
    }
    return {
      badge: 'Featured Archival Record',
      pill: 'Historical Focal Record',
      titlePrefix: 'Featured Ashram Assembly',
      sub: 'Concluded Program',
      isLive: false,
    };
  }, [focalGathering, focalPeriod]);

  // Filter concluded events by assembly type and search query
  const filteredConcluded = useMemo(() => {
    return concludedEvents.filter((evt) => {
      const matchesType =
        selectedType === 'All Assemblies' || evt.type === selectedType;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        evt.title.toLowerCase().includes(query) ||
        evt.city.toLowerCase().includes(query) ||
        evt.teacher.toLowerCase().includes(query) ||
        evt.location.toLowerCase().includes(query);
      return matchesType && matchesSearch;
    });
  }, [concludedEvents, selectedType, searchQuery]);

  // Natural chronological epochs for the historical institutional memory
  const isDefaultView = selectedType === 'All Assemblies' && !searchQuery.trim();

  const epochs = useMemo(() => {
    if (!isDefaultView) return [];

    const e2026 = concludedEvents.filter((e) => e.startDate.startsWith('2026'));
    const e2024_2025 = concludedEvents.filter(
      (e) => e.startDate.startsWith('2024') || e.startDate.startsWith('2025')
    );
    const e2021_2023 = concludedEvents.filter((e) =>
      ['2021', '2022', '2023'].some((y) => e.startDate.startsWith(y))
    );
    const eLegacy = concludedEvents.filter(
      (e) => !['2026', '2025', '2024', '2023', '2022', '2021'].some((y) => e.startDate.startsWith(y))
    );

    return [
      {
        id: 'epoch-2026',
        yearWatermark: '2026',
        label: '2026 Concluded Gatherings',
        sublabel: 'Recent Ashram Camps, Guru Poornima & Celebrations in Indore',
        events: e2026,
        visualInterruption: {
          src: '/images/vmission/ashram/teaching-hall-interior.jpg',
          alt: 'Teaching Hall Interior, Vedanta Ashram, Indore',
          caption: 'Ashram Venue: The Teaching Hall (Pravachan Hall), Vedanta Ashram, Indore',
          focalPoint: { x: 50, y: 40 },
        },
      },
      {
        id: 'epoch-2024-2025',
        yearWatermark: '2024–2025',
        label: '2024 – 2025 Gyana Yagnas & Ashram Camps',
        sublabel: 'Spiritual Discourses & Intensive Study Sessions',
        events: e2024_2025,
        visualInterruption: {
          src: '/images/vmission/ashram/gangeshwar-dome-closeup.jpg',
          alt: 'Shri Gangeshwar Mahadev Mandir dome, Vedanta Ashram, Indore',
          caption: 'Ashram Venue: Shri Gangeshwar Mahadev Mandir, Vedanta Ashram, Indore',
          focalPoint: { x: 50, y: 15 },
        },
      },
      {
        id: 'epoch-2021-2023',
        yearWatermark: '2021–2023',
        label: '2021 – 2023 National Assemblies',
        sublabel: 'Yagnas & Discourse Series Across Indian Centers',
        events: e2021_2023,
        visualInterruption: {
          src: '/images/vmission/events/rotary-club-mumbai-talk.jpg',
          alt: 'Discourse assembly at Rotary Club, Mumbai',
          caption: 'Archival Photo: Public discourse assembly, Rotary Club, Mumbai',
          focalPoint: { x: 50, y: 24 },
        },
      },
      {
        id: 'epoch-legacy',
        yearWatermark: '1990–2020',
        label: '1990 – 2020 Historical Footprints & Archival Records',
        sublabel: 'Three Decades of Continuous Vedanta Pravachana',
        events: eLegacy,
        visualInterruption: {
          src: '/images/vmission/events/advaita-congress-moscow.jpg',
          alt: 'Swami Atmananda Saraswati addressing the International Advaita Congress in Moscow',
          caption: 'Archival Photo: Keynote address at the International Advaita Congress, Moscow',
          focalPoint: { x: 40, y: 22 },
        },
      },
    ].filter((epoch) => epoch.events.length > 0);
  }, [concludedEvents, isDefaultView]);

  return (
    <>
      {/* Scene 1 — Arrival Hero: The Living Ashram in Gathering */}
      <section className={styles.hero} aria-label="Events Hero">
        <div className={styles.heroAtmosphere}>
          <Image
            src={getAssetPath('/images/vmission/community/residential-camp-gathering.jpg')}
            alt="Seekers gathered in contemplation at Vedanta Ashram, Indore"
            fill
            sizes="100vw"
            className={styles.heroAtmosphereImg}
            priority
          />
          <div className={styles.heroScrim} />
          <div className={styles.heroVignette} />
        </div>

        <div className="container">
          <div className={`${motionStyles.editorialReveal} ${styles.heroInner}`}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadgeRow}>
                <span className={styles.heroBadge}>The Living Ashram Tradition</span>
                <span className={styles.heroBadgeDivider}>·</span>
                <span className={styles.heroBadgeSub}>Gather · Experience · Remember</span>
                <span className={styles.heroBadgeDivider}>·</span>
                <span className={styles.reviewDateStamp}>Reconciled: 19 September 2026</span>
              </div>

              <h1 className={styles.title}>
                <span className={styles.titleLine}>Spiritual Gatherings &amp;</span>{' '}
                <span className={styles.titleLine}>Living Tradition</span>
              </h1>

              <p className={styles.lead}>
                Gatherings at the Vedanta Ashram and across regional centers offer seekers
                the opportunity to participate in traditional discourses, study camps, and
                sacred celebrations conducted by Poojya Guruji Swami Atmananda Saraswati and
                the Acharyas of Vedanta Mission.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.heroStatItem}>
                  <span className={styles.heroStatNum}>{activeEvents.length}</span>
                  <span className={styles.heroStatLabel}>Active Gathering</span>
                  <span className={styles.heroStatSub}>Currently in Progress</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStatItem}>
                  <span className={styles.heroStatNum}>{concludedEvents.length}</span>
                  <span className={styles.heroStatLabel}>Recorded Assemblies</span>
                  <span className={styles.heroStatSub}>3+ Decades in Institutional Memory</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStatItem}>
                  <span className={styles.heroStatNum}>Indore &amp; Beyond</span>
                  <span className={styles.heroStatLabel}>Geographic Scope</span>
                  <span className={styles.heroStatSub}>Ashram Mandir &amp; Regional Centers</span>
                </div>
              </div>

              <div className={styles.heroCaptionPlate}>
                <span className={styles.heroMediaBadge}>Living Tradition</span>
                <span className={styles.heroMediaText}>
                  Residential Camp Gathering · Vedanta Ashram, Indore
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Marker 01: Transition to Active / Present Gathering */}
      <div className={styles.chapterTransition} aria-hidden="true">
        <div className={styles.chapterLine} />
        <div className={styles.chapterBadge}>
          <span className={styles.chapterNum}>SCENE 01</span>
          <span className={styles.chapterDot}>◆</span>
          <span className={styles.chapterText}>ACTIVE GATHERING</span>
        </div>
        <div className={styles.chapterLine} />
      </div>

      {/* Scene 1 Editorial Feature — The Living Discourse Story */}
      {focalGathering && (
        <section className={styles.focalSection} aria-label="Active Gathering Spotlight" id="active-gathering">
          <div className="container">
            <article className={styles.focalSpread}>
              {/* Masthead Header Band */}
              <div className={styles.focalTopBar}>
                <div className={styles.focalTagGroup}>
                  <span className={styles.focalLivePill}>
                    <span className={styles.livePulseDot} aria-hidden="true" />
                    {focalStatus?.isLive ? 'Active Assembly · In Progress' : focalStatus?.pill}
                  </span>
                  <span className={styles.focalFormatPill}>{focalGathering.type}</span>
                  <span className={styles.focalSanctumTag}>Vedanta Ashram · Worldwide Digital Transmission</span>
                </div>
                <div className={styles.focalStatusGroup}>
                  {focalGathering.registration === 'open' ? (
                    <span className={styles.focalOpenBadge}>
                      Registration Open · Worldwide Participation
                    </span>
                  ) : (
                    <Badge variant="default" label={focalStatus?.badge || 'Batch In Progress'} />
                  )}
                </div>
              </div>

              <div className={styles.focalGrid}>
                {/* Date Stele / Monumental Time Column */}
                <div className={styles.focalDateCol}>
                  <div className={styles.steleHeaderRow}>
                    <span className={styles.steleFolioTag}>ACADEMIC CYCLE</span>
                    <span className={styles.steleFolioSep}>·</span>
                    <span className={styles.focalYearTop}>{focalPeriod?.yearText}</span>
                  </div>
                  
                  <div className={styles.steleDateBlock}>
                    <span className={styles.steleMonth}>{focalPeriod?.monthText}</span>
                    <div className={styles.steleStatusRow}>
                      <span className={styles.steleActiveIndicator} aria-hidden="true" />
                      <span className={styles.steleStateText}>
                        {focalStatus?.isLive ? 'ACTIVE BATCH' : 'SCHEDULED'}
                      </span>
                    </div>
                  </div>

                  <div className={styles.steleDivider} />

                  <div className={styles.steleDetailsList}>
                    <div className={styles.steleDetailItem}>
                      <span className={styles.steleLabel}>Academic Span</span>
                      <span className={styles.steleVal}>{focalPeriod?.periodRange}</span>
                    </div>
                    <div className={styles.steleDetailItem}>
                      <span className={styles.steleLabel}>Course Structure</span>
                      <span className={styles.steleVal}>40 Structured Lessons · 4 Sessions</span>
                    </div>
                    <div className={styles.steleDetailItem}>
                      <span className={styles.steleLabel}>Study Reach</span>
                      <span className={styles.steleVal}>{focalGathering.city} · Open to All Seekers</span>
                    </div>
                    <div className={styles.steleDetailItem}>
                      <span className={styles.steleLabel}>Curriculum Scope</span>
                      <span className={styles.steleVal}>All 18 Chapters of Shrimad Bhagavad Gita</span>
                    </div>
                  </div>

                  <div className={styles.steleCadenceBadge}>
                    <span>Lesson 1 Freely Available to All</span>
                  </div>
                </div>

                {/* Main Editorial Discourse Story */}
                <div className={styles.focalInfoCol}>
                  <div className={styles.focalFacultyBanner}>
                    <span className={styles.focalFacultyPrefix}>Traditional Exposition Under</span>
                    <strong className={styles.focalFacultyName}>
                      Poojya Guruji {focalGathering.teacher}
                    </strong>
                  </div>

                  <h2 className={styles.focalTitle}>
                    <Link href={`/events/${focalGathering.id}`} prefetch={true} className={styles.focalTitleLink}>
                      {focalGathering.title}
                    </Link>
                  </h2>

                  <div className={styles.focalMetaRow}>
                    <span className={styles.focalFormatBadge}>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.522-3.287.917V2.828zM8.5 12.433c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v-9.98c-.918-.395-2.108-.797-3.287-.917-1.094-.11-2.278-.037-3.213.493v9.746z"/>
                      </svg>
                      {focalGathering.type}
                    </span>
                    <span className={styles.focalLocationPill}>
                      <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M6 1C4 1 2 3 2 5C2 8 6 11 6 11C6 11 10 8 10 5C10 3 8 1 6 1Z" stroke="currentColor" strokeWidth="1.2"/>
                        <circle cx="6" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                      {focalGathering.location}, {focalGathering.city}
                    </span>
                  </div>

                  <p className={styles.focalLead}>
                    {focalGathering.description}
                  </p>

                  <div className={styles.focalActionRow}>
                    <Button
                      href={`/events/${focalGathering.id}`}
                      variant="primary"
                      id="btn-view-focal-event"
                    >
                      View Gathering Details →
                    </Button>
                    <Link
                      href={focalGathering.type === 'Course' ? '/learn/' : '#archive'}
                      prefetch={true}
                      className={styles.focalSecondaryLink}
                      id="link-explore-focal-context"
                    >
                      {focalGathering.type === 'Course' ? 'Explore Course Framework in Learn →' : 'Explore Archive of Earlier Assemblies ↓'}
                    </Link>
                  </div>

                  <div className={styles.focalEditorialFootnote}>
                    <span className={styles.footnoteBadge}>Course Structure</span>
                    <span className={styles.footnoteText}>
                      40 structured lessons divided into 4 sessions. Each lesson includes textual study, commentary, and a questionnaire.
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Temporal Bridge: NOW → TIME → MEMORY Transition Spine */}
      <div className={styles.temporalConnector} aria-hidden="true">
        <div className={styles.temporalLine} />
      </div>

      {/* Chapter Marker 02: Transition to Archive */}
      <div className={styles.chapterTransition} aria-hidden="true">
        <div className={styles.chapterLine} />
        <div className={styles.chapterBadge}>
          <span className={styles.chapterNum}>SCENE 02</span>
          <span className={styles.chapterDot}>◆</span>
          <span className={styles.chapterText}>INSTITUTIONAL MEMORY</span>
        </div>
        <div className={styles.chapterLine} />
      </div>

      {/* Scene 2 Temporal Horizon Bridge: NOW -> TIME -> MEMORY */}
      <section className={`section ${styles.archivalSection}`} aria-label="Historical Event Archive" id="archive">
        <div className="container">
          <div className={styles.timelineBridge}>
            <div className={styles.timelineWatermark} aria-hidden="true">1990 — PRESENT</div>
            <div className={styles.timelineMasthead}>
              <span className={styles.timelineEyebrow}>Living Chronicle of Vedanta Pravachana</span>
              <h2 className={styles.timelineTitle}>Thirty-Six Years of Continuous Gatherings</h2>
              <p className={styles.timelineSubtitle}>
                From the initial Gyana Yagnas of 1990 through national study camps and international Vedanta conferences, explore the unbroken historical footprints of Poojya Guruji Swami Atmananda Saraswati and the Acharyas of Vedanta Mission.
              </p>
              <div className={styles.timelineMetricsRow}>
                <div className={styles.timelineMetric}>
                  <span className={styles.timelineMetricVal}>{concludedEvents.length}+</span>
                  <span className={styles.timelineMetricLabel}>Documented Assemblies</span>
                </div>
                <div className={styles.timelineMetricDivider} />
                <div className={styles.timelineMetric}>
                  <span className={styles.timelineMetricVal}>12+</span>
                  <span className={styles.timelineMetricLabel}>Cities &amp; Regional Centers</span>
                </div>
                <div className={styles.timelineMetricDivider} />
                <div className={styles.timelineMetric}>
                  <span className={styles.timelineMetricVal}>4</span>
                  <span className={styles.timelineMetricLabel}>Chronological Epochs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Filter & Search Rail */}
          <div className={styles.editorialControls}>
            <div className={styles.searchBox}>
              <label htmlFor="archive-search" className="sr-only">
                Search archive by city, teacher, or topic
              </label>
              <div className={styles.searchIconWrap} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <input
                id="archive-search"
                type="search"
                className={styles.searchInput}
                placeholder="Search archive by city (e.g. Pune, Mumbai, Indore), teacher, or topic…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            <div className={styles.typeFilterWrap}>
              <FilterBar
                label="Assembly Type"
                options={TYPE_FILTER_OPTIONS}
                selected={selectedType}
                onSelect={setSelectedType}
              />
            </div>
          </div>

          <div className={styles.archiveCountRow}>
            <span className={styles.archiveCountText}>
              Showing <strong>{filteredConcluded.length}</strong> of {concludedEvents.length} historical assemblies in institutional memory
              {selectedType !== 'All Assemblies' && ` in ${selectedType}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>

          {/* Render Chronological Epochs in Default View, or Filtered Grid */}
          {filteredConcluded.length > 0 ? (
            isDefaultView ? (
              <div className={styles.epochStack}>
                {epochs.map((epoch, idx) => (
                  <div key={epoch.id} className={`${styles.epochBlock} ${idx === 0 ? styles.epochFirstBlock : ''}`}>
                    {/* Epoch Header with Large Watermark Typography */}
                    <div className={styles.epochHeader}>
                      <div className={styles.epochHeaderLeft}>
                        <span className={styles.epochWatermark}>{epoch.yearWatermark}</span>
                        {idx === 0 && (
                          <span className={styles.epochFolioTag}>ARCHIVAL FOLIO I · RECENT LIVING MEMORY</span>
                        )}
                        <h3 className={styles.epochTitle}>{epoch.label}</h3>
                        <p className={styles.epochSubtitle}>{epoch.sublabel}</p>
                      </div>
                      <span className={styles.epochCountPill}>
                        {epoch.events.length} {epoch.events.length === 1 ? 'Assembly' : 'Assemblies'}
                      </span>
                    </div>

                    {/* Verified Photography Interruption */}
                    {epoch.visualInterruption && (
                      <figure className={`${styles.epochVisualInterruption} ${idx === 0 ? styles.epochVisualFeatured : ''}`}>
                        <div className={styles.interruptionFrame}>
                          <Image
                            src={getAssetPath(epoch.visualInterruption.src)}
                            alt={epoch.visualInterruption.alt}
                            width={900}
                            height={450}
                            className={styles.interruptionImg}
                            style={{
                              objectPosition: `${epoch.visualInterruption.focalPoint.x}% ${epoch.visualInterruption.focalPoint.y}%`,
                            }}
                            loading="lazy"
                          />
                          <div className={styles.interruptionOverlay} />
                          <figcaption className={styles.interruptionCaption}>
                            <span className={styles.captionBadge}>Archival Record</span>
                            <span>{epoch.visualInterruption.caption}</span>
                          </figcaption>
                        </div>
                      </figure>
                    )}

                    {/* Alternating density event cards */}
                    <div className="grid grid--2">
                      {epoch.events.map((evt) => (
                        <EventCard key={evt.id} event={evt} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid--2">
                {filteredConcluded.map((evt) => (
                  <EventCard key={evt.id} event={evt} />
                ))}
              </div>
            )
          ) : (
            <EmptyState
              icon="🏛️"
              title="No Archival Records Found"
              description="No earlier gatherings match your search criteria. Try clearing filters or searching for another city."
              actionLabel="Reset Archive Filters"
              onAction={() => {
                setSelectedType('All Assemblies');
                setSearchQuery('');
              }}
            />
          )}
        </div>
      </section>
    </>
  );
}
