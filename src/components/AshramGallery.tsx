'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getAssetPath } from '@/utils/assetPath';
import styles from './AshramGallery.module.css';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    src: '/images/vmission/hero/ashram-facade-dome.jpg',
    title: 'Ashram Campus & Grounds',
    category: 'Campus',
    caption: 'The main campus and residential building of Vedanta Ashram, located in Sudama Nagar, Indore.',
  },
  {
    id: 'gal-2',
    src: '/images/vmission/hero/ashram-facade-elevated.jpg',
    title: 'Main Building Facade',
    category: 'Architecture',
    caption: 'Exterior of Vedanta Ashram Indore, founded in 1992 by Poojya Swami Atmananda Saraswati.',
  },
  {
    id: 'gal-3',
    src: '/images/vmission/ashram/gangeshwar-dome-closeup.jpg',
    title: 'Sri Gangeshwar Mahadev Temple',
    category: 'Sanctum',
    caption: 'The consecrated Shivalingam at Sri Gangeshwar Mahadev Mandir on campus with daily Rudrabhishek and aartis.',
  },
  {
    id: 'gal-4',
    src: '/images/vmission/ashram/teaching-hall-interior.jpg',
    title: 'Discourse & Lecture Hall',
    category: 'Facilities',
    caption: 'Airy lecture hall equipped for daily Vedanta discourses, chanting, and residential retreat sessions.',
  },
  {
    id: 'gal-5',
    src: '/images/vmission/ashram/acharya-community-portrait.jpg',
    title: 'Guest & Inmate Accommodations',
    category: 'Stay',
    caption: 'Modest and clean guest quarters with attached western toilets and 24-hour running water (~24 capacity).',
  },
  {
    id: 'gal-6',
    src: '/images/vmission/ashram/courtyard-with-guruji.jpg',
    title: 'Inner Garden Courtyard',
    category: 'Courtyard',
    caption: 'Quiet green courtyard for personal introspection, scriptural reading, and walking meditation.',
  },
  {
    id: 'gal-7',
    src: '/images/vmission/events/advaita-congress-moscow.jpg',
    title: 'Annual Vedanta Camp Gathering',
    category: 'Events',
    caption: 'Devoted spiritual seekers participating in a residential Gyana Yagna at Vedanta Ashram.',
  },
  {
    id: 'gal-8',
    src: '/images/vmission/community/residential-camp-gathering.jpg',
    title: 'Guru Poornima Celebrations',
    category: 'Celebrations',
    caption: 'Annual Guru Poornima festival assembly, Pada Puja, and collective prasadam distribution in Indore.',
  },
];

export default function AshramGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const activeItem = activeIdx !== null ? GALLERY_ITEMS[activeIdx] : null;

  const handlePrev = useCallback(() => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  }, [activeIdx]);

  const handleNext = useCallback(() => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % GALLERY_ITEMS.length);
    }
  }, [activeIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (activeIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIdx, handlePrev, handleNext]);

  return (
    <div className={styles.galleryWrapper}>
      {/* Editorial Masonry / Balanced Grid */}
      <div className={styles.grid}>
        {GALLERY_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            className={styles.card}
            onClick={() => setActiveIdx(idx)}
            role="button"
            tabIndex={0}
            aria-label={`View photo of ${item.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIdx(idx);
              }
            }}
          >
            <div className={styles.imgWrapper}>
              <img
                src={getAssetPath(item.src)}
                alt={item.title}
                className={styles.img}
                loading="lazy"
              />
              <div className={styles.overlay}>
                <span className={styles.categoryBadge}>{item.category}</span>
                <h4 className={styles.cardTitle}>{item.title}</h4>
                <p className={styles.viewHint}>Click to expand 🔍</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Fullscreen Lightbox Modal */}
      {activeItem && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setActiveIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.btnClose}
              onClick={() => setActiveIdx(null)}
              aria-label="Close Lightbox"
            >
              ✕
            </button>

            {/* Navigation Arrows */}
            <button
              type="button"
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={handleNext}
              aria-label="Next photo"
            >
              ›
            </button>

            <div className={styles.mainMedia}>
              <img
                src={getAssetPath(activeItem.src)}
                alt={activeItem.title}
                className={styles.lightboxImg}
              />
            </div>

            <div className={styles.captionBar}>
              <div className={styles.captionHeader}>
                <span className={styles.categoryBadge}>{activeItem.category}</span>
                <span className={styles.counter}>
                  {activeIdx! + 1} of {GALLERY_ITEMS.length}
                </span>
              </div>
              <h3 className={styles.captionTitle}>{activeItem.title}</h3>
              <p className={styles.captionDesc}>{activeItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
