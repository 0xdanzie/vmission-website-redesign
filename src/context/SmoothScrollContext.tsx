'use client';

import React, { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export type ScrollTarget = string | number | HTMLElement;
export type ScrollOptions = Parameters<Lenis['scrollTo']>[1];

export interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: ScrollTarget, options?: ScrollOptions) => void;
  stop: () => void;
  start: () => void;
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function useSmoothScroll(): SmoothScrollContextValue {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error('useSmoothScroll must be used within a SmoothScrollProvider');
  }
  return context;
}

