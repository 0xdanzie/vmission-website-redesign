/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { getAssetPath } from '@/utils/assetPath';
import styles from './CinematicEntryOverlay.module.css';

/**
 * Feature Flag:
 * When false, this component does not render at all.
 */
export const ENTRY_SCENE_ENABLED = true;

const SESSION_STORAGE_KEY = 'vm-entry-scene-seen';
const DESKTOP_DURATION_MS = 1700; // <= 1.70s max on desktop
const MOBILE_DURATION_MS = 1000;  // <= 1.50s max on mobile (1.00s)

export default function CinematicEntryOverlay() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  // If feature flag is off, or not strictly on the homepage route '/', do not render.
  const isHomepage = pathname === '/' || pathname === '';

  const [isActive, setIsActive] = useState<boolean>(() => {
    if (!ENTRY_SCENE_ENABLED || !isHomepage) {
      return false;
    }
    if (typeof window !== 'undefined') {
      const search = window.location.search || '';
      if (search.includes('intro=0')) {
        return false;
      }
      try {
        const seen = sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
        const force = search.includes('intro=1');
        if (seen && !force) {
          return false;
        }
      } catch {
        // sessionStorage unavailable
      }
    }
    return true;
  });

  useEffect(() => {
    setMounted(true);

    if (!ENTRY_SCENE_ENABLED || !isHomepage) {
      setIsActive(false);
      return;
    }

    // Check development query parameter overrides
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const isForce = search.includes('intro=1');
    const isBypass = search.includes('intro=0');

    if (isBypass) {
      setIsActive(false);
      return;
    }

    // Check accessibility: prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion && !isForce) {
      setIsActive(false);
      return;
    }

    // Check session storage
    try {
      const alreadySeen = sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
      if (alreadySeen && !isForce) {
        setIsActive(false);
        return;
      }
    } catch {
      // sessionStorage unavailable, proceed gracefully
    }

    // Temporarily lock body scroll during overlay
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Warm up image assets
    const atmosphereSrc = getAssetPath('/images/entry/entry-atmosphere.webp');
    const shivlingSrc = getAssetPath('/images/entry/shivling-master.webp');
    const img1 = new Image();
    img1.src = atmosphereSrc;
    const img2 = new Image();
    img2.src = shivlingSrc;

    // Conclude overlay according to viewport speed requirement
    const isMobile = window.innerWidth <= 768;
    const duration = isMobile ? MOBILE_DURATION_MS : DESKTOP_DURATION_MS;

    const timer = setTimeout(() => {
      finishEntry();
    }, duration);

    function finishEntry() {
      setIsActive(false);
      document.body.style.overflow = originalOverflow || '';
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
        document.documentElement.classList.add('vm-entry-seen');
      } catch {
        // sessionStorage write fallback
      }
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow || '';
    };
  }, [isHomepage]);

  if (!ENTRY_SCENE_ENABLED || !isHomepage || !isActive) {
    return null;
  }

  const atmosphereSrc = getAssetPath('/images/entry/entry-atmosphere.webp');
  const shivlingSrc = getAssetPath('/images/entry/shivling-master.webp');

  const overlayElement = (
    <div
      ref={overlayRef}
      className={styles.overlay}
      aria-hidden="true"
      role="presentation"
      onAnimationEnd={(e) => {
        if (e.target === overlayRef.current) {
          setIsActive(false);
          document.body.style.overflow = '';
          try {
            sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
            document.documentElement.classList.add('vm-entry-seen');
          } catch {
            // Ignore
          }
        }
      }}
    >
      {/* Layer 1: Ambient Sanctum Atmosphere with Refined Lighting */}
      <div className={styles.atmosphereLayer}>
        <img
          src={atmosphereSrc}
          alt=""
          className={styles.atmosphereImg}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className={styles.atmosphereRefinement} />
      </div>

      {/* Layer 2: Consecrated White Shivling with Realistic Contact Shadow */}
      <div className={styles.shivlingLayer}>
        <div className={styles.shivlingWrapper}>
          <img
            src={shivlingSrc}
            alt="Sri Gangeshwar Mahadev Shivling"
            className={styles.shivlingImg}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className={styles.contactShadow} aria-hidden="true">
            <div className={styles.shadowCore} />
            <div className={styles.shadowPenumbra} />
            <div className={styles.shadowAmbient} />
          </div>
        </div>
      </div>

      {/* Layer 3: Subtle Vignette Depth */}
      <div className={styles.vignetteLayer} />
    </div>
  );

  return (
    <>
      {/* High-priority asset preloading */}
      <link rel="preload" href={atmosphereSrc} as="image" type="image/webp" />
      <link rel="preload" href={shivlingSrc} as="image" type="image/webp" />

      {/* Mount directly to document.body on client to cover entire website viewport and navbar */}
      {mounted && typeof document !== 'undefined'
        ? createPortal(overlayElement, document.body)
        : overlayElement}
    </>
  );
}
