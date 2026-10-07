import React from 'react';
import Link from 'next/link';
import { getAssetPath } from '@/utils/assetPath';
import Button from '@/components/Button';
import styles from './CinematicHero.module.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CtaItem {
  label: string;
  href: string;
  variant?: 'primary' | 'outline' | 'secondary';
}

export interface HeroFocalPoint {
  x: number | string;
  y: number | string;
}

export type HeroFocalConfig =
  | HeroFocalPoint
  | {
      desktop?: HeroFocalPoint;
      mobile?: HeroFocalPoint;
      x?: number | string;
      y?: number | string;
    };

interface CinematicHeroProps {
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  sanskritInvocation?: string;
  title: string;
  subtitle?: string;
  lead: string;
  backdropImage: string;
  backdropAlt?: string;
  backdropPositionClass?: string;
  backdropPositionStyle?: React.CSSProperties;
  focalPoint?: HeroFocalConfig;
  className?: string;
  ctas?: CtaItem[];
  variant?: 'default' | 'compact' | 'studyDesk';
}

export default function CinematicHero({
  badge,
  breadcrumbs,
  sanskritInvocation,
  title,
  subtitle,
  lead,
  backdropImage,
  backdropAlt = 'Vedanta Ashram architectural background',
  backdropPositionClass,
  backdropPositionStyle,
  focalPoint,
  className,
  ctas,
  variant = 'default',
}: CinematicHeroProps) {
  // Resolve desktop and mobile focal points
  let desktopPos: string | undefined;
  let mobilePos: string | undefined;

  if (focalPoint) {
    if ('desktop' in focalPoint && focalPoint.desktop) {
      const dx = typeof focalPoint.desktop.x === 'number' ? `${focalPoint.desktop.x}%` : focalPoint.desktop.x;
      const dy = typeof focalPoint.desktop.y === 'number' ? `${focalPoint.desktop.y}%` : focalPoint.desktop.y;
      desktopPos = `${dx} ${dy}`;
    } else if ('x' in focalPoint && focalPoint.x !== undefined && 'y' in focalPoint && focalPoint.y !== undefined) {
      const dx = typeof focalPoint.x === 'number' ? `${focalPoint.x}%` : focalPoint.x;
      const dy = typeof focalPoint.y === 'number' ? `${focalPoint.y}%` : focalPoint.y;
      desktopPos = `${dx} ${dy}`;
    }

    if ('mobile' in focalPoint && focalPoint.mobile) {
      const mx = typeof focalPoint.mobile.x === 'number' ? `${focalPoint.mobile.x}%` : focalPoint.mobile.x;
      const my = typeof focalPoint.mobile.y === 'number' ? `${focalPoint.mobile.y}%` : focalPoint.mobile.y;
      mobilePos = `${mx} ${my}`;
    }
  }

  const combinedImgStyle: React.CSSProperties = {
    ...backdropPositionStyle,
    ...(desktopPos ? ({ ['--hero-focal-desktop']: desktopPos } as React.CSSProperties) : {}),
    ...(mobilePos ? ({ ['--hero-focal-mobile']: mobilePos } as React.CSSProperties) : {}),
  };

  return (
    <section
      className={`${styles.heroCinematic} ${variant === 'compact' ? styles.heroCompact : ''} ${
        variant === 'studyDesk' ? styles.heroStudyDesk : ''
      } ${className || ''}`}
      aria-label={title}
    >
      <div className={styles.heroBackdrop}>
        <img
          src={getAssetPath(backdropImage)}
          alt={backdropAlt}
          className={`${styles.heroBackdropImg} ${backdropPositionClass || ''}`}
          style={combinedImgStyle}
          loading="eager"
        />
        <div className={styles.heroBackdropGradient} />
        <div className={styles.heroBackdropTexture} />
      </div>

      <div className={styles.heroBottomDawnTransition} aria-hidden="true" />

      <div className="container">
        <div className={styles.heroContentWrap}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className={styles.breadcrumbsNav} aria-label="Breadcrumb">
              <ol className={styles.breadcrumbList}>
                {breadcrumbs.map((item, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;
                  return (
                    <li key={idx} className={styles.breadcrumbItem}>
                      {item.href && !isLast ? (
                        <Link href={item.href} className={styles.breadcrumbLink}>
                          {item.label}
                        </Link>
                      ) : (
                        <span className={styles.breadcrumbCurrent} aria-current={isLast ? 'page' : undefined}>
                          {item.label}
                        </span>
                      )}
                      {!isLast && <span className={styles.breadcrumbSep} aria-hidden="true">/</span>}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          {badge && (
            <div className={styles.heroIdentityCue}>
              <span>{badge}</span>
            </div>
          )}

          {sanskritInvocation && (
            <p className={styles.heroSanskrit}>{sanskritInvocation}</p>
          )}

          <h1 className={styles.heroMainTitle}>
            {title}
            {subtitle && <span className={styles.heroSubTitle}>{subtitle}</span>}
          </h1>

          <p className={styles.heroDescription}>{lead}</p>

          {ctas && ctas.length > 0 && (
            <div className={styles.heroCtaRow}>
              {ctas.map((cta, idx) => (
                <Button
                  key={idx}
                  href={cta.href}
                  variant={cta.variant || (idx === 0 ? 'primary' : 'outline')}
                  size="lg"
                  className={idx > 0 ? styles.btnHeroSecondary : undefined}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
