// Data: Publications — Vedanta Mission
// Vedanta Sandesh and Vedanta Piyush
// Official Cover Assets sourced from vmission.org.in

export type PublicationType = 'Vedanta Sandesh' | 'Vedanta Piyush';

export interface Publication {
  id: string;
  type: PublicationType;
  title: string;
  month: string;
  year: number;
  coverImage: string;
  language: string;
  description: string;
  archiveUrl: string; // External Archive.org or GDrive link
  downloadUrl: string; // Direct PDF link
  isLatest?: boolean;
  pageCount?: number;
}

export const publications: Publication[] = [
  // Vedanta Sandesh
  {
    id: 'vs-aug-2026',
    type: 'Vedanta Sandesh',
    title: 'Vedanta Sandesh — August 2026',
    month: 'August',
    year: 2026,
    coverImage: '/images/vmission/publications/vedanta-sandesh-jan21.jpg',
    language: 'English / Hindi',
    description:
      'The August 2026 issue of Vedanta Sandesh — Vedanta Mission\'s monthly e-magazine. Features discourses on the Bhagavad Gita, ashram news, upcoming programs, and reflections from the Acharyas.',
    archiveUrl: 'https://archive.org/details/vedantasandesh_aug2026',
    downloadUrl: 'https://drive.google.com/file/d/1uO-lpEJtJsai3QrxLTOq9ZSx1nDSlU8_/view',
    isLatest: true,
    pageCount: 36,
  },
  {
    id: 'vs-jul-2026',
    type: 'Vedanta Sandesh',
    title: 'Vedanta Sandesh — July 2026',
    month: 'July',
    year: 2026,
    coverImage: '/images/vmission/publications/vedanta-sandesh-dec20.jpg',
    language: 'English / Hindi',
    description:
      'The July 2026 issue, featuring discourses on the Upanishads, reflections on Guru Poornima, and ashram updates.',
    archiveUrl: '#',
    downloadUrl: '#',
    pageCount: 36,
  },
  {
    id: 'vs-jun-2026',
    type: 'Vedanta Sandesh',
    title: 'Vedanta Sandesh — June 2026',
    month: 'June',
    year: 2026,
    coverImage: '/images/vmission/publications/vedanta-sandesh-sep20.jpg',
    language: 'English / Hindi',
    description:
      'The June 2026 issue containing commentary on Kenopanishad and essays on sadhana.',
    archiveUrl: '#',
    downloadUrl: '#',
    pageCount: 32,
  },
  {
    id: 'vs-dec-2025',
    type: 'Vedanta Sandesh',
    title: 'Vedanta Sandesh — December 2025',
    month: 'December',
    year: 2025,
    coverImage: '/images/vmission/publications/vedanta-sandesh-dec20.jpg',
    language: 'English / Hindi',
    description:
      'Special Gita Jayanti issue featuring verse-by-verse analysis of Chapter 12: Bhakti Yoga.',
    archiveUrl: '#',
    downloadUrl: '#',
    pageCount: 40,
  },
  {
    id: 'vs-nov-2025',
    type: 'Vedanta Sandesh',
    title: 'Vedanta Sandesh — November 2025',
    month: 'November',
    year: 2025,
    coverImage: '/images/vmission/publications/vedanta-sandesh-sep20.jpg',
    language: 'English / Hindi',
    description:
      'Deepening inquiry through Vivekachudamani reflections and ashram news.',
    archiveUrl: '#',
    downloadUrl: '#',
    pageCount: 32,
  },

  // Vedanta Piyush (Hindi / Gujarati)
  {
    id: 'vp-aug-2026',
    type: 'Vedanta Piyush',
    title: 'Vedanta Piyush — August 2026',
    month: 'August',
    year: 2026,
    coverImage: '/images/vmission/publications/vedanta-piyush-cover.svg',
    language: 'Hindi / Gujarati',
    description:
      'Vedanta Piyush Hindi & Gujarati edition: Shrimad Bhagavad Gita pravachan, Mandir aarti varta, and sadhak prashnottari.',
    archiveUrl: '#',
    downloadUrl: '#',
    isLatest: true,
    pageCount: 28,
  },
  {
    id: 'vp-jul-2026',
    type: 'Vedanta Piyush',
    title: 'Vedanta Piyush — July 2026',
    month: 'July',
    year: 2026,
    coverImage: '/images/vmission/publications/vedanta-piyush-cover.svg',
    language: 'Hindi / Gujarati',
    description:
      'July 2026 issue covering Guru Mahima, Upanishad Bhashya, and Ashram events.',
    archiveUrl: '#',
    downloadUrl: '#',
    pageCount: 28,
  },
];

export const availableYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
