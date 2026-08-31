'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AshramAscent from '@/components/immersive/AshramAscent';
import SectionHeader from '@/components/SectionHeader';
import AcharyaCard from '@/components/AcharyaCard';
import CourseCard from '@/components/CourseCard';
import EventCard from '@/components/EventCard';
import TeachingCard from '@/components/TeachingCard';
import TeachingSlider from '@/components/TeachingSlider';
import Button from '@/components/Button';
import { useData } from '@/context/DataContext';
import { getAssetPath } from '@/utils/assetPath';
import styles from './page.module.css';

export default function HomePage() {
  const { acharyas, courses, events, teachings } = useData();
  const [showEntrance, setShowEntrance] = useState(false);

  // Check if visitor has already completed or skipped the entrance sequence in this session
  useEffect(() => {
    try {
      const alreadyEntered = sessionStorage.getItem('vm_ascent_done');
      if (!alreadyEntered) {
        setShowEntrance(true);
      }
    } catch (e) {
      setShowEntrance(true);
    }
  }, []);

  const handleEntranceComplete = () => {
    setShowEntrance(false);
    try {
      sessionStorage.setItem('vm_ascent_done', '1');
    } catch (e) {
      // Ignore storage errors
    }
  };

  const handleReplayEntrance = () => {
    setShowEntrance(true);
  };

  const featuredCourses = courses.slice(0, 3);
  const upcomingEvents = events.filter((e) => !e.isPast).slice(0, 2);
  const featuredTeachings = teachings.slice(0, 3);

  return (
    <>
      {/* 1. IMMERSIVE CONTINUOUS ENTRANCE */}
      {showEntrance && (
        <AshramAscent onComplete={handleEntranceComplete} />
      )}

      {/* 2. CINEMATIC HOMEPAGE FIRST VIEWPORT — VISUALLY DOMINANT ARCHITECTURAL HERO */}
      <section className={styles.heroCinematic} aria-label="Vedanta Mission Ashram Hero">
        {/* Background Architectural Canvas */}
        <div className={styles.heroBackdrop}>
          <img
            src={getAssetPath('/images/vmission/hero/vmission-hero-cinematic.jpg')}
            alt="Vedanta Mission Ashram, Sri Gangeshwar Mahadev Shivling Dome, and Acharyas in Indore"
            className={styles.heroBackdropImg}
            loading="eager"
          />
          <div className={styles.heroBackdropGradient} />
          <div className={styles.heroBackdropTexture} />
        </div>

        {/* Hero Content Overlay */}
        <div className="container">
          <div className={styles.heroContentGrid}>
            <div className={styles.heroTextCol}>
              <div className={styles.heroBadgeRow}>
                <span className={styles.heroBadge}>
                  🕉️ Traditional Advaita Vedanta · Indore Gurukula
                </span>
                <span className={styles.heroParampara}>Lineage of Adi Shankaracharya</span>
              </div>

              <p className={styles.heroSanskrit}>सत्यं ज्ञानमनन्तं ब्रह्म</p>

              <h1 className={styles.heroMainTitle}>
                Vedanta Mission
                <span className={styles.heroSubTitle}>Vedanta Ashram · Indore</span>
              </h1>

              <blockquote className={styles.heroMottoQuote}>
                &ldquo;Spreading &lsquo;Love &amp; Light&rsquo; by revealing the basic oneness of all.&rdquo;
              </blockquote>

              <p className={styles.heroDescription}>
                A sacred residential Gurukula in Central India dedicated to systematic scriptural study of the Upanishads, Bhagavad Gita, and Brahma Sutras under the guidance of Poojya Swami Atmananda Saraswati.
              </p>

              <div className={styles.heroCtaGroup}>
                <Button href="/teachings" variant="primary" size="lg">
                  Explore Discourses &amp; Audio →
                </Button>
                <Button href="/ashram" variant="outline" size="lg" className={styles.btnHeroAshram}>
                  The Ashram Campus
                </Button>
                <button
                  type="button"
                  className={styles.btnReplay}
                  onClick={handleReplayEntrance}
                  title="Re-experience the 3D entrance sequence"
                >
                  Entrance Sequence ⟳
                </button>
              </div>
            </div>

            {/* Right Card: Sanctum At-A-Glance Frame */}
            <div className={styles.heroHighlightsCol}>
              <div className={styles.sanctumFeatureCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.sanctumTag}>Consecrated Sanctum</span>
                  <span className={styles.sanctumYear}>Est. Indore</span>
                </div>
                <h3 className={styles.cardTitle}>Sri Gangeshwar Mahadev</h3>
                <p className={styles.cardText}>
                  Monumental Shivling dome sanctuary consecrated for daily Vedic prayer, Abhishek, and deep contemplative silence.
                </p>

                <div className={styles.quickSchedule}>
                  <div className={styles.scheduleRow}>
                    <span className={styles.schedTime}>07:00 AM</span>
                    <span className={styles.schedEvent}>Morning Abhishek &amp; Puja</span>
                  </div>
                  <div className={styles.scheduleRow}>
                    <span className={styles.schedTime}>06:30 PM</span>
                    <span className={styles.schedEvent}>Sandhya Aarti &amp; Chanting</span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <Link href="/ashram" className={styles.sanctumLink}>
                    Plan Ashram Darshan &amp; Stay →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Atmospheric Ribbon */}
        <div className={styles.heroRibbon}>
          <div className="container">
            <div className={styles.ribbonGrid}>
              <div className={styles.ribbonItem}>
                <span className={styles.ribbonIcon}>🏛️</span>
                <div>
                  <strong>Traditional Gurukula</strong>
                  <span>Authentic Shastra Vichara</span>
                </div>
              </div>
              <div className={styles.ribbonItem}>
                <span className={styles.ribbonIcon}>🎙️</span>
                <div>
                  <strong>Jnana Ganga Library</strong>
                  <span>Hundreds of Audio Discourses</span>
                </div>
              </div>
              <div className={styles.ribbonItem}>
                <span className={styles.ribbonIcon}>📖</span>
                <div>
                  <strong>Free Digital Ezines</strong>
                  <span>Vedanta Sandesh &amp; Piyush</span>
                </div>
              </div>
              <div className={styles.ribbonItem}>
                <span className={styles.ribbonIcon}>🙏</span>
                <div>
                  <strong>Residential Retreats</strong>
                  <span>Sadhana Camps in Central India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SRI GANGESHWAR MAHADEV MANDIR SPOTLIGHT */}
      <section className="section" aria-label="Gangeshwar Mahadev Temple">
        <div className="container">
          <div className={styles.mandirGrid}>
            <div>
              <SectionHeader
                tag="Consecrated Sanctuary"
                title="Sri Gangeshwar Mahadev Mandir"
                subtitle="The spiritual epicenter of Vedanta Ashram, featuring the monumental Shivling dome and daily Vedic worship."
              />

              <p className="text-body">
                Sri Gangeshwar Mahadev Mandir is consecrated as the spiritual center of the Ashram. The unique white dome structure is modeled as a towering Shiva Linga, representing the timeless source of wisdom and inner peace.
              </p>

              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <div>
                    <strong>Daily Vedic Abhishek &amp; Aarti:</strong> Morning puja at 7:00 AM and Sandhya Aarti at 6:30 PM open to all seekers.
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <div>
                    <strong>Sacred Carved Sanctum:</strong> Traditional teakwood threshold leading into the meditative inner sanctum.
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <div>
                    <strong>Quiet Contemplation:</strong> Open daily for silent prayer, japa, and Upanishadic contemplation.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-6)' }}>
                <Button href="/ashram" variant="primary">
                  Plan a Temple Visit &amp; Darshan →
                </Button>
              </div>
            </div>

            {/* Mandir Photography Grid with Curated Aspect Ratios */}
            <div className={styles.mandirCards}>
              <div className={styles.mandirCard}>
                <div className={styles.mandirImgWrap}>
                  <img
                    src={getAssetPath('/images/vmission/ashram/gangeshwar-dome-closeup.jpg')}
                    alt="Sri Gangeshwar Mahadev Shivling Dome"
                    className={styles.mandirCardImg}
                    loading="lazy"
                  />
                </div>
                <div className={styles.mandirCardBody}>
                  <h4 className={styles.mandirCardTitle}>The Shivling Dome</h4>
                  <p className={styles.mandirCardSub}>Landmark architectural sanctuary</p>
                </div>
              </div>

              <div className={styles.mandirCard}>
                <div className={styles.mandirImgWrap}>
                  <img
                    src={getAssetPath('/images/vmission/ashram/sanctum-doors-threshold.jpg')}
                    alt="Carved Sanctum Doors"
                    className={styles.mandirCardImg}
                    loading="lazy"
                  />
                </div>
                <div className={styles.mandirCardBody}>
                  <h4 className={styles.mandirCardTitle}>Sacred Threshold</h4>
                  <p className={styles.mandirCardSub}>Carved wooden entrance to sanctum</p>
                </div>
              </div>

              <div className={styles.mandirCard}>
                <div className={styles.mandirImgWrap}>
                  <img
                    src={getAssetPath('/images/vmission/worship/morning-aarti.jpg')}
                    alt="Morning Aarti at Gangeshwar Temple"
                    className={styles.mandirCardImg}
                    loading="lazy"
                  />
                </div>
                <div className={styles.mandirCardBody}>
                  <h4 className={styles.mandirCardTitle}>Morning Aarti</h4>
                  <p className={styles.mandirCardSub}>Daily Vedic chanting &amp; puja</p>
                </div>
              </div>

              <div className={styles.mandirCard}>
                <div className={styles.mandirImgWrap}>
                  <img
                    src={getAssetPath('/images/vmission/ashram/sanctum-interior-stage.jpg')}
                    alt="Mandir Inner Sanctum"
                    className={styles.mandirCardImg}
                    loading="lazy"
                  />
                </div>
                <div className={styles.mandirCardBody}>
                  <h4 className={styles.mandirCardTitle}>Inner Sanctum</h4>
                  <p className={styles.mandirCardSub}>Silence &amp; devotional offerings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEACHING TRADITION — HISTORICAL & SCRIPTURAL SLIDER */}
      <section className="section" aria-label="Teaching Tradition">
        <div className="container">
          <SectionHeader
            tag="Living Parampara"
            title="The Teaching Tradition of Vedanta"
            subtitle="Explore the timeless insights, Mahavakyas, and restored archival discourses from the lineage of Adi Shankaracharya and Poojya Guruji."
            align="center"
          />

          <TeachingSlider />
        </div>
      </section>

      {/* 5. RESIDENT ACHARYAS */}
      <section className="section section--muted" aria-label="Resident Acharyas">
        <div className="container">
          <SectionHeader
            tag="Guru-Shishya Parampara"
            title="Resident Acharyas of Vedanta Mission"
            subtitle="Dedicated monks and scholars teaching the triple canon of Advaita Vedanta in the lineage of Adi Shankaracharya."
            align="center"
          />

          <div className="grid grid--4">
            {acharyas.map((acharya) => (
              <AcharyaCard key={acharya.slug} acharya={acharya} />
            ))}
          </div>

          <div className={styles.sectionLinkRow}>
            <Link href="/acharyas" className={styles.moreLink}>
              Read Acharya Biographies &amp; Lineage →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. COURSES & STRUCTURED STUDY */}
      <section className="section" aria-label="Courses & Study">
        <div className="container">
          <SectionHeader
            tag="Systematic Study"
            title="Vedantic Learning Programs"
            subtitle="Structured curricula designed for sincere seekers worldwide, from correspondence lessons to full-time residential training."
            align="center"
          />

          <div className="grid grid--3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className={styles.sectionLinkRow}>
            <Link href="/learn" className={styles.moreLink}>
              View All Study Programs &amp; Methodology →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. JNANA GANGA — TEACHINGS & AUDIO DISCOURSES */}
      <section className="section section--muted" aria-label="Teachings Library">
        <div className="container">
          <SectionHeader
            tag="Jnana Ganga"
            title="Audio Lectures &amp; Discourses"
            subtitle="Verse-by-verse scriptural commentaries by Swami Atmananda Saraswati available for online listening."
            align="center"
          />

          <div className="grid grid--3">
            {featuredTeachings.map((teaching) => (
              <TeachingCard key={teaching.id} teaching={teaching} />
            ))}
          </div>

          <div className={styles.sectionLinkRow}>
            <Link href="/teachings" className={styles.moreLink}>
              Browse Full Audio Library &amp; Topics →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. UPCOMING EVENTS & CAMPS */}
      <section className="section" aria-label="Events Calendar">
        <div className="container">
          <SectionHeader
            tag="Satsang & Camps"
            title="Upcoming Events &amp; Retreats"
            subtitle="Participate in residential retreats, Gyana Yagnas, and festival celebrations at the Ashram."
            align="center"
          />

          <div className="grid grid--2">
            {upcomingEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>

          <div className={styles.sectionLinkRow}>
            <Link href="/events" className={styles.moreLink}>
              View Complete Events Calendar →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. PUBLICATIONS & EZINES */}
      <section className="section section--muted" aria-label="Publications">
        <div className="container">
          <SectionHeader
            tag="Free Digital Literature"
            title="Monthly Ezines &amp; Publications"
            subtitle="Spreading the timeless message of the Upanishads through monthly digital magazines distributed globally."
            align="center"
          />

          <div className={styles.pubsGrid}>
            <div className={styles.pubCard}>
              <div className={styles.pubHeader}>
                <span className={styles.pubTag}>English &amp; Hindi</span>
                <span style={{ fontSize: '1.25rem' }}>📰</span>
              </div>
              <h3 className={styles.pubTitle}>Vedanta Sandesh</h3>
              <p className={styles.pubDesc}>
                Published continuously every month for over two decades. Features verse-by-verse Gita commentaries, Upanishadic stories, and reflections by Poojya Guruji.
              </p>
              <Link href="/publications" className={styles.moreLink} style={{ alignSelf: 'flex-start' }}>
                Read Latest Issues →
              </Link>
            </div>

            <div className={styles.pubCard}>
              <div className={styles.pubHeader}>
                <span className={styles.pubTag}>Hindi &amp; Gujarati</span>
                <span style={{ fontSize: '1.25rem' }}>📖</span>
              </div>
              <h3 className={styles.pubTitle}>Vedanta Piyush</h3>
              <p className={styles.pubDesc}>
                A dedicated monthly publication tailored for regional language seekers, offering clear elucidations of Sanskrit verses and classical Stotrams.
              </p>
              <Link href="/publications" className={styles.moreLink} style={{ alignSelf: 'flex-start' }}>
                Browse Archive →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SEVA & INVITATION BANNER */}
      <section className="section" aria-label="Visit & Support">
        <div className="container">
          <div className={styles.ctaBanner}>
            <div className={styles.ctaContent}>
              <p className={styles.ctaKicker}>GURUKULA TRADITION</p>
              <h2 className={styles.ctaTitle}>Visit Vedanta Ashram, Indore</h2>
              <p className={styles.ctaText}>
                Experience the serene atmosphere of daily prayer, scriptural chanting, and silent contemplation. Accommodation and sattwic meals are available for serious seekers.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/ashram" className={styles.btnCtaWhite}>
                Plan Your Visit →
              </Link>
              <Link href="/donate" className={styles.btnCtaOutline}>
                Offer Seva / Dana
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
