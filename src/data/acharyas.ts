// Data: Acharyas of Vedanta Mission
// Source: vmission.org.in official records

export interface AcharyaMilestone {
  year: string;
  title: string;
  description: string;
}

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
  isFounder?: boolean;
  milestones?: AcharyaMilestone[];
  verificationState: 'SOURCE-VERIFIED' | 'SUMMARY-VERIFIED';
  archivalNotice?: string;
}

export const acharyas: Acharya[] = [
  {
    slug: 'swami-atmananda-saraswati',
    name: 'Swami Atmananda Saraswati',
    honorific: 'Poojya Guruji',
    role: 'Founder & Head Acharya — Vedanta Mission',
    isFounder: true,
    verificationState: 'SOURCE-VERIFIED',
    shortBio:
      'Swami Atmananda Saraswati is the founder of Vedanta Mission and Vedanta Ashram in Indore. A monk and scholar in the traditional Shankaracharya lineage, he has dedicated his life to the dissemination of Advaita Vedanta through rigorous scriptural teaching, publications, and residential study.',
    fullBio:
      'Swami Atmananda Saraswati completed intensive scriptural studies in Advaita Vedanta at the Sandeepany Sadhanalaya in Mumbai under the Chinmaya Mission. He was initiated into Brahmacharya in 1983 and embraced Sanyas Deeksha in 1987, entering the sacred Dashanami Saraswati order as a full-time renunciant teacher. In 1992, he founded Vedanta Mission to bring authentic Vedantic study to seekers across the world. In 1995, he established Vedanta Ashram in Sudama Nagar, Indore, as a traditional Gurukula and consecrated Sri Gangeshwar Mahadev Mandir. His discourses unfold the Prasthana Traya (Upanishads, Bhagavad Gita, and Brahma Sutras) along with foundational Prakarana Granths such as Drig Drushya Viveka and Atma-bodha. He is also the founding editor of the monthly e-journal Vedanta Sandesh.',
    lineage:
      'Adi Shankaracharya Tradition · Dashanami Saraswati Order · Chinmaya Mission (Sandeepany Sadhanalaya, Mumbai)',
    image: '/images/vmission/acharyas/guruji-portrait-riverside.jpg',
    milestones: [
      {
        year: '1983',
        title: 'Brahmacharya Initiation',
        description: 'Completed intensive Vedanta studies at Sandeepany Sadhanalaya, Mumbai, under the guidance of Chinmaya Mission.',
      },
      {
        year: '1987',
        title: 'Sanyas Deeksha',
        description: 'Embraced the vows of Sanyas Deeksha, entering the Dashanami Saraswati monastic order as a dedicated Vedantic teacher.',
      },
      {
        year: '1992',
        title: 'Founding of Vedanta Mission',
        description: 'Conceived and established Vedanta Mission as a non-profit spiritual initiative dedicated to systematic Advaita study.',
      },
      {
        year: '1995',
        title: 'Establishment of Indore Ashram',
        description: 'Consecrated Vedanta Ashram and Sri Gangeshwar Mahadev Mandir in Sudama Nagar, Indore, inaugurating the resident Gurukula.',
      },
    ],
    teachings: ['Bhagavad Gita', 'Principal Upanishads', 'Drig Drushya Viveka', 'Atma-bodha', 'Brahma Sutras'],
    relatedAudio: ['gita-talks', 'atma-bodha', 'upanishad-talks', 'drig-drushya-viveka'],
    programs: ['Annual Guru Poornima Celebrations', 'Residential Scripture Shivirs', 'Online Gita Lesson Course'],
  },
  {
    slug: 'swamini-amitananda-saraswati',
    name: 'Swamini Amitananda Saraswati',
    honorific: 'Swamini Amitanandaji',
    role: 'Senior Acharya — Vedanta Mission',
    isFounder: false,
    verificationState: 'SUMMARY-VERIFIED',
    archivalNotice: 'Full archival biography and chronology are currently being compiled with the Ashram office.',
    shortBio:
      'Swamini Amitananda Saraswati is a senior teacher at Vedanta Mission, known for her clear, systematic, and compassionate exposition of Advaita Vedantic principles.',
    fullBio:
      'Swamini Amitananda Saraswati has been associated with Vedanta Mission for many years as a dedicated Acharya and spiritual guide. She conducts regular scripture study circles, online discourses, and retreats at the Indore Ashram, unfolding foundational treatises such as Tattva Bodha, Bhagavad Gita, and Vivekachudamani with depth and accessibility.',
    lineage: 'Vedanta Mission — Shankaracharya Sampradaya under Poojya Swami Atmananda Saraswati',
    image: '/images/vmission/acharyas/swamini-amitananda.jpg',
    teachings: ['Bhagavad Gita', 'Tattva Bodha', 'Vivekachudamani', 'Meditation Inquiry'],
    relatedAudio: ['gita-talks'],
    programs: ['Residential Meditation & Vedanta Camps', 'Weekly Study Circles', 'Online Scripture Classes'],
  },
  {
    slug: 'swamini-samatananda-saraswati',
    name: 'Swamini Samatananda Saraswati',
    honorific: 'Swamini Samatanandaji',
    role: 'Resident Acharya — Sanskrit & Scripture',
    isFounder: false,
    verificationState: 'SUMMARY-VERIFIED',
    archivalNotice: 'Full archival biography and chronology are currently being compiled with the Ashram office.',
    shortBio:
      'Swamini Samatananda Saraswati is an Acharya at Vedanta Mission with specialized scholarship in Sanskrit grammar, scriptural chanting, and classical Vedantic texts.',
    fullBio:
      'Swamini Samatananda Saraswati serves as a resident Acharya at Vedanta Ashram, Indore. Renowned for her grammatical clarity and precision in Sanskrit, she leads study sessions on Sanskrit foundation, Tattva Bodha, and Gita commentaries. She also contributes regularly to Vedanta Mission publications.',
    lineage: 'Vedanta Mission — Shankaracharya Sampradaya under Poojya Swami Atmananda Saraswati',
    image: '/images/vmission/acharyas/swamini-samatananda.jpg',
    teachings: ['Sanskrit Grammar', 'Tattva Bodha', 'Bhagavad Gita', 'Vedic Chanting'],
    relatedAudio: ['atma-bodha'],
    programs: ['Sanskrit Foundation Classes', 'Vivekachudamani Retreats', 'Ashram Chanting Sadhana'],
  },
  {
    slug: 'swamini-poornananda-saraswati',
    name: 'Swamini Poornananda Saraswati',
    honorific: 'Swamini Poornanandaji',
    role: 'Resident Acharya — Administration & Sadhana',
    isFounder: false,
    verificationState: 'SUMMARY-VERIFIED',
    archivalNotice: 'Full archival biography and chronology are currently being compiled with the Ashram office.',
    shortBio:
      'Swamini Poornananda Saraswati serves as an Acharya at Vedanta Mission, combining teaching of introductory Vedanta with guidance in daily ashram sadhana and operations.',
    fullBio:
      'Swamini Poornananda Saraswati has dedicated herself to the monastic discipline and teaching mission of Vedanta Ashram. She guides new seekers in understanding foundational Vedantic terminology, assists in the daily worship and administrative rhythm of the Ashram, and leads stotram chanting sessions.',
    lineage: 'Vedanta Mission — Shankaracharya Sampradaya under Poojya Swami Atmananda Saraswati',
    image: '/images/vmission/acharyas/swamini-poornananda.jpg',
    teachings: ['Introductory Vedanta', 'Bhagavad Gita', 'Stotram & Chanting', 'Ashram Discipline'],
    relatedAudio: ['upanishad-talks'],
    programs: ['Introductory Vedanta Workshops', 'Daily Mandir Worship', 'Ashram Sadhak Circles'],
  },
];

export function getAcharyaBySlug(slug: string): Acharya | undefined {
  return acharyas.find((a) => a.slug === slug);
}

export function getAllAcharyas(): Acharya[] {
  return acharyas;
}
