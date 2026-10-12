'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetPath } from '@/utils/assetPath';
import Magnetic from '@/components/motion/Magnetic';
import { useScrollReveals } from '@/components/motion/useScrollReveals';
import FootprintsArchive from '@/components/FootprintsArchive';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

const BADGE_ITEMS = ['Sudama Nagar', 'Indore', 'Established 1995'];

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

  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveals(rootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      /* Hero intro. Waits for the entry overlay on first visit only. */
      gsap.set('[data-hero-line] > span', { yPercent: 115 });
      gsap.set('[data-hero-fade]', { opacity: 0, y: 26 });
      gsap
        .timeline({ delay: 0.2, defaults: { ease: 'expo.out' } })
        .fromTo('[data-hero-img]', { scale: 1.18 }, { scale: 1, duration: 2.4, ease: 'power3.out' }, 0)
        .to('[data-hero-line] > span', { yPercent: 0, duration: 1.4, stagger: 0.14 }, 0.1)
        .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.5);

      gsap.to('[data-hero-img]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true },
      });

      /* Timeline line fills as the rhythm is read */
      const timeline = root.querySelector<HTMLElement>('[data-timeline]');
      if (timeline) {
        gsap.fromTo(
          '[data-timeline-fill]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: timeline, start: 'top 70%', end: 'bottom 60%', scrub: true },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.ashram} ref={rootRef}>
      {/* ==================================================================
          01 — ARRIVAL
          ================================================================== */}
      <section className={styles.hero} data-hero>
        <div className={styles.heroMedia}>
          <img
            data-hero-img
            src={getAssetPath('/images/vmission/entrance/ashram-entrance-cinematic.jpg')}
            alt="Entrance and facade of Vedanta Ashram, Indore"
            className={styles.heroImg}
            loading="eager"
          />
          <div className={styles.heroShade} />
        </div>

        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb" data-hero-fade>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Vedanta Ashram</span>
          </nav>

          <div className={styles.heroBadge} data-hero-fade>
            {BADGE_ITEMS.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.lineMask} data-hero-line>
              <span>Vedanta</span>
            </span>{' '}
            <span className={styles.lineMask} data-hero-line>
              <span>Ashram</span>
            </span>
          </h1>

          <div className={styles.heroFoot}>
            <div className={styles.heroCopy} data-hero-fade>
              <p className={styles.heroSub}>Vedanta Ashram &amp; Sri Gangeshwar Mahadev Mandir</p>
              <p className={styles.heroLead}>
                Established in 1995 by Poojya Swami Atmananda Saraswati, Vedanta Ashram is a physical Gurukula in Indore where traditional Advaita Vedanta is contemplated, lived, and systematically taught in an environment of monastic peace.
              </p>
              <div className={styles.heroCtas}>
                <Magnetic>
                  <a href="#mandir" className={styles.btnPrimary}>
                    Sri Gangeshwar Mandir <span aria-hidden="true">↓</span>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#rhythm" className={styles.btnGhost}>
                    Daily Contemplative Rhythm
                  </a>
                </Magnetic>
              </div>
            </div>
            <p className={styles.heroSanskrit} data-hero-fade>
              शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================
          02 — THE MANDIR
          ================================================================== */}
      <section id="mandir" className={styles.mandir}>
        <div className="container">
          <div className={styles.mandirGrid}>
            <div className={styles.mandirVisual}>
              <figure className={styles.mainFigure}>
                <div className={styles.mainFrame} data-clip data-zoom>
                  <img
                    src={getAssetPath('/images/vmission/ashram/gangeshwar-dome-closeup.jpg')}
                    alt="Consecrated white Shivling dome of Sri Gangeshwar Mahadev Mandir"
                    loading="eager"
                  />
                </div>
                <figcaption className={styles.caption}>
                  <strong>Consecrated 1995</strong>
                  <span>Sri Gangeshwar Mahadev Mandir — unique white Shivling spire</span>
                </figcaption>
              </figure>

              <figure className={styles.secondaryFigure} data-reveal>
                <div className={styles.secondaryFrame} data-clip data-zoom>
                  <img
                    src={getAssetPath('/images/vmission/worship/morning-aarti.jpg')}
                    alt="Morning camphor aarti worship at the sanctum altar"
                    loading="lazy"
                  />
                </div>
                <figcaption className={styles.caption}>
                  Morning aarti and consecrated camphor lamp offerings
                </figcaption>
              </figure>
            </div>

            <div className={styles.mandirText}>
              <span className={styles.overline} data-reveal>Mandir &amp; Sanctum</span>
              <h2 className={styles.h2} data-reveal>Sri Gangeshwar Mahadev Mandir</h2>
              <p className={styles.lead} data-reveal>
                The consecrated heart of the Indore campus, where Advaitic inquiry is grounded in classical devotional worship (Upasana).
              </p>

              <div className={styles.divider} data-reveal>
                <span className={styles.devanagari}>ॐ नमः शिवाय</span>
                <span data-rule className={styles.rule} />
              </div>

              <div className={styles.narrative} data-stagger>
                <p>
                  Consecrated in 1995 alongside the founding of the Indore Ashram, Sri Gangeshwar Mahadev Mandir is crowned by a unique architectural feature: a monumental white sculpted Shivling forming the main spire (Shikhara) of the temple dome.
                </p>
                <p>
                  In the traditional Advaita method, scriptural inquiry (Jnana-vichara) is supported by steady devotion and mental purification (Chitta-shuddhi). The temple serves as the focal point for morning and evening worship, Rudrabhisheka rituals, monthly Pradosha pujas, and annual Maha Shivaratri celebrations.
                </p>
              </div>

              <ul className={styles.features} data-stagger>
                <li className={styles.feature}>
                  <span className={styles.featureNum}>01</span>
                  <div>
                    <h4>Monumental Shivling Dome</h4>
                    <p>Architecturally distinct white Shivling spire visible across Sudama Nagar, signifying Lord Shiva as the embodiment of non-dual consciousness.</p>
                  </div>
                </li>
                <li className={styles.feature}>
                  <span className={styles.featureNum}>02</span>
                  <div>
                    <h4>Vedic Upasana &amp; Rudrabhisheka</h4>
                    <p>Daily ritual abhishekams, Vedic chanting of Sri Rudram, and camphor aarti conducted according to scriptural tradition.</p>
                  </div>
                </li>
                <li className={styles.feature}>
                  <span className={styles.featureNum}>03</span>
                  <div>
                    <h4>Carved Wooden Sanctum Doors</h4>
                    <p>Intricately carved teak sanctum doors greeting seekers entering the inner sanctum for meditation and darshan.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          03 — DAILY RHYTHM (dark)
          ================================================================== */}
      <section id="rhythm" className={styles.rhythm}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.overlineLight} data-reveal>Monastic Dinacharya</span>
            <h2 className={styles.h2Light} data-reveal>The Daily Contemplative Rhythm</h2>
            <p className={styles.leadLight} data-reveal>
              Life at Vedanta Ashram unfolds in a balanced rhythm of silent meditation, scriptural study, dedicated temple worship, and community service.
            </p>
          </header>

          <div className={styles.timeline} data-timeline>
            <div className={styles.timelineTrack} aria-hidden="true">
              <div className={styles.timelineFill} data-timeline-fill />
            </div>
            {dailyRhythm.map((item, idx) => (
              <article key={idx} className={styles.timelineRow} data-reveal>
                <div className={styles.timeCol}>
                  <span className={styles.timeDisplay}>{item.time}</span>
                  <span className={styles.timeName}>{item.name}</span>
                </div>
                <div className={styles.node} aria-hidden="true">
                  <span className={styles.nodeDot} />
                </div>
                <div className={styles.timeContent}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <p className={styles.rhythmNote}>
            * Visitors and residential camp participants are invited to join the daily sessions. Silence (Mouna) is encouraged during early morning hours and evening contemplation.
          </p>
        </div>
      </section>

      {/* ==================================================================
          04 — ASHRAM SPACES (alternating editorial rows)
          ================================================================== */}
      <section className={styles.spaces}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.overline} data-reveal>Gurukula Campus</span>
            <h2 className={styles.h2} data-reveal>Ashram Grounds &amp; Study Facilities</h2>
            <p className={styles.lead} data-reveal>
              Designed to support single-pointed contemplation, the Ashram facilities balance traditional aesthetic reverence with quiet monastic simplicity.
            </p>
          </header>

          <div className={styles.spaceList}>
            {ashramSpaces.map((space, idx) => (
              <article key={idx} className={`${styles.spaceRow} ${idx % 2 === 1 ? styles.flip : ''}`}>
                <figure className={styles.spaceFigure} data-reveal>
                  <div className={styles.spaceImg} data-clip data-zoom>
                    <img src={getAssetPath(space.image)} alt={space.caption} loading="lazy" />
                  </div>
                  <figcaption className={styles.caption}>{space.caption}</figcaption>
                </figure>
                <div className={styles.spaceText} data-reveal>
                  <span className={styles.spaceNumber}>0{idx + 1}</span>
                  <h3 className={styles.h3}>{space.title}</h3>
                  <p className={styles.spaceSub}>{space.subtitle}</p>
                  <p className={styles.spaceDesc}>{space.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          05 — ASHRAM PARIVAR
          ================================================================== */}
      <section className={styles.community}>
        <div className="container">
          <div className={styles.communityGrid}>
            <div className={styles.communityText}>
              <span className={styles.overline} data-reveal>Living Gurukula Family</span>
              <h2 className={styles.h2} data-reveal>The Ashram Parivar</h2>
              <p className={styles.lead} data-reveal>
                Vedanta Ashram is sustained by an intimate community of resident monks, renunciants (Brahmacharins), dedicated volunteers, and visiting spiritual seekers united in the common pursuit of Self-knowledge.
              </p>
              <div className={styles.narrative} data-stagger>
                <p>
                  During annual Gita Jayanti shivirs, Guru Poornima festivals, and residential retreats, seekers from across India and abroad reside at the Ashram, participating in intensive scriptural inquiry and cooperative seva.
                </p>
                <p>
                  The kitchen operates on the principle of Sattwic Annakshetra—simple, freshly prepared vegetarian meals served with warmth and sanctity, nourishing both body and mind.
                </p>
              </div>

              <div className={styles.stats} data-stagger>
                <div className={styles.stat}>
                  <span className={styles.statNum}>30+</span>
                  <span className={styles.statLabel}>Years of Unbroken Gurukula Transmission (Est. 1995)</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>100+</span>
                  <span className={styles.statLabel}>Residential Scripture Shivirs &amp; Sadhana Camps Hosted</span>
                </div>
              </div>
            </div>

            <div className={styles.communityVisual}>
              <figure className={styles.communityMain} data-reveal>
                <div className={styles.communityFrame} data-clip data-zoom>
                  <img
                    src={getAssetPath('/images/vmission/community/residential-camp-gathering.jpg')}
                    alt="Residential scripture shivir gathering at Vedanta Ashram, Indore"
                    loading="lazy"
                  />
                </div>
                <figcaption className={styles.caption}>
                  Seekers gathered in Pravachan Bhavan during an intensive scriptural retreat
                </figcaption>
              </figure>
              <figure className={styles.communitySecondary} data-reveal>
                <div className={styles.communityFrame} data-clip data-zoom>
                  <img
                    src={getAssetPath('/images/vmission/community/satsang-with-acharya.jpg')}
                    alt="Satsang and dialogue with Acharyas in the courtyard"
                    loading="lazy"
                  />
                </div>
                <figcaption className={styles.caption}>
                  Informal dialogue and doubt-clearing satsang under the veranda
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Shared historical archive, styled separately */}
      <FootprintsArchive />

      {/* ==================================================================
          06 — REACHING THE ASHRAM
          ================================================================== */}
      <section id="reach" className={styles.reach}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.overline} data-reveal>Pilgrim &amp; Visitor Guide</span>
            <h2 className={styles.h2} data-reveal>Reaching Vedanta Ashram</h2>
            <p className={styles.lead} data-reveal>
              Located in the quiet residential neighbourhood of Sudama Nagar in Indore, Madhya Pradesh, the Ashram is well-connected by air, rail, and road.
            </p>
          </header>

          <div className={styles.reachGrid} data-stagger>
            <article className={styles.reachCard}>
              <span className={styles.reachIndex}>01 — Air</span>
              <h3>By Air</h3>
              <p className={styles.reachLocation}>Devi Ahilyabai Holkar Airport (IDR)</p>
              <p className={styles.reachDistance}>Distance: ~8 km (Approx. 25–30 minutes)</p>
              <p className={styles.reachDesc}>
                Indore Airport has frequent direct flights connecting major Indian cities including Mumbai, Delhi, Bengaluru, Hyderabad, and Ahmedabad. Prepaid taxis and auto-rickshaws are readily available.
              </p>
            </article>

            <article className={styles.reachCard}>
              <span className={styles.reachIndex}>02 — Rail</span>
              <h3>By Rail</h3>
              <p className={styles.reachLocation}>Indore Junction Railway Station (INDB)</p>
              <p className={styles.reachDistance}>Distance: ~6 km (Approx. 20 minutes)</p>
              <p className={styles.reachDesc}>
                Direct superfast and express trains connect Indore with Mumbai, New Delhi, Kolkata, Pune, and Bhopal. Taxis, app cabs, and city buses provide convenient transit to Sudama Nagar.
              </p>
            </article>

            <article className={styles.reachCard}>
              <span className={styles.reachIndex}>03 — Address</span>
              <h3>Campus Address</h3>
              <p className={styles.reachLocation}>Vedanta Ashram &amp; Gangeshwar Mandir</p>
              <p className={styles.reachDistance}>Sector E, Sudama Nagar, Indore, M.P. 452009</p>
              <p className={styles.reachDesc}>
                Situated in Western Indore. Landmark: Sri Gangeshwar Mahadev Mandir (prominent white Shivling dome), easily recognized by local transport operators.
              </p>
            </article>
          </div>

          <div className={styles.notice} data-reveal>
            <h4>Visitor Information &amp; Ashram Protocol</h4>
            <p>
              Visitors are welcome to attend the daily morning and evening temple aartis, as well as open morning pravachans. For residential camp participation or overnight lodging requests, please correspond with the Ashram office in advance to confirm accommodation availability.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================
          07 — INVITATION
          ================================================================== */}
      <section className={styles.invite}>
        <div className="container">
          <div className={styles.inviteInner}>
            <span className={styles.inviteTag} data-reveal>Visitor Information</span>
            <p className={styles.inviteSanskrit} data-reveal>अथातो ब्रह्मजिज्ञासा</p>
            <h2 className={styles.inviteTitle} data-reveal>Visiting Vedanta Ashram</h2>
            <p className={styles.inviteSub} data-reveal>Step inside for study, meditation, and devotional quietude</p>
            <p className={styles.inviteDesc} data-reveal>
              Whether seeking a serene space to reflect on the Upanishads or attending a residential camp, the doors of Vedanta Ashram remain open to every earnest seeker.
            </p>
            <div className={styles.inviteCtas} data-reveal>
              <Magnetic>
                <Link href="/teachings" className={styles.btnLight}>
                  Browse Recorded Pravachans <span aria-hidden="true">→</span>
                </Link>
              </Magnetic>
              <Link href="/acharyas" className={styles.btnGhostLight}>
                Explore Our Acharyas
              </Link>
            </div>
            <blockquote className={styles.quote} data-reveal>
              <p className={styles.quoteSanskrit}>शान्तिः शान्तिः शान्तिः</p>
              <p>May there be peace in the cosmic realm, peace in the atmosphere, and peace within the heart.</p>
              <cite>Taittiriya Upanishad Shanti Patha</cite>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
