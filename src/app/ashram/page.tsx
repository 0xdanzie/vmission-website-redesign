import React from 'react';
import Link from 'next/link';
import { getAssetPath } from '@/utils/assetPath';
import Button from '@/components/Button';
import CinematicHero from '@/components/cinematic/CinematicHero';
import TactileFrame from '@/components/cinematic/TactileFrame';
import SacredDivider from '@/components/cinematic/SacredDivider';
import CinematicPreFooter from '@/components/cinematic/CinematicPreFooter';
import FootprintsArchive from '@/components/FootprintsArchive';
import styles from './page.module.css';

export const metadata = {
  title: 'Vedanta Ashram & Sri Gangeshwar Mahadev Mandir | Indore',
  description:
    'Step inside Vedanta Ashram in Sudama Nagar, Indore: consecrated Gangeshwar Mahadev Mandir, daily contemplative rhythm, Gurukula study spaces, residential community, and travel directions.',
};

export default function AshramPage() {
  const dailyRhythm = [
    {
      time: '05:30 – 06:30 AM',
      name: 'Brahma Muhurta',
      title: 'Silent Meditation & Pratahkala Chanting',
      desc: 'The ashram day awakens in stillness. Resident sadhaks gather in the discourse hall for silent meditation, Guru Stotram recitation, and Vedic peace invocations.',
    },
    {
      time: '07:30 – 08:30 AM',
      name: 'Mandir Upasana',
      title: 'Sri Gangeshwar Mahadev Abhishek & Aarti',
      desc: 'Consecrated Vedic worship, Rudrabhisheka, and morning camphor flame offerings at the monumental white Shivling sanctum, sanctifying the atmosphere.',
    },
    {
      time: '09:30 – 10:45 AM',
      name: 'Pravachan',
      title: 'Traditional Vedanta Discourse',
      desc: 'Systematic scriptural lectures by Poojya Guruji or resident Acharyas, unfolding the Upanishads, Bhagavad Gita, or Prakarana Granths verse by verse.',
    },
    {
      time: '12:00 – 01:00 PM',
      name: 'Bhiksha',
      title: 'Sattwic Annakshetra Prasad',
      desc: 'Pure vegetarian consecrated meals served to monastics, resident students, and visiting pilgrims in the spirit of seva and mutual reverence.',
    },
    {
      time: '03:30 – 05:00 PM',
      name: 'Swadhyaya',
      title: 'Self-Study, Library Inquiry & Sanskrit',
      desc: 'Quiet contemplation, manuscript study in the scriptural library, Sanskrit grammar lessons, or personal doubt-clearing satsangs with the teachers.',
    },
    {
      time: '06:45 – 08:00 PM',
      name: 'Sandhya Aarti',
      title: 'Evening Mandir Worship & Mouna',
      desc: 'The twilight worship at Gangeshwar Mahadev followed by Stotram recitation, devotional singing, and deep inward stillness (Mouna) before evening rest.',
    },
  ];

  const ashramSpaces = [
    {
      title: 'Sri Gangeshwar Mahadev Mandir',
      subtitle: 'Consecrated Sanctum with Monumental Shivling Dome',
      desc: 'The spiritual heart of Vedanta Ashram, featuring the unique monumental white Shivling crown, carved sanctum doors, and consecrated Shiva Linga where daily Vedic rituals and abhishekams are performed.',
      image: '/images/vmission/ashram/gangeshwar-dome-closeup.jpg',
      caption: 'The consecrated white Shivling architectural dome of Sri Gangeshwar Mahadev Mandir',
    },
    {
      title: 'Pravachan Bhavan (Discourse Hall)',
      subtitle: 'Sacred Auditorium for Traditional Vedantic Inquiry',
      desc: 'An expansive, serene hall designed specifically for listening to scriptural expositions (Shravana). Monastics and seekers sit together on the floor before the vyasapeetha for daily lectures and residential camps.',
      image: '/images/vmission/ashram/teaching-hall-interior.jpg',
      caption: 'Pravachan Bhavan — dedicated hall for daily scriptural discourses and satsang',
    },
    {
      title: 'Scriptural Research Library & Sanctum Threshold',
      subtitle: 'Preserving Sanskrit Source Treatises and Commentaries',
      desc: 'Housing classic Sanskrit commentaries, Shankaracharya Bhashyas, Prakarana granths, and the monthly journal archives, providing seekers with an authentic environment for reflective inquiry.',
      image: '/images/vmission/ashram/sanctum-doors-threshold.jpg',
      caption: 'Intricately carved sanctum threshold and contemplative research precincts',
    },
    {
      title: 'Courtyard & Resident Monastic Kutirs',
      subtitle: 'Simple, Serene Living for Serious Contemplatives',
      desc: 'Surrounded by open verandas, gardens, and quiet walking paths, the residential kutirs provide a clutter-free, sattwic atmosphere conducive to ongoing self-reflection and meditation.',
      image: '/images/vmission/ashram/courtyard-with-guruji.jpg',
      caption: 'Ashram courtyard and peaceful monastic living quarters',
    },
  ];

  return (
    <div className={styles.ashramWrapper}>
      {/* ======================================================================
          01. CINEMATIC ARRIVAL — THE LIVING SANCTUARY
          ====================================================================== */}
      <CinematicHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Vedanta Ashram' },
        ]}
        badge="Sudama Nagar · Indore · Established 1995"
        sanskritInvocation="शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः"
        title="Vedanta Ashram"
        subtitle="Vedanta Ashram &amp; Sri Gangeshwar Mahadev Mandir"
        lead="Established in 1995 by Poojya Swami Atmananda Saraswati, Vedanta Ashram is a physical Gurukula in Indore where traditional Advaita Vedanta is contemplated, lived, and systematically taught in an environment of monastic peace."
        backdropImage="/images/vmission/entrance/ashram-entrance-cinematic.jpg"
        backdropAlt="Entrance and facade of Vedanta Ashram, Indore"
        focalPoint={{ desktop: { x: 50, y: 32 }, mobile: { x: 50, y: 25 } }}
        ctas={[
          { label: 'Sri Gangeshwar Mandir ↓', href: '#mandir', variant: 'primary' },
          { label: 'Daily Contemplative Rhythm', href: '#rhythm', variant: 'outline' },
        ]}
      />

      {/* ======================================================================
          02. SRI GANGESHWAR MAHADEV MANDIR — ARCHITECTURAL SANCTUM
          ====================================================================== */}
      <section id="mandir" className={styles.mandirSection} aria-label="Sri Gangeshwar Mahadev Mandir">
        <div className="container">
          <div className={styles.mandirLayout}>
            {/* Left: Architectural Focal Image */}
            <div className={styles.mandirVisualCol}>
              <TactileFrame
                src="/images/vmission/ashram/gangeshwar-dome-closeup.jpg"
                alt="Consecrated white Shivling dome of Sri Gangeshwar Mahadev Mandir"
                caption="Sri Gangeshwar Mahadev Mandir — Consecrated in 1995 with unique white Shivling spire"
                dateTag="Consecrated 1995"
                aspectRatio="archival"
                objectPosition="center top"
                priority={true}
              />
              <div className={styles.mandirSecondaryFrame}>
                <TactileFrame
                  src="/images/vmission/worship/morning-aarti.jpg"
                  alt="Morning camphor aarti worship at the sanctum altar"
                  caption="Morning aarti and consecrated camphor lamp offerings"
                  aspectRatio="landscape"
                />
              </div>
            </div>

            {/* Right: Sacred Architecture & Context */}
            <div className={styles.mandirTextCol}>
              <span className={styles.sectionOverline}>Mandir &amp; Sanctum</span>
              <h2 className={styles.mandirHeading}>Sri Gangeshwar Mahadev Mandir</h2>
              <p className={styles.mandirSub}>
                The consecrated heart of the Indore campus, where Advaitic inquiry is grounded in classical devotional worship (Upasana).
              </p>

              <SacredDivider glyph="ॐ नमः शिवाय" />

              <div className={styles.mandirNarrative}>
                <p>
                  Consecrated in 1995 alongside the founding of the Indore Ashram, Sri Gangeshwar Mahadev Mandir is crowned by a unique architectural feature: a monumental white sculpted Shivling forming the main spire (Shikhara) of the temple dome.
                </p>
                <p>
                  In the traditional Advaita method, scriptural inquiry (Jnana-vichara) is supported by steady devotion and mental purification (Chitta-shuddhi). The temple serves as the focal point for morning and evening worship, Rudrabhisheka rituals, monthly Pradosha pujas, and annual Maha Shivaratri celebrations.
                </p>
              </div>

              <div className={styles.mandirFeaturesList}>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>🛕</span>
                  <div>
                    <h4 className={styles.featureTitle}>Monumental Shivling Dome</h4>
                    <p className={styles.featureDesc}>
                      Architecturally distinct white Shivling spire visible across Sudama Nagar, signifying Lord Shiva as the embodiment of non-dual consciousness.
                    </p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>🔥</span>
                  <div>
                    <h4 className={styles.featureTitle}>Vedic Upasana &amp; Rudrabhisheka</h4>
                    <p className={styles.featureDesc}>
                      Daily ritual abhishekams, Vedic chanting of Sri Rudram, and camphor aarti conducted according to scriptural tradition.
                    </p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>🚪</span>
                  <div>
                    <h4 className={styles.featureTitle}>Carved Wooden Sanctum Doors</h4>
                    <p className={styles.featureDesc}>
                      Intricately carved teak sanctum doors greeting seekers entering the inner sanctum for meditation and darshan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          03. DAILY CONTEMPLATIVE RHYTHM (DINACHARYA)
          ====================================================================== */}
      <section id="rhythm" className={styles.rhythmSection} aria-label="Daily Routine and Schedule">
        <div className="container">
          <div className={styles.rhythmHeaderWrap}>
            <span className={styles.sectionOverline}>Monastic Dinacharya</span>
            <h2 className={styles.rhythmTitle}>The Daily Contemplative Rhythm</h2>
            <p className={styles.rhythmLead}>
              Life at Vedanta Ashram unfolds in a balanced rhythm of silent meditation, scriptural study, dedicated temple worship, and community service.
            </p>
          </div>

          <div className={styles.timelineContainer}>
            {dailyRhythm.map((item, idx) => (
              <div key={idx} className={styles.timelineRow}>
                <div className={styles.timeTagCol}>
                  <span className={styles.timeDisplay}>{item.time}</span>
                  <span className={styles.timeCategoryName}>{item.name}</span>
                </div>
                <div className={styles.timelineNode}>
                  <div className={styles.timelineDot} />
                  {idx < dailyRhythm.length - 1 && <div className={styles.timelineConnector} />}
                </div>
                <div className={styles.timeContentCol}>
                  <h3 className={styles.timeTitle}>{item.title}</h3>
                  <p className={styles.timeDescription}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className={styles.rhythmNote}>
            * Visitors and residential camp participants are invited to join the daily sessions. Silence (Mouna) is encouraged during early morning hours and evening contemplation.
          </p>
        </div>
      </section>

      {/* ======================================================================
          04. THE ASHRAM SPACES — ARCHITECTURAL REPERTOIRE
          ====================================================================== */}
      <section className={styles.spacesSection} aria-label="Ashram Spaces and Facilities">
        <div className="container">
          <div className={styles.spacesHeader}>
            <span className={styles.sectionOverline}>Gurukula Campus</span>
            <h2 className={styles.spacesTitle}>Ashram Grounds &amp; Study Facilities</h2>
            <p className={styles.spacesLead}>
              Designed to support single-pointed contemplation, the Ashram facilities balance traditional aesthetic reverence with quiet monastic simplicity.
            </p>
          </div>

          <div className={styles.spacesEditorialGrid}>
            {ashramSpaces.map((space, idx) => (
              <article key={idx} className={styles.spaceArticle}>
                <div className={styles.spaceVisual}>
                  <TactileFrame
                    src={space.image}
                    alt={space.caption}
                    caption={space.caption}
                    aspectRatio="landscape"
                  />
                </div>
                <div className={styles.spaceText}>
                  <span className={styles.spaceNumber}>0{idx + 1}</span>
                  <h3 className={styles.spaceHeading}>{space.title}</h3>
                  <p className={styles.spaceSub}>{space.subtitle}</p>
                  <p className={styles.spaceDesc}>{space.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          05. ASHRAM PARIVAR & RESIDENTIAL LIFE
          ====================================================================== */}
      <section className={styles.communitySection} aria-label="Ashram Parivar and Community">
        <div className="container">
          <div className={styles.communityGrid}>
            <div className={styles.communityContentCol}>
              <span className={styles.sectionOverline}>Living Gurukula Family</span>
              <h2 className={styles.communityTitle}>The Ashram Parivar</h2>
              <p className={styles.communityLead}>
                Vedanta Ashram is sustained by an intimate community of resident monks, renunciants (Brahmacharins), dedicated volunteers, and visiting spiritual seekers united in the common pursuit of Self-knowledge.
              </p>
              <div className={styles.communityNarrative}>
                <p>
                  During annual Gita Jayanti shivirs, Guru Poornima festivals, and residential retreats, seekers from across India and abroad reside at the Ashram, participating in intensive scriptural inquiry and cooperative seva.
                </p>
                <p>
                  The kitchen operates on the principle of Sattwic Annakshetra—simple, freshly prepared vegetarian meals served with warmth and sanctity, nourishing both body and mind.
                </p>
              </div>

              <div className={styles.communityHighlights}>
                <div className={styles.comHighlightItem}>
                  <span className={styles.comHighlightNum}>30+</span>
                  <span className={styles.comHighlightLabel}>Years of Unbroken Gurukula Transmission (Est. 1995)</span>
                </div>
                <div className={styles.comHighlightItem}>
                  <span className={styles.comHighlightNum}>100+</span>
                  <span className={styles.comHighlightLabel}>Residential Scripture Shivirs &amp; Sadhana Camps Hosted</span>
                </div>
              </div>
            </div>

            <div className={styles.communityVisualCol}>
              <TactileFrame
                src="/images/vmission/community/residential-camp-gathering.jpg"
                alt="Residential scripture shivir gathering at Vedanta Ashram, Indore"
                caption="Seekers gathered in Pravachan Bhavan during an intensive scriptural retreat"
                aspectRatio="landscape"
              />
              <div className={styles.communitySecondaryFrame}>
                <TactileFrame
                  src="/images/vmission/community/satsang-with-acharya.jpg"
                  alt="Satsang and dialogue with Acharyas in the courtyard"
                  caption="Informal dialogue and doubt-clearing satsang under the veranda"
                  aspectRatio="landscape"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          05B. VM FOOTPRINTS — HISTORICAL DISCOURSE & MAHATMAS ARCHIVE
          ====================================================================== */}
      <FootprintsArchive />

      {/* ======================================================================
          06. HOW TO REACH / SANCTUARY VISITOR GUIDE
          ====================================================================== */}
      <section id="reach" className={styles.reachSection} aria-label="Directions and Reaching the Ashram">
        <div className="container">
          <div className={styles.reachHeader}>
            <span className={styles.sectionOverline}>Pilgrim &amp; Visitor Guide</span>
            <h2 className={styles.reachTitle}>Reaching Vedanta Ashram</h2>
            <p className={styles.reachLead}>
              Located in the quiet residential neighbourhood of Sudama Nagar in Indore, Madhya Pradesh, the Ashram is well-connected by air, rail, and road.
            </p>
          </div>

          <div className={styles.reachGrid}>
            <div className={styles.reachCard}>
              <div className={styles.reachIconWrap}>✈️</div>
              <h3 className={styles.reachCardTitle}>By Air</h3>
              <p className={styles.reachLocationName}>Devi Ahilyabai Holkar Airport (IDR)</p>
              <p className={styles.reachDistance}>Distance: ~8 km (Approx. 25–30 minutes)</p>
              <p className={styles.reachCardDesc}>
                Indore Airport has frequent direct flights connecting major Indian cities including Mumbai, Delhi, Bengaluru, Hyderabad, and Ahmedabad. Prepaid taxis and auto-rickshaws are readily available.
              </p>
            </div>

            <div className={styles.reachCard}>
              <div className={styles.reachIconWrap}>🚆</div>
              <h3 className={styles.reachCardTitle}>By Rail</h3>
              <p className={styles.reachLocationName}>Indore Junction Railway Station (INDB)</p>
              <p className={styles.reachDistance}>Distance: ~6 km (Approx. 20 minutes)</p>
              <p className={styles.reachCardDesc}>
                Direct superfast and express trains connect Indore with Mumbai, New Delhi, Kolkata, Pune, and Bhopal. Taxis, app cabs, and city buses provide convenient transit to Sudama Nagar.
              </p>
            </div>

            <div className={styles.reachCard}>
              <div className={styles.reachIconWrap}>📍</div>
              <h3 className={styles.reachCardTitle}>Campus Address</h3>
              <p className={styles.reachLocationName}>Vedanta Ashram &amp; Gangeshwar Mandir</p>
              <p className={styles.reachDistance}>Sector E, Sudama Nagar, Indore, M.P. 452009</p>
              <p className={styles.reachCardDesc}>
                Situated in Western Indore. Landmark: Sri Gangeshwar Mahadev Mandir (prominent white Shivling dome), easily recognized by local transport operators.
              </p>
            </div>
          </div>

          <div className={styles.visitNoticeBox}>
            <h4 className={styles.visitNoticeTitle}>Visitor Information &amp; Ashram Protocol</h4>
            <p className={styles.visitNoticeText}>
              Visitors are welcome to attend the daily morning and evening temple aartis, as well as open morning pravachans. For residential camp participation or overnight lodging requests, please correspond with the Ashram office in advance to confirm accommodation availability.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================================
          07. PRE-FOOTER INVITATION
          ====================================================================== */}
      <CinematicPreFooter
        tag="Visitor Information"
        sanskrit="अथातो ब्रह्मजिज्ञासा"
        heading="Visiting Vedanta Ashram"
        subheading="Step inside for study, meditation, and devotional quietude"
        description="Whether seeking a serene space to reflect on the Upanishads or attending a residential camp, the doors of Vedanta Ashram remain open to every earnest seeker."
        ctas={[
          { label: 'Browse Recorded Pravachans', href: '/teachings', variant: 'primary' },
          { label: 'Explore Our Acharyas', href: '/acharyas', variant: 'outline' },
        ]}
        quote={{
          sanskrit: 'शान्तिः शान्तिः शान्तिः',
          translation: 'May there be peace in the cosmic realm, peace in the atmosphere, and peace within the heart.',
          source: 'Taittiriya Upanishad Shanti Patha',
        }}
      />
    </div>
  );
}
