'use client';

/**
 * "ASCENDING TO THE DOME" — Enhanced Continuous Arrival Experience
 *
 * Implements continuous 3D spatial perspective, layered architectural depth,
 * 3D hinged sanctum doors, and seamless camera push transition to the homepage.
 *
 * Scene sequence:
 *  1. ARRIVAL     — Full-bleed Ashram facade with subtle camera drift
 *  2. ASCENDING   — Continuous 3D upward camera push toward the upper terrace & dome
 *  3. THRESHOLD   — Spatial 3D carved sanctum doors with hinge perspective
 *  4. ENTER       — 3D push through the parting doors into the inner sanctum & homepage reveal
 *  5. DONE        — Seamless handoff to the living homepage
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getAssetPath } from '@/utils/assetPath';
import styles from './AshramAscent.module.css';

export type AscentPhase =
  | 'ARRIVAL'
  | 'ASCENDING'
  | 'THRESHOLD'
  | 'ENTER'
  | 'DONE';

interface Props {
  onComplete: () => void;
}

const IMG = {
  entrance: getAssetPath('/images/vmission/entrance/ashram-entrance-cinematic.jpg'),
  facade: getAssetPath('/images/vmission/hero/ashram-facade-dome.jpg'),
  dome: getAssetPath('/images/vmission/ashram/gangeshwar-dome-closeup.jpg'),
  doors: getAssetPath('/images/vmission/ashram/sanctum-doors-threshold.jpg'),
  beyond: getAssetPath('/images/vmission/ashram/sanctum-interior-stage.jpg'),
};

// Timing schedule (ms) — tuned for smooth, immediate continuous cinematic arrival (Total ~2.2s desktop / ~1.8s mobile)
const TIMING_DESKTOP: Record<AscentPhase, number> = {
  ARRIVAL: 0,
  ASCENDING: 850,
  THRESHOLD: 750,
  ENTER: 600,
  DONE: 0,
};

const TIMING_MOBILE: Record<AscentPhase, number> = {
  ARRIVAL: 0,
  ASCENDING: 700,
  THRESHOLD: 600,
  ENTER: 500,
  DONE: 0,
};

export default function AshramAscent({ onComplete }: Props) {
  const [phase, setPhase] = useState<AscentPhase>('ARRIVAL');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const startedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    setIsMobile(window.matchMedia('(max-width: 640px)').matches);

    // Non-blocking prefetch of critical entrance transition assets only
    [IMG.doors, IMG.beyond].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const finish = useCallback(() => {
    setPhase('DONE');
    onComplete();
  }, [onComplete]);

  const skip = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    finish();
  }, [finish]);

  const advance = useCallback(
    (next: AscentPhase) => {
      const timing = isMobile ? TIMING_MOBILE : TIMING_DESKTOP;
      setPhase(next);
      if (next === 'DONE') {
        finish();
        return;
      }
      const duration = timing[next];
      timerRef.current = setTimeout(() => runNext(next), duration || 0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile, finish]
  );

  const runNext = useCallback(
    (current: AscentPhase) => {
      const order: AscentPhase[] = ['ARRIVAL', 'ASCENDING', 'THRESHOLD', 'ENTER', 'DONE'];
      const idx = order.indexOf(current);
      const next = order[idx + 1] ?? 'DONE';
      advance(next);
    },
    [advance]
  );

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (reducedMotion) {
      setPhase('ENTER');
      timerRef.current = setTimeout(finish, 300);
      return;
    }
    runNext('ARRIVAL');
  }, [reducedMotion, runNext, finish]);

  // Keyboard Escape listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') skip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [skip]);

  // Scroll or Touch nudge to begin
  useEffect(() => {
    if (phase !== 'ARRIVAL') return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 4) start();
    };
    let touchStartY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY == null) return;
      const dy = touchStartY - (e.touches[0]?.clientY ?? touchStartY);
      if (dy > 12) start();
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [phase, start]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (phase === 'DONE') return null;

  const isEntering = phase !== 'ARRIVAL';

  return (
    <div
      className={`${styles.root} ${phase === 'ENTER' ? styles.rootFading : ''}`}
      role="region"
      aria-label="Entrance experience — arriving at Vedanta Ashram"
    >
      {/* 3D Perspective Stage */}
      <div className={styles.viewport3D}>
        {reducedMotion ? (
          <div className={`${styles.stillLayer} ${phase === 'ENTER' ? styles.stillFading : ''}`}>
            <img src={IMG.entrance} alt="Vedanta Ashram, Indore" className={styles.stillImg} />
            <div className={styles.stillOverlay} />
            <div className={styles.stillContent}>
              <p className={styles.brandKicker}>VEDANTA MISSION</p>
              <h1 className={styles.brandTitle}>Vedanta Ashram, Indore</h1>
              <button type="button" className={styles.btnEnter} onClick={start} autoFocus>
                Enter the Ashram →
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* 1. CINEMATIC ENVIRONMENT: Main Ashram Entrance & Camera Push */}
            <div
              className={[
                styles.scene,
                styles.sceneCinematicEntrance,
                styles.sceneActive,
                phase === 'ASCENDING' ? styles.sceneAscending : '',
                phase === 'THRESHOLD' ? styles.sceneThresholdStage : '',
                phase === 'ENTER' ? styles.sceneEntering : '',
              ].join(' ')}
            >
              <img
                src={IMG.entrance}
                alt="Sri Gangeshwar Mahadev Sanctum Entrance at Vedanta Ashram"
                className={styles.sceneImg}
                loading="eager"
              />
              <div className={styles.facadeDepthVignette} />
              <div className={styles.sanctumWarmthGlow} />
            </div>

            {/* 2. SPATIAL 3D CARVED SANCTUM DOORS & INNER SANCTUM REVEAL */}
            {(phase === 'THRESHOLD' || phase === 'ENTER') && (
              <div
                className={[
                  styles.scene,
                  styles.sceneThreshold,
                  styles.sceneActive,
                  phase === 'ENTER' ? styles.sceneEntering : '',
                ].join(' ')}
              >
                {/* Inner Sanctum beyond the doors */}
                <div className={styles.innerSanctumWrap}>
                  <img
                    src={IMG.beyond}
                    alt="Sri Gangeshwar Mahadev Inner Sanctum"
                    className={styles.beyondImg}
                    loading="eager"
                  />
                  <div className={styles.sanctumWarmthGlow} />
                </div>

                {/* 3D Carved Sanctum Doors with Outward Hinge */}
                <div className={styles.doorPortal3D} aria-hidden="true">
                  <div className={styles.doorArchTrim} />
                  <div
                    className={[
                      styles.doorLeaf,
                      styles.doorLeafLeft,
                      phase === 'ENTER' ? styles.doorLeafOpen : '',
                    ].join(' ')}
                  >
                    <div
                      className={styles.doorLeafTexture}
                      style={{ backgroundImage: `url(${IMG.doors})` }}
                    />
                    <div className={styles.doorShadowOverlay} />
                  </div>
                  <div
                    className={[
                      styles.doorLeaf,
                      styles.doorLeafRight,
                      phase === 'ENTER' ? styles.doorLeafOpen : '',
                    ].join(' ')}
                  >
                    <div
                      className={styles.doorLeafTexture}
                      style={{ backgroundImage: `url(${IMG.doors})` }}
                    />
                    <div className={styles.doorShadowOverlay} />
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Atmospheric Light Bloom */}
            <div
              className={[
                styles.lightBloom,
                isEntering ? styles.lightBloomActive : '',
                phase === 'ENTER' ? styles.lightBloomFlash : '',
              ].join(' ')}
              aria-hidden="true"
            />

            {/* HUD / Branding Overlay */}
            <div className={`${styles.hud} ${isEntering ? styles.hudFading : ''}`}>
              <div className={styles.hudTop}>
                <div className={styles.hudBrandBadge}>
                  <span className={styles.omMark} aria-hidden="true">ॐ</span>
                  <div>
                    <p className={styles.hudMission}>VEDANTA MISSION</p>
                    <p className={styles.hudLocation}>Indore Ashram · Traditional Advaita</p>
                  </div>
                </div>
              </div>

              <div className={styles.hudCenter}>
                <p className={styles.hudSanskrit}>सत्यं ज्ञानमनन्तं ब्रह्म</p>
                <h1 className={styles.hudTitle}>Enter the Ashram</h1>
                <p className={styles.hudTagline}>
                  Visit the residential Gurukula in Indore, Central India
                </p>

                <div className={styles.hudActionWrap}>
                  <button type="button" className={styles.btnEnter} onClick={start}>
                    Begin Continuous Entrance →
                  </button>
                  <span className={styles.hudHint}>or scroll down to enter</span>
                </div>
              </div>

              <div className={styles.hudBottomBar}>
                <span>Consecrated Sri Gangeshwar Mahadev Sanctum</span>
                <span>•</span>
                <span>Advaita Vedanta Lineage</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Skip Button (Top Right) */}
      <button
        type="button"
        className={styles.btnSkip}
        onClick={skip}
        aria-label="Skip entrance animation and proceed directly to homepage"
      >
        Skip to Homepage ✕
      </button>
    </div>
  );
}
