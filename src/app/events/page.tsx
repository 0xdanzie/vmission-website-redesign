'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
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
import Magnetic from '@/components/motion/Magnetic';
import TiltCard from '@/components/motion/TiltCard';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
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
  const rootRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  useScrollReveals(rootRef);
  const [selectedType, setSelectedType] = useState('All Assemblies');
  const [searchQuery, setSearchQuery] = useState('');

  const publicEvents = useMemo(() => {
    return events.filter((e) => e.is_published !== false);
  }, [events]);

  // Dynamically segment events based strictly on reconciled dates and isPast flag
  const activeEvents = useMemo(() => {
    return publicEvents.filter(
      (e) => !e.isPast && e.startDate <= CURRENT_RECONCILED_DATE && e.endDate >= CURRENT_RECONCILED_DATE
    );
  }, [publicEvents]);

  const upcomingEvents = useMemo(() => {
    return publicEvents.filter(
      (e) => !e.isPast && e.startDate > CURRENT_RECONCILED_DATE
    );
  }, [publicEvents]);

  const concludedEvents = useMemo(() => {
    return publicEvents.filter(
      (e) => e.isPast || e.endDate < CURRENT_RECONCILED_DATE
    );
  }, [publicEvents]);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .fromTo('[data-ev-mask]', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.5 }, 0)
        .fromTo(heroImgRef.current, { scale: 1.2 }, { scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
        .fromTo('[data-ev-line]', { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.45)
        .fromTo('[data-ev-fade]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.9);

      gsap.to(heroImgRef.current, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: '[data-ev-hero]', start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.utils.toArray<HTMLElement>('[data-epoch-year]').forEach((el) => {
        gsap.fromTo(
          el,
          { color: 'transparent', WebkitTextStroke: '1.2px rgba(11,11,11,0.5)' },
          {
            color: 'rgba(11,11,11,0.06)',
            WebkitTextStroke: '1.2px rgba(11,11,11,0.5)',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 35%', scrub: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-ev-parallax]').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.events} ref={rootRef}>
      {/* 01. Hero */}
      <section className={styles.hero} data-ev-hero aria-labelledby="events-hero-title">
        <div className={styles.heroMedia} data-ev-mask>
          <img
            ref={heroImgRef}
            src={getAssetPath('/images/vmission/community/residential-camp-gathering.jpg')}
            alt="Seekers gathered in contemplation at Vedanta Ashram, Indore"
            className={styles.heroImg}
          />
          <div className={styles.heroShade} />
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            <h1 id="events-hero-title" className={styles.heroTitle}>
              <span className={styles.lineMask}><span className={styles.lineInner} data-ev-line>Spiritual Gatherings &amp;</span></span>
              <span className={styles.lineMask}><span className={`${styles.lineInner} ${styles.heroItalic}`} data-ev-line>Living Tradition</span></span>
            </h1>

            <p className={styles.heroLead} data-ev-fade>
              Gatherings at the Vedanta Ashram and across regional centers offer seekers
              the opportunity to participate in traditional discourses, study camps, and
              sacred celebrations conducted by Poojya Guruji Swami Atmananda Saraswati and
              the Acharyas of Vedanta Mission.
            </p>

            <div className={styles.heroStats} data-ev-fade>
              <div className={styles.stat}>
                <span className={styles.statNum}>{activeEvents.length}</span>
                <span className={styles.statLabel}>Active Gathering</span>
                <span className={styles.statSub}>Currently in Progress</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>{concludedEvents.length}</span>
                <span className={styles.statLabel}>Recorded Assemblies</span>
                <span className={styles.statSub}>3+ Decades in Institutional Memory</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNumText}>Indore &amp; Beyond</span>
                <span className={styles.statLabel}>Geographic Scope</span>
                <span className={styles.statSub}>Ashram Mandir &amp; Regional Centers</span>
              </div>
            </div>

            <p className={styles.heroCaption} data-ev-fade>
              <span className={styles.captionTag}>Living Tradition</span>
              Residential Camp Gathering · Vedanta Ashram, Indore
            </p>
          </div>
        </div>
      </section>

      {/* 02. Active gathering spotlight */}
      {focalGathering && (
        <section className={styles.focal} id="active-gathering" aria-labelledby="focal-kicker">
          <div className="container">
            <div className={styles.focalTop} data-reveal>
              <span id="focal-kicker" className={styles.overline}>Spotlight · Active Gathering</span>
              <div className={styles.focalPills}>
                <span className={styles.livePill}>
                  <span className={styles.livePulse} aria-hidden="true" />
                  {focalStatus?.isLive ? 'Active Assembly · In Progress' : focalStatus?.pill}
                </span>
                <span className={styles.pillOutline}>{focalGathering.type}</span>
                {focalGathering.registration === 'open' ? (
                  <span className={styles.pillAccent}>Registration Open · Worldwide Participation</span>
                ) : (
                  <Badge variant="default" label={focalStatus?.badge || 'Batch In Progress'} />
                )}
              </div>
            </div>

            <div className={styles.focalGrid}>
              <aside className={styles.dateCol} data-reveal>
                <span className={styles.dateYear}>{focalPeriod?.yearText}</span>
                <span className={styles.dateMonth}>{focalPeriod?.monthText}</span>
                <span className={styles.dateState}>
                  <span className={styles.stateDot} aria-hidden="true" />
                  {focalStatus?.isLive ? 'Active Batch' : 'Scheduled'}
                </span>

                <dl className={styles.details}>
                  <div>
                    <dt>Academic Span</dt>
                    <dd>{focalPeriod?.periodRange}</dd>
                  </div>
                  <div>
                    <dt>Course Structure</dt>
                    <dd>40 Structured Lessons · 4 Sessions</dd>
                  </div>
                  <div>
                    <dt>Study Reach</dt>
                    <dd>{focalGathering.city} · Open to All Seekers</dd>
                  </div>
                  <div>
                    <dt>Curriculum Scope</dt>
                    <dd>All 18 Chapters of Shrimad Bhagavad Gita</dd>
                  </div>
                </dl>

                <span className={styles.freeTag}>Lesson 1 Freely Available to All</span>
              </aside>

              <article className={styles.focalInfo} data-reveal>
                <div className={styles.faculty}>
                  <span className={styles.facultyPrefix}>Traditional Exposition Under</span>
                  <strong className={styles.facultyName}>Poojya Guruji {focalGathering.teacher}</strong>
                </div>

                <h2 className={styles.focalTitle}>
                  <Link href={`/events/${focalGathering.id}`} prefetch={true} className={styles.focalTitleLink}>
                    {focalGathering.title}
                  </Link>
                </h2>

                <div className={styles.metaRow}>
                  <span className={styles.metaPill}>{focalGathering.type}</span>
                  <span className={styles.metaPill}>
                    {focalGathering.location}, {focalGathering.city}
                  </span>
                </div>

                <p className={styles.focalLead}>{focalGathering.description}</p>

                <div className={styles.focalActions}>
                  <Magnetic strength={0.22}>
                    <Button href={`/events/${focalGathering.id}`} variant="primary" id="btn-view-focal-event">
                      View Gathering Details →
                    </Button>
                  </Magnetic>
                  <Link
                    href={focalGathering.type === 'Course' ? '/learn/' : '#archive'}
                    prefetch={true}
                    className={styles.secondaryLink}
                    id="link-explore-focal-context"
                  >
                    {focalGathering.type === 'Course' ? 'Explore Course Framework in Learn →' : 'Explore Archive of Earlier Assemblies ↓'}
                  </Link>
                </div>

                <div className={styles.footnote}>
                  <span className={styles.footnoteTag}>Course Structure</span>
                  <span>
                    40 structured lessons divided into 4 sessions. Each lesson includes textual study, commentary, and a questionnaire.
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* 03. Archive */}
      <section className={styles.archive} id="archive" aria-labelledby="archive-title">
        <div className="container">
          <div className={styles.archiveIntro} data-reveal>
            <span className={styles.overline}>Living Chronicle of Vedanta Pravachana</span>
            <h2 id="archive-title" className={styles.h2}>Thirty-Six Years of Continuous Gatherings</h2>
            <div className={styles.rule} data-rule />
            <p className={styles.lead}>
              From the initial Gyana Yagnas of 1990 through national study camps and international Vedanta conferences, explore the unbroken historical footprints of Poojya Guruji Swami Atmananda Saraswati and the Acharyas of Vedanta Mission.
            </p>
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span className={styles.metricVal}>{concludedEvents.length}+</span>
                <span className={styles.metricLabel}>Documented Assemblies</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricVal}>12+</span>
                <span className={styles.metricLabel}>Cities &amp; Regional Centers</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricVal}>4</span>
                <span className={styles.metricLabel}>Chronological Epochs</span>
              </div>
            </div>
          </div>

          <div className={styles.controls} data-reveal>
            <div className={styles.searchBox}>
              <label htmlFor="archive-search" className="sr-only">
                Search archive by city, teacher, or topic
              </label>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.searchIcon}>
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                id="archive-search"
                type="search"
                className={styles.searchInput}
                placeholder="Search by city (e.g. Pune, Mumbai, Indore), teacher, or topic…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className={styles.filterWrap}>
              <FilterBar
                label="Assembly Type"
                options={TYPE_FILTER_OPTIONS}
                selected={selectedType}
                onSelect={setSelectedType}
              />
            </div>
          </div>

          <p className={styles.count}>
            Showing <strong>{filteredConcluded.length}</strong> of {concludedEvents.length} historical assemblies in institutional memory
            {selectedType !== 'All Assemblies' && ` in ${selectedType}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>

          {filteredConcluded.length > 0 ? (
            isDefaultView ? (
              <div className={styles.epochs}>
                {epochs.map((epoch, idx) => (
                  <div key={epoch.id} className={styles.epoch}>
                    <header className={styles.epochHeader}>
                      <span className={styles.epochYear} data-epoch-year>{epoch.yearWatermark}</span>
                      <div className={styles.epochTitleBox}>
                        {idx === 0 && <span className={styles.folio}>Archival Folio I · Recent Living Memory</span>}
                        <h3 className={styles.epochTitle}>{epoch.label}</h3>
                        <p className={styles.epochSub}>{epoch.sublabel}</p>
                      </div>
                      <span className={styles.epochCount}>
                        {epoch.events.length} {epoch.events.length === 1 ? 'Assembly' : 'Assemblies'}
                      </span>
                    </header>

                    {epoch.visualInterruption && (
                      <figure className={styles.photo} data-clip>
                        <div className={styles.photoFrame}>
                          <Image
                            src={getAssetPath(epoch.visualInterruption.src)}
                            alt={epoch.visualInterruption.alt}
                            width={900}
                            height={450}
                            className={styles.photoImg}
                            data-ev-parallax
                            style={{
                              objectPosition: `${epoch.visualInterruption.focalPoint.x}% ${epoch.visualInterruption.focalPoint.y}%`,
                            }}
                            loading="lazy"
                          />
                          <figcaption className={styles.photoCaption}>
                            <span className={styles.captionBadge}>Archival Record</span>
                            <span>{epoch.visualInterruption.caption}</span>
                          </figcaption>
                        </div>
                      </figure>
                    )}

                    <div className="grid grid--2" data-stagger>
                      {epoch.events.map((evt) => (
                        <TiltCard key={evt.id} max={4}>
                          <EventCard event={evt} />
                        </TiltCard>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid--2" data-stagger>
                {filteredConcluded.map((evt) => (
                  <TiltCard key={evt.id} max={4}>
                    <EventCard event={evt} />
                  </TiltCard>
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
    </div>
  );
}
