'use client';

import React from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import TeachingCard from '@/components/TeachingCard';
import EventCard from '@/components/EventCard';
import Button from '@/components/Button';
import { useData } from '@/context/DataContext';
import { getAssetPath } from '@/utils/assetPath';
import CinematicEntryOverlay from '@/components/cinematic/CinematicEntryOverlay';
import styles from './page.module.css';

export default function HomePage() {
  const { events, teachings } = useData();

  const upcomingEvents = events.filter((e) => !e.isPast).slice(0, 2);
  const featuredTeachings = teachings.slice(0, 3);

  return (
    <>
      <CinematicEntryOverlay />
      {/* ======================================================================
          CHAPTER 1: THE SACRED ARRIVAL (MONUMENTAL & CONTEMPLATIVE THRESHOLD)
          ====================================================================== */}
      <section className={styles.heroCinematic} aria-label="Vedanta Mission Ashram Hero">
        {/* Background Architectural Canvas with Tonal Dawn Scrim */}
        <div className={styles.heroBackdrop}>
          <img
            src={getAssetPath('/images/vmission/hero/vmission-hero-cinematic.jpg')}
            alt="Vedanta Mission Ashram, Sri Gangeshwar Mahadev Shivling Dome in Indore"
            className={styles.heroBackdropImg}
            loading="eager"
          />
          <div className={styles.heroBackdropGradient} />
          <div className={styles.heroBackdropTexture} />
        </div>

        {/* Hero Content: Pure, unhurried arrival */}
        <div className="container">
          <div className={styles.heroContentWrap}>
            {/* Unified Quiet Identity Cue */}
            <div className={styles.heroIdentityCue}>
              <span>Traditional Advaita Vedanta</span>
              <span className={styles.heroIdentityDot}>·</span>
              <span>Indore Gurukula</span>
              <span className={styles.heroIdentityDot}>·</span>
              <span>Lineage of Adi Shankaracharya</span>
            </div>

            {/* Sacred Sanskrit Invocation */}
            <p className={styles.heroSanskrit}>सत्यं ज्ञानमनन्तं ब्रह्म</p>

            {/* Monumental Headline */}
            <h1 className={styles.heroMainTitle}>
              Vedanta Mission
              <span className={styles.heroSubTitle}>Vedanta Ashram · Indore</span>
            </h1>

            {/* Concise Mission Statement */}
            <p className={styles.heroDescription}>
              A residential Gurukula in Indore, Central India, dedicated to the systematic study of the Upanishads, Bhagavad Gita, and Brahma Sutras under the guidance of Poojya Swami Atmananda Saraswati.
            </p>

            {/* Exactly Two Focused Actions */}
            <div className={styles.heroCtaGroup}>
              <Button href="/teachings" variant="primary" size="lg">
                Explore the Teachings →
              </Button>
              <Button href="/ashram" variant="outline" size="lg" className={styles.btnHeroAshram}>
                About the Ashram
              </Button>
            </div>
          </div>
        </div>

        {/* Organic Dawn Horizon Descent into Chapter 2 */}
        <div className={styles.heroBottomDawnTransition} />
      </section>

      {/* ======================================================================
          CHAPTER 2: THE SACRED GURUKULA & SANCTUM (THE PLACE)
          ====================================================================== */}
      <section className={styles.sanctumChapter} aria-label="Gangeshwar Mahadev Temple and Vedanta Ashram">
        <div className="container">
          
          <div className={styles.ashramIntroHeader}>
            <span className={styles.ashramEyebrow}>Ashram &amp; Mandir · Est. 1995</span>
            <h2 className={styles.ashramTitle}>Sri Gangeshwar Mahadev &amp; Vedanta Ashram</h2>
            <p className={styles.ashramSubtitle}>
              Nestled in Indore, Central India, Vedanta Ashram is a living residential Gurukula where full-time Brahmacharis and visiting seekers dedicate themselves to traditional Vedic study, daily worship, and contemplative silence.
            </p>
          </div>

          {/* Architectural Spatial Composition */}
          <div className={styles.spatialLayoutGrid}>
            
            {/* Left: Dominant Landmark Anchor Image */}
            <div className={styles.landmarkAnchorFrame}>
              <div className={styles.landmarkImgWrap}>
                <img
                  src={getAssetPath('/images/vmission/ashram/gangeshwar-dome-closeup.jpg')}
                  alt="Sri Gangeshwar Mahadev Monumental Shivling Dome at Vedanta Ashram"
                  className={styles.landmarkImg}
                  loading="lazy"
                />
                <div className={styles.landmarkCaption}>
                  <strong>Sri Gangeshwar Mahadev Mandir</strong>
                  <span>Towering white architectural emblem of contemplative stillness</span>
                </div>
              </div>
            </div>

            {/* Right: Architectural Narrative, Rhythm of Worship & Vignettes */}
            <div className={styles.ashramDetailCol}>
              
              <div className={styles.ashramNarrativeText}>
                <p>
                  At the heart of the Ashram rises the unique white dome structure modeled as a monumental Shiva Linga, consecrated in 1995. It stands as a living testament to the primordial Guru, Lord Shiva, whose grace guides all sincere inquirers toward non-dual Self-knowledge.
                </p>
              </div>

              {/* Ashram Daily Rhythm (Integrated Typographic Schedule) */}
              <div className={styles.mandirScheduleBlock}>
                <div className={styles.schedBlockHeader}>
                  <h4 className={styles.schedBlockHeading}>Daily Ashram Rhythm of Worship</h4>
                  <span className={styles.schedSeekersNotice}>Open Daily to All Seekers</span>
                </div>

                <div className={styles.schedEntries}>
                  <div className={styles.schedEntry}>
                    <span className={styles.schedTimeBadge}>07:00 AM</span>
                    <div className={styles.schedEntryText}>
                      <strong>Morning Vedic Abhishek &amp; Shiva Sahasranama</strong>
                      <span>Traditional Bilva offerings, Stotram chanting, and morning prayers</span>
                    </div>
                  </div>

                  <div className={styles.schedDivider} />

                  <div className={styles.schedEntry}>
                    <span className={styles.schedTimeBadge}>06:30 PM</span>
                    <div className={styles.schedEntryText}>
                      <strong>Sandhya Aarti &amp; Silent Upanishadic Reflection</strong>
                      <span>Evening lamp offering, Stotram singing, and contemplative meditation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Architectural Supporting Vignettes */}
              <div className={styles.ashramVignetteRow}>
                <div className={styles.ashramVignetteCard}>
                  <div className={styles.vignetteImgWrap}>
                    <img
                      src={getAssetPath('/images/vmission/ashram/sanctum-doors-threshold.jpg')}
                      alt="Carved Teakwood Sanctum Doors"
                      className={styles.vignetteImg}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.vignetteBody}>
                    <h5>Mandir Entrance</h5>
                    <span>Hand-carved teakwood sanctum entrance</span>
                  </div>
                </div>

                <div className={styles.ashramVignetteCard}>
                  <div className={styles.vignetteImgWrap}>
                    <img
                      src={getAssetPath('/images/vmission/worship/morning-aarti.jpg')}
                      alt="Morning Aarti at Sri Gangeshwar Temple"
                      className={styles.vignetteImg}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.vignetteBody}>
                    <h5>Morning Aarti</h5>
                    <span>Daily Vedic chanting &amp; evening prayers</span>
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className={styles.ashramActionsRow}>
                <Button href="/ashram" variant="primary">
                  Plan Ashram Visit &amp; Darshan →
                </Button>
                <Link href="/contact" className={styles.linkDirections}>
                  Directions &amp; Campus Map →
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ======================================================================
          CHAPTER 3: THE LIVING TRADITION & LINEAGE (THE VISION)
          ====================================================================== */}
      <section className={styles.lineageChapter} aria-label="Lineage and Vision of Advaita Vedanta">
        <div className="container">
          
          <div className={styles.lineageIntroWrap}>
            <span className={styles.lineageEyebrow}>Unbroken Guru-Shishya Parampara</span>
            <h2 className={styles.lineageTitle}>The Vision of Advaita Vedanta</h2>
            <div className={styles.lineageEmblemLine} />
            <blockquote className={styles.lineageQuote}>
              &ldquo;Advaita Vedanta is not a speculative philosophy or belief system, but a direct means of knowledge (Pramana) that resolves the fundamental human yearning for freedom. Through systematic inquiry into the Upanishads, the seeker discovers the non-dual Self: pure Consciousness, limitless and untouched by sorrow.&rdquo;
            </blockquote>
          </div>

          {/* Editorial Triptych: Three Pillars of Classical Pedagogy (Zero Box Cards, Pure Editorial Layout) */}
          <div className={styles.triptychGrid}>
            
            {/* Pillar 1 */}
            <div className={styles.triptychPillar}>
              <div className={styles.triptychHeader}>
                <span className={styles.triptychNumeral}>I</span>
                <div className={styles.triptychIconBox} aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    <line x1="9" y1="7" x2="15" y2="7" />
                    <line x1="9" y1="11" x2="13" y2="11" />
                  </svg>
                </div>
              </div>
              <h3 className={styles.triptychHeading}>Shastra Pramana</h3>
              <p className={styles.triptychDesc}>
                The Upanishads, Bhagavad Gita, and Brahma Sutras (Prasthanatraya) serving as the authoritative means of knowledge (Pramana) for resolving the notion of individuality.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className={styles.triptychPillar}>
              <div className={styles.triptychHeader}>
                <span className={styles.triptychNumeral}>II</span>
                <div className={styles.triptychIconBox} aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3a9 9 0 0 1 0 18" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
              </div>
              <h3 className={styles.triptychHeading}>Guru-Shishya Lineage</h3>
              <p className={styles.triptychDesc}>
                The unbroken oral transmission of the methodology of Self-inquiry handed down from Sri Adi Shankaracharya and traditional preceptors through direct teaching.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className={styles.triptychPillar}>
              <div className={styles.triptychHeader}>
                <span className={styles.triptychNumeral}>III</span>
                <div className={styles.triptychIconBox} aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
              </div>
              <h3 className={styles.triptychHeading}>Adhyaropa-Apavada</h3>
              <p className={styles.triptychDesc}>
                The classical pedagogy of deliberate superimposition followed by systematic negation, guiding the inquirer beyond all mental constructs to direct recognition of the non-dual Self.
              </p>
            </div>

          </div>

          {/* Editorial Transition Bridge into Chapter 4 (Founder) */}
          <div className={styles.lineageToFounderBridge}>
            <div className={styles.bridgeVerticalLine} />
            <p className={styles.bridgeInvitationText}>
              In this unbroken stream of wisdom, meet the Acharya whose dedicated life and sadhana manifested Vedanta Mission.
            </p>
          </div>

        </div>
      </section>

      {/* ======================================================================
          CHAPTER 4: THE FOUNDING ACHARYA — CONCEPT A CINEMATIC MOMENT
          ====================================================================== */}
      <section className={styles.founderCinematicSection} aria-label="Founding Acharya Swami Atmananda Saraswati">
        {/* Canonical Full-Bleed Photograph Container */}
        <div className={styles.founderBgContainer}>
          <img
            src={getAssetPath('/images/vmission/acharyas/swami-atmananda-saraswati/founder-portrait.png')}
            alt="Poojya Guruji Swami Atmananda Saraswati in natural Bhagwa robes beside the river"
            className={styles.founderBgImage}
            loading="lazy"
          />
          {/* Targeted Localized Contrast Scrim across Left River Area */}
          <div className={styles.founderScrimLeft} />
          <div className={styles.founderBottomFade} />
        </div>

        {/* Editorial Content Layer in Left Negative Space */}
        <div className="container">
          <div className={styles.founderEditorialCol}>
            <div className={styles.founderEyebrow}>
              Founding Acharya
            </div>

            <h2 className={styles.founderName}>
              Swami Atmananda<br />Saraswati
            </h2>

            <div className={styles.founderHonorificRow}>
              <span className={styles.founderDevanagari}>पूज्य गुरुजी</span>
              <span className={styles.founderHonorificSep}>·</span>
              <span className={styles.founderLatinHonorific}>Poojya Guruji</span>
            </div>

            <p className={styles.founderBioLead}>
              Renowned scholar of Advaita Vedanta and founder of <strong>Vedanta Mission (1992)</strong>, dedicated to unfolding the traditional teachings of the Bhagavad Gita, Upanishads, and classical Vedantic texts through authentic Guru-shishya parampara in India and abroad.
            </p>

            {/* Story Anchors */}
            <div className={styles.storyAnchorsRow}>
              <div className={styles.storyAnchorItem}>
                <span className={styles.storyAnchorYear}>1987</span>
                <span className={styles.storyAnchorLabel}>Sanyas Deeksha</span>
              </div>
              <div className={styles.storyAnchorSep} />
              <div className={styles.storyAnchorItem}>
                <span className={styles.storyAnchorYear}>1992</span>
                <span className={styles.storyAnchorLabel}>Vedanta Mission</span>
              </div>
              <div className={styles.storyAnchorSep} />
              <div className={styles.storyAnchorItem}>
                <span className={styles.storyAnchorYear}>1995</span>
                <span className={styles.storyAnchorLabel}>Indore Gurukula</span>
              </div>
            </div>

            {/* Unambiguous Primary Action */}
            <div className={styles.founderActionsRow}>
              <Link href="/acharyas/swami-atmananda-saraswati" className={styles.btnKnowGuruji}>
                <span>Meet Poojya Guruji</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/teachings" className={styles.linkExploreTeachings}>
                Explore His Teachings →
              </Link>
            </div>
          </div>
        </div>

        {/* Provenance Tag */}
        <div className={styles.founderProvenanceTag}>
          Canonical Ashram Archive · Riverside Satsang
        </div>
      </section>

      {/* ======================================================================
          CHAPTER 5: JNANA GANGA — SCRIPTURAL STUDY & DISCOURSES
          ====================================================================== */}
      <section className={styles.teachingsBridgeSection} aria-label="Jnana Ganga Teachings Tradition">
        <div className="container">
          <div className={styles.bridgeHeaderWrap}>
            <span className={styles.bridgeEyebrow}>Jnana Ganga · The Repository of Wisdom</span>
            <h2 className={styles.bridgeTitle}>Systematic Scriptural Study</h2>
            <p className={styles.bridgeSubtitle}>
              Poojya Guruji&apos;s four decades of sadhana culminate in the systematic, verse-by-verse unfolding of the Prasthanatraya. Explore the verified discourses cataloged within the Jnana Ganga archive.
            </p>
          </div>

          {/* Three Scriptural Pillars (Library Archival Monograph Styling) */}
          <div className={styles.shastraPillarsGrid}>
            <div className={styles.pillarCard}>
              <div>
                <span className={styles.pillarNum}>I</span>
                <h3 className={styles.pillarName}>Bhagavad Gita</h3>
                <p className={styles.pillarDesc}>
                  Expositions on Karma Yoga, Bhakti Yoga, and Jnana Yoga, clarifying the integration of selfless action and devotion in daily life.
                </p>
              </div>
              <Link href="/teachings?category=bhagavad-gita" className={styles.pillarLink}>
                Explore Gita Pravachans →
              </Link>
            </div>

            <div className={styles.pillarCard}>
              <div>
                <span className={styles.pillarNum}>II</span>
                <h3 className={styles.pillarName}>Principal Upanishads</h3>
                <p className={styles.pillarDesc}>
                  Deep audio inquiries into Mandukya, Taittiriya, and Katha Upanishads, revealing the non-dual Self beyond waking, dream, and deep sleep.
                </p>
              </div>
              <Link href="/teachings?category=upanishads" className={styles.pillarLink}>
                Explore Upanishad Series →
              </Link>
            </div>

            <div className={styles.pillarCard}>
              <div>
                <span className={styles.pillarNum}>III</span>
                <h3 className={styles.pillarName}>Prakarana Granths</h3>
                <p className={styles.pillarDesc}>
                  Foundational introductory treatises including Vivekachudamani, Atma Bodha, and Drig Drushya Viveka for systematic Self-inquiry.
                </p>
              </div>
              <Link href="/teachings?category=prakarana-granth" className={styles.pillarLink}>
                Access Prakarana Lectures →
              </Link>
            </div>
          </div>

          {/* Featured Audio Lectures Archive Row */}
          <div className={styles.teachingsAudioRow}>
            <div className={styles.audioRowHeader}>
              <h3 className={styles.audioRowTitle}>Recent Discourses in Jnana Ganga</h3>
              <Link href="/teachings" className={styles.allAudioLink}>
                View All Discourses &amp; Playlists →
              </Link>
            </div>

            <div className="grid grid--3">
              {featuredTeachings.map((teaching) => (
                <TeachingCard key={teaching.id} teaching={teaching} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          CHAPTER 6: LITERARY HERITAGE — PUBLICATIONS & MONTHLY EZINES
          ====================================================================== */}
      <section className={styles.publicationsChapter} aria-label="Publications Library">
        <div className="container">
          <SectionHeader
            tag="Free Digital Literature"
            title="Monthly Ezines &amp; Vedantic Treatises"
            subtitle="Spreading the traditional teachings of the Upanishads through monthly digital magazines distributed freely to seekers globally for over 25 years."
            align="center"
          />

          {/* Literary Archive Display: Editorial Monograph Approach */}
          <div className={styles.pubsGrid}>
            
            {/* Vedanta Sandesh */}
            <div className={styles.pubCard}>
              <div className={styles.pubCoverFrame}>
                <div className={styles.pubBookBadge}>English &amp; Hindi · Continuous since 2000</div>
                <div className={styles.pubCoverMock}>
                  <div className={styles.pubCoverEmblem}>ॐ</div>
                  <h4 className={styles.pubCoverTitle}>VEDANTA SANDESH</h4>
                  <p className={styles.pubCoverSub}>A Monthly Journal of Advaita Vedanta</p>
                  <span className={styles.pubIssueTag}>March 2026 Issue</span>
                </div>
              </div>

              <div className={styles.pubCardDetails}>
                <h3 className={styles.pubTitle}>Vedanta Sandesh</h3>
                <p className={styles.pubDesc}>
                  Published continuously every month for over a quarter century. Features verse-by-verse Gita commentaries, Upanishadic reflections, and articles by Swami Atmananda Saraswati.
                </p>
                <div className={styles.pubMetaRow}>
                  <span>300+ Issues Archived</span>
                  <span>Free Global PDF Access</span>
                </div>
                <Link href="/publications" className={styles.pubActionLink}>
                  Read Current Issue &amp; Archives →
                </Link>
              </div>
            </div>

            {/* Vedanta Piyush */}
            <div className={styles.pubCard}>
              <div className={styles.pubCoverFrame}>
                <div className={styles.pubBookBadge}>Hindi &amp; Gujarati · Monthly</div>
                <div className={styles.pubCoverMock}>
                  <div className={styles.pubCoverEmblem}>वेदान्त</div>
                  <h4 className={styles.pubCoverTitle}>VEDANTA PIYUSH</h4>
                  <p className={styles.pubCoverSub}>Spiritual Reflections in Regional Languages</p>
                  <span className={styles.pubIssueTag}>Monthly Edition</span>
                </div>
              </div>

              <div className={styles.pubCardDetails}>
                <h3 className={styles.pubTitle}>Vedanta Piyush</h3>
                <p className={styles.pubDesc}>
                  A dedicated regional language monthly publication offering lucid elucidations of Sanskrit verses, traditional Stotrams, and practical sadhana guidance for regional seekers.
                </p>
                <div className={styles.pubMetaRow}>
                  <span>Complete Digital Edition</span>
                  <span>Free Distribution</span>
                </div>
                <Link href="/publications" className={styles.pubActionLink}>
                  Browse Piyush Archives →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================================
          CHAPTER 7: COMMUNAL SADHANA — RETREATS, CAMPS & SATSANG
          ====================================================================== */}
      <section className={styles.eventsChapter} aria-label="Events Calendar and Retreats">
        <div className="container">
          <SectionHeader
            tag="Satsang &amp; Camps"
            title="Residential Retreats &amp; Yagnas"
            subtitle="Participate in intensive scripture study camps, Gyana Yagnas, and annual festival celebrations at Vedanta Ashram, Indore."
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

      {/* ======================================================================
          CHAPTER 8: SACRED SEVA & STEWARDSHIP
          ====================================================================== */}
      <section className={styles.sevaChapter} aria-label="Visit and Support Vedanta Mission">
        <div className="container">
          <div className={styles.ctaBanner}>
            <div className={styles.ctaContent}>
              <p className={styles.ctaKicker}>SEVA &amp; SUPPORT</p>
              <h2 className={styles.ctaTitle}>Support the Gurukula &amp; Mission</h2>
              <p className={styles.ctaText}>
                Vedanta Mission is sustained by the voluntary offerings of devotees and seekers. Your seva directly supports full-time Vedanta Brahmacharis, daily Annadanam, the free global distribution of spiritual literature, and the maintenance of Sri Gangeshwar Mahadev Mandir.
              </p>
              <p className={styles.ctaTrustNotice}>
                Administered through registered <strong>Vedanta Parmarthic Sewa Trust</strong> · Eligible for 80-G Income Tax Exemption
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/donate" className={styles.btnCtaWhite}>
                Support the Ashram →
              </Link>
              <Link href="/ashram" className={styles.btnCtaOutline}>
                Plan Ashram Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
