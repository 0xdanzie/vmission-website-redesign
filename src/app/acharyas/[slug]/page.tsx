import React from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import TeachingCard from '@/components/TeachingCard';
import { getAcharyaBySlug, acharyas } from '@/data/acharyas';
import { teachings } from '@/data/teachings';
import { getAssetPath } from '@/utils/assetPath';
import styles from './page.module.css';

export function generateStaticParams() {
  return acharyas.map((a) => ({
    slug: a.slug,
  }));
}

export default function AcharyaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params?.slug;
  const acharya = getAcharyaBySlug(slug || 'swami-atmananda-saraswati');

  if (!acharya) {
    return (
      <div className="container section">
        <h2>Acharya Not Found</h2>
        <Link href="/acharyas">← Back to Acharyas</Link>
      </div>
    );
  }

  const relatedTeachings = teachings
    .filter((t) => t.teacher === acharya.name || acharya.teachings.includes(t.scripture))
    .slice(0, 3);

  const otherAcharyas = acharyas.filter((a) => a.slug !== acharya.slug);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label="Acharya Profile Hero">
        <div className="container">
          <div className={styles.heroGrid}>
            {/* Portrait */}
            <div className={styles.portraitBox}>
              {acharya.image ? (
                <img
                  src={getAssetPath(acharya.image)}
                  alt={`Portrait of ${acharya.name}`}
                  className={styles.portraitImg}
                  loading="eager"
                />
              ) : (
                <>
                  <span className={styles.initials} aria-hidden="true">
                    {acharya.name.split(' ').filter(Boolean).slice(-2).map((w) => w[0]).join('')}
                  </span>
                  <div className={styles.portraitOm}>ॐ</div>
                </>
              )}
            </div>

            {/* Profile Info */}
            <div className={styles.heroContent}>
              <div className={styles.breadcrumb}>
                <Link href="/acharyas">← All Acharyas</Link>
              </div>
              <p className={styles.honorific}>{acharya.honorific}</p>
              <h1 className={styles.name}>{acharya.name}</h1>
              <p className={styles.role}>{acharya.role}</p>

              <div className={styles.lineageBadge}>
                <strong>Lineage / Parampara:</strong> {acharya.lineage}
              </div>

              <div className={styles.actionRow}>
                <Button href="/teachings" variant="primary">
                  Explore Discourses &amp; Teachings →
                </Button>
                <Button href="/contact" variant="outline">
                  Contact via Ashram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="section" aria-label="Detailed Biography">
        <div className="container">
          <div className={styles.bioGrid}>
            <div>
              <SectionHeader
                tag="Life & Dedication"
                title="Biography & Spiritual Journey"
              />
              <div className={styles.bioText}>
                <p>{acharya.fullBio}</p>
                <p>
                  As an Acharya of Vedanta Mission, their mission is to make the profound insight of Advaita accessible to serious seekers without watering down its intellectual precision or spiritual depth.
                </p>
              </div>

              {/* Focus Areas */}
              <div className={styles.focusSection}>
                <h3 className={styles.focusHead}>Core Scriptural Teachings</h3>
                <div className={styles.tagsRow}>
                  {acharya.teachings.map((t, idx) => (
                    <span key={idx} className={styles.teachingTag}>
                      📖 {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Programs */}
            <div>
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Conducted Programs</h3>
                <ul className={styles.programList}>
                  {acharya.programs.map((p, idx) => (
                    <li key={idx}>
                      <span>✓</span> {p}
                    </li>
                  ))}
                </ul>

                <div className={styles.sidebarCta}>
                  <p>Interested in joining an upcoming study session or retreat with {acharya.honorific}?</p>
                  <Button href="/events" variant="primary" fullWidth size="sm">
                    View Event Calendar →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Teachings */}
      {relatedTeachings.length > 0 && (
        <section className="section section--muted" aria-label="Related Teachings">
          <div className="container">
            <SectionHeader
              tag="Audio & Video Discourses"
              title={`Discourses by ${acharya.name}`}
              subtitle="Listen to audio lectures and scriptural expositions."
            />
            <div className="grid grid--3">
              {relatedTeachings.map((t) => (
                <TeachingCard key={t.id} teaching={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Acharyas */}
      <section className="section" aria-label="Other Acharyas">
        <div className="container">
          <SectionHeader
            tag="The Resident Faculty"
            title="Other Teachers of Vedanta Mission"
          />
          <div className="grid grid--3">
            {otherAcharyas.map((a) => (
              <div key={a.slug} className="card" style={{ padding: 'var(--space-6)' }}>
                <p style={{ fontSize: 'var(--text-meta)', color: 'var(--vm-saffron)', fontWeight: 600 }}>{a.honorific}</p>
                <h4 style={{ fontFamily: 'var(--font-serif)', marginBlock: 'var(--space-1)' }}>{a.name}</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--vm-text-faint)', marginBottom: 'var(--space-3)' }}>{a.role}</p>
                <Link href={`/acharyas/${a.slug}`} style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--vm-saffron)' }}>
                  View Profile →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
