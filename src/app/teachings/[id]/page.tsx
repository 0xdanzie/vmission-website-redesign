import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  teachings,
  getTeachingById,
  getRelatedTeachings,
  CANONICAL_CATEGORIES,
  Teaching,
} from '@/data/teachings';
import { acharyas } from '@/data/acharyas';
import DetailAudioController from './DetailAudioController';
import DetailVideoDesk from './DetailVideoDesk';
import TactileFrame from '@/components/cinematic/TactileFrame';
import SacredDivider from '@/components/cinematic/SacredDivider';
import CinematicPreFooter from '@/components/cinematic/CinematicPreFooter';
import Button from '@/components/Button';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = teachings.map((t) => ({ id: t.id }));
  const slugs = teachings
    .filter((t) => t.slug && t.slug !== t.id)
    .map((t) => ({ id: t.slug }));
  return [...ids, ...slugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const teaching = getTeachingById(id);
  if (!teaching) {
    return { title: 'Discourse Not Found — Jnana Ganga | Vedanta Mission' };
  }
  return {
    title: `${teaching.title} — Jnana Ganga Digital Study Desk | Vedanta Mission`,
    description: teaching.description,
  };
}

export default async function TeachingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const teaching = getTeachingById(id);

  if (!teaching) {
    notFound();
  }

  const categoryObj = CANONICAL_CATEGORIES.find((c) => c.id === teaching.category);
  const relatedTeachings = getRelatedTeachings(teaching, 3);

  // Derive acharya object if applicable
  const matchedAcharya = acharyas.find((a) =>
    teaching.teacher.toLowerCase().includes(a.name.toLowerCase()) ||
    (a.isFounder && teaching.teacher.toLowerCase().includes('atmananda')) ||
    (!a.isFounder && teaching.teacher.toLowerCase().includes('amitananda') && a.slug.includes('amitananda'))
  );

  return (
    <article className={styles.studyDeskPage} data-morph-target="teaching">
      {/* ======================================================================
          01. DIGITAL STUDY DESK ARRIVAL HERO
          ====================================================================== */}
      <header className={styles.studyDeskHero} aria-label={`${teaching.title} Header`}>
        <div className={styles.heroBackdrop} aria-hidden="true">
          <Image
            src="/images/vmission/teaching/07-vedanta-archive-restored.jpg"
            alt="Scriptural study desk and library atmosphere"
            fill
            priority
            sizes="100vw"
            className={styles.heroBackdropImg}
          />
          <div className={styles.heroBackdropGradient} />
          <div className={styles.heroBackdropTexture} />
        </div>

        <div className={styles.heroDawnHorizon} aria-hidden="true" />

        <div className="container">
          <div className={styles.heroContentWrap}>
            {/* Breadcrumb Path */}
            <nav className={styles.breadcrumbsNav} aria-label="Breadcrumb">
              <ol className={styles.breadcrumbList}>
                <li>
                  <Link href="/" className={styles.breadcrumbLink}>Home</Link>
                </li>
                <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
                <li>
                  <Link href="/teachings" className={styles.breadcrumbLink}>Jnana Ganga</Link>
                </li>
                <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/teachings?category=${teaching.category}`}
                    className={styles.breadcrumbLink}
                  >
                    {teaching.categoryName}
                  </Link>
                </li>
                <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
                <li className={styles.breadcrumbCurrent} aria-current="page">
                  {teaching.title}
                </li>
              </ol>
            </nav>

            {/* Taxonomy & Format Badges */}
            <div className={styles.metaBadgeRow} data-morph-element="teaching-icon">
              {categoryObj && (
                <span className={styles.pathBadge}>
                  Path {categoryObj.romanNumeral} · {teaching.categoryName}
                </span>
              )}
              <span className={styles.formatBadge}>
                {teaching.format === 'Video' ? '▶ Sequential Video Series' : '🎙️ Audio Discourse'}
              </span>
              {teaching.scripture && (
                <span className={styles.scriptureBadge}>{teaching.scripture}</span>
              )}
            </div>

            {/* Title & Teacher */}
            <h1 className={styles.studyTitle}>{teaching.title}</h1>

            <div className={styles.studyMetaStrip}>
              <div className={styles.metaCell}>
                <span className={styles.metaCellLabel}>Expounded By</span>
                {matchedAcharya ? (
                  <Link href={`/acharyas/${matchedAcharya.slug}`} className={styles.teacherLink}>
                    {teaching.teacher} ↗
                  </Link>
                ) : (
                  <span className={styles.metaCellVal}>{teaching.teacher}</span>
                )}
              </div>

              <div className={styles.metaDivider} aria-hidden="true" />

              <div className={styles.metaCell}>
                <span className={styles.metaCellLabel}>Language</span>
                <span className={styles.metaCellVal}>{teaching.language}</span>
              </div>

              {teaching.duration && (
                <>
                  <div className={styles.metaDivider} aria-hidden="true" />
                  <div className={styles.metaCell}>
                    <span className={styles.metaCellLabel}>Duration / Sessions</span>
                    <span className={styles.metaCellVal}>{teaching.duration}</span>
                  </div>
                </>
              )}

              <div className={styles.metaDivider} aria-hidden="true" />

              <div className={styles.metaCell}>
                <span className={styles.metaCellLabel}>Archive Status</span>
                {teaching.format === 'Video' ? (
                  <span className={styles.statusVerified}>Verified YouTube Playlist</span>
                ) : teaching.src ? (
                  <span className={styles.statusVerified}>Playable Digital Audio</span>
                ) : (
                  <span className={styles.statusArchival}>Archival Recording (Digitization in Progress)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================================
          02. PRIMARY MEDIA PRESENTATION DESK
          ====================================================================== */}
      <section className={styles.mediaDeskSection} aria-label="Media Presentation">
        <div className="container">
          {teaching.format === 'Video' ? (
            /* Video Desk: Responsive 16:9 YouTube Embed with Graceful Fallback */
            <DetailVideoDesk teaching={teaching} />
          ) : teaching.format === 'Audio' ? (
            /* Audio Desk: Interactive Player Controller */
            <div className={styles.audioDeskFrame}>
              <DetailAudioController teaching={teaching} />
            </div>
          ) : null}

          {/* Spotify Verified Alternate Hand-Off (Where verified in Phase 3D.7 map) */}
          {(teaching.slug?.includes('atma-bodha') || teaching.id.includes('atma-bodha') || teaching.category === 'inspiring-stories') && (
            <div className={styles.spotifyDeskBanner}>
              <div className={styles.spotifyBannerIcon} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1DB954">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <div className={styles.spotifyBannerText}>
                <h4 className={styles.spotifyBannerHeading}>Also Available on Spotify</h4>
                <p className={styles.spotifyBannerDesc}>
                  Listen to this sequential audio series in background audio mode or offline on the official Vedanta Ashram Spotify channel.
                </p>
              </div>
              <a
                href={
                  teaching.slug?.includes('atma-bodha') || teaching.id.includes('atma-bodha')
                    ? 'https://open.spotify.com/playlist/66U9xuUqtgavAmNSU6wE8F'
                    : 'https://open.spotify.com/playlist/0SQKCyMVPazw5A7j6TpTmH'
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles.spotifyBannerBtn}
                aria-label={`Listen to ${teaching.title} on Spotify`}
              >
                Listen on Spotify ↗
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================================
          03. SCRIPTURAL EXPOSITION & TRADITIONAL METHODOLOGY
          ====================================================================== */}
      <section className={styles.expositionSection} aria-label="Scriptural Exposition">
        <div className="container">
          <div className={styles.studyGrid}>
            {/* Main Column: Exposition & Traditional Methodology */}
            <div className={styles.expositionCol}>
              <div className={styles.manuscriptCard}>
                <span className={styles.sectionOverline}>Philosophical Synopsis</span>
                <h2 className={styles.expositionHeading}>Exposition of the Treatise</h2>

                <p className={styles.descriptionLead}>{teaching.description}</p>

                <SacredDivider glyph="ॐ" sutra="तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया" />

                <h3 className={styles.paddhatiHeading}>Traditional Study Discipline (Paddhati)</h3>
                <p className={styles.paddhatiBody}>
                  In accordance with the traditional methodology of Adi Shankaracharya, Vedanta is not approached as mere theoretical philosophy, but as a direct means of knowledge (<em>Pramana</em>) to be assimilated through the classical three-fold spiritual discipline:
                </p>

                <div className={styles.paddhatiGrid}>
                  <div className={styles.paddhatiItem}>
                    <span className={styles.paddhatiNum}>01</span>
                    <h4 className={styles.paddhatiTitle}>Shravana (श्रवण)</h4>
                    <p className={styles.paddhatiDesc}>
                      Systematic, uninterrupted listening to the scriptural words unfolded by an authentic teacher who understands the methodology.
                    </p>
                  </div>

                  <div className={styles.paddhatiItem}>
                    <span className={styles.paddhatiNum}>02</span>
                    <h4 className={styles.paddhatiTitle}>Manana (मनन)</h4>
                    <p className={styles.paddhatiDesc}>
                      Logical reflection upon the teachings, resolving every doubt until intellectual conviction becomes steady and complete.
                    </p>
                  </div>

                  <div className={styles.paddhatiItem}>
                    <span className={styles.paddhatiNum}>03</span>
                    <h4 className={styles.paddhatiTitle}>Nididhyasana (निदिध्यासन)</h4>
                    <p className={styles.paddhatiDesc}>
                      Deep contemplative meditation upon the assimilated non-dual vision until habitual identification with the body-mind complex drops away.
                    </p>
                  </div>
                </div>

                <div className={styles.scriptureQuoteBox}>
                  <p className={styles.scriptureSanskrit}>आचार्यवान् पुरुषो वेद</p>
                  <p className={styles.scriptureTranslation}>
                    &ldquo;One who is blessed with an authentic teacher truly knows the supreme truth.&rdquo;
                  </p>
                  <span className={styles.scriptureRef}>— Chandogya Upanishad, 6.14.2</span>
                </div>
              </div>

              {/* Companion Classical Study Text (if referenced) */}
              {teaching.relatedStudyText && (
                <div className={styles.companionTextCard}>
                  <div className={styles.companionHeader}>
                    <span className={styles.companionTag}>Companion Root Scripture</span>
                    <h3 className={styles.companionTitle}>{teaching.relatedStudyText.title}</h3>
                  </div>
                  <p className={styles.companionDesc}>
                    This discourse series references the original Sanskrit verses. Sincere seekers are encouraged to consult the root study text and commentaries while following the lectures.
                  </p>
                  <div className={styles.companionActionRow}>
                    <span className={styles.companionBadgeType}>{teaching.relatedStudyText.type}</span>
                    <Link href="/publications" className={styles.companionLink}>
                      Browse Root Texts in Literary Archive →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Column: Acharya Monastic Connection */}
            <aside className={styles.studySidebar}>
              {matchedAcharya && (
                <div className={styles.acharyaSidebarCard}>
                  <span className={styles.sidebarOverline}>Teacher of the Tradition</span>
                  <TactileFrame
                    src={matchedAcharya.image}
                    alt={`Portrait of ${matchedAcharya.name}`}
                    caption={`${matchedAcharya.honorific} ${matchedAcharya.name}`}
                    aspectRatio="portrait"
                    showOmBadge={false}
                  />
                  <h3 className={styles.sidebarAcharyaName}>{matchedAcharya.name}</h3>
                  <p className={styles.sidebarAcharyaRole}>{matchedAcharya.role}</p>
                  <p className={styles.sidebarAcharyaBio}>{matchedAcharya.shortBio}</p>
                  <Link href={`/acharyas/${matchedAcharya.slug}`} className={styles.sidebarLink}>
                    View Spiritual Biography &amp; Profile →
                  </Link>
                </div>
              )}

              {categoryObj && (
                <div className={styles.pathSidebarCard}>
                  <span className={styles.sidebarOverline}>Canonical Taxonomy</span>
                  <h3 className={styles.pathTitle}>
                    Path {categoryObj.romanNumeral}: {categoryObj.name}
                  </h3>
                  <p className={styles.pathSanskrit}>{categoryObj.sanskrit}</p>
                  <p className={styles.pathDesc}>{categoryObj.description}</p>
                  <Link
                    href={`/teachings?category=${categoryObj.id}`}
                    className={styles.sidebarLink}
                  >
                    All Discourses in this Path →
                  </Link>
                </div>
              )}

              <div className={styles.ashramDeskCard}>
                <span className={styles.sidebarOverline}>Gurukula Seat</span>
                <h3 className={styles.ashramDeskTitle}>Vedanta Ashram, Indore</h3>
                <p className={styles.ashramDeskDesc}>
                  Residential Gurukula for traditional study in Sudama Nagar, Indore. Regular classes conducted at Sri Gangeshwar Mahadev Mandir.
                </p>
                <Link href="/ashram" className={styles.sidebarLink}>
                  Visit Vedanta Ashram →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ======================================================================
          04. RELATED VERIFIED DISCOURSES
          ====================================================================== */}
      {relatedTeachings.length > 0 && (
        <section className={styles.relatedSection} aria-label="Related Discourses">
          <div className="container">
            <div className={styles.relatedHeaderRow}>
              <div>
                <span className={styles.sectionOverline}>Deeper Scriptural Study</span>
                <h2 className={styles.relatedHeading}>Related Discourses in Jnana Ganga</h2>
              </div>
              <Button href="/teachings" variant="outline" size="sm">
                View Entire Library ({teachings.length}) →
              </Button>
            </div>

            <div className={styles.relatedGrid}>
              {relatedTeachings.map((rel: Teaching) => (
                <article key={rel.id} className={styles.relatedItemCard}>
                  <div className={styles.relatedCardMeta}>
                    <span className={styles.relatedCardCat}>{rel.categoryName}</span>
                    <span className={styles.relatedCardFormat}>{rel.format}</span>
                  </div>
                  <h3 className={styles.relatedCardTitle}>
                    <Link href={`/teachings/${rel.slug || rel.id}`} className={styles.relatedTitleLink}>
                      {rel.title}
                    </Link>
                  </h3>
                  <p className={styles.relatedCardTeacher}>By {rel.teacher}</p>
                  <p className={styles.relatedCardDesc}>{rel.description}</p>
                  <div className={styles.relatedCardFooter}>
                    <Link href={`/teachings/${rel.slug || rel.id}`} className={styles.relatedDeskLink}>
                      Open Study Desk →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================================
          05. PRE-FOOTER INVITATION
          ====================================================================== */}
      <CinematicPreFooter
        tag="Jnana Ganga Archive"
        sanskrit="ब्रह्म सत्यं जगन्मिथ्या जीवो ब्रह्मैव नापरः"
        heading="Deepen Your Scriptural Inquiry"
        subheading="Systematic Advaita Vedanta study at your own pace"
        description="The Jnana Ganga archive preserves decades of traditional expositions by our Acharyas. Access sequential courses, downloadable study texts, and monthly e-journals."
        ctas={[
          { label: 'Browse Complete Teaching Library', href: '/teachings', variant: 'primary' },
          { label: 'Explore Published Literature', href: '/publications', variant: 'outline' },
        ]}
        quote={{
          sanskrit: 'तरति शोकमात्मवित्',
          translation: 'The knower of the Self crosses beyond all grief and sorrow.',
          source: 'Chandogya Upanishad, 7.1.3',
        }}
      />
    </article>
  );
}
