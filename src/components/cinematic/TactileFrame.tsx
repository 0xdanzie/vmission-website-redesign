import React from 'react';
import { getAssetPath } from '@/utils/assetPath';
import styles from './TactileFrame.module.css';

interface TactileFrameProps {
  src: string;
  alt: string;
  caption?: string;
  dateTag?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'archival' | 'natural';
  objectPosition?: string;
  showOmBadge?: boolean;
  priority?: boolean;
  className?: string;
}

export default function TactileFrame({
  src,
  alt,
  caption,
  dateTag,
  aspectRatio = 'portrait',
  objectPosition,
  showOmBadge = true,
  priority = false,
  className = '',
}: TactileFrameProps) {
  return (
    <figure className={`${styles.frameContainer} ${className}`}>
      <div className={`${styles.frameBorderOuter} ${styles[aspectRatio]}`}>
        <div className={styles.frameBorderInner}>
          <img
            src={getAssetPath(src)}
            alt={alt}
            className={styles.frameImage}
            style={objectPosition ? { objectPosition } : undefined}
            loading={priority ? 'eager' : 'lazy'}
          />
          {showOmBadge && (
            <div className={styles.omBadge} aria-hidden="true">
              ॐ
            </div>
          )}
          <div className={styles.frameCornerTopLeft} aria-hidden="true" />
          <div className={styles.frameCornerTopRight} aria-hidden="true" />
          <div className={styles.frameCornerBottomLeft} aria-hidden="true" />
          <div className={styles.frameCornerBottomRight} aria-hidden="true" />
        </div>
      </div>
      {(caption || dateTag) && (
        <figcaption className={styles.frameCaption}>
          {dateTag && <span className={styles.dateTag}>{dateTag}</span>}
          {caption && <span className={styles.captionText}>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
