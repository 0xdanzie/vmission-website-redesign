'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared scroll-reveal system. Mark up elements with these attributes:
 *  - data-reveal         fade and rise into view
 *  - data-stagger        children fade and rise one after another
 *  - data-clip           image opens from a smaller inset
 *  - data-zoom           wrapper whose <img> settles from a slight zoom
 *  - data-rule           horizontal rule that draws in
 *  - data-words          words of a quote light up as you scroll
 *  - data-parallax       element drifts slightly against the scroll
 * Scoped to `root`, reverted on unmount, and disabled for reduced motion.
 */
export function useScrollReveals(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-clip]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(14% 10% 14% 10%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.6,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });

      root.querySelectorAll<HTMLImageElement>('[data-zoom] img').forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.22 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      root.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
        gsap.fromTo(
          Array.from(group.children),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          }
        );
      });

      root.querySelectorAll<HTMLElement>('[data-rule]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }
        );
      });

      root.querySelectorAll<HTMLElement>('[data-words]').forEach((quote) => {
        gsap.fromTo(
          quote.querySelectorAll('[data-word]'),
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: 'none',
            scrollTrigger: { trigger: quote, start: 'top 78%', end: 'bottom 55%', scrub: true },
          }
        );
      });

      root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = window.setTimeout(refresh, 400);

    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [rootRef]);
}
