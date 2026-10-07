import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/Button';
import CinematicHero from '@/components/cinematic/CinematicHero';
import TactileFrame from '@/components/cinematic/TactileFrame';
import SacredDivider from '@/components/cinematic/SacredDivider';
import CinematicPreFooter from '@/components/cinematic/CinematicPreFooter';
import { getAcharyaBySlug, acharyas } from '@/data/acharyas';
import { teachings } from '@/data/teachings';
import styles from './page.module.css';

export function generateStaticParams() {
  return acharyas.map((a) => ({
    slug: a.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const acharya = getAcharyaBySlug(params?.slug);
  if (!acharya) return { title: 'Acharya Profile | Vedanta Mission' };
  return {
    title: `${acharya.honorific} ${acharya.name} — ${acharya.role} | Vedanta Mission`,
    description: acharya.shortBio,
  };
}

export default function AcharyaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params?.slug;
  const acharya = getAcharyaBySlug(slug);

  if (!acharya) {
    notFound();
  }

  const isFounder = !!acharya.isFounder;

  // Filter authentic related teachings from the master dataset
  const relatedTeachings = teachings.filter(
    (t) =>
      t.teacher.toLowerCase().includes(acharya.name.toLowerCase()) ||
      (isFounder && t.teacher.toLowerCase().includes('atmananda')) ||
      (!isFounder && t.teacher.toLowerCase().includes('amitananda') && acharya.slug.includes('amitananda'))
  );

  const otherAcharyas = acharyas.filter((a) => a.slug !== acharya.slug);

  return (
    <div className={styles.profileWrapper}>
      {/* ======================================================================
          01. EDITORIAL PROFILE HERO
          ====================================================================== */}
      <CinematicHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'The Acharyas', href: '/acharyas' },
          { label: acharya.name },
        ]}
        badge={`${acharya.role} · Dashanami Saraswati Order`}
        sanskritInvocation={
          isFounder
            ? 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः । गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः ॥'
            : 'श्रोत्रियं ब्रह्मनिष्ठम्'
        }
        title={acharya.name}
        subtitle={acharya.honorific}
        lead={acharya.shortBio}
        backdropImage={
          isFounder
            ? '/images/vmission/hero/ashram-facade-dome.jpg'
            : '/images/vmission/teaching/05-acharya-lineage-restored.jpg'
        }
        backdropAlt={`Ashram grounds and monastic quarters of ${acharya.name}`}
        focalPoint={{
          desktop: { x: 50, y: isFounder ? 34 : 28 },
          mobile: { x: 50, y: isFounder ? 26 : 24 },
        }}
        ctas={[
          { label: 'Spiritual Biography ↓', href: '#biography', variant: 'primary' },
          { label: 'Recorded Teachings', href: '#teachings', variant: 'outline' },
        ]}
        variant="compact"
      />

      {/* ======================================================================
          02. ASYMMETRIC BIOGRAPHY & LINEAGE MONOGRAPH
          ====================================================================== */}
      <section id="biography" className={styles.bioSection} aria-label="Spiritual Biography">
        <div className="container">
          <div className={styles.bioGrid}>
            {/* Left: Tactile Portrait & Credentials */}
            <div className={styles.portraitCol} data-morph-target="acharya" data-morph-element="portrait">
              <TactileFrame
                src={acharya.image}
                alt={`Authentic portrait of ${acharya.name}`}
                caption={`${acharya.honorific} ${acharya.name}`}
                dateTag={acharya.role}
                aspectRatio="portrait"
                objectPosition={isFounder ? 'center 8%' : 'center 10%'}
                priority={true}
              />

              <div className={styles.lineageCard}>
                <span className={styles.lineageBadgeLabel}>Monastic Lineage</span>
                <p className={styles.lineageBadgeVal}>{acharya.lineage}</p>
              </div>

              {acharya.archivalNotice && (
                <div className={styles.archivalNoticeBox}>
                  <span className={styles.noticeTag}>Archival Notice</span>
                  <p className={styles.noticeText}>{acharya.archivalNotice}</p>
                </div>
              )}
            </div>

            {/* Right: Detailed Exposition (Jeevan Charitra) */}
            <div className={styles.bioContentCol}>
              <div className={styles.bioHeader}>
                <span className={styles.sectionOverline}>Spiritual Life &amp; Service</span>
                <h2 className={styles.bioHeading}>
                  {isFounder
                    ? 'The Life & Dedication of Poojya Guruji'
                    : `Monastic Discipline & Service of ${acharya.honorific}`}
                </h2>
              </div>

              <div className={styles.narrativeProse}>
                <p className={styles.leadParagraph}>{acharya.fullBio}</p>

                {isFounder && (
                  <>
                    <h3 className={styles.subHeading}>Traditional Training at Sandeepany Sadhanalaya</h3>
                    <p>
                      Swami Atmananda Saraswati underwent intensive Gurukula training in Sanskrit, the Upanishads, Bhagavad Gita, and Brahma Sutras with Adi Shankaracharya’s commentaries under the auspices of Chinmaya Mission at Sandeepany Sadhanalaya, Mumbai. Guided by revered master Swami Chinmayananda, Swamiji was initiated into Brahmacharya in 1983 and embraced Sanyas Deeksha in 1987.
                    </p>

                    <h3 className={styles.subHeading}>Establishment of Vedanta Mission &amp; Indore Gurukula</h3>
                    <p>
                      In 1992, Swamiji conceived and founded Vedanta Mission as an educational and spiritual platform dedicated to transmitting Advaita Vedanta as a valid means of knowledge (<em>Pramana</em>). In 1995, Vedanta Ashram was established in Sudama Nagar, Indore, along with the consecration of Sri Gangeshwar Mahadev Mandir, providing a residential Gurukula for monastics and sincere seekers.
                    </p>

                    <SacredDivider glyph="ॐ" sutra="सत्यं ज्ञानमनन्तं ब्रह्म" />

                    <h3 className={styles.subHeading}>Verified Historical Milestones</h3>
                    <div className={styles.chronologyList}>
                      {acharya.milestones?.map((ms, idx) => (
                        <div key={idx} className={styles.chronologyItem}>
                          <div className={styles.chronologyYear}>{ms.year}</div>
                          <div className={styles.chronologyBody}>
                            <h4 className={styles.chronologyTitle}>{ms.title}</h4>
                            <p className={styles.chronologyDesc}>{ms.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className={styles.coreSubjectsWrap}>
                  <h3 className={styles.subHeading}>Core Scriptural Disciplines</h3>
                  <div className={styles.subjectTags}>
                    {acharya.teachings.map((subject, idx) => (
                      <span key={idx} className={styles.subjectTag}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          03. VERIFIED DISCOURSES & PRAVACHANS
          ====================================================================== */}
      <section id="teachings" className={styles.teachingsSection} aria-label="Recorded Discourses">
        <div className="container">
          <div className={styles.sectionHeaderWrap}>
            <span className={styles.sectionOverline}>Jnana Ganga Archive</span>
            <h2 className={styles.sectionTitle}>Recorded Discourses by {acharya.name}</h2>
            <p className={styles.sectionLead}>
              Systematic scriptural lectures unfolded in the traditional Gurukula method, available for study in the digital archive.
            </p>
          </div>

          {relatedTeachings.length > 0 ? (
            <div className={styles.teachingsGrid}>
              {relatedTeachings.map((t) => (
                <div key={t.id} className={styles.teachingCard}>
                  <div className={styles.teachingTop}>
                    <span className={styles.teachingCategoryPill}>{t.categoryName}</span>
                    <span className={styles.teachingFormatPill}>
                      {t.format === 'Video' ? '▶ Video Series' : '🎙️ Audio Discourse'}
                    </span>
                  </div>
                  <h3 className={styles.teachingCardTitle}>{t.title}</h3>
                  {t.scripture && (
                    <p className={styles.teachingScripture}>Scripture: {t.scripture}</p>
                  )}
                  <p className={styles.teachingDescription}>{t.description}</p>
                  <div className={styles.teachingAction}>
                    <Button
                      href={`/teachings/${t.slug || t.id}`}
                      variant="outline"
                      size="sm"
                    >
                      Open Study Desk →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noTeachingsCard}>
              <p>
                Discourse recordings for {acharya.honorific} are being indexed into the digital archive. Visit the discourse hall or browse the master teaching library.
              </p>
              <Button href="/teachings" variant="primary">
                Browse Master Teaching Library →
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================================
          04. MONASTIC FELLOWSHIP — OTHER ACHARYAS
          ====================================================================== */}
      <section className={styles.fellowshipSection} aria-label="Other Resident Acharyas">
        <div className="container">
          <div className={styles.fellowshipHeader}>
            <span className={styles.sectionOverline}>Living Monastic Fellowship</span>
            <h2 className={styles.fellowshipTitle}>Faculty of Vedanta Ashram</h2>
          </div>

          <div className={styles.fellowshipGrid}>
            {otherAcharyas.map((other) => (
              <Link
                key={other.slug}
                href={`/acharyas/${other.slug}`}
                className={styles.fellowshipCard}
              >
                <div className={styles.fellowshipThumbnail}>
                  <img
                    src={other.image}
                    alt={`Portrait of ${other.name}`}
                    className={styles.fellowshipImg}
                    loading="lazy"
                  />
                </div>
                <div className={styles.fellowshipInfo}>
                  <span className={styles.fellowshipRole}>{other.role}</span>
                  <h3 className={styles.fellowshipName}>{other.name}</h3>
                  <p className={styles.fellowshipHonorific}>{other.honorific}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          05. PRE-FOOTER INVITATION
          ====================================================================== */}
      <CinematicPreFooter
        tag="Traditional Inquiry"
        sanskrit="श्रद्धावाँल्लभते ज्ञानं तत्परः संयतेन्द्रियः"
        heading="Study Scripture with the Acharyas"
        subheading="Systematic guidance in Advaita Vedanta at Indore"
        description="Receive direct instruction in the Upanishads, Bhagavad Gita, and Sanskrit foundation through residential shivirs and daily satsangs at Vedanta Ashram."
        ctas={[
          { label: 'Plan an Ashram Visit', href: '/ashram', variant: 'primary' },
          { label: 'All Acharyas & Lineage', href: '/acharyas', variant: 'outline' },
        ]}
        quote={{
          sanskrit: 'ज्ञानेन तु तदज्ञानं येषां नाशितमात्मनः',
          translation: 'For those whose ignorance is destroyed by knowledge of the Self, that knowledge illuminates the Supreme like the sun.',
          source: 'Bhagavad Gita, 5.16',
        }}
      />
    </div>
  );
}
