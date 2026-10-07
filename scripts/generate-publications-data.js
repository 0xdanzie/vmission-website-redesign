const fs = require('fs');
const path = require('path');

// 1. Load data sources
const sandeshList = JSON.parse(fs.readFileSync(path.join(__dirname, 'sandesh_extracted.json'), 'utf8'));
const piyushList = JSON.parse(fs.readFileSync(path.join(__dirname, 'piyush_extracted.json'), 'utf8'));

// E-books & Study texts
const ebooksData = [
  {
    id: 'pub-ebk-va06',
    type: 'E-Books',
    title: 'Vedanta Articles — Volume 6',
    author: 'Swami Atmananda Saraswati',
    language: 'English',
    year: 2024,
    month: 'November',
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2025/11/Screenshot-2025-11-17-072223_167x238.jpg',
    downloadUrl: 'https://archive.org/download/vedanta_articles6/VedantaArticles_6.pdf',
    archiveUrl: 'https://archive.org/details/vedanta_articles6',
    readOnlineUrl: 'https://online.pubhtml5.com/iidh/xgaa/',
    mirrors: ['Archive.org PDF', 'Google Drive', 'Box.com', 'pubhtml5 Flipbook', 'pCloud'],
    description: 'Selected philosophical treatises and spiritual articles by Swami Atmananda Saraswati unfolding the vision of non-duality.',
    pageCount: 142
  },
  {
    id: 'pub-ebk-va04',
    type: 'E-Books',
    title: 'Vedanta Articles — Volume 4',
    author: 'Swami Atmananda Saraswati',
    language: 'English',
    year: 2022,
    month: 'January',
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2024/01/v-arti4_169x239.png',
    downloadUrl: 'https://archive.org/download/vedanta-articles-part-4/VedantaArticles_Part4.pdf',
    archiveUrl: 'https://archive.org/details/vedanta-articles-part-4',
    readOnlineUrl: 'https://online.pubhtml5.com/iidh/tqxf/',
    mirrors: ['Archive.org PDF', 'Google Drive', 'Box.com', 'pubhtml5 Flipbook', 'pCloud'],
    description: 'Essays on Self-knowledge, meditation, and overcoming existential sorrow through scriptural inquiry.',
    pageCount: 128
  },
  {
    id: 'pub-ebk-va03',
    type: 'E-Books',
    title: 'Vedanta Articles — Volume 3',
    author: 'Swami Atmananda Saraswati',
    language: 'English',
    year: 2021,
    month: 'May',
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2024/01/v-arti3_169x239.png',
    downloadUrl: 'https://archive.org/download/vedanta-articles-3/Vedanta%20Articles%203.pdf',
    archiveUrl: 'https://archive.org/details/vedanta-articles-3',
    readOnlineUrl: 'https://online.pubhtml5.com/iidh/hngw/',
    mirrors: ['Archive.org PDF', 'Google Drive', 'Box.com', 'pubhtml5 Flipbook', 'pCloud'],
    description: 'In-depth reflections on the Upanishadic mahavakyas and practical spiritual living.',
    pageCount: 136
  },
  {
    id: 'pub-ebk-va02',
    type: 'E-Books',
    title: 'Vedanta Articles — Volume 2',
    author: 'Swami Atmananda Saraswati',
    language: 'English',
    year: 2020,
    month: 'December',
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2021/12/cp_170x240.jpg',
    downloadUrl: 'https://archive.org/download/vedanta-articles-2/Vedanta%20Articles%20-%202.pdf',
    archiveUrl: 'https://archive.org/details/vedanta-articles-2',
    readOnlineUrl: 'https://online.pubhtml5.com/iidh/akej/',
    mirrors: ['Archive.org PDF', 'Google Drive', 'Box.com', 'pubhtml5 Flipbook', 'pCloud'],
    description: 'Discourses exploring the nature of the Seer and the Seen, ego dissolution, and liberation.',
    pageCount: 120
  },
  {
    id: 'pub-ebk-va01',
    type: 'E-Books',
    title: 'Vedanta Articles — Volume 1',
    author: 'Swami Atmananda Saraswati',
    language: 'English',
    year: 2019,
    month: 'June',
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2021/06/v-arti_170x240.jpg',
    downloadUrl: 'https://archive.org/download/vedanta-articles/Vedanta%20Articles.pdf',
    archiveUrl: 'https://archive.org/details/vedanta-articles',
    readOnlineUrl: 'https://online.pubhtml5.com/iidh/amvb/',
    mirrors: ['Archive.org PDF', 'Google Drive', 'Box.com', 'pubhtml5 Flipbook', 'pCloud'],
    description: 'The foundational first volume introducing classical Vedantic inquiry, the qualified seeker (Adhikari), and Guru-shishya parampara.',
    pageCount: 112
  },
  {
    id: 'pub-ebk-gita',
    type: 'E-Books',
    title: 'Articles on Gita (English)',
    author: 'Swami Atmananda Saraswati',
    language: 'English',
    year: 2021,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2021/06/arti-gita_169x240.jpg',
    downloadUrl: 'http://u.pc.cd/QXHotalK',
    archiveUrl: 'http://u.pc.cd/QXHotalK',
    mirrors: ['pCloud'],
    description: 'Dedicated monograph presenting key themes and insights across the eighteen chapters of the Bhagavad Gita.',
    pageCount: 96
  },
  {
    id: 'pub-ebk-email',
    type: 'E-Books',
    title: 'Email Excerpts — Spiritual Guidance',
    author: 'Swami Atmananda Saraswati',
    language: 'English',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/Email_170x240.jpg',
    downloadUrl: 'http://u.pc.cd/ETH',
    archiveUrl: 'http://u.pc.cd/ETH',
    mirrors: ['pCloud'],
    description: 'Authentic excerpts from Poojya Guruji answering questions on sadhana, meditation, and daily challenges.',
    pageCount: 88
  }
];

const studyTextsData = [
  {
    id: 'pub-txt-shiv-mahimna',
    type: 'Study & Chant Texts',
    title: 'Shiva Mahimna Stotram (शिव महिम्न: स्तोत्रम्)',
    author: 'Pushpadanta / Ashram Tradition',
    language: 'Sanskrit / Hindi',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/shiv_170x240.jpg',
    downloadUrl: 'http://u.pc.cd/UllitalK',
    archiveUrl: 'http://u.pc.cd/UllitalK',
    mirrors: ['pCloud'],
    description: 'Sacred Sanskrit hymn celebrating the greatness of Lord Shiva with word-by-word meaning and spiritual commentary.',
    pageCount: 48
  },
  {
    id: 'pub-txt-katha-manjari',
    type: 'Study & Chant Texts',
    title: 'Katha Manjari (कथा मञ्जरी)',
    author: 'Vedanta Ashram Editorial',
    language: 'Sanskrit / Hindi',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/katha_169x240.jpg',
    downloadUrl: 'http://u.pc.cd/lV9',
    archiveUrl: 'http://u.pc.cd/lV9',
    mirrors: ['pCloud'],
    description: 'Spiritual allegories, parables, and Vedic stories compiled for seekers and Sanskrit learners.',
    pageCount: 64
  },
  {
    id: 'pub-txt-shiv-upasana',
    type: 'Study & Chant Texts',
    title: 'Shiva Upasana (शिव उपासना)',
    author: 'Vedanta Ashram Tradition',
    language: 'Sanskrit / Hindi',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/shiv-upa_169x240.jpg',
    downloadUrl: 'http://u.pc.cd/iVectalK',
    archiveUrl: 'http://u.pc.cd/iVectalK',
    mirrors: ['pCloud'],
    description: 'Chanting manual and contemplative verses for daily Shiva puja at Sri Gangeshwar Mahadev Mandir.',
    pageCount: 40
  },
  {
    id: 'pub-txt-vishnu-sahasranama',
    type: 'Study & Chant Texts',
    title: 'Vishnu Sahasranama Vyakhya (विष्णु सहस्रनाम व्याख्या)',
    author: 'Swami Atmananda Saraswati',
    language: 'Sanskrit / Hindi',
    year: 2021,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2021/06/vsn-722x1024.jpg',
    downloadUrl: 'http://u.pc.cd/LS2rtalK',
    archiveUrl: 'http://u.pc.cd/LS2rtalK',
    mirrors: ['pCloud'],
    description: 'Exhaustive spiritual commentary and grammatical anvaya on the thousand names of Lord Vishnu.',
    pageCount: 216
  },
  {
    id: 'pub-txt-vairagya-sandipani',
    type: 'Study & Chant Texts',
    title: 'Vairagya Sandipani (वैराग्य सन्दीपनी)',
    author: 'Goswami Tulsidas / Ashram Notes',
    language: 'Hindi / Sanskrit',
    year: 2021,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2021/06/vai-sand.jpg',
    downloadUrl: 'http://u.pc.cd/ThcctalK',
    archiveUrl: 'http://u.pc.cd/ThcctalK',
    mirrors: ['pCloud'],
    description: 'Classical treatise on dispassion (Vairagya), discrimination, and steadfastness on the spiritual path.',
    pageCount: 52
  },
  {
    id: 'pub-txt-sadhana-panchakam-mula',
    type: 'Study & Chant Texts',
    title: 'Sadhana Panchakam Mula Grantha (साधना पञ्चकम् मूल ग्रन्थ)',
    author: 'Adi Shankaracharya',
    language: 'Sanskrit',
    year: 2021,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2021/05/sp-txt.png',
    downloadUrl: 'http://u.pc.cd/hcUrtalK',
    archiveUrl: 'http://u.pc.cd/hcUrtalK',
    mirrors: ['pCloud'],
    description: 'Root Sanskrit verses of Adi Shankaracharya presenting the forty progressive steps of Vedantic sadhana.',
    pageCount: 16
  },
  {
    id: 'pub-txt-tattvabodha-mula',
    type: 'Study & Chant Texts',
    title: 'Tattvabodha Mula Grantha (तत्त्वबोध मूल ग्रन्थ)',
    author: 'Adi Shankaracharya',
    language: 'Sanskrit',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/TBtxt_170x233.jpg',
    downloadUrl: 'http://u.pc.cd/bXF7',
    archiveUrl: 'http://u.pc.cd/bXF7',
    mirrors: ['pCloud'],
    description: 'The definitive root text defining the core technical terminology and methodology of Advaita Vedanta.',
    pageCount: 24
  },
  {
    id: 'pub-txt-atmabodha-mula',
    type: 'Study & Chant Texts',
    title: 'Atmabodha Mula Grantha (आत्मबोध मूल ग्रन्थ)',
    author: 'Adi Shankaracharya',
    language: 'Sanskrit',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/AB_169x240.jpg',
    downloadUrl: 'http://u.pc.cd/fc4',
    archiveUrl: 'http://u.pc.cd/fc4',
    mirrors: ['pCloud'],
    description: 'Sixty-eight poetic root verses on Self-Knowledge comparing ignorance to dream states and knowledge to radiant sunshine.',
    pageCount: 32
  },
  {
    id: 'pub-txt-drig-drushya-mula',
    type: 'Study & Chant Texts',
    title: 'Drig Drushya Viveka Mula Grantha (दृग्दृश्य विवेक मूल ग्रन्थ)',
    author: 'Adi Shankaracharya / Bharati Tirtha',
    language: 'Sanskrit',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/DDV_168x240.jpg',
    downloadUrl: 'http://u.pc.cd/k9UctalK',
    archiveUrl: 'http://u.pc.cd/k9UctalK',
    mirrors: ['pCloud'],
    description: 'Root verses investigating the fundamental discrimination between the Seer (Consciousness) and the Seen (phenomena).',
    pageCount: 28
  },
  {
    id: 'pub-txt-laghu-vakyavritti-mula',
    type: 'Study & Chant Texts',
    title: 'Laghu Vakyavritti Mula Grantha (लघु वाक्यवृत्ति मूल ग्रन्थ)',
    author: 'Adi Shankaracharya',
    language: 'Sanskrit',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/lvv_170x240.jpg',
    downloadUrl: 'http://u.pc.cd/BOB7',
    archiveUrl: 'http://u.pc.cd/BOB7',
    mirrors: ['pCloud'],
    description: 'Short treatise unfolding the profound equation of the Mahavakya "Tat Tvam Asi" in concise Sanskrit verses.',
    pageCount: 20
  },
  {
    id: 'pub-txt-sadhana-panchakam-vyakhya',
    type: 'Study & Chant Texts',
    title: 'Sadhana Panchakam Vyakhya (साधना पञ्चकम् व्याख्या)',
    author: 'Swami Atmananda Saraswati',
    language: 'Hindi / Sanskrit',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/sp_169x240.jpg',
    downloadUrl: 'http://u.pc.cd/F8fctalK',
    archiveUrl: 'http://u.pc.cd/F8fctalK',
    mirrors: ['pCloud'],
    description: 'Detailed spiritual exposition and commentary on the five verses of Sadhana Panchakam.',
    pageCount: 76
  },
  {
    id: 'pub-txt-tattvabodha-vyakhya',
    type: 'Study & Chant Texts',
    title: 'Tattvabodha Vyakhya (तत्त्वबोध व्याख्या)',
    author: 'Swami Atmananda Saraswati',
    language: 'Hindi / Sanskrit',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/TB_169x240.jpg',
    downloadUrl: 'http://u.pc.cd/SV0',
    archiveUrl: 'http://u.pc.cd/SV0',
    mirrors: ['pCloud'],
    description: 'Complete Hindi commentary with practical illustrations elucidating the Tattvabodha inquiry.',
    pageCount: 112
  },
  {
    id: 'pub-txt-atmabodha-vyakhya',
    type: 'Study & Chant Texts',
    title: 'Atmabodha Vyakhya (आत्मबोध व्याख्या)',
    author: 'Swami Atmananda Saraswati',
    language: 'Hindi / Sanskrit',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/AB_169x240.jpg',
    downloadUrl: 'http://u.pc.cd/q5m',
    archiveUrl: 'http://u.pc.cd/q5m',
    mirrors: ['pCloud'],
    description: 'Exposition of Shankaracharya’s Atmabodha highlighting direct Self-recognition.',
    pageCount: 124
  },
  {
    id: 'pub-txt-upadesha-saram',
    type: 'Study & Chant Texts',
    title: 'Upadesha Saram (उपदेश सारम्)',
    author: 'Bhagavan Ramana Maharshi / Ashram Commentary',
    language: 'Sanskrit / Hindi',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/usaar_170x222.jpg',
    downloadUrl: 'http://u.pc.cd/bQQ',
    archiveUrl: 'http://u.pc.cd/bQQ',
    mirrors: ['pCloud'],
    description: 'Thirty verses outlining Karma, Bhakti, Yoga, and Jnana leading to Self-Inquiry (Atma-Vichara).',
    pageCount: 48
  },
  {
    id: 'pub-txt-vibhishana-gita',
    type: 'Study & Chant Texts',
    title: 'Vibhishana Gita (विभीषण गीता)',
    author: 'Goswami Tulsidas / Ashram Commentary',
    language: 'Hindi',
    year: 2020,
    coverImage: 'https://www.vmission.org.in/wp-content/uploads/2019/10/vibhi_164x240.jpg',
    downloadUrl: 'http://u.pc.cd/OXartalK',
    archiveUrl: 'http://u.pc.cd/OXartalK',
    mirrors: ['pCloud'],
    description: 'Lord Rama explaining the Divine Chariot of Virtues (Dharma Ratha) to Vibhishana on the battlefield.',
    pageCount: 36
  }
];

// Combine all publications
const allPublications = [
  ...sandeshList,
  ...piyushList,
  ...ebooksData,
  ...studyTextsData
];

console.log('Total publications compiled:', allPublications.length);
console.log(`- Vedanta Sandesh: ${sandeshList.length}`);
console.log(`- Vedanta Piyush: ${piyushList.length}`);
console.log(`- E-Books: ${ebooksData.length}`);
console.log(`- Study & Chant Texts: ${studyTextsData.length}`);

// Write src/data/publications.ts
const code = `// Data: Publications — Vedanta Mission
// Unified Canonical Source of Truth for Publications Repository
// Ingested from authentic old website archive: Vedanta Sandesh, Vedanta Piyush, E-Books, and Study Texts

export type PublicationType = 'Vedanta Sandesh' | 'Vedanta Piyush' | 'E-Books' | 'Study & Chant Texts';

export interface Publication {
  id: string;
  type: PublicationType;
  title: string;
  month?: string;
  year?: number;
  coverImage: string;
  language: string;
  description: string;
  archiveUrl: string; // External Archive.org or GDrive link
  downloadUrl: string; // Direct PDF or primary download link
  readOnlineUrl?: string; // In-browser flipbook or Archive.org stream
  mirrors?: Record<string, string> | string[];
  isLatest?: boolean;
  pageCount?: number;
  author?: string;
}

export const publications: Publication[] = ${JSON.stringify(allPublications, null, 2)};

export const availableYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'publications.ts'), code);
console.log('Updated src/data/publications.ts successfully!');
