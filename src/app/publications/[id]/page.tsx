import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PUBLICATIONS, getPublicationById, Publication } from '@/data/publications';
import SacredDivider from '@/components/cinematic/SacredDivider';
import { resolvePublicationCover } from '@/lib/media-identity';
import PublicationPlaceholder from '@/components/PublicationPlaceholder';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const primaryIds = PUBLICATIONS.map((p) => ({ id: p.id }));
  const canonicalIds = PUBLICATIONS.filter((p) => p.canonicalId && p.canonicalId !== p.id).map((p) => ({
    id: p.canonicalId as string,
  }));
  return [...primaryIds, ...canonicalIds];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const publication = getPublicationById(id);
  if (!publication) {
    return { title: 'Publication Not Found — Literary Archive | Vedanta Mission' };
  }
  return {
    title: `${publication.title} — Vedanta Mission Literary Archive`,
    description: publication.description || `Canonical publication preserved in the Vedanta Mission Literary Archive.`,
  };
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const publication = getPublicationById(id);

  if (!publication) {
    notFound();
  }

  const mirrorEntries = publication.mirrors
    ? Array.isArray(publication.mirrors)
      ? publication.mirrors.map((url, i) => ({ label: `Mirror ${i + 1}`, url }))
      : Object.entries(publication.mirrors).map(([key, url]) => ({
          label: key.replace(/_/g, ' ').toUpperCase(),
          url: url as string,
        }))
    : [];

  const resolvedCover = resolvePublicationCover(
    publication.id,
    publication.type,
    publication.coverImage
  );

  // Discover companion publications from the same series
  const relatedPublications = PUBLICATIONS.filter(
    (p) => p.type === publication.type && p.id !== publication.id
  ).slice(0, 3);

  return (
    <article className={styles.pubDetailPage}>
      {/* Header & Breadcrumbs */}
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.breadcrumbsNav} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              <li>
                <Link href="/" className={styles.breadcrumbLink}>Home</Link>
              </li>
              <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
              <li>
                <Link href="/publications" className={styles.breadcrumbLink}>Literary Archive</Link>
              </li>
              <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
              <li className={styles.breadcrumbCurrent} aria-current="page">
                {publication.title}
              </li>
            </ol>
          </nav>

          <div className={styles.topNavRow}>
            <Link href="/publications" className={styles.backLink}>
              ← Return to Complete Literary Archive
            </Link>
          </div>

          <div className={styles.badgeRow}>
            <span className={styles.typeBadge}>{publication.type}</span>
            <span className={styles.langBadge}>{publication.language}</span>
            {publication.year && (
              <span className={styles.yearBadge}>
                {publication.month ? `${publication.month} ${publication.year}` : `Edition ${publication.year}`}
              </span>
            )}
            <span className={styles.catalogBadge}>
              <code>{`VM-PUB-${publication.id.toUpperCase()}`}</code>
            </span>
          </div>

          <h1 className={styles.title}>{publication.title}</h1>
          {publication.author && <p className={styles.author}>By {publication.author}</p>}
        </div>
      </header>

      {/* Main Content & Bookplate Folio */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.layoutGrid}>
            {/* Left: Tactile Editorial Bookplate Frame */}
            <div className={styles.coverCol} data-morph-target="publication">
              <div className={styles.coverWrapper}>
                {resolvedCover ? (
                  <div className={styles.authenticFrame}>
                    <img
                      src={resolvedCover}
                      alt={`Cover of ${publication.title}`}
                      className={styles.coverImg}
                      data-morph-element="cover"
                    />
                    <div className={styles.spineShading} aria-hidden="true" />
                    <span className={styles.coverBadge}>Authentic Recovered Cover</span>
                  </div>
                ) : (
                  <div className={styles.placeholderFrame}>
                    <PublicationPlaceholder publication={publication} variant="detail" />
                    <span className={styles.placeholderBadge}>Archival Preservation Record</span>
                  </div>
                )}
              </div>

              <div className={styles.actionButtons}>
                {publication.downloadUrl && (
                  <a
                    href={publication.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryDownloadBtn}
                  >
                    Download Verified PDF ↗
                  </a>
                )}
                {publication.readOnlineUrl && (
                  <a
                    href={publication.readOnlineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.readOnlineBtn}
                  >
                    Open Full Digital Reader ↗
                  </a>
                )}
              </div>
            </div>

            {/* Right: Folio Metadata & Synopsis */}
            <div className={styles.detailsCol}>
              <div className={styles.synopsisCard}>
                <span className={styles.sectionOverline}>Archive Folio &amp; Synopsis</span>
                <h2 className={styles.synopsisTitle}>About this Canonical Edition</h2>
                <p className={styles.synopsisText}>
                  {publication.description ||
                    'An authentic monthly journal or treatise preserving the living commentaries and discourses of Pujya Swami Atmananda Saraswati and the traditional Acharyas of Vedanta Ashram, Indore.'}
                </p>

                <div className={styles.metaTable}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaKey}>Publication Series</span>
                    <span className={styles.metaVal}>{publication.type}</span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaKey}>Archival Catalog Reference</span>
                    <span className={styles.metaValCatalog}>
                      {`VM-PUB-${publication.id.toUpperCase()}`}
                    </span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaKey}>Primary Language</span>
                    <span className={styles.metaVal}>{publication.language}</span>
                  </div>
                  {publication.year && (
                    <div className={styles.metaRow}>
                      <span className={styles.metaKey}>Publication Period</span>
                      <span className={styles.metaVal}>
                        {publication.month ? `${publication.month} ${publication.year}` : publication.year}
                      </span>
                    </div>
                  )}
                  {publication.pageCount && (
                    <div className={styles.metaRow}>
                      <span className={styles.metaKey}>Page Extent</span>
                      <span className={styles.metaVal}>{publication.pageCount} Pages</span>
                    </div>
                  )}
                  <div className={styles.metaRow}>
                    <span className={styles.metaKey}>Archive Integrity</span>
                    <span className={styles.metaValVerified}>Verified Source &amp; Matrix Reconciled</span>
                  </div>
                </div>
              </div>

              {/* Alternate Mirrors Section */}
              {mirrorEntries.length > 0 && (
                <div className={styles.mirrorsCard}>
                  <h3 className={styles.mirrorsTitle}>Verified Mirror Sources</h3>
                  <p className={styles.mirrorsDesc}>
                    In accordance with our digital preservation policy, multiple independent mirror hosts are maintained to guarantee perpetual accessibility:
                  </p>
                  <div className={styles.mirrorsList}>
                    {mirrorEntries.map((m, idx) => (
                      <a
                        key={idx}
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mirrorItem}
                      >
                        <span className={styles.mirrorLabel}>{m.label}</span>
                        <span className={styles.mirrorLinkText}>Access Mirror ↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Publications in Series */}
          {relatedPublications.length > 0 && (
            <div className={styles.relatedSection}>
              <SacredDivider glyph="ॐ" />
              <div className={styles.relatedHeader}>
                <span className={styles.sectionOverline}>Companion Editions</span>
                <h3 className={styles.relatedTitle}>More from {publication.type}</h3>
              </div>

              <div className={styles.relatedGrid}>
                {relatedPublications.map((rel) => {
                  const relCover = resolvePublicationCover(rel.id, rel.type, rel.coverImage);
                  return (
                    <article key={rel.id} className={styles.relatedCard}>
                      <div className={styles.relatedCover}>
                        {relCover ? (
                          <img
                            src={relCover}
                            alt={`Cover of ${rel.title}`}
                            className={styles.relatedCoverImg}
                            loading="lazy"
                          />
                        ) : (
                          <PublicationPlaceholder publication={rel} />
                        )}
                      </div>
                      <div className={styles.relatedInfo}>
                        <span className={styles.relatedDate}>
                          {rel.month ? `${rel.month} ${rel.year}` : rel.year}
                        </span>
                        <h4 className={styles.relatedItemTitle}>
                          <Link href={`/publications/${rel.id}`} className={styles.relatedLink}>
                            {rel.title}
                          </Link>
                        </h4>
                        <div className={styles.relatedActionRow}>
                          <Link href={`/publications/${rel.id}`} className={styles.relatedBtn}>
                            View Bookplate →
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
