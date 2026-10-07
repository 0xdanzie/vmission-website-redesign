'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollMotion() {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion user preference
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Disconnect previous observer on route change
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Single lightweight IntersectionObserver for gentle editorial section reveals
    // Root margin triggers reveal slightly before reaching viewport center (-8% bottom margin)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vm-revealed');
            // Unobserve immediately: element stays permanently visible and stable
            // Ensures natural, friction-free scrolling in both downward and upward directions
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.02,
      }
    );
    observerRef.current = observer;

    // Attach progressive reveals to main content sections
    const frameId = requestAnimationFrame(() => {
      const windowHeight = window.innerHeight;
      const sections = document.querySelectorAll<HTMLElement>(
        '#main-content > section, #main-content section[aria-label], [data-scroll-reveal]'
      );

      sections.forEach((sec) => {
        // Exclude elements already in view above the fold to prevent initial flash
        const rect = sec.getBoundingClientRect();
        if (rect.top < windowHeight * 0.85) {
          sec.classList.add('vm-scroll-section', 'vm-revealed');
        } else {
          sec.classList.add('vm-scroll-section');
          observer.observe(sec);
        }
      });
    });

    // Subtle scroll depth for featured imagery (clamped to 4-6px desktop, 2-3px mobile)
    const isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
    const maxOffset = isMobile ? 3 : 6;
    let ticking = false;

    const depthElements = document.querySelectorAll<HTMLElement>('[data-scroll-depth]');

    const updateDepth = () => {
      const vh = window.innerHeight;
      depthElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom >= -100 && rect.top <= vh + 100) {
          const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
          const clamped = Math.max(-1, Math.min(1, progress));
          const offset = Math.round(clamped * maxOffset);
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking && depthElements.length > 0) {
        ticking = true;
        rafIdRef.current = requestAnimationFrame(updateDepth);
      }
    };

    if (depthElements.length > 0) {
      window.addEventListener('scroll', onScroll, { passive: true });
      updateDepth();
    }

    return () => {
      cancelAnimationFrame(frameId);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (observerRef.current) observerRef.current.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  return null;
}
