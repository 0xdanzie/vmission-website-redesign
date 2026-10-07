const fs = require('fs');
const path = require('path');

const teachings = [
  // =========================================================================
  // POSITIONS 0-5 PRESERVED FOR LOCKED HOMEPAGE CHAPTER 5
  // =========================================================================
  {
    id: 'drig-drushya-viveka-01',
    slug: 'drig-drushya-viveka',
    title: 'Drig Drushya Viveka — Session 1: The Seer and the Seen',
    scripture: 'Drig Drushya Viveka',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'English',
    duration: 'Multi-part series',
    category: 'prakarana-granth',
    categoryName: 'Prakarana Granth',
    topic: 'Prakarana Granth',
    src: '/audio/demo-discourse.mp3',
    audioUrl: 'https://archive.org/download/SwamiAtmanandaVedanticMeditation_Day1/day1.mp3',
    youtubePlaylistId: 'PLVT0gU53weD2IgPtrnwhOxZ9_Mwmv4EiG',
    thumbnailSrc: '/images/vmission/teaching/01-swami-atmananda-teaching-restored.jpg',
    sourceHost: 'YouTube (Official Video Playlist) & Archive.org',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'An introduction to Drig Drushya Viveka — "Discrimination of the Seer and the Seen" — a classical Advaita treatise. This foundational session unfolds the central inquiry: who is the true unchanging witness behind all sensory and mental experience?',
    relatedPublicationIds: ['pub-txt-drig-drushya-mula'],
    relatedStudyText: {
      id: 'pub-txt-drig-drushya-mula',
      title: 'Drig Drushya Viveka Mula Grantha (दृग्दृश्य विवेक मूल ग्रन्थ)',
      type: 'Study Text',
      href: '/publications'
    }
  },
  {
    id: 'atma-bodha-01',
    slug: 'atma-bodha-lessons',
    title: 'Atma-bodha — Session 1: Introduction to Self-Knowledge',
    scripture: 'Atma-bodha',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'prakarana-granth',
    categoryName: 'Prakarana Granth',
    topic: 'Prakarana Granth',
    youtubePlaylistId: 'PLVT0gU53weD3_zZjNc3gbi7lT2-pdnbsG',
    thumbnailSrc: '/images/vmission/teaching/02-swami-atmananda-wisdom-restored.jpg',
    sourceHost: 'YouTube (Verified Playlist) & Archive.org',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Sri Adi Shankaracharya’s introductory text on Self-Knowledge (Atma-bodha). Swami Atmananda Saraswati unfolds verse 1, examining the prerequisites for Vedantic inquiry and why Self-Knowledge is the sole direct means to absolute freedom (Moksha).',
    relatedPublicationIds: ['pub-txt-atmabodha-mula', 'pub-txt-atmabodha-vyakhya'],
    relatedStudyText: {
      id: 'pub-txt-atmabodha-mula',
      title: 'Atmabodha Mula Grantha (आत्मबोध मूल ग्रन्थ)',
      type: 'Study Text',
      href: '/publications'
    }
  },
  {
    id: 'gita-ch03',
    slug: 'gita-chapter-03',
    title: 'Bhagavad Gita — Chapter 3: Karma Yoga',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD2jhuKYJuQi7alMy-T8pH4b',
    thumbnailSrc: '/images/vmission/teaching/07-vedanta-archive-restored.jpg',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'A verse-by-verse exposition of Chapter 3 of the Bhagavad Gita on Karma Yoga — the yoga of dedicated action. Swami Atmananda Saraswati clarifies the vital distinction between renunciation of action (karma-sannyasa) and action performed with inner equipoise (karma-yoga).',
    relatedPublicationIds: ['pub-ebk-gita'],
    relatedStudyText: {
      id: 'pub-ebk-gita',
      title: 'Articles on Gita (English)',
      type: 'Monograph',
      href: '/publications'
    }
  },
  {
    id: 'upanishad-kena-01',
    slug: 'kenopanishad-gyan-yagna',
    title: 'Kenopanishad — Online Gyan Yagna Series',
    scripture: 'Kenopanishad',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'upanishads',
    categoryName: 'Upanishads',
    topic: 'Upanishads',
    youtubePlaylistId: 'PLVT0gU53weD3ppQE9VLiQ0nxnejh9ap-E',
    thumbnailSrc: '/images/vmission/teaching/04-swamini-teaching-02-restored.jpg',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'The opening inquiry of the Kena Upanishad: "By whom willed and directed does the mind light upon its objects?" Swami Atmananda Saraswati reveals that the ultimate knower cannot be objectified by any organ of perception.',
    relatedPublicationIds: ['pub-ebk-va01']
  },
  {
    id: 'meditation-dhyana-01',
    slug: 'vedantic-meditation-day1',
    title: 'Vedantic Meditation — Session 1: Turning Within',
    scripture: 'Vedantic Meditation (Nididhyasana)',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Audio',
    language: 'English',
    duration: '33 min',
    category: 'meditation',
    categoryName: 'Meditation',
    topic: 'Meditation',
    src: '/audio/swami-atmananda-meditation-day1.mp3',
    audioUrl: 'https://archive.org/download/SwamiAtmanandaVedanticMeditation_Day1/day1.mp3',
    sourceHost: 'Archive.org & Local CDN',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'A guided contemplation and exposition on Vedantic meditation (Nididhyasana). Swami Atmananda Saraswati explains the difference between mental concentration (dharana) and abiding as the witness consciousness (sakshi-bhava).',
    relatedPublicationIds: ['pub-ebk-va03']
  },
  {
    id: 'chanting-gita-dhyanam-01',
    slug: 'gita-dhyana-chanting',
    title: 'Gita Dhyanam — Nine Meditative Verses',
    scripture: 'Gita Dhyanam',
    teacher: 'Swamini Samatananda Saraswati',
    format: 'Video',
    language: 'Sanskrit',
    duration: 'Sequential chanting',
    category: 'chanting',
    categoryName: 'Chanting & Bhajans',
    topic: 'Chanting & Bhajans',
    youtubePlaylistId: 'PLVT0gU53weD2sYpQ_hUbuoFH2sSjrPxai',
    thumbnailSrc: '/images/vmission/teaching/03-swamini-teaching-01-restored.jpg',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Traditional recitation of the nine Gita Dhyanam stanzas with proper Sanskrit metre, svara, and contemplative meaning, invocating Mother Gita, Lord Krishna, and Sage Vyasa.',
    relatedPublicationIds: ['pub-ebk-gita']
  },

  // =========================================================================
  // ADDITIONAL AUTHENTIC BHAGAVAD GITA VIDEO PLAYLISTS (vmission.org.in verified)
  // =========================================================================
  {
    id: 'gita-upodghata',
    slug: 'gita-upodghata',
    title: 'Bhagavad Gita — Upodghata (Introductory Discourses)',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD1rB2HYs9Y5nIGcKmIeos4Y',
    thumbnailSrc: '/images/vmission/teaching/01-swami-atmananda-teaching-restored.jpg',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Introductory discourses establishing the setting of the Kurukshetra battlefield, Arjuna’s grief (Shoka) and delusion (Moha), and the universal necessity of Brahmavidya.',
    relatedPublicationIds: ['pub-ebk-gita']
  },
  {
    id: 'gita-ch01',
    slug: 'gita-chapter-01',
    title: 'Bhagavad Gita — Chapter 1: Arjuna Vishada Yoga',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD1dvfkSlgut7c_pjYjjRjcq',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Exposition of Arjuna’s crisis of identity, the collapse of worldly confidence, and how psychological surrender paves the way for spiritual enlightenment.',
    relatedPublicationIds: ['pub-ebk-gita']
  },
  {
    id: 'gita-ch02',
    slug: 'gita-chapter-02',
    title: 'Bhagavad Gita — Chapter 2: Sankhya Yoga',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD1sgXTbmVtfMGmgDAvVq6am',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Sri Krishna’s primary revelation of the immortal, immutable Self (Atman) and the characteristics of the enlightened sage of steady wisdom (Sthitaprajna).',
    relatedPublicationIds: ['pub-ebk-gita']
  },
  {
    id: 'gita-ch04',
    slug: 'gita-chapter-04',
    title: 'Bhagavad Gita — Chapter 4: Jnana Karma Sanyasa Yoga',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD1JzjhoH5njnlwmQqPnrxLE',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'The lineage of Yoga, the secret of divine incarnation (Avatara Tattva), and how the fire of Self-Knowledge consumes all past karma.',
    relatedPublicationIds: ['pub-ebk-gita']
  },
  {
    id: 'gita-ch05',
    slug: 'gita-chapter-05',
    title: 'Bhagavad Gita — Chapter 5: Karma Sanyasa Yoga',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD2ToIGvSOGy4kDhi-dzaVC5',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Reconciliation between renunciation of actions and active performance of duties, unfolding the inner state of the sage abiding in Brahman.',
    relatedPublicationIds: ['pub-ebk-gita']
  },
  {
    id: 'gita-ch06',
    slug: 'gita-chapter-06',
    title: 'Bhagavad Gita — Chapter 6: Dhyana Yoga',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD35InoFJQ6A9Ti1EkeztacG',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'The science of meditation: preparation of posture, regulation of senses, steadying of the restless mind, and abiding in the Self.',
    relatedPublicationIds: ['pub-ebk-gita']
  },
  {
    id: 'gita-ch07',
    slug: 'gita-chapter-07',
    title: 'Bhagavad Gita — Chapter 7: Jnana Vijnana Yoga',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD2S0v8alndlc6ehynuVXuQv',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'The higher (Para) and lower (Apara) natures of Ishwara, the four types of virtuous seekers, and the rare sage of Self-realization.',
    relatedPublicationIds: ['pub-ebk-gita']
  },
  {
    id: 'gita-ch12-rishikesh',
    slug: 'gita-chapter-12-rishikesh',
    title: 'Bhagavad Gita — Chapter 12: Bhakti Yoga (Rishikesh Shivir)',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD2cqbn2HsS_0jvyfHf22IJz',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Live shivir discourses recorded on the banks of the Ganga in Rishikesh, delineating the thirty-five sublime virtues of a true devotee of the Lord.',
    relatedPublicationIds: ['pub-ebk-gita']
  },
  {
    id: 'gita-ch15',
    slug: 'gita-chapter-15',
    title: 'Bhagavad Gita — Chapter 15: Purushottama Yoga',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD3pLzOHGrBGy_KXibBWAu2n',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'The cosmic Ashvattha tree of samsara, the perishable (Kshara) and imperishable (Akshara) realities, and the Supreme Being (Purushottama).',
    relatedPublicationIds: ['pub-ebk-gita']
  },
  {
    id: 'gita-ch17',
    slug: 'gita-chapter-17',
    title: 'Bhagavad Gita — Chapter 17: Shraddhatraya Vibhaga Yoga',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD0lNEUIULepnCgZ1vqyncbg',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'The threefold classification of faith, food, sacrifice (Yajna), austerity (Tapas), and charity (Dana), concluding with the sacred formula "Om Tat Sat".',
    relatedPublicationIds: ['pub-ebk-gita']
  },
  {
    id: 'gita-ch18',
    slug: 'gita-chapter-18',
    title: 'Bhagavad Gita — Chapter 18: Moksha Sanyasa Yoga',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD1S0kuw3mrLflNBC4vKEoN9',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'The master summation of the entire Bhagavad Gita, detailing true renunciation, the five factors of action, and final surrender (Sharanagati).',
    relatedPublicationIds: ['pub-ebk-gita']
  },
  {
    id: 'gita-mahayagna',
    slug: 'gita-mahayagna-discourses',
    title: 'Gita Mahayagna — Annual Public Discourses',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    youtubePlaylistId: 'PLVT0gU53weD1edXBQ4Zye837GjaD9S41D',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Public discourse series delivered during the annual Gita Mahayagna spiritual festival organized by Vedanta Mission.',
    relatedPublicationIds: ['pub-ebk-gita']
  },

  // =========================================================================
  // ADDITIONAL AUTHENTIC PRAKARANA GRANTH & UPANISHAD PLAYLISTS
  // =========================================================================
  {
    id: 'sadhana-panchakam-video',
    slug: 'sadhana-panchakam-video',
    title: 'Sadhana Panchakam — Forty Steps to Freedom',
    scripture: 'Sadhana Panchakam',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'prakarana-granth',
    categoryName: 'Prakarana Granth',
    topic: 'Prakarana Granth',
    youtubePlaylistId: 'PLVT0gU53weD3vBX_feRTzwWNOkEVih2H9',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Exposition of Adi Shankaracharya’s forty spiritual instructions systematically ordering the seeker’s life from daily duties to Self-realization.',
    relatedPublicationIds: ['pub-txt-sadhana-panchakam-mula', 'pub-txt-sadhana-panchakam-vyakhya'],
    relatedStudyText: {
      id: 'pub-txt-sadhana-panchakam-mula',
      title: 'Sadhana Panchakam Mula Grantha',
      type: 'Study Text',
      href: '/publications'
    }
  },
  {
    id: 'vivekachudamani-video',
    slug: 'vivekachudamani-part2',
    title: 'Vivekachudamani — Part 2 Discourses',
    scripture: 'Vivekachudamani',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'prakarana-granth',
    categoryName: 'Prakarana Granth',
    topic: 'Prakarana Granth',
    youtubePlaylistId: 'PLVT0gU53weD3cyr4w8Ju6h-MC7BXX4soF',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Verse-by-verse exposition of Shankaracharya’s master crest-jewel treatise on discrimination, examination of the five sheaths, and direct Brahman realization.',
    relatedPublicationIds: ['pub-ebk-va02']
  },
  {
    id: 'upadesha-saram-video',
    slug: 'upadesha-saram-video',
    title: 'Upadesha Saram — Essence of Spiritual Instructions',
    scripture: 'Upadesha Saram',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'prakarana-granth',
    categoryName: 'Prakarana Granth',
    topic: 'Prakarana Granth',
    youtubePlaylistId: 'PLVT0gU53weD1ej7YhwjYBM22Efa98nmu3',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Bhagavan Ramana Maharshi’s profound thirty verses clarifying the progressive stages of Karma, Bhakti, and Yoga, culminating in direct Atma-Vichara.',
    relatedPublicationIds: ['pub-txt-upadesha-saram'],
    relatedStudyText: {
      id: 'pub-txt-upadesha-saram',
      title: 'Upadesha Saram (उपदेश सारम्)',
      type: 'Study Text',
      href: '/publications'
    }
  },
  {
    id: 'bhaja-govindam-video',
    slug: 'bhaja-govindam-video',
    title: 'Bhaja Govindam — Moha Mudgara',
    scripture: 'Bhaja Govindam',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'prakarana-granth',
    categoryName: 'Prakarana Granth',
    topic: 'Prakarana Granth',
    youtubePlaylistId: 'PLVT0gU53weD3OXRGQNGoO-P1hmenmSCC8',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Adi Shankaracharya’s stirring wake-up call shattering worldly illusions and urging the seeker to worship Govinda and realize the eternal truth.',
    relatedPublicationIds: ['pub-ebk-va01']
  },
  {
    id: 'kathopanishad-part1',
    slug: 'kathopanishad-part1',
    title: 'Kathopanishad — Part 1: Dialogue with Yama',
    scripture: 'Kathopanishad',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'upanishads',
    categoryName: 'Upanishads',
    topic: 'Upanishads',
    youtubePlaylistId: 'PLVT0gU53weD3Ri0TEQdZcEv-g85I6H_oj',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'The famous dialogue between young Nachiketa and Yamaraja, exploring the third boon and the mystery of what lies beyond physical death.',
    relatedPublicationIds: ['pub-ebk-va02']
  },
  {
    id: 'kathopanishad-part2',
    slug: 'kathopanishad-part2',
    title: 'Kathopanishad — Part 2: The Secret of the Self',
    scripture: 'Kathopanishad',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'upanishads',
    categoryName: 'Upanishads',
    topic: 'Upanishads',
    youtubePlaylistId: 'PLVT0gU53weD3LM07rclS7y5p6-7uWUaZM',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Yamaraja unfolding the chariot metaphor of the human personality and direct methods for realizing the thumb-sized purusha seated within the heart cave.',
    relatedPublicationIds: ['pub-ebk-va02']
  },

  // =========================================================================
  // AUTHENTIC DEVOTIONAL VIDEO PLAYLISTS
  // =========================================================================
  {
    id: 'hanuman-chalisa-short',
    slug: 'hanuman-chalisa-short-talks',
    title: 'Hanuman Chalisa — Short Reflections Series',
    scripture: 'Hanuman Chalisa',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'devotional',
    categoryName: 'Devotional',
    topic: 'Devotional',
    youtubePlaylistId: 'PLVT0gU53weD2n_kdVHICLDVynrGUdHJhx',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Spiritual and allegorical insights into the forty verses of Tulsidas’s Hanuman Chalisa, highlighting surrender, devotion, and selfless service.'
  },
  {
    id: 'hanuman-chalisa-gy',
    slug: 'hanuman-chalisa-gyan-yagna',
    title: 'Hanuman Chalisa — Complete Online Gyan Yagna',
    scripture: 'Hanuman Chalisa',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'devotional',
    categoryName: 'Devotional',
    topic: 'Devotional',
    youtubePlaylistId: 'PLVT0gU53weD3p5DnAq26CPBY4DSOac0Fj',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'In-depth verse-by-verse philosophical exposition of the Hanuman Chalisa as a practical manual for spiritual victory.'
  },
  {
    id: 'sundarkand-gy',
    slug: 'sundarkand-gyan-yagna',
    title: 'Sundarkand — Online Gyan Yagna Series',
    scripture: 'Ramacharitmanas (Sundarkand)',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'devotional',
    categoryName: 'Devotional',
    topic: 'Devotional',
    youtubePlaylistId: 'PLVT0gU53weD2aVDlkPgr6Ta5qp4dQYt6P',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Discourses on Goswami Tulsidas’s Ramacharitmanas Sundarkand, revealing how unwavering faith and devotion overcome every ocean of difficulty.'
  },
  {
    id: 'ram-gita-video',
    slug: 'ram-gita-adhyatma-ramayan',
    title: 'Ram Gita — Adhyatma Ramayana Discourses',
    scripture: 'Adhyatma Ramayana (Ram Gita)',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'devotional',
    categoryName: 'Devotional',
    topic: 'Devotional',
    youtubePlaylistId: 'PLVT0gU53weD0MUCE3h5-qePnGa7_FCoQZ',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Lord Rama’s non-dual spiritual instructions to Lakshmana from the Uttara Kanda of Adhyatma Ramayana on devotion, knowledge, and dispassion.'
  },
  {
    id: 'narad-bhakti-sutra',
    slug: 'narad-bhakti-sutra',
    title: 'Narada Bhakti Sutra Discourses',
    scripture: 'Narada Bhakti Sutra',
    teacher: 'Swamini Amitananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'devotional',
    categoryName: 'Devotional',
    topic: 'Devotional',
    youtubePlaylistId: 'PLVT0gU53weD3ZAbO1MX4hNkRDFuxxgn14',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Detailed exposition on Sage Narada’s aphorisms defining supreme love of God (Parama Prema Rupa) and the path of divine surrender.'
  },
  {
    id: 'shiva-mahimna-talks',
    slug: 'shiva-mahimna-talks',
    title: 'Shiva Mahimna Stotram Talks & Chanting',
    scripture: 'Shiva Mahimna Stotram',
    teacher: 'Swamini Samatananda Saraswati',
    format: 'Video',
    language: 'Hindi / Sanskrit',
    duration: 'Multi-part series',
    category: 'chanting',
    categoryName: 'Chanting & Bhajans',
    topic: 'Chanting & Bhajans',
    youtubePlaylistId: 'PLVT0gU53weD0T5JBJlm2VBVyPd3A6u5IR',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Contemplative exposition and chanting of Pushpadanta’s Shiva Mahimna Stotram by Swamini Samatananda Saraswati at Vedanta Ashram.',
    relatedPublicationIds: ['pub-txt-shiv-mahimna'],
    relatedStudyText: {
      id: 'pub-txt-shiv-mahimna',
      title: 'Shiva Mahimna Stotram (शिव महिम्न: स्तोत्रम्)',
      type: 'Study Text',
      href: '/publications'
    }
  },
  {
    id: 'laghu-vakyavritti-video',
    slug: 'laghu-vakyavritti-video',
    title: 'Laghu Vakyavritti — Essential Treatise',
    scripture: 'Laghu Vakyavritti',
    teacher: 'Swamini Amitananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: 'Multi-part series',
    category: 'prakarana-granth',
    categoryName: 'Prakarana Granth',
    topic: 'Prakarana Granth',
    youtubePlaylistId: 'PLVT0gU53weD1OeYr8_xdE3iJ4muJ5zIVK',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Verse-by-verse inquiry into Shankaracharya’s concise work elucidating the oneness of the individual self (Jiva) and Brahman.',
    relatedPublicationIds: ['pub-txt-laghu-vakyavritti-mula']
  },
  {
    id: 'pratah-smaran-video',
    slug: 'pratah-smaran-video',
    title: 'Pratah Smaran Stotram — Morning Contemplation',
    scripture: 'Pratah Smaran Stotram',
    teacher: 'Swamini Amitananda Saraswati',
    format: 'Video',
    language: 'Sanskrit / Hindi',
    duration: 'Multi-part series',
    category: 'chanting',
    categoryName: 'Chanting & Bhajans',
    topic: 'Chanting & Bhajans',
    youtubePlaylistId: 'PLVT0gU53weD35DKvaBI_J6ZmKdwRrIziT',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Commentary and traditional recitation of the three morning verses attributed to Shankaracharya contemplating the Self as existence-knowledge-bliss.'
  },
  {
    id: 'vedanta-satsang-collection',
    slug: 'vedanta-satsang-collection',
    title: 'Vedanta Satsang — 16 Video Discourse Collection',
    scripture: 'Vedanta Vichara',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'Hindi',
    duration: '16 Video sessions',
    category: 'inspiring-stories',
    categoryName: 'Inspiring Stories',
    topic: 'Inspiring Stories',
    youtubePlaylistId: 'PLVT0gU53weD2lxye0WU0s6F2B9U7G3gpI',
    sourceHost: 'YouTube (Verified Playlist)',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Comprehensive collection of sixteen public satsang sessions, seeker question-and-answer encounters, and spiritual guidance episodes.'
  },

  // =========================================================================
  // AUTHENTIC PLAYABLE AUDIO SESSIONS (Archive.org verified recordings)
  // =========================================================================
  {
    id: 'meditation-japa-abhyas',
    slug: 'japa-abhyas-meditation',
    title: 'Japa Abhyas: Contemplative Japa Practice',
    scripture: 'Japa Yoga & Contemplation',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Audio',
    language: 'Hindi',
    duration: '44 min',
    category: 'meditation',
    categoryName: 'Meditation',
    topic: 'Meditation',
    src: '/audio/demo-discourse.mp3',
    audioUrl: 'https://archive.org/download/japa_abhyas/japa_abhyas.mp3',
    sourceHost: 'Archive.org & Local CDN',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Direct authentic discourse and practice guidance by Swami Atmananda Saraswati on Japa Abhyas: coordinating sacred mantra repetition with mental stillness and witness attitude.'
  },
  {
    id: 'meditation-japa-sadhana',
    slug: 'japa-sadhana-kya-kyun-aur-kaise',
    title: 'Japa Sadhana: Kya, Kyun aur Kaise',
    scripture: 'Japa Yoga Philosophy',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Audio',
    language: 'Hindi',
    duration: '42 min',
    category: 'meditation',
    categoryName: 'Meditation',
    topic: 'Meditation',
    src: '/audio/demo-discourse.mp3',
    audioUrl: 'https://archive.org/download/japa-sadhana-kya-kyun-aur-kaise/japa-sadhana_kya%20kyun%20aur%20kaise.mp3',
    sourceHost: 'Archive.org & Local CDN',
    sourceStatus: 'SOURCE-VERIFIED',
    verificationStatus: 'SOURCE-VERIFIED',
    migrationStatus: 'MIGRATED',
    description:
      'Foundational lecture explaining the philosophical basis of Japa: what it is, why it is vital for purifying the mind (Chitta Shuddhi), and how to practice it effectively.'
  },

  // =========================================================================
  // ARCHIVAL AUDIO SERIES (Migration Pending — Clearly marked, No empty player)
  // =========================================================================
  {
    id: 'upanishad-mandukya-01',
    slug: 'mandukya-upanishad-talks',
    title: 'Mandukya Upanishad — Omkara and the Four States',
    scripture: 'Mandukya Upanishad',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Audio',
    language: 'Hindi',
    category: 'upanishads',
    categoryName: 'Upanishads',
    topic: 'Upanishads',
    sourceHost: 'vmission.org.in (Legacy Uploads)',
    sourceStatus: 'MIGRATION_PENDING',
    verificationStatus: 'MIGRATION_PENDING',
    migrationStatus: 'MIGRATION_PENDING',
    description:
      'Archival discourse series examining the twelve mantras of the Mandukya Upanishad and the four states of consciousness (waking, dreaming, deep sleep, and Turiya). Direct audio stream transfer from legacy WordPress media archive is in progress.',
    relatedPublicationIds: ['pub-ebk-va02']
  },
  {
    id: 'gita-pravachan-audio-series',
    slug: 'gita-pravachan-archive',
    title: 'Bhagavad Gita Pravachans — Historical Audio Archive',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Audio',
    language: 'Hindi',
    category: 'bhagavad-gita',
    categoryName: 'Bhagavad Gita',
    topic: 'Bhagavad Gita',
    sourceHost: 'vmission.org.in (Legacy Uploads)',
    sourceStatus: 'MIGRATION_PENDING',
    verificationStatus: 'MIGRATION_PENDING',
    migrationStatus: 'MIGRATION_PENDING',
    description:
      'Complete audio pravachan archive on the Bhagavad Gita delivered across various ashram shivirs. High-resolution digital harvesting from archival audio storage is currently underway.',
    relatedPublicationIds: ['pub-ebk-gita']
  },
  {
    id: 'chanting-stotras-archive',
    slug: 'vedic-chanting-and-stotras',
    title: 'Ashram Daily Chanting & Vedic Stotras Archive',
    scripture: 'Vedic Suktas & Stotras',
    teacher: 'Ashram Swaminijis & Brahmacharis',
    format: 'Audio',
    language: 'Sanskrit',
    category: 'chanting',
    categoryName: 'Chanting & Bhajans',
    topic: 'Chanting & Bhajans',
    sourceHost: 'vmission.org.in (Legacy Uploads)',
    sourceStatus: 'MIGRATION_PENDING',
    verificationStatus: 'MIGRATION_PENDING',
    migrationStatus: 'MIGRATION_PENDING',
    description:
      'Traditional daily ashram chantings including Rudra Prashna, Purusha Sukta, Sri Sukta, and daily evening bhajans. Digital transfer from legacy media files in progress.',
    relatedPublicationIds: ['pub-txt-shiv-upasana']
  },
  {
    id: 'stories-saints-archive',
    slug: 'inspiring-stories-of-saints',
    title: 'Inspiring Stories of Great Masters & Sages',
    scripture: 'Puranic & Hagiographic Accounts',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Audio',
    language: 'Hindi',
    category: 'inspiring-stories',
    categoryName: 'Inspiring Stories',
    topic: 'Inspiring Stories',
    sourceHost: 'vmission.org.in (Legacy Uploads)',
    sourceStatus: 'MIGRATION_PENDING',
    verificationStatus: 'MIGRATION_PENDING',
    migrationStatus: 'MIGRATION_PENDING',
    description:
      'Audio discourses unfolding the life episodes, struggles, and realizations of revered saints and mahatmas. Audio harvesting from legacy WordPress files is in progress.',
    relatedPublicationIds: ['pub-ebk-va04']
  }
];

console.log('Total teachings compiled:', teachings.length);
console.log('- Audio:', teachings.filter(t => t.format === 'Audio').length);
console.log('- Video:', teachings.filter(t => t.format === 'Video').length);

const code = `// Data: Teachings / Jnana Ganga — Vedanta Mission
// Single Canonical Source of Truth for Unified Knowledge Library
// Traceable to Phase 3B.0 Master Content Inventory and Phase 3D.0 Authentic Archive Ingestion

export type TeachingFormat = 'Audio' | 'Video' | 'PDF' | 'E-Book';
export type TeachingLanguage = 'English' | 'Hindi' | 'Sanskrit' | 'Gujarati';

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
    description: 'The timeless dialogue on Yoga, Dharma, and Atma Jnana between Sri Krishna and Arjuna.',
  },
  {
    id: 'upanishads',
    name: 'Upanishads',
    sanskrit: 'उपनिषदः',
    romanNumeral: 'II',
    description: 'The pinnacle of Vedic wisdom (Vedanta) revealing the non-dual reality of Brahman and Atman.',
  },
  {
    id: 'prakarana-granth',
    name: 'Prakarana Granth',
    sanskrit: 'प्रकरण ग्रन्थाः',
    romanNumeral: 'III',
    description: 'Introductory and expository philosophical treatises clarifying foundational Vedantic concepts.',
  },
  {
    id: 'meditation',
    name: 'Meditation',
    sanskrit: 'ध्यानम्',
    romanNumeral: 'IV',
    description: 'Practical and contemplative guidance on Vedantic meditation (Nididhyasana) and mental stillness.',
  },
  {
    id: 'chanting',
    name: 'Chanting & Bhajans',
    sanskrit: 'स्तोत्राणि एवं भजनानि',
    romanNumeral: 'V',
    description: 'Sacred Sanskrit chants, stotrams, and devotional hymns preserving sacred sonic vibration.',
  },
  {
    id: 'devotional',
    name: 'Devotional',
    sanskrit: 'भक्ति साहित्यम्',
    romanNumeral: 'VI',
    description: 'Discourses on devotional literature including Hanuman Chalisa, Sundarkand, and Bhakti Yoga.',
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
  thumbnailSrc?: string;
  sourceHost?: string;
  sourceStatus?: 'SOURCE-VERIFIED' | 'PENDING VERIFICATION' | 'MIGRATION_PENDING' | 'CONFLICT / VERIFY';
  verificationStatus?: 'SOURCE-VERIFIED' | 'PENDING VERIFICATION' | 'MIGRATION_PENDING' | 'CONFLICT / VERIFY';
  migrationStatus?: 'MIGRATED' | 'MIGRATION_PENDING';
  relatedPublicationIds?: string[];
  relatedStudyText?: RelatedStudyText;
}

export const teachings: Teaching[] = ${JSON.stringify(teachings, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'teachings.ts'), code);
console.log('Updated src/data/teachings.ts successfully!');
