import React from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import TimelineItem from '@/components/TimelineItem';
import styles from './page.module.css';

export default function AboutPage() {
  const milestones = [
    {
      timeOrYear: '1983',
      title: 'Brahmacharya Diksha at Sandeepany Sadhanalaya',
      description: 'Poojya Guruji completed intensive Vedanta training under the Chinmaya Mission in Mumbai and took vows of dedicated Brahmacharya.',
    },
    {
      timeOrYear: '1992',
      title: 'Founding of Vedanta Mission & Indore Ashram',
      description: 'Vedanta Ashram was established in Sudama Nagar, Indore, as an authentic Gurukula for scriptural study, meditation, and spiritual inquiry.',
    },
    {
      timeOrYear: '1995',
      title: 'Establishment of Registered Trusts',
      description: 'Vedanta Parmarthic Sewa Trust was formally registered in Indore to administer the Ashram, temple, and charitable educational activities.',
    },
    {
      timeOrYear: '2000',
      title: 'Launch of Vedanta Sandesh Monthly Ezine',
      description: 'Initiation of the monthly digital publication to share classical Advaita commentaries and discourses with seekers worldwide.',
    },
    {
      timeOrYear: 'Present',
      title: 'Global Outreach & Residential Courses',
      description: 'Conducting full-time residential 12-month Gita courses, online correspondence classes, retreats, and free publication distribution globally.',
      isLast: true,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label="About Hero">
        <div className="container">
          <div className="animate-fadeUp" style={{ maxWidth: '720px' }}>
            <span className={styles.badge}>Our Genesis &amp; Tradition</span>
            <h1 className={styles.title}>About Vedanta Mission</h1>
            <p className={styles.lead}>
              Founded in 1992 by Poojya Swami Atmananda Saraswati, Vedanta Mission is a non-profit spiritual and educational organization dedicated to the traditional dissemination of Advaita Vedanta.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="section" aria-label="Mission & Philosophy">
        <div className="container">
          <div className={styles.missionCard}>
            <span className={styles.omBadge}>ॐ</span>
            <h2 className={styles.missionTitle}>Our Vision &amp; Motto</h2>
            <p className={styles.missionMantra}>
              &ldquo;Spreading &lsquo;Love &amp; Light&rsquo; by revealing the basic oneness of all.&rdquo;
            </p>
            <p className={styles.missionText}>
              Vedanta Mission stands for the timeless Vedic vision that the essence of the individual (Jiva), the creator (Ishwara), and the cosmos (Jagat) is non-different: pure Consciousness (Brahman). Our objective is to guide seekers out of spiritual confusion and sorrow through traditional, systematic teaching of the scriptures.
            </p>
          </div>
        </div>
      </section>

      {/* Founding Timeline */}
      <section className="section section--muted" aria-label="History Timeline">
        <div className="container container--md">
          <SectionHeader
            tag="Chronology"
            title="The Journey of Vedanta Mission"
            subtitle="Over three decades of continuous service and scriptural dissemination."
            align="center"
          />

          <div className={styles.timelineBox}>
            {milestones.map((m, idx) => (
              <TimelineItem
                key={idx}
                timeOrYear={m.timeOrYear}
                title={m.title}
                description={m.description}
                isLast={m.isLast}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The Advaita Tradition & Lineage */}
      <section className="section" aria-label="Lineage">
        <div className="container">
          <div className={styles.twoCol}>
            <div>
              <SectionHeader
                tag="Tradition & Authenticity"
                title="Rooted in the Shankaracharya Sampradaya"
              />
              <p className="text-lead">
                Vedanta is not an invention or philosophy of any single individual; it is an ancient, self-validating means of knowledge (Pramana).
              </p>
              <p className="text-body" style={{ marginTop: 'var(--space-3)' }}>
                Our teaching methodology adheres strictly to the classical tradition of Adi Shankaracharya. We unfold the Prasthana Traya (Upanishads, Bhagavad Gita, and Brahma Sutras) using traditional commentaries (Bhashyas), ensuring intellectual clarity and fidelity to the original Sanskrit texts.
              </p>
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Button href="/acharyas" variant="primary">
                  Meet Our Resident Acharyas →
                </Button>
              </div>
            </div>

            <div className={styles.traditionCard}>
              <h3 className={styles.tradTitle}>Core Tenets of Our Teaching</h3>
              <ul className={styles.tradList}>
                <li><strong>Non-Dual Reality (Advaita):</strong> Brahman alone is the ultimate reality; the world is an appearance (Mithya).</li>
                <li><strong>Direct Knowledge (Jnana):</strong> Liberation (Moksha) is gained through knowledge of one&apos;s true Self, not through actions or rituals alone.</li>
                <li><strong>Guru-Shishya Parampara:</strong> Systematic study under the guidance of a traditional, enlightened teacher.</li>
                <li><strong>Universal Harmony:</strong> Seeing the same divine essence in all beings and creatures.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Trusts */}
      <section className="section section--muted" aria-label="Our Trusts">
        <div className="container">
          <SectionHeader
            tag="Legal & Administrative Framework"
            title="Our Registered Trusts"
            subtitle="Transparent administration managed by registered public charitable trusts."
          />

          <div className="grid grid--2">
            <div className={`card ${styles.trustCard}`}>
              <span className={styles.trustBadge}>Indore, Madhya Pradesh</span>
              <h3 className={styles.trustTitle}>Vedanta Parmarthic Sewa Trust</h3>
              <p className={styles.trustDesc}>
                The primary public charitable trust responsible for managing the Vedanta Ashram campus in Indore, the Sri Gangeshwar Mahadev Mandir, full-time residential courses, and daily Annadanam.
              </p>
              <div className={styles.taxInfo}>
                ✓ Donations eligible for 80-G Income Tax Exemption
              </div>
            </div>

            <div className={`card ${styles.trustCard}`}>
              <span className={styles.trustBadge}>Mumbai, Maharashtra</span>
              <h3 className={styles.trustTitle}>Ishwara Charitable Trust</h3>
              <p className={styles.trustDesc}>
                Supporting Vedanta study groups, public discourses, coastal educational initiatives, and the digital dissemination of spiritual literature in Western India.
              </p>
              <div className={styles.taxInfo}>
                ✓ Registered Public Trust in Mumbai
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centers */}
      <section className="section" aria-label="Centers">
        <div className="container container--md">
          <SectionHeader
            tag="Global Reach"
            title="Affiliated Study Centers"
            subtitle="Vedanta Mission conducts study circles and satsangs across multiple cities."
            align="center"
          />

          <div className="grid grid--3">
            <div className={`card ${styles.centerCard}`}>
              <span className={styles.centerCity}>Indore</span>
              <p className={styles.centerName}>Vedanta Ashram (HQ)</p>
              <p className={styles.centerAddr}>Sudama Nagar, Indore</p>
            </div>

            <div className={`card ${styles.centerCard}`}>
              <span className={styles.centerCity}>Mumbai</span>
              <p className={styles.centerName}>Ishwara Center</p>
              <p className={styles.centerAddr}>Greater Mumbai &amp; Suburbs</p>
            </div>

            <div className={`card ${styles.centerCard}`}>
              <span className={styles.centerCity}>Thane</span>
              <p className={styles.centerName}>Study Circle</p>
              <p className={styles.centerAddr}>Weekly Gita &amp; Upanishad satsangs</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
