'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './motion.module.css';

/**
 * Dual-layer cursor: a precise dot that follows instantly and a ring that
 * trails behind it. Expands over interactive elements and can show a label
 * via `data-cursor-text="View"`. Disabled on touch and reduced-motion devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add('vm-cursor-active');
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' });

    let visible = false;
    const show = () => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
    };

    const onMove = (e: PointerEvent) => {
      show();
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        'a, button, [role="button"], [data-cursor]'
      );
      if (!target) return;
      ring.classList.add(styles.hover);
      const text = target.dataset.cursorText;
      if (text) {
        label.textContent = text;
        ring.classList.add(styles.hasLabel);
      }
    };

    const onOut = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a, button, [role="button"], [data-cursor]');
      if (!target) return;
      ring.classList.remove(styles.hover, styles.hasLabel);
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    };

    const onDown = () => ring.classList.add(styles.pressed);
    const onUp = () => ring.classList.remove(styles.pressed);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      document.documentElement.classList.remove('vm-cursor-active');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.cursorDot} aria-hidden="true" />
      <div ref={ringRef} className={styles.cursorRing} aria-hidden="true">
        <span ref={labelRef} className={styles.cursorLabel} />
      </div>
    </>
  );
}
