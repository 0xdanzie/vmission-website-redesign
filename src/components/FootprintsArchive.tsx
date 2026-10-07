'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { vmFootprintsCollection, footprintSlides, FootprintSlide } from '@/data/footprints';
import styles from './FootprintsArchive.module.css';

export default function FootprintsArchive() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const activeSlide: FootprintSlide = footprintSlides[currentIdx] || footprintSlides[0];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : footprintSlides.length - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev < footprintSlides.length - 1 ? prev + 1 : 0));
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className={styles.footprintsSection} aria-label="VM Footprints Historical Discourse Archive">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.overline}>Historical Tour &amp; Mahatmas Archive</span>
          <h2 className={styles.title}>VM Footprints</h2>
          <p className={styles.lead}>
            Preserved historical archive of Poojya Guruji Swami Atmanandaji&apos;s global discourses, yatras, and sacred dialogues with traditional Mahatmas across India and overseas.
          </p>
          <div className={styles.metaBadge}>
            Canonical Collection: <code>{vmFootprintsCollection.canonicalId}</code> &bull; 11 Archival Slides
          </div>
        </div>

        <div className={styles.viewerCard}>
          {/* Main Slide Display */}
          <div className={styles.displayArea}>
            <div className={styles.imageContainer}>
              <img
                src={
                  imageErrors[activeSlide.id] && activeSlide.localFallbackSrc
                    ? activeSlide.localFallbackSrc
                    : activeSlide.imageSrc
                }
                alt={activeSlide.title}
                className={styles.slideImage}
                onError={() => handleImageError(activeSlide.id)}
                loading="lazy"
              />
              <div className={styles.imageOverlay}>
                <span className={styles.canonicalTag}>{activeSlide.canonicalId}</span>
                <span className={styles.slideCounter}>
                  {currentIdx + 1} / {footprintSlides.length}
                </span>
              </div>
            </div>

            <div className={styles.captionPanel}>
              <h3 className={styles.slideTitle}>{activeSlide.title}</h3>
              <p className={styles.slideCaption}>{activeSlide.caption}</p>
              <p className={styles.slideDesc}>{activeSlide.description}</p>
              
              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={handlePrev}
                  aria-label="Previous archival slide"
                >
                  &larr; Previous Slide
                </button>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={handleNext}
                  aria-label="Next archival slide"
                >
                  Next Slide &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation Strip */}
          <div className={styles.thumbStrip} role="tablist" aria-label="Footprints archival thumbnails">
            {footprintSlides.map((slide, idx) => {
              const isSelected = idx === currentIdx;
              const hasErr = imageErrors[slide.id];
              const thumbSrc = hasErr && slide.localFallbackSrc ? slide.localFallbackSrc : slide.imageSrc;

              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`${styles.thumbBtn} ${isSelected ? styles.thumbActive : ''}`}
                  onClick={() => setCurrentIdx(idx)}
                >
                  <img
                    src={thumbSrc}
                    alt={`Thumb ${slide.slideNumber}`}
                    className={styles.thumbImg}
                    onError={() => handleImageError(slide.id)}
                    loading="lazy"
                  />
                  <span className={styles.thumbNum}>{slide.slideNumber}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
