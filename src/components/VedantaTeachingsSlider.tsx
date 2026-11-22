'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getAssetPath } from '@/utils/assetPath';
import styles from './VedantaTeachingsSlider.module.css';

export interface TeachingSlideItem {
  id: string;
  filename: string;
  imageSrc: string;
  theme: string;
  alt: string;
}

export const TEACHING_SLIDES: TeachingSlideItem[] = [
  {
    id: 'slide-1',
    filename: 'img-slider-one.png',
    imageSrc: '/images/vmission/slides/img-slider-one.png',
    theme: 'Guru Parampara — Unbroken Lineage of Advaita Masters',
    alt: 'Vedanta teaching artwork on Guru Parampara depicting the traditional unbroken lineage of Advaita Vedanta masters and scriptural invocations',
  },
  {
    id: 'slide-2',
    filename: 'img-slider-two.png',
    imageSrc: '/images/vmission/slides/img-slider-two.png',
    theme: 'Karma Yoga — Yogah Karmasu Kaushalam',
    alt: 'Vedanta teaching artwork on Karma Yoga presenting equanimity and skill in selfless action from Bhagavad Gita 2.50',
  },
  {
    id: 'slide-3',
    filename: 'img-slider-three.png',
    imageSrc: '/images/vmission/slides/img-slider-three.png',
    theme: 'Kena Upanishad — Transcending Empirical Cognition',
    alt: 'Vedanta teaching artwork on Kena Upanishad 1.4 exploring Brahman beyond the domain of the known and the unknown',
  },
  {
    id: 'slide-4',
    filename: 'img-slider-four.png',
    imageSrc: '/images/vmission/slides/img-slider-four.png',
    theme: 'Shraddha — Shraddhavan Labhate Jnanam',
    alt: 'Vedanta teaching artwork on Shraddha illustrating the open, receptive state of mind necessary for spiritual assimilation',
  },
  {
    id: 'slide-5',
    filename: 'img-slider-five.png',
    imageSrc: '/images/vmission/slides/img-slider-five.png',
    theme: 'Guru-Shishya — Acharyavan Purusho Veda',
    alt: 'Vedanta teaching artwork on the Guru-Shishya relationship and living guidance of the Acharya from Chandogya Upanishad',
  },
  {
    id: 'slide-6',
    filename: 'img-slider-six.png',
    imageSrc: '/images/vmission/slides/img-slider-six.png',
    theme: 'Tat Tvam Asi — The Infinite Self-Effulgent Truth',
    alt: 'Vedanta teaching artwork on Chandogya Upanishad Mahavakya Tat Tvam Asi revealing the non-dual identity of Self and Brahman',
  },
  {
    id: 'slide-7',
    filename: 'img-slider-seven.png',
    imageSrc: '/images/vmission/slides/img-slider-seven.png',
    theme: 'Ishavasyam Idam Sarvam — Everything Pervaded by the Divine',
    alt: 'Vedanta teaching artwork on the opening invocation of the Isha Upanishad contemplating the cosmic presence of the Divine',
  },
  {
    id: 'slide-8',
    filename: 'img-slider-eight.png',
    imageSrc: '/images/vmission/slides/img-slider-eight.png',
    theme: 'Aham Asmi — The Immutable Substratum of Being',
    alt: 'Vedanta teaching artwork on the direct experience of Aham Asmi revealing the changeless witness beyond perishable adjuncts',
  },
];

const AUTOPLAY_INTERVAL = 7500; // 7.5 seconds per slide

export default function VedantaTeachingsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDocHidden, setIsDocHidden] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Swipe detection coordinates
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const totalSlides = TEACHING_SLIDES.length;
  const currentSlide = TEACHING_SLIDES[currentIndex];

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Listen to document visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocHidden(document.visibilityState === 'hidden');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const toggleManualPause = useCallback(() => {
    setIsManualPaused((prev) => !prev);
  }, []);

  // Determine whether autoplay should be actively ticking
  const isAutoplayActive =
    !isManualPaused && !isHovered && !isFocused && !isDocHidden && !isReducedMotion;

  // Autoplay interval runner
  useEffect(() => {
    if (!isAutoplayActive) return;

    const timer = setInterval(() => {
      goToNext();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isAutoplayActive, goToNext, currentIndex]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    }
  };

  // Touch handlers (supports horizontal swipe without blocking vertical page scroll)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only trigger if horizontal movement is greater than vertical movement and exceeds threshold
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className={styles.sliderRoot}
      role="region"
      aria-roledescription="carousel"
      aria-label="Essential Vedanta Teachings Visual Exhibition"
      onKeyDown={handleKeyDown}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        // Only mark unfocused if focus moved outside root
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
      tabIndex={0}
    >
      {/* Screen-reader live announcement of current slide */}
      <div className={styles.srOnly} aria-live="polite">
        Slide {currentIndex + 1} of {totalSlides}: {currentSlide.theme}
      </div>

      {/* Main 16:9 Cinematic Stage */}
      <div
        className={styles.stageFrame}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.stageAspect}>
          {TEACHING_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            const isPrev = idx === (currentIndex - 1 + totalSlides) % totalSlides;
            return (
              <div
                key={slide.id}
                className={[
                  styles.slideItem,
                  isActive ? styles.slideActive : '',
                  isPrev ? styles.slidePrev : '',
                ].join(' ')}
                aria-hidden={!isActive}
              >
                <img
                  src={getAssetPath(slide.imageSrc)}
                  alt={slide.alt}
                  className={styles.slideImage}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            );
          })}
        </div>

        {/* Side Navigation Arrow Buttons */}
        <button
          type="button"
          onClick={goToPrev}
          className={`${styles.navBtn} ${styles.navBtnPrev}`}
          aria-label="Previous teaching slide"
        >
          <svg
            className={styles.navIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={goToNext}
          className={`${styles.navBtn} ${styles.navBtnNext}`}
          aria-label="Next teaching slide"
        >
          <svg
            className={styles.navIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Editorial Control & Progress Bar */}
      <div className={styles.controlsBar}>
        {/* Left: Position Indicator */}
        <div className={styles.counterBox} aria-hidden="true">
          <span className={styles.counterCurrent}>0{currentIndex + 1}</span>
          <span className={styles.counterDivider}>/</span>
          <span className={styles.counterTotal}>0{totalSlides}</span>
        </div>

        {/* Center: Slim Dot Indicators */}
        <div className={styles.dotsGroup} role="tablist" aria-label="Slide Indicators">
          {TEACHING_SLIDES.map((slide, idx) => {
            const isDotActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isDotActive}
                aria-label={`Go to slide ${idx + 1}: ${slide.theme}`}
                className={`${styles.dotBtn} ${isDotActive ? styles.dotActive : ''}`}
                onClick={() => goToSlide(idx)}
              >
                <span className={styles.dotPill} />
              </button>
            );
          })}
        </div>

        {/* Right: Manual Play/Pause Control */}
        <div className={styles.pauseBox}>
          <button
            type="button"
            onClick={toggleManualPause}
            className={styles.playPauseBtn}
            aria-label={
              isManualPaused ? 'Resume automatic slideshow' : 'Pause automatic slideshow'
            }
            aria-pressed={isManualPaused}
          >
            {isManualPaused ? (
              <>
                <svg
                  className={styles.controlIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span className={styles.controlText}>Play</span>
              </>
            ) : (
              <>
                <svg
                  className={styles.controlIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span className={styles.controlText}>Pause</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
