'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  SmoothScrollContext,
  SmoothScrollContextValue,
  ScrollTarget,
  ScrollOptions,
} from '@/context/SmoothScrollContext';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<import('lenis').default | null>(null);
  const lenisRef = useRef<import('lenis').default | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    // Dynamically import Lenis + GSAP inside useEffect so they are NEVER
    // evaluated server-side. This is the correct pattern to prevent
    // Next.js hydration mismatches with DOM-dependent libraries.
    const init = async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (cancelled) return;

      // Register ScrollTrigger with GSAP
      gsap.registerPlugin(ScrollTrigger);

      // Initialize Lenis with cinematic, silky easing
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.8,
        autoRaf: false, // GSAP ticker drives the RAF loop
        autoToggle: true, // Automatically pauses when scroll is prevented
        stopInertiaOnNavigate: true,
        respectReducedMotion: true, // Honors prefers-reduced-motion accessibility
      });

      lenisRef.current = lenis;
      setLenisInstance(lenis);
      window.lenisInstance = lenis;

      // Connect Lenis scroll events to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Frame-synchronized RAF loop driven by GSAP ticker for 60Hz/120Hz displays
      const tickerUpdate = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerUpdate);
      // Disable lag smoothing to prevent visual stutter during momentum scroll
      gsap.ticker.lagSmoothing(0);

      // Handle internal anchor links (#hash) smoothly
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest('a');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href) return;

        // Only intercept on-page hash links
        if (href.startsWith('#') && href.length > 1) {
          const element = document.querySelector(href);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element as HTMLElement, {
              offset: -80, // Offset for fixed navigation header
              duration: 1.2,
            });
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);

      // Initial ScrollTrigger dimension calculation
      ScrollTrigger.refresh();

      // Store cleanup fn on the ref so the outer effect can call it
      (lenisRef as React.MutableRefObject<typeof lenis & { _cleanup?: () => void }>).current._cleanup = () => {
        document.removeEventListener('click', handleAnchorClick);
        gsap.ticker.remove(tickerUpdate);
        lenis.destroy();
        if (window.lenisInstance === lenis) {
          delete window.lenisInstance;
        }
      };
    };

    init();

    return () => {
      cancelled = true;
      const ref = lenisRef.current as (typeof lenisRef.current & { _cleanup?: () => void }) | null;
      if (ref?._cleanup) {
        ref._cleanup();
      }
      lenisRef.current = null;
      setLenisInstance(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle route changes — scroll reset + ScrollTrigger refresh
  useEffect(() => {
    if (!lenisRef.current) return;

    // If there's a hash in the URL, scroll smoothly to the target
    if (window.location.hash) {
      const targetEl = document.querySelector(window.location.hash);
      if (targetEl) {
        lenisRef.current.scrollTo(targetEl as HTMLElement, {
          offset: -80,
          duration: 1.2,
        });
        return;
      }
    }

    // Default: reset scroll instantly on route transition
    lenisRef.current.scrollTo(0, { immediate: true });

    // Defer ScrollTrigger refresh until new page dimensions settle
    const refreshTimer = setTimeout(async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(refreshTimer);
  }, [pathname]);

  const scrollTo = useCallback((target: ScrollTarget, options?: ScrollOptions) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const contextValue: SmoothScrollContextValue = {
    lenis: lenisInstance,
    scrollTo,
    stop,
    start,
  };

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
