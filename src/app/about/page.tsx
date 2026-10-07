import React from 'react';
import Link from 'next/link';
import { getAssetPath } from '@/utils/assetPath';
import Button from '@/components/Button';
import styles from './page.module.css';

export const metadata = {
  title: 'About Vedanta Mission — Vision, Lineage & Living History | Indore Ashram',
  description:
    'Read the history, traditional Shankaracharya lineage, chronological milestones, and registered public charitable trusts of Vedanta Mission and Vedanta Ashram, Indore.',
};

export default function AboutPage() {
  // Verified Founder Milestones Only (Strictly 4 verified historical events)
  const verifiedMilestones = [
    {
      year: '1983',
      title: 'Brahmacharya Initiation',
      detail: 'Completed intensive scriptural study in Advaita Vedanta at Sandeepany Sadhanalaya, Mumbai, under the Chinmaya Mission.',
    },
    {
      year: '1987',
      title: 'Sanyas Deeksha',
      detail: 'Embraced the sacred vows of Sanyas into the Dashanami Saraswati monastic order as a dedicated, full-time teacher of the Upanishads.',
    },
    {
      year: '1992',
      title: 'Founding of Vedanta Mission',
      detail: 'Conceived and established Vedanta Mission as a non-profit spiritual and educational organization dedicated to the authentic transmission of Vedanta.',
    },
    {
      year: '1995',
      title: 'Indore Gurukula Establishment',
      detail: 'Consecrated Vedanta Ashram and the monumental Sri Gangeshwar Mahadev Mandir in Sudama Nagar, Indore, initiating residential Gurukula training.',
    },
  ];

  return (
    <div className={styles.aboutWrapper}>
      {/* ======================================================================
          01. ARRIVAL / ATMOSPHERIC ARCHITECTURAL HERO
          ====================================================================== */}
      <section className={styles.heroCinematic} aria-label="About Vedanta Mission Hero">
        <div className={styles.heroBackdrop}>
          <img
            src={getAssetPath('/images/vmission/entrance/ashram-entrance-cinematic.jpg')}
            alt="Courtyard and consecrated temple entrance of Vedanta Ashram, Indore"
            className={styles.heroBackdropImg}
            loading="eager"
          />
          <div className={styles.heroBackdropGradient} />
          <div className={styles.heroBackdropTexture} />
        </div>

        {/* Organic Dawn Horizon Descent into Section 2 */}
        <div className={styles.heroBottomDawnTransition} aria-hidden="true" />

        <div className="container">
          <div className={styles.heroContentWrap}>
            <div className={styles.heroIdentityCue}>
              <span>Traditional Advaita Vedanta</span>
              <span className={styles.heroIdentityDot}>·</span>
              <span>Lineage of Adi Shankaracharya</span>
              <span className={styles.heroIdentityDot}>·</span>
              <span>Founded 1992</span>
            </div>

            <p className={styles.heroSanskrit}>सत्यं ज्ञानमनन्तं ब्रह्म</p>

            <h1 className={styles.heroMainTitle}>
              Revealing the Eternal
              <span className={styles.heroSubTitle}>Oneness of All Life</span>
            </h1>

            <p className={styles.heroDescription}>
              Founded in 1992 by Poojya Swami Atmananda Saraswati, Vedanta Mission is an authentic Gurukula dedicated to the traditional, unadulterated unfolding of Advaita Vedanta as a valid means of knowledge (Pramana) for sincere seekers worldwide.
            </p>

            <div className={styles.heroCtaRow}>
              <Button href="#vision" variant="primary" size="lg">
                The Vision ↓
              </Button>
              <Button href="#journey" variant="outline" size="lg" className={styles.btnHeroSecondary}>
                Living History &amp; Milestones
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          02. SACRED VISION & OFFICIAL MOTTO (Asymmetric Spatial Grid)
          ====================================================================== */}
      <section id="vision" className={styles.visionSection} aria-label="Sacred Purpose & Vision">
        <div className="container">
          <div className={styles.asymmetricGrid}>
            {/* Left: Tactile Landmark Frame */}
            <div className={styles.landmarkCol}>
              <div className={styles.landmarkAnchorFrame}>
                <div className={styles.landmarkImgWrap}>
                  <img
                    src={getAssetPath('/images/vmission/ashram/courtyard-with-guruji.jpg')}
                    alt="Poojya Swami Atmananda Saraswati in the peaceful ashram courtyard at Indore"
                    className={styles.landmarkImg}
                    loading="lazy"
                  />
                  <div className={styles.imageCornerBadge} aria-hidden="true">ॐ</div>
                </div>
                <div className={styles.landmarkCaption}>
                  <strong>A Living Gurukula Tradition</strong>
                  <span>Poojya Swami Atmananda Saraswati at Vedanta Ashram, Indore</span>
                </div>
              </div>
            </div>

            {/* Right: Narrative & Official Motto */}
            <div className={styles.narrativeCol}>
              <span className={styles.sectionEyebrow}>Our Sacred Purpose</span>
              <h2 className={styles.narrativeTitle}>Spreading &lsquo;Love &amp; Light&rsquo;</h2>

              <div className={styles.mottoPullQuote}>
                <blockquote className={styles.taglineText}>
                  &ldquo;Spreading &lsquo;Love &amp; Light&rsquo; by revealing the basic oneness of all.&rdquo;
                </blockquote>
                <cite className={styles.taglineAuthor}>— Official Motto of Vedanta Mission</cite>
              </div>

              <div className={styles.sanskritVerseCard}>
                <p className={styles.sanskritVerseText}>
                  आत्मैव हि परं ब्रह्म नान्यदस्तीति निश्चयः ।<br />
                  ज्ञानेनानेन मुच्यन्ते भवबन्धविवर्जिताः ॥
                </p>
                <p className={styles.sanskritVerseMeaning}>
                  &ldquo;The Self alone is the Supreme Reality (Brahman); there is nothing else. By this knowledge alone, seekers are freed from all bondage.&rdquo;
                </p>
              </div>

              <div className={styles.proseBlock}>
                <p>
                  Vedanta Mission stands upon the teaching of the Upanishads: that the essential nature of the individual seeker (<em>Jiva</em>), the cosmic creator (<em>Ishwara</em>), and the world (<em>Jagat</em>) is non-different—one undivided, self-luminous Consciousness (<em>Brahman</em>).
                </p>
                <p>
                  Spiritual confusion and sorrow are born of mistaken identity. By methodically unfolding the sacred scriptures under the traditional guidance of qualified Acharyas, the Mission works to remove fundamental ignorance, illuminating the innate peace inherent in every human heart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          03. THE THREE PILLARS (Editorial Triptych — Zero Box Cards!)
          ====================================================================== */}
      <section className={styles.pillarsSection} aria-label="The Threefold Sadhana">
        <div className="container">
          <div className={styles.pillarsIntro}>
            <span className={styles.sectionEyebrow}>Core Pedagogy</span>
            <h2 className={styles.sectionTitle}>The Threefold Sadhana of the Mission</h2>
            <div className={styles.titleDividerLine} />
            <p className={styles.sectionLead}>
              The path of spiritual inquiry according to the Shankara tradition harmonizes systematic study, living contemplation, and dedicated selfless service.
            </p>
          </div>

          <div className={styles.triptychGrid}>
            {/* Pillar I */}
            <div className={styles.triptychPillar}>
              <div className={styles.triptychHeader}>
                <span className={styles.triptychNumeral}>I</span>
                <span className={styles.triptychTag}>Discernment</span>
              </div>
              <h3 className={styles.triptychHeading}>Swadhyaya</h3>
              <p className={styles.triptychSanskrit}>स्वाध्याय · Scriptural Inquiry</p>
              <p className={styles.triptychDesc}>
                Rigorous, systematic study of the Upanishads, Bhagavad Gita, and Brahma Sutras (Prasthanatraya). The scriptures are approached not as dogma, but as a valid means of knowledge (Pramana) that directly removes self-ignorance.
              </p>
            </div>

            {/* Pillar II */}
            <div className={styles.triptychPillar}>
              <div className={styles.triptychHeader}>
                <span className={styles.triptychNumeral}>II</span>
                <span className={styles.triptychTag}>Association</span>
              </div>
              <h3 className={styles.triptychHeading}>Satsanga</h3>
              <p className={styles.triptychSanskrit}>सत्संग · Living Contemplation</p>
              <p className={styles.triptychDesc}>
                Direct communion with truth in the company of qualified Acharyas. Through daily discourses, informal question-and-answer satsangs, and silent meditation, the seeker’s doubts are systematically dissolved.
              </p>
            </div>

            {/* Pillar III */}
            <div className={styles.triptychPillar}>
              <div className={styles.triptychHeader}>
                <span className={styles.triptychNumeral}>III</span>
                <span className={styles.triptychTag}>Dedication</span>
              </div>
              <h3 className={styles.triptychHeading}>Seva</h3>
              <p className={styles.triptychSanskrit}>सेवा · Selfless Action</p>
              <p className={styles.triptychDesc}>
                Dedicated, non-commercial service performed as Ishwara-arpanam (offering to the Divine). Seva purifies the mind (Chitta-shuddhi), cultivating the inner humility and detachment essential for direct spiritual appreciation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          04. OUR JOURNEY (Chronological Milestones with Real Archival Anchor)
          ====================================================================== */}
      <section id="journey" className={styles.journeySection} aria-label="Historical Milestones">
        <div className="container">
          <div className={styles.journeyIntro}>
            <span className={styles.sectionEyebrow}>Living History</span>
            <h2 className={styles.sectionTitle}>Four Decades of Unbroken Dedication</h2>
            <div className={styles.titleDividerLine} />
            <p className={styles.sectionLead}>
              Trace the verified chronological milestones of Poojya Swami Atmananda Saraswati and the establishment of the Indore Gurukula.
            </p>
          </div>

          <div className={styles.journeyLayoutGrid}>
            {/* Left: Verified Archival Timeline Spine */}
            <div className={styles.timelineCol}>
              <div className={styles.timelineSpine}>
                {verifiedMilestones.map((m, index) => (
                  <div key={m.year} className={styles.timelineItem}>
                    <div className={styles.timelineMarkerCol}>
                      <span className={styles.timelineYear}>{m.year}</span>
                      <span className={styles.timelineDot} />
                      {index < verifiedMilestones.length - 1 && <span className={styles.timelineLine} />}
                    </div>
                    <div className={styles.timelineContentCol}>
                      <h3 className={styles.timelineHeading}>{m.title}</h3>
                      <p className={styles.timelineDetail}>{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Authentic Historical Photograph Anchor */}
            <div className={styles.archivePhotoCol}>
              <div className={styles.archivePhotoFrame}>
                <div className={styles.archiveImgWrap}>
                  <img
                    src={getAssetPath('/images/vmission/teaching/07-vedanta-archive-restored.jpg')}
                    alt="Historical Vedanta Pravachan Archive photograph illustrating decades of scriptural teaching"
                    className={styles.archiveImg}
                    loading="lazy"
                  />
                  <div className={styles.imageCornerBadge} aria-hidden="true">ॐ</div>
                </div>
                <div className={styles.archiveCaption}>
                  <strong>Historical Pravachan Archive</strong>
                  <span>Decades of systematic Upanishad discourses and monastic teaching in the tradition of Adi Shankaracharya</span>
                </div>
              </div>

              <div className={styles.heritageNoteCard}>
                <span className={styles.heritageNoteTag}>Tradition of Shankaracharya</span>
                <p className={styles.heritageNoteText}>
                  From Sandeepany Sadhanalaya in 1983 to the consecration of the white Shivling dome at Vedanta Ashram in 1995, every chapter reflects a single commitment: preserving the authentic methodology of Advaita Vedanta without commercial compromise.
                </p>
                <Link href="/acharyas" className={styles.heritageLink}>
                  Meet the Living Acharyas of the Lineage →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          05. INSTITUTIONAL FOUNDATION & TRUSTS (Dignified Charter — Zero Banking Data)
          ====================================================================== */}
      <section id="trusts" className={styles.trustsSection} aria-label="Registered Public Charitable Trusts">
        <div className="container">
          <div className={styles.trustsIntro}>
            <span className={styles.sectionEyebrow}>Governance &amp; Fiduciary Integrity</span>
            <h2 className={styles.sectionTitle}>Registered Public Charitable Trusts</h2>
            <div className={styles.titleDividerLine} />
            <p className={styles.sectionLead}>
              All spiritual, cultural, and educational activities of Vedanta Mission are conducted under registered, non-profit public charitable trusts in India.
            </p>
          </div>

          <div className={styles.trustCharterGrid}>
            {/* Trust I */}
            <div className={styles.trustCharterCard}>
              <div className={styles.trustCharterHeader}>
                <span className={styles.trustNumeral}>Trust I</span>
                <h3 className={styles.trustName}>Vedanta Parmarthik Seva Trust</h3>
                <p className={styles.trustSubtitle}>वेदान्त पारमार्थिक सेवा ट्रस्ट · Indore, MP</p>
              </div>
              <p className={styles.trustPurpose}>
                The primary operational trust governing the facilities of Vedanta Ashram, Sri Gangeshwar Mahadev Mandir, Gurukula accommodation, and daily worship.
              </p>
              <div className={styles.charterDetails}>
                <div className={styles.charterRow}>
                  <span className={styles.charterLabel}>Jurisdiction:</span>
                  <span className={styles.charterVal}>Registrar of Public Trusts, Indore, Madhya Pradesh</span>
                </div>
                <div className={styles.charterRow}>
                  <span className={styles.charterLabel}>Focus Areas:</span>
                  <span className={styles.charterVal}>Temple maintenance, daily Annakshetra, residential Gurukula care, monastic seva</span>
                </div>
              </div>
            </div>

            {/* Trust II */}
            <div className={styles.trustCharterCard}>
              <div className={styles.trustCharterHeader}>
                <span className={styles.trustNumeral}>Trust II</span>
                <h3 className={styles.trustName}>Vedanta Mission Trust</h3>
                <p className={styles.trustSubtitle}>वेदान्त मिशन ट्रस्ट · Educational &amp; Outreach</p>
              </div>
              <p className={styles.trustPurpose}>
                The educational and publications trust dedicated to the global dissemination of Vedantic knowledge through free literature, monthly e-magazines, and digital audio-video archives.
              </p>
              <div className={styles.charterDetails}>
                <div className={styles.charterRow}>
                  <span className={styles.charterLabel}>Jurisdiction:</span>
                  <span className={styles.charterVal}>Public Charitable Trust Registered in India</span>
                </div>
                <div className={styles.charterRow}>
                  <span className={styles.charterLabel}>Focus Areas:</span>
                  <span className={styles.charterVal}>Free scriptural publications, Vedanta Sandesh e-magazine, recorded discourses, outreach</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.governanceNotice}>
            <div className={styles.governanceNoticeIcon} aria-hidden="true">🏛️</div>
            <div className={styles.governanceNoticeText}>
              <h4>Honorary Stewardship &amp; Ethical Governance</h4>
              <p>
                All trustees and monastic directors serve entirely in an honorary capacity. Vedanta Mission operates strictly on a non-commercial, voluntary seva basis. Detailed audited financial statements and banking channels are maintained under Indian regulatory standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          06. PRE-FOOTER SACRED TRANSITION
          ====================================================================== */}
      <section className={styles.preFooterSection} aria-label="Continue Exploration">
        <div className="container">
          <div className={styles.preFooterContent}>
            <span className={styles.preFooterEyebrow}>Explore Vedanta Mission</span>
            <h2 className={styles.preFooterTitle}>Visit the Ashram &amp; Listen to Discourses</h2>
            <p className={styles.preFooterLead}>
              Whether seeking systematic scriptural study in our digital library or planning a peaceful visit to the Indore sanctum, the doors of the Gurukula are open.
            </p>
            <div className={styles.preFooterActionRow}>
              <Button href="/teachings" variant="primary" size="lg">
                Explore Jnana Ganga Library →
              </Button>
              <Button href="/ashram" variant="outline" size="lg" className={styles.btnAshramExplore}>
                Visit Vedanta Ashram, Indore
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
