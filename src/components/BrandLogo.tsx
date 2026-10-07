import React from 'react';
import Image from 'next/image';

/**
 * Authoritative Vedanta Mission Brand Asset Mapping (Single Source of Truth)
 * Derived from the official approved production asset package in /public/brand/vedanta-mission/
 */
export const brandAssets = {
  primary: '/brand/vedanta-mission/SVG/vedanta-mission-primary.svg',
  primaryWhite: '/brand/vedanta-mission/SVG/vedanta-mission-primary-white.svg',
  primaryDark: '/brand/vedanta-mission/SVG/vedanta-mission-primary-dark.svg',
  primaryIvory: '/brand/vedanta-mission/SVG/vedanta-mission-primary-ivory.svg',
  navbar: '/brand/vedanta-mission/WEB/vedanta-mission-navbar.svg',
  navbarWhite: '/brand/vedanta-mission/SVG/vedanta-mission-primary-white.svg',
  mobile: '/brand/vedanta-mission/WEB/vedanta-mission-mobile.svg',
  mobileWhite: '/brand/vedanta-mission/SVG/vedanta-mission-emblem-white.svg',
  footer: '/brand/vedanta-mission/WEB/vedanta-mission-footer.svg',
  emblem: '/brand/vedanta-mission/SVG/vedanta-mission-emblem.svg',
  emblemWhite: '/brand/vedanta-mission/SVG/vedanta-mission-emblem-white.svg',
  emblemDark: '/brand/vedanta-mission/SVG/vedanta-mission-emblem-dark.svg',
  stacked: '/brand/vedanta-mission/SVG/vedanta-mission-stacked.svg',
  stackedWhite: '/brand/vedanta-mission/SVG/vedanta-mission-stacked-white.svg',
  stackedDark: '/brand/vedanta-mission/SVG/vedanta-mission-stacked-dark.svg',
  descriptor: '/brand/vedanta-mission/SVG/vedanta-mission-descriptor.svg',
  favicon: '/brand/vedanta-mission/FAVICON/favicon.svg',
  faviconIco: '/brand/vedanta-mission/FAVICON/favicon.ico',
  favicon16: '/brand/vedanta-mission/FAVICON/favicon-16.png',
  favicon32: '/brand/vedanta-mission/FAVICON/favicon-32.png',
  favicon48: '/brand/vedanta-mission/FAVICON/favicon-48.png',
  appleTouchIcon: '/brand/vedanta-mission/APP-ICONS/apple-touch-icon.png',
  icon192: '/brand/vedanta-mission/APP-ICONS/icon-192.png',
  icon512: '/brand/vedanta-mission/APP-ICONS/icon-512.png',
  maskable512: '/brand/vedanta-mission/APP-ICONS/maskable-512.png',
  ogPrimary: '/brand/vedanta-mission/SOCIAL/og-logo-primary.png',
  ogDark: '/brand/vedanta-mission/SOCIAL/og-logo-dark.png',
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
 * All ratios strictly honor intrinsic SVG viewBox geometry.
 */
function getDimensions(variant: BrandLogoVariant, size: BrandLogoSize): Dimensions {
  switch (variant) {
    case 'footer':
      // Footer descriptor lockup: viewBox 0 0 588.530 178.725 (ratio ~3.2929)
      // Minimum brand clear-space spec: 220px min width
      if (size === 'sm') return { width: 220, height: 67 };
      if (size === 'lg') return { width: 280, height: 85 };
      return { width: 240, height: 73 };

    case 'mobile':
    case 'emblem':
    case 'emblem-white':
    case 'emblem-only':
      // Emblem mark: viewBox 0 0 168.25 177.5 (ratio ~0.9479)
      // Preferred UI sizing: 24px - 44px
      if (size === 'sm') return { width: 30, height: 32 };
      if (size === 'lg') return { width: 42, height: 44 };
      return { width: 36, height: 38 };

    case 'navbar':
    case 'header-walnut':
    case 'primary':
    case 'primary-white':
    case 'primary-dark':
    case 'monochrome-light':
    case 'monochrome-dark':
    default:
      // Horizontal lockup: viewBox 0 0 536.363 187.500 (ratio ~2.8606)
      // Fits optically within 72px navbar geometry without displacing nav items
      if (size === 'sm') return { width: 140, height: 49 };
      if (size === 'lg') return { width: 185, height: 65 };
      return { width: 175, height: 61 };
  }
}

function getAssetSrc(variant: BrandLogoVariant): string {
  switch (variant) {
    case 'navbar':
      return brandAssets.navbar;
    case 'mobile':
    case 'emblem-only':
      return brandAssets.mobile;
    case 'footer':
      return brandAssets.footer;
    case 'primary':
      return brandAssets.primary;
    case 'primary-white':
    case 'monochrome-light':
      return brandAssets.primaryWhite;
    case 'primary-dark':
    case 'monochrome-dark':
      return brandAssets.primaryDark;
    case 'emblem':
      return brandAssets.emblem;
    case 'emblem-white':
      return brandAssets.emblemWhite;
    case 'header-walnut':
    default:
      return brandAssets.navbar;
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
