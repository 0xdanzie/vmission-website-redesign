// Data: Teachings / Jnana Ganga — Vedanta Mission
// Single Canonical Source of Truth for Unified Knowledge Library
// Traceable to Phase 3B.0 Master Content Inventory and Phase 3D.1 Forensic Content Verification

export type TeachingFormat = 'Audio' | 'Video' | 'PDF' | 'E-Book';
export type TeachingLanguage =
  | 'English'
  | 'Hindi'
  | 'Sanskrit'
  | 'Gujarati'
  | 'Hindi / Sanskrit'
  | 'Sanskrit / Hindi';

export const teachingTeachers = [
  'All Teachers',
  'Swami Atmananda Saraswati',
  'Swamini Amitananda Saraswati',
  'Swamini Samatananda Saraswati',
  'Swamini Poornananda Saraswati',
  'Ashram Swaminijis & Brahmacharis',
];

export type CanonicalCategorySlug =
  | 'bhagavad-gita'
  | 'upanishads'
  | 'prakarana-granth'
  | 'meditation'
  | 'chanting'
  | 'devotional'
  | 'inspiring-stories';

export interface CanonicalCategory {
  id: CanonicalCategorySlug;
  name: string;
  sanskrit: string;
  romanNumeral: string;
  description: string;
}

export const CANONICAL_CATEGORIES: CanonicalCategory[] = [
  {
    id: 'bhagavad-gita',
    name: 'Bhagavad Gita',
    sanskrit: 'श्रीमद्भगवद्गीता',
    romanNumeral: 'I',
    description: 'The sacred dialogue on Yoga, Dharma, and Atma Jnana between Sri Krishna and Arjuna.',
  },
  {
    id: 'upanishads',
    name: 'Upanishads',
    sanskrit: 'उपनिषदः',
    romanNumeral: 'II',
    description: 'The concluding portion of the Vedas revealing the non-dual reality of Brahman and Atman.',
  },
  {
    id: 'prakarana-granth',
    name: 'Prakarana Granth',
    sanskrit: 'प्रकरणग्रन्थाः',
    romanNumeral: 'III',
    description: 'Introductory and expository philosophical treatises clarifying foundational Vedantic concepts.',
  },
  {
    id: 'meditation',
    name: 'Meditation',
    sanskrit: 'ध्यानम्',
    romanNumeral: 'IV',
    description: 'Contemplative inquiry and Nididhyasana disciplines leading to abiding Self-realization.',
  },
  {
    id: 'chanting',
    name: 'Chanting & Bhajans',
    sanskrit: 'स्तोत्राणि एवं भजनानि',
    romanNumeral: 'V',
    description: 'Classical Sanskrit chanting, stotras, and devotional singing invoking the sacred presence.',
  },
  {
    id: 'devotional',
    name: 'Devotional',
    sanskrit: 'भक्ति साहित्यम्',
    romanNumeral: 'VI',
    description: 'The path of surrender, divine contemplation, and pure devotion to Ishwara.',
  },
  {
    id: 'inspiring-stories',
    name: 'Inspiring Stories',
    sanskrit: 'सत्कथाः',
    romanNumeral: 'VII',
    description: 'Illuminating life stories and episodes of great saints, sages, and seekers of truth.',
  },
];

export interface RelatedStudyText {
  id: string;
  title: string;
  type: string;
  href?: string;
}

export interface Teaching {
  id: string;
  slug?: string;
  title: string;
  scripture: string;
  teacher: string;
  format: TeachingFormat;
  language: TeachingLanguage;
  duration?: string;
  description: string;
  topic: string;
  category?: CanonicalCategorySlug;
  categoryName?: string;
  src?: string;
  audioUrl?: string;
  youtubePlaylistId?: string;
  youtubeVideoId?: string;
  thumbnailSrc?: string;
  sourceHost?: string;
  sourceStatus?: 'SOURCE-VERIFIED' | 'PENDING VERIFICATION' | 'MIGRATION_PENDING' | 'CONFLICT / VERIFY';
  verificationStatus?: 'SOURCE-VERIFIED' | 'PENDING VERIFICATION' | 'MIGRATION_PENDING' | 'CONFLICT / VERIFY';
  migrationStatus?: 'MIGRATED' | 'MIGRATION_PENDING';
  relatedPublicationIds?: string[];
  relatedStudyText?: RelatedStudyText;
}

export const teachings: Teaching[] = [
  {
    "id": "drig-drushya-viveka-01",
    "slug": "drig-drushya-viveka",
    "title": "Drig Drushya Viveka — Discourses",
    "scripture": "Drig Drushya Viveka",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "prakarana-granth",
    "categoryName": "Prakarana Granth",
    "topic": "Prakarana Granth",
    "src": "/audio/demo-discourse.mp3",
    "audioUrl": "https://archive.org/download/SwamiAtmanandaVedanticMeditation_Day1/day1.mp3",
    "youtubePlaylistId": "PLVT0gU53weD3Ri0TEQdZcEv-g85I6H_oj",
    "youtubeVideoId": "DefzkQ0BAr0",
    "thumbnailSrc": "/images/vmission/teaching/01-swami-atmananda-teaching-restored.jpg",
    "sourceHost": "YouTube (Official Video Playlist) & Archive.org",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "An authentic, verse-by-verse exposition of Drig Drushya Viveka (\"Discrimination of the Seer and the Seen\") delivered by Poojya Swami Atmananda Saraswati. Unfolds the central inquiry: who is the true unchanging witness behind all sensory and mental experience?",
    "relatedPublicationIds": [
      "pub-txt-drig-drushya-mula"
    ],
    "relatedStudyText": {
      "id": "pub-txt-drig-drushya-mula",
      "title": "Drig Drushya Viveka Mula Grantha (दृग्दृश्यविवेक मूलग्रन्थः)",
      "type": "Study Text",
      "href": "/publications"
    }
  },
  {
    "id": "atma-bodha-01",
    "slug": "atma-bodha-lessons",
    "title": "Atma-Bodha Lessons — Self-Knowledge Series",
    "scripture": "Atma-bodha",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "prakarana-granth",
    "categoryName": "Prakarana Granth",
    "topic": "Prakarana Granth",
    "youtubePlaylistId": "PLVT0gU53weD2n_kdVHICLDVynrGUdHJhx",
    "youtubeVideoId": "Z_3fX-x4nK8",
    "thumbnailSrc": "/images/vmission/teaching/02-swami-atmananda-wisdom-restored.jpg",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Sri Adi Shankaracharya’s introductory treatise on Self-Knowledge (Atma-bodha). Swami Atmananda Saraswati unfolds the prerequisites for spiritual inquiry and why direct Self-Knowledge is the sole direct means to absolute freedom (Moksha).",
    "relatedPublicationIds": [
      "pub-txt-atmabodha-mula"
    ],
    "relatedStudyText": {
      "id": "pub-txt-atmabodha-mula",
      "title": "Atmabodha Mula Grantha (आत्मबोधः मूलग्रन्थः)",
      "type": "Study Text",
      "href": "/publications"
    }
  },
  {
    "id": "gita-ch03",
    "slug": "gita-chapter-03",
    "title": "Bhagavad Gita — Chapter 3: Karma Yoga",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD3pLzOHGrBGy_KXibBWAu2n",
    "youtubeVideoId": "EyqsgxyPLFc",
    "thumbnailSrc": "/images/vmission/teaching/07-vedanta-archive-restored.jpg",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "A verse-by-verse exposition of Chapter 3 of the Bhagavad Gita on Karma Yoga — the yoga of dedicated action. Swami Atmananda Saraswati clarifies the vital distinction between renunciation of action (karma-sannyasa) and action performed with inner equipoise (karma-yoga).",
    "relatedPublicationIds": [
      "pub-ebk-gita"
    ],
    "relatedStudyText": {
      "id": "pub-ebk-gita",
      "title": "Articles on Gita (English)",
      "type": "Monograph",
      "href": "/publications"
    }
  },
  {
    "id": "upanishad-kena-01",
    "slug": "kenopanishad-audio-series",
    "title": "Kenopanishad — Audio Pravachan Series",
    "scripture": "Kenopanishad",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Audio",
    "language": "Hindi",
    "category": "upanishads",
    "categoryName": "Upanishads",
    "topic": "Upanishads",
    "sourceHost": "Vedanta Ashram Cassette Archive",
    "sourceStatus": "MIGRATION_PENDING",
    "verificationStatus": "MIGRATION_PENDING",
    "migrationStatus": "MIGRATION_PENDING",
    "description": "The profound opening inquiry of the Kena Upanishad: \"By whom willed and directed does the mind light upon its objects?\" Swami Atmananda Saraswati reveals that the ultimate knower cannot be objectified by any organ of perception.",
    "relatedPublicationIds": [
      "pub-ebk-va01"
    ]
  },
  {
    "id": "meditation-dhyana-01",
    "slug": "vedantic-meditation-day1",
    "title": "Vedantic Meditation — Session 1: Turning Within",
    "scripture": "Vedantic Meditation (Nididhyasana)",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Audio",
    "language": "English",
    "duration": "33 min",
    "category": "meditation",
    "categoryName": "Meditation",
    "topic": "Meditation",
    "src": "/audio/swami-atmananda-meditation-day1.mp3",
    "audioUrl": "https://archive.org/download/SwamiAtmanandaVedanticMeditation_Day1/day1.mp3",
    "sourceHost": "Archive.org & Local CDN",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "A guided contemplation and exposition on Vedantic meditation (Nididhyasana). Swami Atmananda Saraswati explains the difference between mental concentration (dharana) and abiding as the witness consciousness (sakshi-bhava).",
    "relatedPublicationIds": [
      "pub-ebk-va03"
    ]
  },
  {
    "id": "chanting-gita-dhyanam-01",
    "slug": "gita-dhyana-chanting",
    "title": "Gita Dhyanam — Nine Meditative Verses",
    "scripture": "Gita Dhyanam",
    "teacher": "Swamini Samatananda Saraswati",
    "format": "Video",
    "language": "Sanskrit",
    "duration": "Sequential chanting",
    "category": "chanting",
    "categoryName": "Chanting & Bhajans",
    "topic": "Chanting & Bhajans",
    "youtubePlaylistId": "PLVT0gU53weD0OpoVATuDK0XWdgKAQxySV",
    "youtubeVideoId": "8ds5-AVrFs0",
    "thumbnailSrc": "/images/vmission/teaching/03-swamini-teaching-01-restored.jpg",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Sequential, traditional recitation of the nine meditative verses on Srimad Bhagavad Gita (Gita Dhyanam) by Swamini Samatananda Saraswati.",
    "relatedPublicationIds": [
      "pub-ebk-gita"
    ]
  },
  {
    "id": "sadhana-panchakam-video",
    "slug": "sadhana-panchakam-discourses",
    "title": "Sadhana Panchakam — Forty Steps to Freedom",
    "scripture": "Sadhana Panchakam",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "prakarana-granth",
    "categoryName": "Prakarana Granth",
    "topic": "Prakarana Granth",
    "youtubePlaylistId": "PLVT0gU53weD3LM07rclS7y5p6-7uWUaZM",
    "youtubeVideoId": "l6E3_MYhOeY",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Adi Shankaracharya’s concise five-verse blueprint outlining forty sequential disciplines for spiritual seekers from Karma Yoga to final liberation.",
    "relatedPublicationIds": [
      "pub-txt-sadhana-panchakam-mula"
    ],
    "relatedStudyText": {
      "id": "pub-txt-sadhana-panchakam-mula",
      "title": "Sadhana Panchakam Mula Grantha (साधनपञ्चकम् मूलग्रन्थः)",
      "type": "Study Text",
      "href": "/publications"
    }
  },
  {
    "id": "vivekachudamani-video",
    "slug": "vivekachudamani-part2",
    "title": "Vivekachudamani — Part 2 Discourses",
    "scripture": "Vivekachudamani",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "prakarana-granth",
    "categoryName": "Prakarana Granth",
    "topic": "Prakarana Granth",
    "youtubePlaylistId": "PLVT0gU53weD3ppQE9VLiQ0nxnejh9ap-E",
    "youtubeVideoId": "bU0xQMjlzk8",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "The masterwork on discernment by Adi Shankaracharya. Swami Atmananda Saraswati unfolds the second major section on Pancha Kosha Viveka and the nature of Brahman."
  },
  {
    "id": "upadesha-saram-video",
    "slug": "upadesha-saram-discourses",
    "title": "Upadesha Saram — Essence of Spiritual Instructions",
    "scripture": "Upadesha Saram",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "prakarana-granth",
    "categoryName": "Prakarana Granth",
    "topic": "Prakarana Granth",
    "youtubePlaylistId": "PLVT0gU53weD3_zZjNc3gbi7lT2-pdnbsG",
    "youtubeVideoId": "IBdAJRtJbPo",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Bhagavan Ramana Maharshi’s thirty verses presenting the synthesis of Karma, Bhakti, Yoga, and Jnana. Unfolded with clarity by Swami Atmananda Saraswati.",
    "relatedPublicationIds": [
      "pub-txt-upadesha-saram"
    ],
    "relatedStudyText": {
      "id": "pub-txt-upadesha-saram",
      "title": "Upadesha Saram (उपदेश सारम्)",
      "type": "Study Text",
      "href": "/publications"
    }
  },
  {
    "id": "bhaja-govindam-video",
    "slug": "bhaja-govindam-discourses",
    "title": "Bhaja Govindam — Moha Mudgara",
    "scripture": "Bhaja Govindam",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "prakarana-granth",
    "categoryName": "Prakarana Granth",
    "topic": "Prakarana Granth",
    "youtubePlaylistId": "PLVT0gU53weD3p5DnAq26CPBY4DSOac0Fj",
    "youtubeVideoId": "lGQhUVWxF4Q",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Adi Shankaracharya’s renowned Prakarana text on dispassion and discriminative inquiry. Swami Atmananda Saraswati unfolds the verses on the fleeting nature of worldly attachments and the essential pursuit of Self-knowledge.",
    "relatedPublicationIds": [
      "pub-txt-bhaja-govindam"
    ],
    "relatedStudyText": {
      "id": "pub-txt-bhaja-govindam",
      "title": "Bhaja Govindam (भजगोविन्दम्)",
      "type": "Study Text",
      "href": "/publications"
    }
  },
  {
    "id": "ek-shloki-video",
    "slug": "ek-shloki-sravan-mala",
    "title": "Ek Shloki Sravan Mala — Single-Verse Essence of Vedanta",
    "scripture": "Ek Shloki",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "prakarana-granth",
    "categoryName": "Prakarana Granth",
    "topic": "Prakarana Granth",
    "youtubePlaylistId": "PLVT0gU53weD3dIaeovrN10ZGGWFHWA04r",
    "youtubeVideoId": "5ixYpXUXq9c",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Adi Shankaracharya’s single-verse dialogue summarizing the entire teaching of the Upanishads through the inquiry into the light of awareness."
  },
  {
    "id": "hastamalaka-video",
    "slug": "hastamalaka-stotram-talks",
    "title": "Hastamalaka Stotram — Discourses",
    "scripture": "Hastamalaka Stotram",
    "teacher": "Swamini Amitananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "prakarana-granth",
    "categoryName": "Prakarana Granth",
    "topic": "Prakarana Granth",
    "youtubePlaylistId": "PLVT0gU53weD1sgXTbmVtfMGmgDAvVq6am",
    "youtubeVideoId": "xBO5jJqHnzw",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Discourses by Swamini Amitananda Saraswati on Hastamalaka Stotram, Sri Shankara’s disciple’s spontaneous declaration of Self-identity as eternal consciousness.",
    "relatedPublicationIds": [
      "pub-txt-hastamalaka"
    ],
    "relatedStudyText": {
      "id": "pub-txt-hastamalaka",
      "title": "Hastamalaka Stotram (हस्तामलकस्तोत्रम्)",
      "type": "Study Text",
      "href": "/publications"
    }
  },
  {
    "id": "natak-deep-video",
    "slug": "panchadashi-natak-deep",
    "title": "Natak Deep — Panchadashi Chapter 10",
    "scripture": "Panchadashi",
    "teacher": "Swamini Amitananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "prakarana-granth",
    "categoryName": "Prakarana Granth",
    "topic": "Prakarana Granth",
    "youtubePlaylistId": "PLVT0gU53weD3OXRGQNGoO-P1hmenmSCC8",
    "youtubeVideoId": "FfetgbUjrwY",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Swami Vidyaranya’s theatrical metaphor of the witness consciousness (Sakshi Chaitanya) as the stage lamp illuminating the drama of mind and world without being affected.",
    "relatedPublicationIds": [
      "pub-txt-panchadashi-natak-deep"
    ],
    "relatedStudyText": {
      "id": "pub-txt-panchadashi-natak-deep",
      "title": "Panchadashi — Nataka Deepa (पञ्चदशी - नाटकदीपः)",
      "type": "Study Text",
      "href": "/publications"
    }
  },
  {
    "id": "laghu-vakyavritti-video",
    "slug": "laghu-vakyavritti-talks",
    "title": "Laghu Vakyavritti — Essential Treatise",
    "scripture": "Laghu Vakyavritti",
    "teacher": "Swamini Amitananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "prakarana-granth",
    "categoryName": "Prakarana Granth",
    "topic": "Prakarana Granth",
    "youtubePlaylistId": "PLVT0gU53weD3ZAbO1MX4hNkRDFuxxgn14",
    "youtubeVideoId": "bsXABxXDbcA",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Sri Shankaracharya’s concise exposition of the Mahavakya \"Aham Brahmasmi\". Swamini Amitananda unfolds the method of resolving the individual self into the non-dual reality.",
    "relatedPublicationIds": [
      "pub-txt-laghu-vakyavritti-mula"
    ],
    "relatedStudyText": {
      "id": "pub-txt-laghu-vakyavritti-mula",
      "title": "Laghu Vakyavritti Mula Grantha (लघुवाक्यवृत्तिः मूलग्रन्थः)",
      "type": "Study Text",
      "href": "/publications"
    }
  },
  {
    "id": "samatvam-yoga-video",
    "slug": "samatvam-yoga-hld",
    "title": "Samatvam Yoga — Holistic Living Camp",
    "scripture": "Bhagavad Gita Yoga",
    "teacher": "Swamini Samatananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "prakarana-granth",
    "categoryName": "Prakarana Granth",
    "topic": "Prakarana Granth",
    "youtubePlaylistId": "PLVT0gU53weD1ej7YhwjYBM22Efa98nmu3",
    "youtubeVideoId": "MO7GCF0B7os",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Lectures on equanimity and mental balance (\"Samatvam Yoga Uchyate\") delivered during the Holistic Living Camp by Swamini Samatananda Saraswati."
  },
  {
    "id": "kathopanishad-part1",
    "slug": "kathopanishad-part1-talks",
    "title": "Kathopanishad — Part 1: Dialogue with Yama",
    "scripture": "Kathopanishad",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "upanishads",
    "categoryName": "Upanishads",
    "topic": "Upanishads",
    "youtubePlaylistId": "PLVT0gU53weD0MUCE3h5-qePnGa7_FCoQZ",
    "youtubeVideoId": "rfR_SLXNNlY",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Nachiketa’s spiritual quest and his conversation with Lord Yama on the choice between the pleasant (Preyas) and the good (Shreyas)."
  },
  {
    "id": "kathopanishad-part2",
    "slug": "kathopanishad-part2-talks",
    "title": "Kathopanishad — Part 2: The Secret of the Self",
    "scripture": "Kathopanishad",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "upanishads",
    "categoryName": "Upanishads",
    "topic": "Upanishads",
    "youtubePlaylistId": "PLVT0gU53weD0kEz8uoObvvISE-Azf2kyf",
    "youtubeVideoId": "O-ScEA1sRa8",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "The chariot metaphor, the nature of the supreme witness, and the direct path of discrimination leading beyond death."
  },
  {
    "id": "audio-katha-cassette",
    "slug": "kathopanishad-archival-audio",
    "title": "Kathopanishad — Archival Audio Series",
    "scripture": "Kathopanishad",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Audio",
    "language": "Hindi",
    "category": "upanishads",
    "categoryName": "Upanishads",
    "topic": "Upanishads",
    "sourceHost": "Vedanta Ashram Cassette Archive",
    "sourceStatus": "MIGRATION_PENDING",
    "verificationStatus": "MIGRATION_PENDING",
    "migrationStatus": "MIGRATION_PENDING",
    "description": "Complete archival audio recordings of Poojya Swami Atmananda Saraswati’s early discourses on Kathopanishad. Studio restoration from analog cassettes is in progress."
  },
  {
    "id": "audio-mundaka-cassette",
    "slug": "mundakopanishad-archival-audio",
    "title": "Mundakopanishad — Archival Audio Series",
    "scripture": "Mundakopanishad",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Audio",
    "language": "Hindi",
    "category": "upanishads",
    "categoryName": "Upanishads",
    "topic": "Upanishads",
    "sourceHost": "Vedanta Ashram Cassette Archive",
    "sourceStatus": "MIGRATION_PENDING",
    "verificationStatus": "MIGRATION_PENDING",
    "migrationStatus": "MIGRATION_PENDING",
    "description": "Archival audio discourses on the two sciences (Para and Apara Vidya) and the famous two-birds metaphor of the Mundaka Upanishad. Studio restoration in progress."
  },
  {
    "id": "gita-upodghat",
    "slug": "gita-upodghat-intro",
    "title": "Bhagavad Gita Upodghata — Introduction",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD1rB2HYs9Y5nIGcKmIeos4Y",
    "youtubeVideoId": "O0yWGWqaUAY",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Poojya Guruji Swami Atmananda Saraswati introduces the historic and philosophical context of the Bhagavad Gita and Sri Shankaracharya’s introductory commentary."
  },
  {
    "id": "gita-ch01",
    "slug": "gita-chapter-01-talks",
    "title": "Bhagavad Gita — Chapter 1: Arjuna Vishada Yoga",
    "scripture": "Bhagavad Gita",
    "teacher": "Swamini Amitananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD2sYpQ_hUbuoFH2sSjrPxai",
    "youtubeVideoId": "znh7nwE5v60",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "An analysis of Arjuna’s despondency on the battlefield of Kurukshetra, the universal nature of emotional crisis, and the necessity of surrender to a spiritual master."
  },
  {
    "id": "gita-ch02-eng",
    "slug": "gita-chapter-02-english",
    "title": "Bhagavad Gita — Chapter 2: Sankhya Yoga (English)",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "English",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD1JzjhoH5njnlwmQqPnrxLE",
    "youtubeVideoId": "Dtvs-VjJCEU",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Swami Atmananda Saraswati unfolds the quintessential teachings of Chapter 2 in English: the immortality of the Self, the nature of Sthitaprajna, and freedom from grief."
  },
  {
    "id": "gita-ch04",
    "slug": "gita-chapter-04-talks",
    "title": "Bhagavad Gita — Chapter 4: Jnana Karma Sannyasa Yoga",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD1edXBQ4Zye837GjaD9S41D",
    "youtubeVideoId": "rKv1PT_SxQg",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "The lineage of knowledge, divine incarnation (Avatara), seeing inaction in action, and the purifying fire of Self-knowledge (Jnana Yagna)."
  },
  {
    "id": "gita-ch05",
    "slug": "gita-chapter-05-talks",
    "title": "Bhagavad Gita — Chapter 5: Sannyasa Yoga",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD2ToIGvSOGy4kDhi-dzaVC5",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Reconciliation of renunciation and selfless action. The true renouncer acts without attachment, rooted in the understanding that the Self is non-doer."
  },
  {
    "id": "gita-ch06",
    "slug": "gita-chapter-06-talks",
    "title": "Bhagavad Gita — Chapter 6: Dhyana Yoga",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD2S0v8alndlc6ehynuVXuQv",
    "youtubeVideoId": "iPM-6n1z258",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "The science of meditation, mastery of the turbulent mind, the posture, practice, and the state of Samadhi as expounded by Sri Krishna."
  },
  {
    "id": "gita-ch07",
    "slug": "gita-chapter-07-hindi",
    "title": "Bhagavad Gita — Chapter 7: Jnana Vijnana Yoga",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD35InoFJQ6A9Ti1EkeztacG",
    "youtubeVideoId": "D_71woWtG9k",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Direct knowledge and experiential assimilation of the higher and lower nature (Para and Apara Prakriti) and the four types of devotees."
  },
  {
    "id": "gita-ch07-eng",
    "slug": "gita-chapter-07-english",
    "title": "Bhagavad Gita — Chapter 7: Jnana Vijnana Yoga (English)",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "English",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD2jhuKYJuQi7alMy-T8pH4b",
    "youtubeVideoId": "RCkNbSFkIAY",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Swami Atmananda Saraswati delivers systematic English lectures on the divine manifest and unmanifest reality of Ishwara in Chapter 7."
  },
  {
    "id": "gita-ch12-rishikesh",
    "slug": "gita-chapter-12-rishikesh",
    "title": "Bhagavad Gita — Chapter 12: Bhakti Yoga (Rishikesh Camp)",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD2cqbn2HsS_0jvyfHf22IJz",
    "youtubeVideoId": "76PoOkl0_ZE",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Special camp discourses delivered in Rishikesh on the characteristics of the true devotee and the stages of devoted contemplation."
  },
  {
    "id": "gita-ch15",
    "slug": "gita-chapter-15-talks",
    "title": "Bhagavad Gita — Chapter 15: Purushottama Yoga",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD1nP9ha-YSDOHpKYTnwWm14",
    "youtubeVideoId": "7YANbMvNJz4",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "The upside-down cosmic tree (Ashvattha), cutting attachment with the axe of dispassion, and the supreme nature of Purushottama."
  },
  {
    "id": "gita-ch17",
    "slug": "gita-chapter-17-talks",
    "title": "Bhagavad Gita — Chapter 17: Shraddhatraya Vibhaga Yoga",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD0lNEUIULepnCgZ1vqyncbg",
    "youtubeVideoId": "61zLtceg_tQ",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "The three types of faith, food, sacrifice, austerity, and charity according to the Gunas, culminating in the sacred syllables Om Tat Sat."
  },
  {
    "id": "gita-ch18",
    "slug": "gita-chapter-18-talks",
    "title": "Bhagavad Gita — Chapter 18: Moksha Sannyasa Yoga",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD1S0kuw3mrLflNBC4vKEoN9",
    "youtubeVideoId": "w0pi4e1wbro",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "The grand finale of the Gita summarizing Tyaga, Sannyasa, the five causes of action, and the ultimate surrender (Sarvadharman parityajya)."
  },
  {
    "id": "ram-gita-video",
    "slug": "ram-gita-discourses",
    "title": "Ram Gita — Adhyatma Ramayana Discourses",
    "scripture": "Adhyatma Ramayana",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "youtubePlaylistId": "PLVT0gU53weD2_MwBwehzkxAWC8fjtbk4G",
    "youtubeVideoId": "xKhBrbqx6FQ",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Lord Sri Rama’s pure Vedantic teachings imparted to Lakshmana from the Uttara Kanda of Adhyatma Ramayana."
  },
  {
    "id": "audio-gita-ch02-cassette",
    "slug": "gita-ch02-archival-audio",
    "title": "Bhagavad Gita Chapter 2 — Archival Audio",
    "scripture": "Bhagavad Gita",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Audio",
    "language": "Hindi",
    "category": "bhagavad-gita",
    "categoryName": "Bhagavad Gita",
    "topic": "Bhagavad Gita",
    "sourceHost": "Vedanta Ashram Cassette Archive",
    "sourceStatus": "MIGRATION_PENDING",
    "verificationStatus": "MIGRATION_PENDING",
    "migrationStatus": "MIGRATION_PENDING",
    "description": "Early cassette recordings of Poojya Guruji unfolding Sankhya Yoga. Digital restoration in progress."
  },
  {
    "id": "hanuman-chalisa-short",
    "slug": "hanuman-chalisa-reflections",
    "title": "Hanuman Chalisa — Short Reflections Series",
    "scripture": "Hanuman Chalisa",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Short talks series",
    "category": "devotional",
    "categoryName": "Devotional",
    "topic": "Devotional",
    "youtubePlaylistId": "PLVT0gU53weD1b3BhV6tinHHaIDj7RWLkO",
    "youtubeVideoId": "n0RCOFWm71w",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Brief, illuminating contemplative reflections on Goswami Tulsidas’s Hanuman Chalisa, uncovering esoteric devotional depths."
  },
  {
    "id": "hanuman-chalisa-gy",
    "slug": "hanuman-chalisa-gyan-yagna",
    "title": "Hanuman Chalisa — Complete Online Gyan Yagna",
    "scripture": "Hanuman Chalisa",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "devotional",
    "categoryName": "Devotional",
    "topic": "Devotional",
    "youtubePlaylistId": "PLVT0gU53weD3cyr4w8Ju6h-MC7BXX4soF",
    "youtubeVideoId": "BD-06FWXLnY",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "A comprehensive, multi-session Gyan Yagna unfolding each chaupai of Hanuman Chalisa as a practical sadhana for inner strength."
  },
  {
    "id": "sundarkand-gy",
    "slug": "sundarkand-gyan-yagna",
    "title": "Sundarkand — Online Gyan Yagna Series",
    "scripture": "Ramcharitmanas",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "devotional",
    "categoryName": "Devotional",
    "topic": "Devotional",
    "youtubePlaylistId": "PLVT0gU53weD3vBX_feRTzwWNOkEVih2H9",
    "youtubeVideoId": "1432vKAVVmc",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "A spiritual voyage through Sri Ramcharitmanas Sundarkand. Unfolds Sri Hanuman’s devotion and discernment in Lanka."
  },
  {
    "id": "narad-bhakti-sutra",
    "slug": "narada-bhakti-sutra-talks",
    "title": "Narada Bhakti Sutra Discourses",
    "scripture": "Narada Bhakti Sutras",
    "teacher": "Swamini Amitananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "devotional",
    "categoryName": "Devotional",
    "topic": "Devotional",
    "youtubePlaylistId": "PLVT0gU53weD2lxye0WU0s6F2B9U7G3gpI",
    "youtubeVideoId": "BcGk-Vy8J5A",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Devotional philosophy at its zenith: the aphorisms of Devarshi Narada on the nature of unconditional, supreme divine love (Parabhakti)."
  },
  {
    "id": "ekadashi-satsang-video",
    "slug": "ekadashi-satsang-swpoorna",
    "title": "Ekadashi Satsang Series — Spiritual Discourses",
    "scripture": "Vedic Puranic Discourses",
    "teacher": "Swamini Poornananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "devotional",
    "categoryName": "Devotional",
    "topic": "Devotional",
    "youtubePlaylistId": "PLVT0gU53weD2IgPtrnwhOxZ9_Mwmv4EiG",
    "youtubeVideoId": "blautUr3wqM",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Inspiring monthly Ekadashi satsang lectures delivered by Swamini Poornananda Saraswati at Vedanta Ashram, Indore, examining spiritual virtues like charity (Daan)."
  },
  {
    "id": "vedanta-satsang-collection",
    "slug": "vedanta-vdo-satsang-16",
    "title": "Vedanta Satsang — 16 Video Discourse Collection",
    "scripture": "Satsang & Prakarana",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "16 video collection",
    "category": "inspiring-stories",
    "categoryName": "Inspiring Stories",
    "topic": "Inspiring Stories",
    "youtubePlaylistId": "PLVT0gU53weD2aVDlkPgr6Ta5qp4dQYt6P",
    "youtubeVideoId": "vEZOVY_hsHk",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "A curated anthology of 16 inspiring talks and satsangs addressing common spiritual obstacles, practical living, and Vedantic clarity."
  },
  {
    "id": "audio-japa-abhyas",
    "slug": "japa-abhyas-audio",
    "title": "Japa Abhyas — The Science & Practice of Japa",
    "scripture": "Mantra Yoga & Japa",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Audio",
    "language": "Hindi",
    "duration": "44 min",
    "category": "meditation",
    "categoryName": "Meditation",
    "topic": "Meditation",
    "src": "https://archive.org/download/japa_abhyas/japa_abhyas.mp3",
    "audioUrl": "https://archive.org/download/japa_abhyas/japa_abhyas.mp3",
    "sourceHost": "Archive.org",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "A 44-minute deep dive by Poojya Swami Atmananda Saraswati into the mechanics, inner attitude, and mental stillness cultivated through authentic Japa practice."
  },
  {
    "id": "audio-japa-sadhana",
    "slug": "japa-sadhana-audio",
    "title": "Japa Sadhana — Kya, Kyun aur Kaise",
    "scripture": "Mantra Yoga & Japa",
    "teacher": "Swami Atmananda Saraswati",
    "format": "Audio",
    "language": "Hindi",
    "duration": "42 min",
    "category": "meditation",
    "categoryName": "Meditation",
    "topic": "Meditation",
    "src": "https://archive.org/download/japa-sadhana_kya%20kyun%20aur%20kaise/japa-sadhana_kya%20kyun%20aur%20kaise.mp3",
    "audioUrl": "https://archive.org/download/japa-sadhana_kya%20kyun%20aur%20kaise/japa-sadhana_kya%20kyun%20aur%20kaise.mp3",
    "sourceHost": "Archive.org",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "A 42-minute exposition exploring the \"What, Why, and How\" of Japa Sadhana as an indispensable purification tool for the Vedantic seeker."
  },
  {
    "id": "pratah-smaran-video",
    "slug": "pratah-smaran-stotram-talks",
    "title": "Pratah Smaran Stotram — Morning Contemplation",
    "scripture": "Pratah Smaran Stotram",
    "teacher": "Swamini Amitananda Saraswati",
    "format": "Video",
    "language": "Sanskrit / Hindi",
    "duration": "Multi-part series",
    "category": "chanting",
    "categoryName": "Chanting & Bhajans",
    "topic": "Chanting & Bhajans",
    "youtubePlaylistId": "PLVT0gU53weD1dvfkSlgut7c_pjYjjRjcq",
    "youtubeVideoId": "rA9C8kRHkJ4",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Lectures and chanting of Sri Adi Shankaracharya’s three morning verses meditating upon the inner Self that transcends waking, dreaming, and deep sleep."
  },
  {
    "id": "shiva-mahimna-talks",
    "slug": "shiva-mahimna-stotram-talks",
    "title": "Shiva Mahimna Stotram Talks & Chanting",
    "scripture": "Shiva Mahimna Stotram",
    "teacher": "Swamini Samatananda Saraswati",
    "format": "Video",
    "language": "Hindi",
    "duration": "Multi-part series",
    "category": "chanting",
    "categoryName": "Chanting & Bhajans",
    "topic": "Chanting & Bhajans",
    "youtubePlaylistId": "PLVT0gU53weD3LnwG2cwduzTX0mBv4q2qB",
    "youtubeVideoId": "8ds5-AVrFs0",
    "sourceHost": "YouTube (Verified Playlist)",
    "sourceStatus": "SOURCE-VERIFIED",
    "verificationStatus": "SOURCE-VERIFIED",
    "migrationStatus": "MIGRATED",
    "description": "Exposition and chanting of the majestic hymn by Pushpadanta extolling the cosmic and transcendental glory of Lord Shiva.",
    "relatedPublicationIds": [
      "pub-txt-shiv-mahimna"
    ],
    "relatedStudyText": {
      "id": "pub-txt-shiv-mahimna",
      "title": "Shiva Mahimna Stotram (शिव महिम्नः स्तोत्रम्)",
      "type": "Study Text",
      "href": "/publications"
    }
  }
];

export function getTeachingById(id: string): Teaching | undefined {
  return teachings.find((t) => t.id === id || t.slug === id);
}

export function getRelatedTeachings(current: Teaching, limit = 3): Teaching[] {
  return teachings
    .filter((t) => t.id !== current.id && (t.category === current.category || t.teacher === current.teacher))
    .slice(0, limit);
}
