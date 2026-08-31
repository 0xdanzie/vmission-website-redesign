import React from 'react';
import { getAssetPath } from '@/utils/assetPath';
import styles from './AshramImage.module.css';

export type AshramImageType =
  | 'ashram-hero'
  | 'ashram-hero-cinematic'
  | 'ashram-exterior'
  | 'ashram-entrance'
  | 'ashram-entrance-cinematic'
  | 'gangeshwar-mandir'
  | 'gangeshwar-dome-closeup'
  | 'sanctum-doors'
  | 'meditation-hall'
  | 'library'
  | 'dining-hall'
  | 'rooms'
  | 'garden'
  | 'satsang'
  | 'gathering'
  | 'scriptural-study'
  | 'teaching-closeup'
  | 'swami-atmananda'
  | 'swami-atmananda-portrait'
  | 'swamini-amitananda'
  | 'swamini-samatananda'
  | 'swamini-poornananda'
  | 'vedanta-sandesh'
  | 'vedanta-piyush';

interface Props {
  type: AshramImageType;
  alt: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4' | '4/5' | '2/1' | '16/10';
  caption?: string;
  badge?: string;
}

const AUTHENTIC_ASSET_MAP: Partial<Record<AshramImageType, string>> = {
  'ashram-hero': '/images/vmission/hero/ashram-facade-dome.jpg',
  'ashram-hero-cinematic': '/images/vmission/hero/vmission-hero-cinematic.jpg',
  'ashram-exterior': '/images/vmission/hero/ashram-facade-elevated.jpg',
  'ashram-entrance': '/images/vmission/hero/ashram-facade-dome.jpg',
  'ashram-entrance-cinematic': '/images/vmission/entrance/ashram-entrance-cinematic.jpg',
  'gangeshwar-mandir': '/images/vmission/ashram/sanctum-doors-threshold.jpg',
  'gangeshwar-dome-closeup': '/images/vmission/ashram/gangeshwar-dome-closeup.jpg',
  'sanctum-doors': '/images/vmission/ashram/sanctum-doors-threshold.jpg',
  'meditation-hall': '/images/vmission/ashram/sanctum-interior-stage.jpg',
  'library': '/images/vmission/ashram/teaching-hall-interior.jpg',
  'dining-hall': '/images/vmission/worship/morning-aarti.jpg',
  'rooms': '/images/vmission/ashram/acharya-community-portrait.jpg',
  'garden': '/images/vmission/ashram/courtyard-with-guruji.jpg',
  'satsang': '/images/vmission/community/satsang-with-acharya.jpg',
  'gathering': '/images/vmission/community/residential-camp-gathering.jpg',
  'scriptural-study': '/images/vmission/community/residential-camp-gathering.jpg',
  'teaching-closeup': '/images/vmission/acharyas/guruji-teaching-closeup.jpg',
  'swami-atmananda': '/images/vmission/acharyas/guruji-portrait-riverside.jpg',
  'swami-atmananda-portrait': '/images/vmission/acharyas/guruji-portrait-riverside.jpg',
  'swamini-amitananda': '/images/vmission/acharyas/swamini-amitananda.jpg',
  'swamini-samatananda': '/images/vmission/acharyas/swamini-samatananda.jpg',
  'swamini-poornananda': '/images/vmission/acharyas/swamini-poornananda.jpg',
  'vedanta-sandesh': '/images/vmission/publications/vedanta-sandesh-jan21.jpg',
  'vedanta-piyush': '/images/vmission/publications/vedanta-piyush-cover.svg',
};

const SCENE_CONFIG: Record<
  AshramImageType,
  {
    icon: string;
    title: string;
    location: string;
    palette: [string, string];
    watermark: string;
  }
> = {
  'ashram-hero': {
    icon: '🏛️',
    title: 'Vedanta Ashram Campus',
    location: 'Sudama Nagar, Indore',
    palette: ['#FAF3E7', '#EAD7B9'],
    watermark: 'वेदान्त आश्रम',
  },
  'ashram-hero-cinematic': {
    icon: '🏛️',
    title: 'Vedanta Mission Ashram & Acharyas',
    location: 'Sudama Nagar, Indore · Advaita Lineage',
    palette: ['#1A1410', '#E3A361'],
    watermark: 'वेदान्त आश्रम',
  },
  'ashram-exterior': {
    icon: '🏛️',
    title: 'Vedanta Ashram Building',
    location: 'Sector-E, Sudama Nagar, Indore',
    palette: ['#F5EDE0', '#E2D3BE'],
    watermark: 'वेदान्त आश्रम',
  },
  'ashram-entrance': {
    icon: '🚪',
    title: 'Vedanta Ashram Entrance',
    location: 'Sudama Nagar, Indore',
    palette: ['#FAF0E6', '#E8D8C3'],
    watermark: 'वेदान्त आश्रम',
  },
  'ashram-entrance-cinematic': {
    icon: '🕉️',
    title: 'Sri Gangeshwar Mahadev Sanctum Portal',
    location: 'Ashram Courtyard & Sanctum Threshold',
    palette: ['#1A1410', '#E3A361'],
    watermark: 'गङ्गेश्वर महादेव',
  },
  'gangeshwar-mandir': {
    icon: '🕉️',
    title: 'Sri Gangeshwar Mahadev Mandir',
    location: 'Consecrated Temple Sanctum',
    palette: ['#FAF1E8', '#DFCEB7'],
    watermark: 'गङ्गेश्वर महादेव',
  },
  'gangeshwar-dome-closeup': {
    icon: '🕉️',
    title: 'Sri Gangeshwar Mahadev',
    location: 'The Ashram’s Landmark Shivling Dome',
    palette: ['#FAF1E8', '#DFCEB7'],
    watermark: 'गङ्गेश्वर महादेव',
  },
  'sanctum-doors': {
    icon: '🚪',
    title: 'The Sanctum Doors',
    location: 'Carved Wooden Threshold to the Mandir',
    palette: ['#F6E9DA', '#DCC4A2'],
    watermark: 'गङ्गेश्वर महादेव',
  },
  'meditation-hall': {
    icon: '🧘',
    title: 'Dhyana & Pravachan Hall',
    location: 'Silence & Discourse Hall',
    palette: ['#F7EEE4', '#E6D7C3'],
    watermark: 'ध्यान मण्डप',
  },
  'library': {
    icon: '📚',
    title: 'Vedanta Scriptural Library',
    location: 'Sanskrit & Bhashya Repository',
    palette: ['#EFE5D5', '#D8C6B0'],
    watermark: 'ज्ञान गङ्गा',
  },
  'dining-hall': {
    icon: '🍲',
    title: 'Annapurna Dining Hall',
    location: 'Sattwic Bhiksha & Prasadam',
    palette: ['#FBF3E8', '#ECDAC4'],
    watermark: 'अन्नपूर्णा',
  },
  'rooms': {
    icon: '🛏️',
    title: 'Inmate & Seeker Quarters',
    location: 'Clean Residential Rooms (~24 Capacity)',
    palette: ['#FAF2EB', '#E3D2BF'],
    watermark: 'सत्संग निवास',
  },
  'garden': {
    icon: '🌿',
    title: 'Ashram Garden & Courtyard',
    location: 'Lush Peaceful Surroundings',
    palette: ['#EDF4EC', '#D4E2D3'],
    watermark: 'शान्ति वनम्',
  },
  'satsang': {
    icon: '🎙️',
    title: 'Gyana Yagna & Daily Satsang',
    location: 'Discourses by Acharyas',
    palette: ['#FAF0E6', '#E9DAC5'],
    watermark: 'सत्संग सभा',
  },
  'gathering': {
    icon: '🪔',
    title: 'Residential Camp Gathering',
    location: 'Seekers Assembled for Satsang',
    palette: ['#FAF0E6', '#E9DAC5'],
    watermark: 'सत्संग सभा',
  },
  'scriptural-study': {
    icon: '📖',
    title: 'Gita & Upanishad Study Circle',
    location: 'Traditional Gurukula Classes',
    palette: ['#F6EFE5', '#DFCDB6'],
    watermark: 'श्रवण मनन',
  },
  'swami-atmananda': {
    icon: '🙏',
    title: 'Swami Atmananda Saraswati',
    location: 'Founder & Head Acharya',
    palette: ['#FDF1EA', '#E6C6B3'],
    watermark: 'स्वामी आत्मानन्द',
  },
  'swami-atmananda-portrait': {
    icon: '🙏',
    title: 'Swami Atmananda Saraswati',
    location: 'Founder & Head Acharya',
    palette: ['#FDF1EA', '#E6C6B3'],
    watermark: 'स्वामी आत्मानन्द',
  },
  'teaching-closeup': {
    icon: '🙏',
    title: 'Poojya Guruji Teaching',
    location: 'Discourse in Progress',
    palette: ['#FDF1EA', '#E6C6B3'],
    watermark: 'स्वामी आत्मानन्द',
  },
  'swamini-amitananda': {
    icon: '🙏',
    title: 'Swamini Amitananda Saraswati',
    location: 'Senior Acharya',
    palette: ['#FDF2EB', '#E8CEBD'],
    watermark: 'स्वामिनी अमितानन्द',
  },
  'swamini-samatananda': {
    icon: '🙏',
    title: 'Swamini Samatananda Saraswati',
    location: 'Acharya · Sanskrit Faculty',
    palette: ['#FAF2EB', '#E5CEBC'],
    watermark: 'स्वामिनी समतानन्द',
  },
  'swamini-poornananda': {
    icon: '🙏',
    title: 'Swamini Poornananda Saraswati',
    location: 'Acharya · Resident Faculty',
    palette: ['#FAF1EB', '#E6CDB9'],
    watermark: 'स्वामिनी पूर्णानन्द',
  },
  'vedanta-sandesh': {
    icon: '📰',
    title: 'Vedanta Sandesh',
    location: 'Monthly E-Magazine (English / Hindi)',
    palette: ['#FAF0E6', '#DFCEB7'],
    watermark: 'वेदान्त सन्देश',
  },
  'vedanta-piyush': {
    icon: '📰',
    title: 'Vedanta Piyush',
    location: 'Monthly E-Magazine (Hindi / Gujarati)',
    palette: ['#FBF3E8', '#DFCEB7'],
    watermark: 'वेदान्त पीयूष',
  },
};

export default function AshramImage({
  type,
  alt,
  className = '',
  aspectRatio = '16/9',
  caption,
  badge,
}: Props) {
  const config = SCENE_CONFIG[type] || SCENE_CONFIG['ashram-exterior'];
  const assetSrc = AUTHENTIC_ASSET_MAP[type];

  const aspectStyles: Record<string, string> = {
    '16/9': '56.25%',
    '16/10': '62.5%',
    '4/3': '75%',
    '4/5': '125%',
    '1/1': '100%',
    '3/4': '133.33%',
    '2/1': '50%',
  };

  const paddingTop = aspectStyles[aspectRatio] || '56.25%';

  return (
    <figure className={`${styles.figure} ${className}`}>
      <div
        className={styles.imageContainer}
        style={{
          paddingTop,
          background: `linear-gradient(145deg, ${config.palette[0]} 0%, ${config.palette[1]} 100%)`,
        }}
        role="img"
        aria-label={alt}
      >
        {assetSrc ? (
          <img
            src={getAssetPath(assetSrc)}
            alt={alt}
            className={styles.realImg}
            loading="lazy"
          />
        ) : (
          <>
            <div className={styles.watermarkText} aria-hidden="true">
              {config.watermark}
            </div>

            <div className={styles.contentOverlay}>
              <div className={styles.iconCircle} aria-hidden="true">
                {config.icon}
              </div>
              <div className={styles.metaBox}>
                <p className={styles.titleText}>{config.title}</p>
                <p className={styles.locText}>{config.location}</p>
              </div>
            </div>

            <div className={styles.sacredCorner} aria-hidden="true">
              ॐ
            </div>
          </>
        )}

        {badge && <span className={styles.badge}>{badge}</span>}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
