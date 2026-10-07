import React from 'react';
import Link from 'next/link';
import { acharyas } from '@/data/acharyas';
import { teachings } from '@/data/teachings';
import { getAssetPath } from '@/utils/assetPath';
import Button from '@/components/Button';
import CinematicHero from '@/components/cinematic/CinematicHero';
import TactileFrame from '@/components/cinematic/TactileFrame';
import SacredDivider from '@/components/cinematic/SacredDivider';
import CinematicPreFooter from '@/components/cinematic/CinematicPreFooter';
import styles from './page.module.css';

export const metadata = {
  title: 'The Monastic Lineage Hall — Acharyas of Vedanta Mission | Indore Ashram',
  description:
    'Meet Poojya Swami Atmananda Saraswati and the resident Acharyas of Vedanta Ashram, Indore, preserving the traditional Shankaracharya lineage through systematic Advaita Vedanta study.',
};

export default function AcharyasPage() {
  const founder = acharyas.find((a) => a.isFounder) || acharyas[0];
  const residentAcharyas = acharyas.filter((a) => !a.isFounder);

  // Representative verified teachings from the master catalogue
  const featuredTeachings = teachings.slice(0, 3);

  return (
    <div className={styles.lineageHallWrapper}>
      {/* ======================================================================
          01. CINEMATIC ARRIVAL — THE MONASTIC LINEAGE ROOM
          ====================================================================== */}
      <CinematicHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'The Acharyas' },
        ]}
        badge="Guru-Shishya Parampara · Dashanami Saraswati Order"
        sanskritInvocation="सदाशिवसमारम्भां शङ्कराचार्यमध्यमाम् । अस्मदाचार्यपर्यन्तां वन्दे गुरुपरम्पराम् ॥"
        title="The Monastic Lineage Hall"
        subtitle="Living Teachers of the Advaita Tradition"
        lead="In the traditional lineage of Adi Shankaracharya, the liberating vision of the Upanishads is not grasped by independent speculation alone. It requires an authentic teacher steeped in the traditional methodology (Sampradaya-vit). Meet the monastics guiding seekers at Vedanta Ashram, Indore."
        backdropImage="/images/vmission/teaching/05-acharya-lineage-restored.jpg"
        backdropAlt="Monastic lineage and teaching hall at Vedanta Ashram"
        focalPoint={{ desktop: { x: 52, y: 30 }, mobile: { x: 50, y: 24 } }}
        ctas={[
          { label: 'The Founding Acharya ↓', href: '#founder', variant: 'primary' },
          { label: 'Resident Acharyas', href: '#resident-acharyas', variant: 'outline' },
        ]}
      />

      {/* ======================================================================
          02. PARAMPARA & SACRED LINEAGE EXPOSITION
          ====================================================================== */}
      <section className={styles.paramparaSection} aria-label="Tradition of Parampara">
        <div className="container">
          <div className={styles.paramparaIntroWrap}>
            <span className={styles.sectionOverline}>Unbroken Spiritual Heritage</span>
            <h2 className={styles.paramparaTitle}>The Traditional Method of Knowledge</h2>
            <p className={styles.paramparaLead}>
              Vedanta is regarded in Indian philosophy as a valid means of knowledge (<em>Pramana</em>)—a mirror capable of revealing the true nature of the conscious Self (<em>Atman</em>) as non-different from the infinite reality (<em>Brahman</em>).
            </p>

            <SacredDivider glyph="ॐ" sutra="आचार्यवान् पुरुषो वेद" />

            <div className={styles.lineageColumns}>
              <div className={styles.lineageBlock}>
                <span className={styles.lineageOrderNum}>01</span>
                <h3 className={styles.lineageHeading}>Adi Shankaracharya Tradition</h3>
                <p className={styles.lineageText}>
                  Our Acharyas trace their spiritual lineage through the classical monastic order established by Adi Shankaracharya in the 8th century, maintaining faithful allegiance to his commentaries on the <em>Prasthana Traya</em>.
                </p>
              </div>

              <div className={styles.lineageBlock}>
                <span className={styles.lineageOrderNum}>02</span>
                <h3 className={styles.lineageHeading}>Dashanami Saraswati Order</h3>
                <p className={styles.lineageText}>
                  Initiated under the vows of classical Sanyas into the Dashanami Saraswati sub-order, dedicated wholly to the pursuit of knowledge, scriptural teaching, and renunciant Gurukula life.
                </p>
              </div>

              <div className={styles.lineageBlock}>
                <span className={styles.lineageOrderNum}>03</span>
                <h3 className={styles.lineageHeading}>Systematic Pedagogy (Pramana-vichara)</h3>
                <p className={styles.lineageText}>
                  Teaching through systematic word-by-word exposition (<em>Bhashya</em>) and structured inquiry, without personal dogma, esoteric mystification, or dilution of the non-dual vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          03. FOUNDING ACHARYA — ASYMMETRIC EDITORIAL COMPOSITION
          ====================================================================== */}
      <section id="founder" className={styles.founderSection} aria-label="Founding Acharya">
        <div className="container">
          <div className={styles.founderLayout} data-morph-source="acharya">
            {/* Left: Tactile Portrait Frame */}
            <div className={styles.founderPortraitCol} data-morph-element="portrait">
              <TactileFrame
                src={founder.image}
                alt={`Portrait of ${founder.name}`}
                caption={`${founder.honorific} ${founder.name} — Founder of Vedanta Mission & Vedanta Ashram, Indore`}
                dateTag="Founding Acharya"
                aspectRatio="portrait"
                objectPosition="center 8%"
                priority={true}
              />

              <div className={styles.founderQuoteCard}>
                <p className={styles.founderQuoteSanskrit}>आत्मैव केवलं सत्यं सर्वं मिथ्यैव दृश्यते</p>
                <p className={styles.founderQuoteTranslation}>
                  &ldquo;The Self alone is the sole reality; all that is perceived is transient and dependent.&rdquo;
                </p>
              </div>
            </div>

            {/* Right: Editorial Biography & Monastic Credentials */}
            <div className={styles.founderBioCol}>
              <div className={styles.founderHeader}>
                <span className={styles.founderTag}>Dashanami Saraswati Order</span>
                <p className={styles.founderHonorific}>{founder.honorific}</p>
                <h2 className={styles.founderName}>{founder.name}</h2>
                <p className={styles.founderRole}>{founder.role}</p>
              </div>

              <div className={styles.lineageProvenance}>
                <span className={styles.provLabel}>Monastic Lineage &amp; Training:</span>
                <span className={styles.provText}>{founder.lineage}</span>
              </div>

              <div className={styles.founderNarrative}>
                <p>{founder.shortBio}</p>
                <p className={styles.founderNarrativeSecondary}>
                  Having completed intensive study of the Upanishads, Bhagavad Gita, and Brahma Sutras with Shankaracharya commentaries at Sandeepany Sadhanalaya in Mumbai, Swamiji dedicated his life to propagating unadulterated Advaita. Under his guidance, the Indore Ashram and its consecrated Sri Gangeshwar Mahadev Mandir have grown into a respected spiritual centre for residential study retreats, monthly journals, and scriptural publications.
                </p>
              </div>

              {/* 4 Verified Historical Milestones */}
              {founder.milestones && founder.milestones.length > 0 && (
                <div className={styles.milestoneGrid}>
                  {founder.milestones.map((ms, idx) => (
                    <div key={idx} className={styles.milestoneItem}>
                      <span className={styles.milestoneYear}>{ms.year}</span>
                      <h4 className={styles.milestoneTitle}>{ms.title}</h4>
                      <p className={styles.milestoneDesc}>{ms.description}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.founderActions}>
                <Button href={`/acharyas/${founder.slug}`} variant="primary" size="lg">
                  Read Full Spiritual Biography →
                </Button>
                <Button href="/teachings" variant="outline" size="lg" className={styles.btnSecondaryOutline}>
                  Browse Recorded Discourses
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          04. RESIDENT ACHARYAS — EDITORIAL PORTRAIT GALLERY (Anti-Card)
          ====================================================================== */}
      <section id="resident-acharyas" className={styles.residentSection} aria-label="Resident Acharyas">
        <div className="container">
          <div className={styles.residentHeader}>
            <span className={styles.sectionOverline}>Vedanta Ashram Monastic Faculty</span>
            <h2 className={styles.residentTitle}>Resident Acharyas &amp; Teachers</h2>
            <p className={styles.residentLead}>
              Monastic disciples carrying forward daily scriptural classes, Sanskrit foundation, and spiritual guidance under the Shankaracharya tradition at the Indore campus.
            </p>
          </div>

          <div className={styles.residentEditorialList}>
            {residentAcharyas.map((acharya, idx) => (
              <article key={acharya.slug} className={styles.residentArticle} data-morph-source="acharya">
                <div className={styles.residentPhotoCol} data-morph-element="portrait">
                  <TactileFrame
                    src={acharya.image}
                    alt={`Portrait of ${acharya.name}`}
                    caption={`${acharya.honorific} ${acharya.name}`}
                    aspectRatio="portrait"
                  />
                </div>

                <div className={styles.residentContentCol}>
                  <div className={styles.residentMeta}>
                    <span className={styles.residentRoleTag}>{acharya.role}</span>
                    <span className={styles.residentHonorificText}>{acharya.honorific}</span>
                    <h3 className={styles.residentArticleName}>{acharya.name}</h3>
                  </div>

                  <p className={styles.residentBioText}>{acharya.shortBio}</p>
                  <p className={styles.residentFullBioText}>{acharya.fullBio}</p>

                  <div className={styles.residentSubjectArea}>
                    <span className={styles.subjectLabel}>Key Scriptural Disciplines:</span>
                    <div className={styles.subjectPills}>
                      {acharya.teachings.map((t, tIdx) => (
                        <span key={tIdx} className={styles.subjectPill}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.residentActions}>
                    <Link href={`/acharyas/${acharya.slug}`} className={styles.biographyLink}>
                      View Spiritual Service &amp; Guidance Profile →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          05. TEACHING & LIVING TRADITION PREVIEW
          ====================================================================== */}
      <section className={styles.traditionSection} aria-label="Living Tradition in Action">
        <div className="container">
          <div className={styles.traditionHeader}>
            <span className={styles.sectionOverline}>Scripture in Practice</span>
            <h2 className={styles.traditionTitle}>The Living Discourse Tradition</h2>
            <p className={styles.traditionLead}>
              The wisdom of Vedanta is systematically unfolded through sequential lecture series conducted by our Acharyas, preserved and cataloged in the Jnana Ganga archive.
            </p>
          </div>

          <div className={styles.teachingsRow}>
            {featuredTeachings.map((teaching) => (
              <div key={teaching.id} className={styles.teachingPreviewItem}>
                <span className={styles.teachingCatBadge}>{teaching.categoryName}</span>
                <h3 className={styles.teachingPreviewTitle}>{teaching.title}</h3>
                <p className={styles.teachingPreviewTeacher}>By {teaching.teacher}</p>
                <p className={styles.teachingPreviewDesc}>{teaching.description}</p>
                <div className={styles.teachingPreviewFooter}>
                  <Link href={`/teachings/${teaching.slug || teaching.id}`} className={styles.teachingLink}>
                    Enter Study Desk →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.traditionCta}>
            <Button href="/teachings" variant="primary" size="lg">
              Explore Complete Teaching Catalogue (Jnana Ganga) →
            </Button>
          </div>
        </div>
      </section>

      {/* ======================================================================
          06. PRE-FOOTER INVITATION
          ====================================================================== */}
      <CinematicPreFooter
        tag="Spiritual Guidance & Association"
        sanskrit="सत्सङ्गत्वे निस्सङ्गत्वं निस्सङ्गत्वे निर्मोहत्वम्"
        heading="Visit Vedanta Ashram"
        subheading="Join daily classes and residential retreats in Indore"
        description="Whether attending residential scripture camps, engaging in daily Mandir aarti, or studying classic commentaries, the doors of Vedanta Ashram remain open to every sincere seeker of truth."
        ctas={[
          { label: 'Visit Vedanta Ashram', href: '/ashram', variant: 'primary' },
          { label: 'Explore Published Literature', href: '/publications', variant: 'outline' },
        ]}
        quote={{
          sanskrit: 'नायमात्मा बलहीनेन लभ्यः',
          translation: 'This Self cannot be attained by one devoid of inner strength and steadfast inquiry.',
          source: 'Mundaka Upanishad, 3.2.4',
        }}
      />
    </div>
  );
}
