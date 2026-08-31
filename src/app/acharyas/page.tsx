import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import AcharyaCard from '@/components/AcharyaCard';
import { acharyas } from '@/data/acharyas';
import styles from './page.module.css';

export default function AcharyasPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label="Acharyas Hero">
        <div className="container">
          <div className="animate-fadeUp" style={{ maxWidth: '720px' }}>
            <span className={styles.badge}>Guru-Shishya Parampara</span>
            <h1 className={styles.title}>The Acharyas of Vedanta Mission</h1>
            <p className={styles.lead}>
              Meet the teachers who dedicate their lives to transmitting the unadulterated wisdom of Advaita Vedanta with scholarly depth, devotion, and compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section" aria-label="Acharyas Catalog">
        <div className="container">
          <SectionHeader
            tag="Resident Teachers"
            title="Spiritual Guides &amp; Faculty"
            subtitle="Explore the biographies, lineages, and specialized teachings of each resident teacher at Vedanta Ashram, Indore."
          />

          <div className="grid grid--2">
            {acharyas.map((acharya) => (
              <AcharyaCard key={acharya.slug} acharya={acharya} />
            ))}
          </div>
        </div>
      </section>

      {/* Parampara Context */}
      <section className="section section--muted" aria-label="Lineage Context">
        <div className="container container--md">
          <div className={styles.lineageCard}>
            <span className={styles.omSymbol}>ॐ</span>
            <h3 className={styles.lineageTitle}>The Advaita Parampara</h3>
            <p className={styles.lineageText}>
              The teaching of Vedanta operates on the sacred principle of <em>Sampradaya</em> — an unbroken lineage of understanding traced back from Bhagavan Shankaracharya to contemporary masters. Our Acharyas do not present individual opinions; they unfold the timeless, objective truth of the Upanishads according to this classical tradition.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
