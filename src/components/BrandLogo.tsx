import React from 'react';
import Image from 'next/image';

/**
 * Authoritative Vedanta Mission Brand Asset Mapping (Single Source of Truth)
 * Derived from the official approved production asset package in /public/brand/
 * Master brand color: #C96622 (RGB 201, 102, 34)
 */
export const brandAssets = {
  // Master Production Assets
  logo: '/brand/vedanta-mission-logo.svg',
  logoPng: '/brand/vedanta-mission-logo.png',
  mark: '/brand/vedanta-mission-mark.svg',
  markPng: '/brand/vedanta-mission-mark.png',

  // Core Mappings
  primary: '/brand/vedanta-mission-logo.svg',
  navbar: '/brand/vedanta-mission-logo.svg',
  footer: '/brand/vedanta-mission-logo.svg',
  mobile: '/brand/vedanta-mission-mark.svg',
  emblem: '/brand/vedanta-mission-mark.svg',

  // Legacy & Compatibility Aliases (all normalized to official master artwork)
  primaryWhite: '/brand/vedanta-mission-logo.svg',
  primaryDark: '/brand/vedanta-mission-logo.svg',
  primaryIvory: '/brand/vedanta-mission-logo.svg',
  navbarWhite: '/brand/vedanta-mission-logo.svg',
  mobileWhite: '/brand/vedanta-mission-mark.svg',
  emblemWhite: '/brand/vedanta-mission-mark.svg',
  emblemDark: '/brand/vedanta-mission-mark.svg',
  stacked: '/brand/vedanta-mission-logo.svg',
  stackedWhite: '/brand/vedanta-mission-logo.svg',
  stackedDark: '/brand/vedanta-mission-logo.svg',
  descriptor: '/brand/vedanta-mission-logo.svg',

  // Browser & App Icons
  favicon: '/brand/vedanta-mission/FAVICON/favicon.svg',
  faviconIco: '/favicon.ico',
  favicon16: '/brand/vedanta-mission/FAVICON/favicon-16.png',
  favicon32: '/brand/vedanta-mission/FAVICON/favicon-32.png',
  favicon48: '/brand/vedanta-mission/FAVICON/favicon-48.png',
  appleTouchIcon: '/brand/vedanta-mission/APP-ICONS/apple-touch-icon.png',
  icon192: '/brand/vedanta-mission/APP-ICONS/icon-192.png',
  icon512: '/brand/vedanta-mission/APP-ICONS/icon-512.png',
  maskable512: '/brand/vedanta-mission/APP-ICONS/maskable-512.png',
  ogPrimary: '/brand/vedanta-mission/SOCIAL/og-logo-primary.png',
  ogDark: '/brand/vedanta-mission/SOCIAL/og-logo-primary.png',
} as const;

export type BrandLogoVariant =
  | 'navbar'
  | 'mobile'
  | 'footer'
  | 'primary'
  | 'primary-white'
  | 'primary-dark'
  | 'emblem'
  | 'emblem-white'
  | 'header-walnut'
  | 'monochrome-light'
  | 'monochrome-dark'
  | 'emblem-only';

export type BrandLogoSize = 'sm' | 'md' | 'lg';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  size?: BrandLogoSize;
  showSubtitle?: boolean;
  className?: string;
  alt?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}

interface Dimensions {
  width: number;
  height: number;
}

/**
 * Optically calibrated intrinsic dimensions for each approved brand asset lockup.
 * All ratios strictly honor intrinsic geometry:
 * - Horizontal logo: 700 x 209 (aspect ratio ~3.349)
 * - Sun-and-Om mark: 512 x 512 (aspect ratio 1.000)
 */
function getDimensions(variant: BrandLogoVariant, size: BrandLogoSize): Dimensions {
  switch (variant) {
    case 'mobile':
    case 'emblem':
    case 'emblem-white':
    case 'emblem-only':
      // Sun-and-Om emblem mark: 1:1 aspect ratio
      if (size === 'sm') return { width: 32, height: 32 };
      if (size === 'lg') return { width: 48, height: 48 };
      return { width: 38, height: 38 };

    case 'footer':
      // Footer horizontal lockup with generous clear-space
      if (size === 'sm') return { width: 188, height: 56 };
      if (size === 'lg') return { width: 268, height: 80 };
      return { width: 228, height: 68 };

    case 'navbar':
    case 'header-walnut':
    case 'primary':
    case 'primary-white':
    case 'primary-dark':
    case 'monochrome-light':
    case 'monochrome-dark':
    default:
      // Horizontal lockup: 700 x 209 ratio
      // Calibrated to fit optically within 76px navbar geometry without displacing nav items
      if (size === 'sm') return { width: 168, height: 50 };
      if (size === 'lg') return { width: 235, height: 70 };
      return { width: 201, height: 60 };
  }
}

function getAssetSrc(variant: BrandLogoVariant): string {
  switch (variant) {
    case 'mobile':
    case 'emblem':
    case 'emblem-white':
    case 'emblem-only':
      return brandAssets.mark;
    case 'footer':
    case 'navbar':
    case 'primary':
    case 'primary-white':
    case 'primary-dark':
    case 'header-walnut':
    case 'monochrome-light':
    case 'monochrome-dark':
    default:
      return brandAssets.logo;
  }
}

export default function BrandLogo({
  variant = 'navbar',
  size = 'md',
  className = '',
  alt = 'Vedanta Mission',
  priority = false,
  style,
  imgStyle,
}: BrandLogoProps) {
  const src = getAssetSrc(variant);
  const dims = getDimensions(variant, size);

  return (
    <span
      className={`brand-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 0,
        verticalAlign: 'middle',
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={dims.width}
        height={dims.height}
        unoptimized
        priority={priority}
        style={{
          height: `${dims.height}px`,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
          ...imgStyle,
        }}
      />
    </span>
  );
}
