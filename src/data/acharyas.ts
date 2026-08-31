// Data: Acharyas of Vedanta Mission
// Source: vmission.org.in official records

export interface Acharya {
  slug: string;
  name: string;
  honorific: string;
  role: string;
  shortBio: string;
  fullBio: string;
  lineage: string;
  image: string;
  teachings: string[];
  relatedAudio: string[];
  programs: string[];
}

export const acharyas: Acharya[] = [
  {
    slug: 'swami-atmananda-saraswati',
    name: 'Swami Atmananda Saraswati',
    honorific: 'Poojya Guruji',
    role: 'Founder & Head Acharya — Vedanta Mission',
    shortBio:
      'Swami Atmananda Saraswati is the founder of Vedanta Mission and Vedanta Ashram in Indore. A student of the great masters of the Shankaracharya tradition, he has dedicated his life to the dissemination of Advaita Vedanta through traditional teaching, publications, and residential courses.',
    fullBio:
      'Swami Atmananda Saraswati pursued his early education and later studies in Vedanta at the Sandeepany Sadhanalaya, Mumbai, under the Chinmaya Mission. He took Brahmacharya initiation in 1983 and Sanyas shortly after, embracing the life of a full-time renunciant and teacher. He founded the Vedanta Ashram in Indore (Sudama Nagar) and established the Vedanta Parmarthic Sewa Trust. His teachings span the Bhagavad Gita, Principal Upanishads, Prakarana Granths such as Drig Drushya Viveka and Atma-bodha, and the Brahma Sutras. He also founded the monthly e-magazine Vedanta Sandesh which has been published continuously for over two decades.',
    lineage:
      'Shankaracharya tradition · Chinmaya Mission (Sandeepany Sadhanalaya, Mumbai)',
    image: '/images/vmission/acharyas/guruji-portrait-riverside.jpg',
    teachings: ['Bhagavad Gita', 'Upanishads', 'Drig Drushya Viveka', 'Atma-bodha', 'Brahma Sutras'],
    relatedAudio: ['gita-talks', 'atma-bodha', 'upanishad-talks', 'drig-drushya-viveka'],
    programs: ['Residential 12-Month Gita Course', 'Gyana Yagna Camps', 'Online Gita Course'],
  },
  {
    slug: 'swamini-amitananda-saraswati',
    name: 'Swamini Amitananda Saraswati',
    honorific: 'Swamini Amitanandaji',
    role: 'Senior Acharya — Vedanta Mission',
    shortBio:
      'Swamini Amitananda Saraswati is a senior teacher at Vedanta Mission, known for her clear and compassionate exposition of Vedantic principles. She conducts classes, study circles, and programs at the Indore Ashram.',
    fullBio:
      'Swamini Amitananda Saraswati has been associated with Vedanta Mission for many years, serving as a dedicated teacher and guide for seekers. She has been instrumental in conducting online courses, regional camps, and study groups. She teaches Vedanta with warmth and precision, making the scriptural teachings accessible to modern students.',
    lineage: 'Vedanta Mission — under Poojya Swami Atmananda Saraswati',
    image: '/images/vmission/acharyas/swamini-amitananda.jpg',
    teachings: ['Bhagavad Gita', 'Tattva Bodha', 'Vivekachudamani'],
    relatedAudio: ['gita-talks'],
    programs: ['Online Courses', 'Study Groups', 'Vedanta Camps'],
  },
  {
    slug: 'swamini-samatananda-saraswati',
    name: 'Swamini Samatananda Saraswati',
    honorific: 'Swamini Samatanandaji',
    role: 'Acharya — Vedanta Mission',
    shortBio:
      'Swamini Samatananda Saraswati is an Acharya at Vedanta Mission who teaches Vedanta, Sanskrit, and related subjects. She contributes to the publications and residential teaching programs at the Ashram.',
    fullBio:
      'Swamini Samatananda Saraswati joined the Vedanta Mission community and has been a dedicated teacher of Advaita Vedanta. She is known for her deep knowledge of Sanskrit and her ability to explain subtle philosophical points clearly. She contributes to the Vedanta Sandesh e-magazine and leads study sessions at the Ashram.',
    lineage: 'Vedanta Mission — under Poojya Swami Atmananda Saraswati',
    image: '/images/vmission/acharyas/swamini-samatananda.jpg',
    teachings: ['Sanskrit Grammar', 'Tattva Bodha', 'Bhagavad Gita Chapter 2'],
    relatedAudio: ['atma-bodha'],
    programs: ['Sanskrit Foundation', 'Online Tattva Bodha Course'],
  },
  {
    slug: 'swamini-poornananda-saraswati',
    name: 'Swamini Poornananda Saraswati',
    honorific: 'Swamini Poornanandaji',
    role: 'Acharya — Vedanta Mission',
    shortBio:
      'Swamini Poornananda Saraswati serves as an Acharya at Vedanta Mission, participating in teaching, ashram administration, and guiding new students in their study of Vedanta.',
    fullBio:
      'Swamini Poornananda Saraswati has dedicated herself to the study and dissemination of Advaita Vedanta. She assists with the daily operations of Vedanta Ashram and guides students in their sadhana and scriptural studies.',
    lineage: 'Vedanta Mission — under Poojya Swami Atmananda Saraswati',
    image: '/images/vmission/acharyas/swamini-poornananda.jpg',
    teachings: ['Bhagavad Gita', 'Introduction to Vedanta', 'Chanting & Stotrams'],
    relatedAudio: ['upanishad-talks'],
    programs: ['Introductory Vedanta Workshops', 'Ashram Study Circles'],
  },
];

export function getAcharyaBySlug(slug: string): Acharya | undefined {
  return acharyas.find((a) => a.slug === slug);
}

export function getAllAcharyas(): Acharya[] {
  return acharyas;
}
