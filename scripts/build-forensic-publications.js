const fs = require('fs');
const path = require('path');

// 1. Load data sources
const sandeshRaw = JSON.parse(fs.readFileSync(path.join(__dirname, 'sandesh_extracted.json'), 'utf8'));
const piyushRaw = JSON.parse(fs.readFileSync(path.join(__dirname, 'piyush_extracted.json'), 'utf8'));

// Map to canonical migrated assets
const sandeshList = sandeshRaw.map(item => ({
  ...item,
  coverImage: item.localCover || item.coverImage,
  sourceCoverUrl: item.coverImage
}));

const piyushList = piyushRaw.map(item => ({
  ...item,
  coverImage: item.localCover || item.coverImage,
  sourceCoverUrl: item.coverImage
}));

// E-books (Verified Archive.org & pCloud mirrors with durable local cover assets)
const ebooksData = [
  {
    id: 'pub-ebk-va06',
    type: 'E-Books',
    title: 'Vedanta Articles — Volume 6',
    author: 'Swami Atmananda Saraswati',
    language: 'English',
    year: 2024,
    month: 'November',
    coverImage: '/images/vmission/publications/ebook-va06.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2025/11/Screenshot-2025-11-17-072223_167x238.jpg',
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
    coverImage: '/images/vmission/publications/ebook-va04.png',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2024/01/v-arti4_169x239.png',
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
    year: 2022,
    month: 'January',
    coverImage: '/images/vmission/publications/ebook-va03.png',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2024/01/v-arti3_169x239.png',
    downloadUrl: 'https://archive.org/download/vedanta-articles-3/Vedanta%20Articles%203.pdf',
    archiveUrl: 'https://archive.org/details/vedanta-articles-3',
    readOnlineUrl: 'https://online.pubhtml5.com/iidh/hngw/',
    mirrors: ['Archive.org PDF', 'Google Drive', 'Box.com', 'pubhtml5 Flipbook', 'pCloud'],
    description: 'Penetrating essays on Adi Shankaracharya’s Advaita philosophy, mind mastery, and practical Vedanta.',
    pageCount: 136
  },
  {
    id: 'pub-ebk-va02',
    type: 'E-Books',
    title: 'Vedanta Articles — Volume 2',
    author: 'Swami Atmananda Saraswati',
    language: 'English',
    year: 2021,
    month: 'December',
    coverImage: '/images/vmission/publications/ebook-va02.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2021/12/cp_170x240.jpg',
    downloadUrl: 'https://archive.org/download/vedanta-articles-2/Vedanta%20Articles%20-%202.pdf',
    archiveUrl: 'https://archive.org/details/vedanta-articles-2',
    readOnlineUrl: 'https://online.pubhtml5.com/iidh/akej/',
    mirrors: ['Archive.org PDF', 'Google Drive', 'Box.com', 'pubhtml5 Flipbook', 'pCloud'],
    description: 'In-depth reflections on scriptural aphorisms, Viveka, Vairagya, and the nature of pure consciousness.',
    pageCount: 120
  },
  {
    id: 'pub-ebk-va01',
    type: 'E-Books',
    title: 'Vedanta Articles — Volume 1',
    author: 'Swami Atmananda Saraswati',
    language: 'English',
    year: 2021,
    month: 'June',
    coverImage: '/images/vmission/publications/ebook-va01.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2021/06/v-arti_170x240.jpg',
    downloadUrl: 'https://archive.org/download/vedanta-articles/Vedanta%20Articles.pdf',
    archiveUrl: 'https://archive.org/details/vedanta-articles',
    readOnlineUrl: 'https://online.pubhtml5.com/iidh/amvb/',
    mirrors: ['Archive.org PDF', 'Google Drive', 'Box.com', 'pubhtml5 Flipbook', 'pCloud'],
    description: 'Foundational volume of published discourses and essays introducing seekers to the direct path of Advaita.',
    pageCount: 116
  },
  {
    id: 'pub-ebk-gita',
    type: 'E-Books',
    title: 'Articles on Gita (English)',
    author: 'Swami Atmananda Saraswati',
    language: 'English',
    year: 2021,
    month: 'June',
    coverImage: '/images/vmission/publications/ebook-gita.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2021/06/arti-gita_169x240.jpg',
    downloadUrl: 'https://u.pcloud.link/publink/show?code=QXHotalK',
    archiveUrl: 'https://u.pcloud.link/publink/show?code=QXHotalK',
    mirrors: ['pCloud PDF Mirror'],
    description: 'Systematic expository monograph on key themes, paradoxes, and the spiritual psychology of the Bhagavad Gita.',
    pageCount: 164
  },
  {
    id: 'pub-ebk-email',
    type: 'E-Books',
    title: 'Email Excerpts — Spiritual Guidance',
    author: 'Swami Atmananda Saraswati',
    language: 'English',
    year: 2019,
    month: 'October',
    coverImage: '/images/vmission/publications/ebook-email.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/Email_170x240.jpg',
    downloadUrl: 'https://u.pcloud.link/publink/show?code=ETH',
    archiveUrl: 'https://u.pcloud.link/publink/show?code=ETH',
    mirrors: ['pCloud PDF Mirror'],
    description: 'Personal correspondence, practical spiritual counseling, and lucid answers to seekers’ earnest inquiries.',
    pageCount: 94
  }
];

// Study & Chant Texts (Direct Archive.org PDFs with pCloud mirrors & durable local covers)
const studyTextsData = [
  {
    id: 'pub-txt-shiv-mahimna',
    type: 'Study & Chant Texts',
    title: 'Shiva Mahimna Stotram (शिव महिम्न: स्तोत्रम्)',
    author: 'Pushpadanta / Ashram Commentary',
    language: 'Sanskrit / Hindi',
    year: 2019,
    coverImage: '/images/vmission/publications/study-text-shiv-mahimna.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/shiv_170x240.jpg',
    downloadUrl: 'https://archive.org/download/dm-sto/DM_sto.pdf',
    archiveUrl: 'https://archive.org/details/dm-sto',
    mirrors: ['Archive.org PDF', 'pCloud'],
    description: 'The celebrated Sanskrit hymn of praise to Lord Shiva with word-for-word meaning and spiritual commentary.',
    pageCount: 48
  },
  {
    id: 'pub-txt-katha-manjari',
    type: 'Study & Chant Texts',
    title: 'Katha Manjari (कथा मञ्जरी)',
    author: 'Ashram Editorial Board',
    language: 'Hindi',
    year: 2019,
    coverImage: '/images/vmission/publications/study-text-katha-manjari.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/katha_169x240.jpg',
    downloadUrl: 'https://u.pcloud.link/publink/show?code=lV9',
    archiveUrl: 'https://u.pcloud.link/publink/show?code=lV9',
    mirrors: ['pCloud'],
    description: 'A bouquet of illuminating parables, Vedantic stories, and instructional allegories for seekers.',
    pageCount: 88
  },
  {
    id: 'pub-txt-shiv-upasana',
    type: 'Study & Chant Texts',
    title: 'Shiva Upasana (शिव उपासना)',
    author: 'Ashram Puja Paddhati',
    language: 'Sanskrit / Hindi',
    year: 2019,
    coverImage: '/images/vmission/publications/study-text-shiv-upasana.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/shiv-upa_169x240.jpg',
    downloadUrl: 'https://u.pcloud.link/publink/show?code=iVectalK',
    archiveUrl: 'https://u.pcloud.link/publink/show?code=iVectalK',
    mirrors: ['pCloud'],
    description: 'Traditional worship guide, mantras, stotras, and contemplative paddhati for Shiva Upasana at the Ashram.',
    pageCount: 64
  },
  {
    id: 'pub-txt-vishnu-sahasranama',
    type: 'Study & Chant Texts',
    title: 'Vishnu Sahasranama Vyakhya (विष्णु सहस्रनाम व्याख्या)',
    author: 'Adi Shankaracharya / Ashram Study Notes',
    language: 'Sanskrit / Hindi',
    year: 2021,
    coverImage: '/images/vmission/publications/study-text-vishnu-sahasranama.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2021/06/vsn-722x1024.jpg',
    downloadUrl: 'https://u.pcloud.link/publink/show?code=LS2rtalK',
    archiveUrl: 'https://u.pcloud.link/publink/show?code=LS2rtalK',
    mirrors: ['pCloud'],
    description: 'The thousand names of Lord Vishnu from the Mahabharata with Shankaracharya’s philosophical commentary.',
    pageCount: 240
  },
  {
    id: 'pub-txt-vairagya-sandipani',
    type: 'Study & Chant Texts',
    title: 'Vairagya Sandipani (वैराग्य सन्दीपनी)',
    author: 'Goswami Tulsidas / Ashram Notes',
    language: 'Hindi / Sanskrit',
    year: 2021,
    coverImage: '/images/vmission/publications/study-text-vairagya-sandipani.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2021/06/vai-sand.jpg',
    downloadUrl: 'https://u.pcloud.link/publink/show?code=ThcctalK',
    archiveUrl: 'https://u.pcloud.link/publink/show?code=ThcctalK',
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
    coverImage: '/images/vmission/publications/study-text-sp-mula.png',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2021/05/sp-txt.png',
    downloadUrl: 'https://archive.org/download/sadhna5m/sadhna5m.pdf',
    archiveUrl: 'https://archive.org/details/sadhna5m',
    mirrors: ['Archive.org PDF', 'pCloud'],
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
    coverImage: '/images/vmission/publications/study-text-tb-mula.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/TBtxt_170x233.jpg',
    downloadUrl: 'https://archive.org/download/tb_20211120/tb.pdf',
    archiveUrl: 'https://archive.org/details/tb_20211120',
    mirrors: ['Archive.org PDF', 'pCloud'],
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
    coverImage: '/images/vmission/publications/study-text-ab-mula.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/AB_169x240.jpg',
    downloadUrl: 'https://archive.org/download/atmabodha_202109/atmabodha.pdf',
    archiveUrl: 'https://archive.org/details/atmabodha_202109',
    mirrors: ['Archive.org PDF', 'pCloud'],
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
    coverImage: '/images/vmission/publications/study-text-ddv-mula.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/DDV_168x240.jpg',
    downloadUrl: 'https://archive.org/download/ddv_e_bk/ddv_e_bk.pdf',
    archiveUrl: 'https://archive.org/details/ddv_e_bk',
    mirrors: ['Archive.org PDF', 'pCloud'],
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
    coverImage: '/images/vmission/publications/study-text-lvv-mula.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/lvv_170x240.jpg',
    downloadUrl: 'https://archive.org/download/lvv_20211120/lvv.pdf',
    archiveUrl: 'https://archive.org/details/lvv_20211120',
    mirrors: ['Archive.org PDF', 'pCloud'],
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
    coverImage: '/images/vmission/publications/study-text-sp-vyakhya.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/sp_169x240.jpg',
    downloadUrl: 'https://archive.org/download/sadhna5m/sadhna5m.pdf',
    archiveUrl: 'https://archive.org/details/sadhna5m',
    mirrors: ['Archive.org PDF', 'pCloud'],
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
    coverImage: '/images/vmission/publications/study-text-tb-vyakhya.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/TB_169x240.jpg',
    downloadUrl: 'https://archive.org/download/tb_20211120/tb.pdf',
    archiveUrl: 'https://archive.org/details/tb_20211120',
    mirrors: ['Archive.org PDF', 'pCloud'],
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
    coverImage: '/images/vmission/publications/study-text-ab-vyakhya.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/AB_169x240.jpg',
    downloadUrl: 'https://archive.org/download/atmabodha_202109/atmabodha.pdf',
    archiveUrl: 'https://archive.org/details/atmabodha_202109',
    mirrors: ['Archive.org PDF', 'pCloud'],
    description: 'Comprehensive Hindi commentary expounding each verse of Atmabodha with Upanishadic cross-references.',
    pageCount: 156
  },
  {
    id: 'pub-txt-upadesha-saram',
    type: 'Study & Chant Texts',
    title: 'Upadesha Saram (उपदेश सारम्)',
    author: 'Bhagavan Ramana Maharshi',
    language: 'Sanskrit / Hindi',
    year: 2020,
    coverImage: '/images/vmission/publications/study-text-upadesha-saram.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/usaar_170x222.jpg',
    downloadUrl: 'https://archive.org/download/updesh_sar/updesh_sar.pdf',
    archiveUrl: 'https://archive.org/details/updesh_sar',
    mirrors: ['Archive.org PDF', 'pCloud'],
    description: 'Thirty verses outlining the spiritual journey across Karma, Upasana, Yoga, and Jnana.',
    pageCount: 20
  },
  {
    id: 'pub-txt-vibhishana-gita',
    type: 'Study & Chant Texts',
    title: 'Vibhishana Gita (विभीषण गीता)',
    author: 'Goswami Tulsidas / Ashram Notes',
    language: 'Hindi / Sanskrit',
    year: 2020,
    coverImage: '/images/vmission/publications/study-text-vibhishana-gita.jpg',
    sourceCoverUrl: 'https://www.vmission.org.in/wp-content/uploads/2019/10/vibhi_164x240.jpg',
    downloadUrl: 'https://u.pcloud.link/publink/show?code=OXartalK',
    archiveUrl: 'https://u.pcloud.link/publink/show?code=OXartalK',
    mirrors: ['pCloud'],
    description: 'Lord Rama’s teaching to Vibhishana on the spiritual chariot (Dharma Ratha) necessary to conquer worldliness.',
    pageCount: 24
  }
];

// Merge all into single canonical publications array
const allPublications = [
  ...sandeshList,
  ...piyushList,
  ...ebooksData,
  ...studyTextsData
];

console.log('Total Publications Compiled:', allPublications.length);
console.log('- Vedanta Sandesh:', sandeshList.length);
console.log('- Vedanta Piyush:', piyushList.length);
console.log('- E-Books:', ebooksData.length);
console.log('- Study & Chant Texts:', studyTextsData.length);

const tsContent = `// Publications Data — Vedanta Mission
// Single Canonical Source of Truth for Publication Archive
// Traceable to Phase 3B.0 Master Content Inventory and Phase 3D.2 Master Archive Reconciliation

export type PublicationType =
  | 'Vedanta Sandesh'
  | 'Vedanta Piyush'
  | 'E-Books'
  | 'Study & Chant Texts';

export type PublicationLanguage =
  | 'English'
  | 'Hindi'
  | 'Sanskrit'
  | 'Gujarati'
  | 'English / Hindi'
  | 'Hindi / Sanskrit'
  | 'Sanskrit / Hindi'
  | 'Hindi / Gujarati';

export interface Publication {
  id: string;
  type: PublicationType;
  title: string;
  author?: string;
  language: PublicationLanguage;
  year: number;
  month?: string;
  issueNumber?: number;
  coverImage: string;
  localCover?: string;
  sourceCoverUrl?: string;
  downloadUrl: string;
  archiveUrl?: string;
  readOnlineUrl?: string;
  mirrors?: string[] | Record<string, string>;
  description: string;
  pageCount?: number;
  featured?: boolean;
  isLatest?: boolean;
}

export const PUBLICATIONS: Publication[] = ${JSON.stringify(allPublications, null, 2)};
export const publications = PUBLICATIONS;
export const availableYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'publications.ts'), tsContent);
console.log('Updated src/data/publications.ts successfully with local durable cover assets!');
