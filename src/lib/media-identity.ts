// Media Identity & Ownership Engine — Vedanta Mission
// Enforces strict entity boundaries for all site media assets
// Pre-implementation Safeguard: Truthful editorial placeholder > incorrect photograph

export type MediaCategory =
  | 'EVENT_PHOTO'
  | 'ACHARYA_PHOTO'
  | 'ASHRAM_PHOTO'
  | 'PUBLICATION_COVER'
  | 'EBOOK_COVER'
  | 'STUDY_TEXT_COVER'
  | 'TEACHING_COVER'
  | 'EDITORIAL_BACKGROUND';

export interface VerifiedMediaAsset {
  src: string;
  category: MediaCategory;
  ownerEntityId: string;
  alt: string;
  caption?: string;
  dimensions?: { width: number; height: number };
  focalPoint?: { x: number; y: number }; // Percentage 0-100
}

/**
 * Strictly isolates Tattva Bodha media so it cannot leak into unrelated entities.
 * CRITICAL RULE: study-text-tb-mula.jpg is scoped exclusively to book-000353 and Tattva Bodha.
 */
export const TATTVA_BODHA_ASSET_PATH = '/images/vmission/publications/study-text-tb-mula.jpg';

export function isTattvaBodhaAsset(src: string | null | undefined): boolean {
  if (!src) return false;
  return src.includes('study-text-tb-mula.jpg');
}

/**
 * Validates whether a media path is legitimately owned by the given entity.
 * Prevents cross-entity image leakage.
 */
export function validateMediaOwnership(
  entityId: string,
  entityCategory: MediaCategory,
  src: string | null | undefined
): boolean {
  if (!src) return false;

  // Enforce Tattva Bodha isolation
  if (isTattvaBodhaAsset(src)) {
    const isLegitimateTattvaBodha =
      entityId === 'book-000353' ||
      entityId === 'tattva-bodha' ||
      entityId.startsWith('course-tb') ||
      entityId.includes('tattva-bodha');
    return isLegitimateTattvaBodha && (entityCategory === 'STUDY_TEXT_COVER' || entityCategory === 'EBOOK_COVER');
  }

  return true;
}

/**
 * Safely resolves a publication cover image.
 * Returns null if the cover is missing, unverified, or attempts cross-entity leakage.
 */
export function resolvePublicationCover(
  entityId: string,
  publicationType: string,
  coverImage: string | null | undefined
): string | null {
  if (!coverImage) return null;

  // Filter out non-existent default placeholders
  if (
    coverImage.includes('default-cover') ||
    coverImage.includes('book-placeholder') ||
    coverImage.includes('vp-2019-')
  ) {
    return null;
  }

  // Enforce Tattva Bodha isolation
  if (isTattvaBodhaAsset(coverImage)) {
    if (entityId !== 'book-000353') {
      return null;
    }
  }

  return coverImage;
}
