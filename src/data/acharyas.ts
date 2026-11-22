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
  is_published?: boolean;
  sort_order?: number;
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
      'Swami Atmananda Saraswati is the founder of Vedanta Mission and Vedanta Ashram in Indore. A disciple of H.H. Swami Chinmayanandaji and traditional monk in the Shankaracharya Saraswati order, he has dedicated his life to the dissemination of Advaita Vedanta through rigorous scriptural teaching, publication, and residential Gurukula training.',
    fullBio:
      'Swami Atmananda Saraswati completed intensive scriptural studies in Advaita Vedanta at Sandeepany Sadhanalaya in Mumbai under the Chinmaya Mission, studying under the direct guidance of Param Poojya Gurudev Swami Chinmayanandaji. He was initiated into Brahmacharya in 1983 (as Br. Chaitanya) and embraced Holy Sanyas in 1987 on the sacred banks of the Narmada River, entering the ancient Dashanami Saraswati monastic order. In 1992, he founded Vedanta Mission in Mumbai, and in 1993 registered the International Chaitanya Foundation (ICF). In 1995, he established Vedanta Ashram in Sudama Nagar, Indore, as a traditional Gurukula and established the Shiv Mandir with its iconic Shiva Linga dome. In 1996, the public charitable trust Vedanta Parmarthik Sewa Trust (VPST) was registered at Indore under his leadership. His discourses unfold the Prasthana Traya (Upanishads, Bhagavad Gita, and Brahma Sutras) along with foundational treatises such as Tattva Bodha, Vivekachudamani, and Upadesh Saar. He is also the founding editor of the monthly e-journal Vedanta Sandesh.',
    lineage:
      'Adi Shankaracharya Tradition · Dashanami Saraswati Order · Direct Disciple of H.H. Swami Chinmayanandaji',
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
        description: 'Embraced holy Sanyas into the Dashanami Saraswati monastic order on the banks of holy river Narmada.',
      },
      {
        year: '1992',
        title: 'Founding of Vedanta Mission',
        description: 'Established Vedanta Mission at Mumbai as a non-profit spiritual and educational initiative dedicated to traditional Advaita Vedanta.',
      },
      {
        year: '1995',
        title: 'Establishment of Indore Ashram',
        description: 'Established Vedanta Ashram and Shiv Mandir in Sudama Nagar, Indore, initiating residential Gurukula training.',
      },
    ],
    teachings: ['Bhagavad Gita', 'Principal Upanishads', 'Drig Drushya Viveka', 'Atma-bodha', 'Brahma Sutras', 'Tattva Bodha'],
    relatedAudio: ['gita-talks', 'atma-bodha', 'upanishad-talks', 'drig-drushya-viveka'],
    programs: ['Annual Guru Poornima Celebrations', 'Residential Scripture Shivirs', 'Online Gita Lesson Course', 'Sampoorna Gita Mahayagna'],
  },
  {
    slug: 'swamini-amitananda-saraswati',
    name: 'Swamini Amitananda Saraswati',
    honorific: 'Swamini Amitanandaji',
    role: 'Acharya — Vedanta Ashram · Vice-President & Trustee VPST',
    isFounder: false,
    verificationState: 'SOURCE-VERIFIED',
    shortBio:
      'Swamini Amitananda Saraswati is a senior Acharya at Vedanta Ashram, Indore. Holding an M.Sc. in Physics (Gold Medalist), she combines deep scientific clarity with traditional monastic scholarship in Advaita Vedanta.',
    fullBio:
      'Born in Indore, Swamini Amitananda Saraswati excelled academically, earning an M.Sc. in Physics as a university Gold Medalist. Drawn to spiritual inquiry, she dedicated herself to traditional Vedanta under the tutelage of Poojya Swami Atmananda Saraswati. She received Brahmacharya Deeksha in 1995 at the founding of Vedanta Ashram and was initiated into Holy Sanyas in 2005, entering the sacred Saraswati order. She serves as Vice-President and Trustee of the Vedanta Parmarthik Sewa Trust (VPST) in Indore and coordinates the Ashram Parivar devotee initiative. Her discourses systematically unfold classical treatises including Tattva Bodha, Upadesh Saar, and Mandukya Karika, alongside an extensive 19-part Inspiring Stories audio series.',
    lineage: 'Vedanta Mission — Shankaracharya Sampradaya under Poojya Swami Atmananda Saraswati',
    image: '/images/vmission/acharyas/swamini-amitananda.jpg',
    milestones: [
      {
        year: '1995',
        title: 'Brahmacharya Deeksha',
        description: 'Initiated into Brahmacharya by Poojya Swami Atmananda Saraswati at the establishment of Vedanta Ashram, Indore.',
      },
      {
        year: '2005',
        title: 'Sanyas Deeksha',
        description: 'Received holy Sanyas into the Dashanami Saraswati monastic order.',
      },
    ],
    teachings: ['Tattva Bodha', 'Upadesh Saar', 'Mandukya Karika', 'Bhagavad Gita', 'Inspiring Stories Series'],
    relatedAudio: ['gita-talks'],
    programs: ['MSR Vedanta Camps', 'Weekly Scripture Classes', 'Ashram Parivar Satsangs'],
  },
  {
    slug: 'swamini-samatananda-saraswati',
    name: 'Swamini Samatananda Saraswati',
    honorific: 'Swamini Samatanandaji',
    role: 'Acharya — Gujarat Chapter · Trustee VPST',
    isFounder: false,
    verificationState: 'SOURCE-VERIFIED',
    shortBio:
      'Swamini Samatananda Saraswati is an Acharya of Vedanta Mission heading activities across Gujarat. Holding an M.A. in Sanskrit, she is an acclaimed scholar of classical scriptures, grammar, and devotional philosophy.',
    fullBio:
      'Born in Gujarat, Swamini Samatananda Saraswati pursued profound Sanskrit studies, earning a Master’s degree in Sanskrit. She became a disciple of Poojya Swami Atmananda Saraswati, receiving Brahmacharya Deeksha in 1995 and Holy Sanyas Deeksha in 2005 into the Dashanami Saraswati order. She serves as a Trustee of the Vedanta Parmarthik Sewa Trust (VPST) and leads Vedanta Mission’s spiritual programs across Gujarat, conducting extensive Gita Gyana Yagnas in Ahmedabad, Bhavnagar, Vadodara, and Rajkot. She is an author and regular editor for the monthly Hindi periodical Vedanta Piyush, and has delivered acclaimed discourse series on Bhaja Govindam, Shiva Mahimna Stotram, and 20 Inspiring Stories audio discourses.',
    lineage: 'Vedanta Mission — Shankaracharya Sampradaya under Poojya Swami Atmananda Saraswati',
    image: '/images/vmission/acharyas/swamini-samatananda.jpg',
    milestones: [
      {
        year: '1995',
        title: 'Brahmacharya Deeksha',
        description: 'Initiated into Brahmacharya at Vedanta Ashram, Indore.',
      },
      {
        year: '2005',
        title: 'Sanyas Deeksha',
        description: 'Initiated into Holy Sanyas into the Dashanami Saraswati monastic order.',
      },
      {
        year: '2015',
        title: 'Vedanta Piyush Publication',
        description: 'Helped inaugurate and continues to contribute editorial leadership to the Hindi monthly Vedanta Piyush.',
      },
    ],
    teachings: ['Bhagavad Gita Gyana Yagnas', 'Sanskrit Grammar', 'Bhaja Govindam', 'Shiva Mahimna Stotram', 'Vedanta Piyush Treatises'],
    relatedAudio: ['atma-bodha'],
    programs: ['Gujarat Gita Gyana Yagnas', 'Vivekachudamani Retreats', 'Ashram Chanting Sadhana'],
  },
  {
    slug: 'swamini-poornananda-saraswati',
    name: 'Swamini Poornananda Saraswati',
    honorific: 'Swamini Poornanandaji',
    role: 'Resident Acharya — Youth Education & Sadhana',
    isFounder: false,
    verificationState: 'SOURCE-VERIFIED',
    shortBio:
      'Swamini Poornananda Saraswati is a resident Acharya at Vedanta Ashram, Indore, dedicated to youth value education through Bal Samskar Shivirs, Sanskrit stotram chanting, and daily Ashram upasana.',
    fullBio:
      'Swamini Poornananda Saraswati dedicated herself to the monastic life and ideals of Vedanta Mission as a disciple of Poojya Swami Atmananda Saraswati, receiving Holy Sanyas Deeksha in 2005 into the Dashanami Saraswati order. Based at Vedanta Ashram in Indore, she plays a vital role in youth education, conceptualizing and directing the annual Bal Samskar Shivirs (children’s value education camps) that impart moral values, scriptural stories, and Sanskrit chanting to young seekers. She has recorded a 20-part Inspiring Stories audio series for children and families and assists in daily temple worship and contemplative chanting at the Ashram.',
    lineage: 'Vedanta Mission — Shankaracharya Sampradaya under Poojya Swami Atmananda Saraswati',
    image: '/images/vmission/acharyas/swamini-poornananda.jpg',
    milestones: [
      {
        year: '2005',
        title: 'Sanyas Deeksha',
        description: 'Initiated into Holy Sanyas into the Dashanami Saraswati monastic order at Vedanta Ashram, Indore.',
      },
    ],
    teachings: ['Bal Samskar Value Education', 'Introductory Vedanta', 'Stotram & Chanting', 'Inspiring Stories for Youth'],
    relatedAudio: ['upanishad-talks'],
    programs: ['Annual Bal Samskar Shivir', 'Daily Mandir Upasana', 'Family Spiritual Discourse Circles'],
  },
];

export function getAcharyaBySlug(slug: string): Acharya | undefined {
  return acharyas.find((a) => a.slug === slug);
}

export function getAllAcharyas(): Acharya[] {
  return acharyas;
}

// Lineage Preceptors
// Source: vmission.org.in official records (page_5334_guruji.md & page_1516_prakarana-granth.md)

export interface LineageMaster {
  id: string;
  name: string;
  role: string;
  description: string;
  historicalContext: string;
}

export const lineageMasters: LineageMaster[] = [
  {
    id: 'adi-shankaracharya',
    name: 'Adi Shankaracharya',
    role: 'Dashanami Saraswati Tradition',
    description:
      'Revered teacher who revived Advaita Vedanta and composed foundational commentaries on the Prasthanatraya (Upanishads, Bhagavad Gita, and Brahma Sutras).',
    historicalContext:
      'The monastic order of Vedanta Mission traces its traditional lineage to the Dashanami Saraswati Sampradaya associated with Adi Shankaracharya.',
  },
  {
    id: 'swami-chinmayananda',
    name: 'H.H. Swami Chinmayananda',
    role: 'Sanyas Deeksha Preceptor (1987)',
    description:
      'Renowned teacher of Advaita Vedanta who initiated Swami Atmananda Saraswati into Holy Sanyas in 1987 into the Dashanami Saraswati monastic order.',
    historicalContext:
      'Prior to Sanyas initiation in 1987, Swami Atmananda completed intensive scriptural studies at Sandeepany Sadhanalaya in Mumbai (Chinmaya Mission) beginning in 1980, where his Acharya was Sri Swami Viditatmanandaji.',
  },
];

