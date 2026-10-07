'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getAssetPath } from '@/utils/assetPath';
import styles from './TeachingSlider.module.css';

export interface TeachingSlide {
  id: string;
  imageSrc: string;
  sanskrit: string;
  quote: string;
  teacher: string;
  role: string;
  theme: string;
  scripture: string;
  alt: string;
}

export const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide-01',
    imageSrc: '/images/vmission/teaching/01-swami-atmananda-teaching-restored.jpg',
    sanskrit: 'तत् त्वम् असि',
    quote: 'You are not an individual, but the infinite self-effulgent existence.',
    teacher: 'Swami Atmananda Saraswati',
    role: 'Founder & Head Acharya',
    theme: 'Mahavakya of the Chandogya Upanishad',
    scripture: 'Chandogya Upanishad 6.8.7',
    alt: 'Swami Atmananda Saraswati addressing a packed gathering on the truth of Tat Tvam Asi',
  },
  {
    id: 'slide-02',
    imageSrc: '/images/vmission/teaching/02-swami-atmananda-wisdom-restored.jpg',
    sanskrit: 'अहम् अस्मि',
    quote: "The experience of 'I Am' reveals the substratum - the real me. 'What' I am, is the domain of Adhyaropa - the perishable Anatma.",
    teacher: 'Swami Atmananda Saraswati',
    role: 'Founder & Head Acharya',
    theme: 'Self-Knowledge & The Immutable Substratum',
    scripture: 'Atma-Anatma Viveka',
    alt: 'Swami Atmananda Saraswati meditating on the nature of the changeless Witness',
  },
  {
    id: 'slide-03',
    imageSrc: '/images/vmission/teaching/03-swamini-teaching-01-restored.jpg',
    sanskrit: 'श्रद्धावान् लभते ज्ञानम्',
    quote: 'Those who have an open & positive mind alone are available for teaching.',
    teacher: 'Swamini Samatananda Saraswati',
    role: 'Acharya · Sanskrit & Upanishads',
    theme: 'Preparedness for Self-Knowledge (Sadhana Chatushtaya)',
    scripture: 'Bhagavad Gita 4.39',
    alt: 'Swamini Samatananda Saraswati conducting scriptural exposition before attentive seekers',
  },
  {
    id: 'slide-04',
    imageSrc: '/images/vmission/teaching/04-swamini-teaching-02-restored.jpg',
    sanskrit: 'अन्यदेव तद् विदितात् अथो अविदितात् अधि',
    quote: "Brahman comes neither in the category of 'Known', nor even in the 'Unknown'.",
    teacher: 'Swamini Amitananda Saraswati',
    role: 'Senior Acharya',
    theme: 'Transcending Empirical Cognition',
    scripture: 'Kena Upanishad 1.4',
    alt: 'Swamini Amitananda Saraswati speaking on the transcendental nature of Brahman',
  },
  {
    id: 'slide-05',
    imageSrc: '/images/vmission/teaching/05-acharya-lineage-restored.jpg',
    sanskrit: 'आचार्यवान् पुरुषो वेद',
    quote: 'One who can surrender at the feet of a Guru alone can be initiated to appreciate that which transcends the ego.',
    teacher: 'Swamini Poornananda Saraswati & Poojya Guruji',
    role: 'Guru-Shishya Parampara',
    theme: 'The Living Guidance of the Acharya',
    scripture: 'Chandogya Upanishad 6.14.2',
    alt: 'Swamini Poornananda Saraswati and Swami Atmananda Saraswati by the river',
  },
  {
    id: 'slide-06',
    imageSrc: '/images/vmission/teaching/06-acharya-family-restored.jpg',
    sanskrit: 'वन्दे गुरुपरम्पराम्',
    quote: 'Reverence to the unbroken lineage of Advaita Vedanta teachers transmitting the knowledge through the Guru-Shishya tradition.',
    teacher: 'The Acharyas of Vedanta Mission',
    role: 'Lineage of Adi Shankaracharya',
    theme: 'Unbroken Parampara of Spiritual Masters',
    scripture: 'Advaita Guru Parampara',
    alt: 'The four Acharyas of Vedanta Ashram assembled before the Shivling dome',
  },
  {
    id: 'slide-07',
    imageSrc: '/images/vmission/teaching/07-vedanta-archive-restored.jpg',
    sanskrit: 'योगः कर्मसु कौशलम्',
    quote: 'The capacity to retain your equipoise in all circumstances is real Yoga.',
    teacher: 'Vedanta Pravachan Archive',
    role: 'Historical Satsang Record',
    theme: 'Karma Yoga & Equanimity in Action',
    scripture: 'Bhagavad Gita 2.50',
    alt: 'Large congregation of seekers immersed in discourse on the art of detached action',
  },
];

export default function TeachingSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSlides = TEACHING_SLIDES.length;
  const currentSlide = TEACHING_SLIDES[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play timer (advances every 7.5s when playing and not hovered)
  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      timerRef.current = setInterval(goToNext, 7500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, isHovered, goToNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      goToPrev();
    }
  };

  // Touch swipe handling
  const minSwipeDistance = 45;
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  return (
    <div
      className={styles.wrapper}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Teaching Tradition Restored Historical Archives"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.editorialStage}>
        {/* Left Column: Visual Exhibition Canvas */}
        <div
          className={styles.imageColumn}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.imageFrame}>
            {TEACHING_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                className={[
                  styles.imageSlide,
                  idx === currentIndex ? styles.imageActive : '',
                  idx === (currentIndex - 1 + totalSlides) % totalSlides
                    ? styles.imagePrev
                    : '',
                ].join(' ')}
                aria-hidden={idx !== currentIndex}
              >
                <img
                  src={getAssetPath(slide.imageSrc)}
                  alt={slide.alt}
                  className={styles.archivalImg}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
                <div className={styles.imageVignette} />
              </div>
            ))}

            {/* Archival Badge */}
            <div className={styles.imageHeaderBadge}>
              <span className={styles.badgeIcon}>📜</span>
              <span>Historical Teaching Archive</span>
            </div>

            {/* Scriptural Tag on Image */}
            <div className={styles.scriptureBadge}>
              <span>{currentSlide.scripture}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Typography & Context */}
        <div className={styles.contentColumn}>
          {/* Top Meta Row */}
          <div className={styles.metaRow}>
            <span className={styles.slideCounter}>
              <strong>{String(currentIndex + 1).padStart(2, '0')}</strong>
              <span className={styles.counterDivider}>/</span>
              {String(totalSlides).padStart(2, '0')}
            </span>

            <span className={styles.themeTag}>{currentSlide.theme}</span>
          </div>

          {/* Sanskrit Mahavakya */}
          <div className={styles.sanskritBox}>
            <p className={styles.sanskritText}>{currentSlide.sanskrit}</p>
          </div>

          {/* Wisdom Quote */}
          <blockquote className={styles.quoteBox}>
            <span className={styles.openQuote}>“</span>
            <p className={styles.quoteText}>{currentSlide.quote}</p>
          </blockquote>

          {/* Teacher Attribution Card */}
          <div className={styles.attributionCard}>
            <div className={styles.teacherAvatarWrap}>
              <span className={styles.teacherIcon}>🙏</span>
            </div>
            <div className={styles.teacherInfo}>
              <h4 className={styles.teacherName}>{currentSlide.teacher}</h4>
              <p className={styles.teacherRole}>{currentSlide.role}</p>
            </div>
          </div>

          {/* Interactive Navigation Bar */}
          <div className={styles.controlsBar}>
            {/* Prev / Next Buttons */}
            <div className={styles.btnGroup}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={goToPrev}
                aria-label="Previous teaching slide"
                title="Previous (Left Arrow)"
              >
                ←
              </button>

              <button
                type="button"
                className={styles.navBtn}
                onClick={goToNext}
                aria-label="Next teaching slide"
                title="Next (Right Arrow)"
              >
                →
              </button>

              {/* Play / Pause Toggle */}
              <button
                type="button"
                className={styles.playPauseBtn}
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                aria-label={isAutoPlaying ? 'Pause automatic slideshow' : 'Play automatic slideshow'}
                title={isAutoPlaying ? 'Pause slideshow' : 'Resume slideshow'}
              >
                {isAutoPlaying ? '⏸' : '▶'}
              </button>
            </div>

            {/* Interactive Progress Indicators (Pills) */}
            <div className={styles.indicatorTrack} role="tablist" aria-label="Slide indicators">
              {TEACHING_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === currentIndex}
                  aria-label={`Go to slide ${idx + 1}: ${slide.sanskrit}`}
                  className={[
                    styles.indicatorPill,
                    idx === currentIndex ? styles.indicatorActive : '',
                  ].join(' ')}
                  onClick={() => goToSlide(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
