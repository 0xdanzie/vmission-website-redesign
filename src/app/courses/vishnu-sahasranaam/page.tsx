'use client';

import React from 'react';
import Link from 'next/link';
import styles from '@/app/ashram/subpage.module.css';

export default function Subpage() {
  return (
    <article className={styles.subpage}>
      <div className="container">
        <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
          <Link href="/">Home</Link> <span className={styles.breadcrumbSep}>/</span> <Link href="/courses">Courses</Link> <span className={styles.breadcrumbSep}>/</span> <span className={styles.breadcrumbCurrent}>Vishnu Sahasranaam</span>
        </nav>
      </div>

      <header className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>Scriptural Stotra Study</span>
          <h1 className={styles.title}>Sri Vishnu Sahasranaam Course</h1>
          <div className={styles.rule} />
          <p className={styles.subtitle}>A profound, systematic study of the thousand divine names of Sri Maha Vishnu based on the classical commentary of Sri Adi Shankaracharya.</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className="container">
          <div className={styles.editorialBody}>
            <div className={styles.callout}>
            <h3 className={styles.calloutTitle}>।। ॐ नमो भगवते वासुदेवाय ।।</h3>
            <p className={styles.calloutText}>
              Sri Vishnu Sahasranama from the Mahabharata is revered as one of the most potent spiritual treatises. Each name illuminates a distinct divine attribute of the one Non-Dual Supreme Reality (Brahman).
            </p>
          </div>

          <div className={styles.prose}>
            <h2>Study Modules &amp; Study Materials</h2>
            <p>
              This comprehensive course covers all 1000 names divided into 10 structured study modules. Each part provides exhaustive philosophical commentary, Sanskrit etymology, and devotional contemplation.
            </p>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Part</th>
                    <th>Names Range</th>
                    <th>Study Text &amp; Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>01</td><td>Names 001 &ndash; 100</td><td>Introductory Verses &amp; Names 1 to 100</td></tr>
                  <tr><td>02</td><td>Names 101 &ndash; 200</td><td>Exposition of Names 101 to 200</td></tr>
                  <tr><td>03</td><td>Names 201 &ndash; 300</td><td>Exposition of Names 201 to 300</td></tr>
                  <tr><td>04</td><td>Names 301 &ndash; 400</td><td>Exposition of Names 301 to 400</td></tr>
                  <tr><td>05</td><td>Names 401 &ndash; 500</td><td>Exposition of Names 401 to 500</td></tr>
                  <tr><td>06</td><td>Names 501 &ndash; 600</td><td>Exposition of Names 501 to 600</td></tr>
                  <tr><td>07</td><td>Names 601 &ndash; 700</td><td>Exposition of Names 601 to 700</td></tr>
                  <tr><td>08</td><td>Names 701 &ndash; 800</td><td>Exposition of Names 701 to 800</td></tr>
                  <tr><td>09</td><td>Names 801 &ndash; 900</td><td>Exposition of Names 801 to 900</td></tr>
                  <tr><td>10</td><td>Names 901 &ndash; 1000</td><td>Concluding Names &amp; Phala Shruti</td></tr>
                </tbody>
              </table>
            </div>

            <div className={styles.callout}>
              <h3 className={styles.calloutTitle}>।। ॐ तत्सत् ।।</h3>
              <p className={styles.calloutText}>
                Access our full collection of Sanskrit chants and devotional treatises under the <a href="/publications" style={{ color: '#882B1B', textDecoration: 'underline' }}>Publications &amp; Library</a> section.
              </p>
            </div>
          </div>

            <footer className={styles.subpageFooter}>
              <Link href="/ashram" className={styles.backLink}>
                &larr; Back to Vedanta Ashram Overview
              </Link>
              <Link href="/contact" className={styles.backLink}>
                Contact the Ashram Office &rarr;
              </Link>
            </footer>
          </div>
        </div>
      </main>
    </article>
  );
}
