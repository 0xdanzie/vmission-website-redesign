// Data: Courses — Vedanta Mission
// Source: vmission.org.in audit & Phase 3D.4 Canonical Reconciliation

export type CourseFormat = 'Online' | 'Residential' | 'Camp' | 'Study Group';

export interface Lesson {
  number: number;
  title: string;
  description: string;
  downloadUrl?: string;
  platform?: string;
}

export interface CourseModule {
  moduleNumber: number;
  title: string;
  description: string;
}

export interface Course {
  id: string;
  slug: string;
  canonicalId?: string;
  title: string;
  subtitle: string;
  format: CourseFormat;
  status?: 'AVAILABLE' | 'ADMISSION_BASED' | 'PARTIAL_DIGITIZING' | 'STUDY_CIRCLE';
  teacher: string;
  faculty?: string[];
  duration: string;
  fee: string;
  eligibility: string;
  description: string;
  whatYouLearn: string[];
  structure: string;
  dressCode?: string;
  sampleLessons?: Lesson[];
  modules?: CourseModule[];
  questionnaire?: string[];
  openLessonUrl?: string;
  ebookUrl?: string;
  sourcePageUrl?: string;
  is_published?: boolean;
  sort_order?: number;
}

export const courses: Course[] = [
  {
    id: 'tattva-bodha',
    slug: 'tattva-bodha',
    canonicalId: 'canonical-001169',
    title: 'Tattva Bodha',
    subtitle: 'An Introduction to Vedanta',
    format: 'Online',
    status: 'AVAILABLE',
    teacher: 'Swami Atmananda Saraswati',
    duration: 'Self-paced (4 sessions × 10 lessons = 40 lessons)',
    fee: 'Voluntary donation to continue after Lesson 1',
    eligibility: 'Open to all sincere seekers. No prior Vedanta background required.',
    description:
      'Tattva Bodha is a classical introductory text written by Adi Shankaracharya that systematically introduces the fundamental concepts of Advaita Vedanta — the nature of the Self (Atman), the world, and the ultimate Reality (Brahman). This online lesson course presents the traditional Vedantic inquiry to seekers through a structured lesson-and-questionnaire format.',
    whatYouLearn: [
      'The fundamental concepts of Advaita Vedanta',
      'Viveka — discrimination between the real and the unreal',
      'The nature of Atman, Brahman, and the three bodies',
      'The five sheaths (Pancha Kosha) of the human being',
      'The method of self-inquiry (Atma Vichara)',
      'The Guru-Shishya relationship in Vedantic study',
    ],
    structure:
      '4 sessions, each containing 10 lessons. Lesson 1 is open to all. After completing Lesson 1 and sending your answers, the teacher personally reviews your responses and continues to guide you through the course.',
    sampleLessons: [
      {
        number: 1,
        title: 'Introduction to Vedanta & Tattva Bodha',
        description:
          'What is Vedanta? Why study it? An overview of the text and the fundamental question: Who am I? This lesson is open to all seekers and gives a clear introduction to the method and purpose of Vedantic study.',
        downloadUrl: 'http://www.box.net/shared/264p8qom14',
        platform: 'Box',
      },
      {
        number: 2,
        title: 'Adhikari — The Qualified Student',
        description:
          'Who is eligible to study Vedanta? The four-fold qualifications (Sadhana Chatustaya) necessary for meaningful spiritual study.',
      },
      {
        number: 3,
        title: 'Viveka — Discrimination',
        description:
          'The first qualification: discriminating between the permanent (Nitya) and the impermanent (Anitya). The role of clear thinking in spiritual life.',
      },
    ],
    questionnaire: [
      'What motivated you to begin studying Vedanta?',
      'In your own words, explain what you understood about the purpose of Vedantic study from Lesson 1.',
      'What is the fundamental question that Vedanta seeks to answer?',
      'What does the term "Adhikari" mean in the context of Vedantic study?',
      'Share any questions or reflections that arose during your study of this lesson.',
    ],
    openLessonUrl: 'http://www.box.net/shared/264p8qom14',
    ebookUrl: 'http://issuu.com/vmission/docs/tbodha?e=1022112/2696124#222222',
    sourcePageUrl: 'https://www.vmission.org.in/online-courses/',
    is_published: true,
    sort_order: 1,
  },
  {
    id: 'gita-online',
    slug: 'gita-online',
    canonicalId: 'canonical-000001',
    title: 'Bhagavad Gita Online Lesson Course',
    subtitle: 'A Complete Study of All 18 Chapters',
    format: 'Online',
    status: 'PARTIAL_DIGITIZING',
    teacher: 'Swami Atmananda Saraswati',
    duration: 'Self-paced (4 sessions × 10 lessons = 40 lessons covering 18 chapters)',
    fee: 'Voluntary donation after completing Lesson 1',
    eligibility: 'Open to all. Lesson 1 is freely available.',
    description:
      'A structured online study of the Bhagavad Gita covering all 18 chapters through 40 carefully crafted lessons. The course begins with the structure and historical context of the Gita, its subject-matter, and its real objective — the direct knowledge of the Self.',
    whatYouLearn: [
      'Structure and overview of all 18 chapters of the Bhagavad Gita',
      'Introduction to Karma Yoga, Jnana Yoga, and Bhakti Yoga',
      'The real objective of the Bhagavad Gita as understood in the Advaita tradition',
      'Key Sanskrit terms and their philosophical meaning',
    ],
    structure: '4 sessions, 10 lessons each. Progressive study from Chapter 1 through Chapter 18.',
    modules: [
      {
        moduleNumber: 1,
        title: 'Module 1: Gita Structure, Context & Message',
        description: 'Introduction to the setting, 18 chapters, and fundamental vision of the Bhagavad Gita.',
      },
      {
        moduleNumber: 2,
        title: 'Module 2: Karma Yoga — Selfless Action',
        description: 'Living in the spirit of Yoga, dedicated action, and inner purification (Chapters 3–5).',
      },
      {
        moduleNumber: 3,
        title: 'Module 3: Dhyana & Bhakti Yoga — Meditation & Devotion',
        description: 'Mind mastery, contemplative meditation, and the devotion of surrender (Chapters 6–12).',
      },
      {
        moduleNumber: 4,
        title: 'Module 4: Jnana Yoga — Non-Dual Vision',
        description: 'Discrimination of the Kshetra and Kshetrajna, Gunas, and ultimate Self-knowledge (Chapters 13–18).',
      },
    ],
    sampleLessons: [
      {
        number: 1,
        title: 'Gita Intro — First Open Lesson',
        description:
          'Overview of the Bhagavad Gita, the context of Kurukshetra, the universal human predicament, and the distinction between Shreyas and Preyas.',
        downloadUrl: 'http://www.box.net/shared/e7yjixqbtb',
        platform: 'Box',
      },
      {
        number: 2,
        title: 'Arjuna Vishada Yoga — The Crisis of Attachment',
        description: 'An analysis of psychological grief, confusion regarding Dharma, and the need for a Guru.',
      },
      {
        number: 3,
        title: 'Sankhya Yoga — The Eternal, Indestructible Self',
        description: 'The nature of the Atman as beyond birth, death, change, and decay.',
      },
    ],
    questionnaire: [
      'What is the context and setting of the Bhagavad Gita dialogue?',
      'In your own words, explain what you understood about the true objective of the Gita from Lesson 1.',
      'What is the distinction between Shreyas (the spiritually good) and Preyas (the immediately pleasant)?',
      'Why is the knowledge of the Self (Atma Jnana) considered the highest knowledge in the Vedic tradition?',
    ],
    openLessonUrl: 'http://www.box.net/shared/e7yjixqbtb',
    sourcePageUrl: 'https://www.vmission.org.in/online-courses/',
    is_published: true,
    sort_order: 2,
  },
  {
    id: 'residential-gita',
    slug: 'residential-gita',
    canonicalId: 'canonical-000052',
    title: 'Residential Gita Course',
    subtitle: 'A 12-Month Full-Time Residential Study Program at Vedanta Ashram',
    format: 'Residential',
    status: 'ADMISSION_BASED',
    teacher: 'Swami Atmananda Saraswati',
    faculty: [
      'H. H. Swami Atmananda Saraswatiji (Main Faculty)',
      'Swamini Amitananda Saraswati',
      'Swamini Samatananda Saraswati',
      'Swamini Poornananda Saraswati',
    ],
    duration: '12 months (full-time residential)',
    fee: '₹25,000 / month / person (Inclusive of boarding, lodging & course) as published in course prospectus.',
    eligibility:
      'Devoted Sanatani individuals, men or women (couples welcome). Preferred age 45–60. Financially self-supporting, medically insured, and healthy. Must commit to staying for the full duration of the course.',
    description:
      'An intensive twelve-month residential study program conducted at Vedanta Ashram in Indore. Students live alongside the Acharyas and the resident monastic community, studying the Bhagavad Gita in its entirety, Sanskrit, chanting, meditation, and ritual. This is a full-time commitment with no external breaks.',
    whatYouLearn: [
      'Bhagavad Gita — all 18 chapters with classical commentary',
      'Sanskrit fundamentals for scriptural study',
      'Vedic chanting and Shloka recitation',
      'Daily meditation and contemplation practice',
      'Ashram lifestyle and sattwic discipline',
      'Selected Upanishad texts',
    ],
    structure: '12 months, full-time residential at Vedanta Ashram, Indore.',
    dressCode: 'Plain white Indian dress (dhoti/saree) throughout the course period.',
    modules: [
      {
        moduleNumber: 1,
        title: 'Study of all 18 Chapters of Bhagwad Gita',
        description: 'Comprehensive classical verse-by-verse exposition of the complete Gita with Shankara Bhashya.',
      },
      {
        moduleNumber: 2,
        title: 'Gita Shloka Chanting & Recitation',
        description: 'Traditional Vedic chanting meter, correct pronunciation, and memorization of selected chapters.',
      },
      {
        moduleNumber: 3,
        title: 'Basic Sanskrit Language',
        description: 'Foundations of Sanskrit grammar, Sandhi, Samasa, and Vibhakti for direct scriptural comprehension.',
      },
      {
        moduleNumber: 4,
        title: 'Hindu Rituals, Upasana & Customs',
        description: 'Daily temple worship, Abhishek, Aarti, and the significance of Vedic sacraments.',
      },
      {
        moduleNumber: 5,
        title: 'Meditation & Contemplation',
        description: 'Systematic practice of Dhyana, Japa, and Nididhyasana in the serene atmosphere of the Ashram.',
      },
    ],
    sourcePageUrl: 'https://www.vmission.org.in/gita_course/',
    is_published: true,
    sort_order: 3,
  },
  {
    id: 'sangyan-sanatan-dharma',
    slug: 'sangyan-sanatan-dharma',
    canonicalId: 'canonical-000007',
    title: 'Sangyan — Sanatan Dharma Awareness Series',
    subtitle: 'Cultural & Scriptural Education on Sanatan Dharma',
    format: 'Study Group',
    status: 'STUDY_CIRCLE',
    teacher: 'Poojya Guruji & Acharyas',
    duration: 'Ongoing Topical Modules (Sangyan 1, 2 & Satsang Series)',
    fee: 'Open / Free Cultural Awareness Program',
    eligibility: 'Open to all sincere seekers, youths, and families seeking grounded understanding of Vedic Dharma.',
    description:
      'An authentic educational awareness initiative of Vedanta Ashram (canonical-000007 through canonical-000009) providing clarity on the philosophical tenets, temple upasana, sacred festivals, and practical values of Sanatan Dharma for daily life and spiritual practice.',
    whatYouLearn: [
      'Core philosophy and vision of Sanatan Dharma',
      'Significance of Vedic festivals, samskaras, and temple upasana',
      'Resolving common doubts regarding Vedic tradition and lifestyle',
      'Integrating spiritual values into family and community life',
    ],
    structure: 'Topical lectures, question-and-answer satsangs, and reflective study materials.',
    is_published: true,
    sort_order: 4,
  },
  {
    id: 'sampoorna-bhagavad-gita-video',
    slug: 'sampoorna-bhagavad-gita-video',
    canonicalId: 'canonical-001170',
    title: 'Sampoorna Bhagavad Gita Video Series',
    subtitle: 'Complete Chapter-by-Chapter Exposition with Shankara Bhashya',
    format: 'Online',
    status: 'AVAILABLE',
    teacher: 'Swami Atmananda Saraswati',
    duration: 'Complete Series: 18 Chapters + Upodghat (Bhumika 1 & 2)',
    fee: 'Free Public Access (Open Streaming)',
    eligibility: 'Open to all seekers worldwide seeking authentic scriptural commentary.',
    description:
      'A complete verse-by-verse video commentary on the entire Shrimad Bhagavad Gita expounded by Poojya Swami Atmananda Saraswati, unfolding the profound non-dual insights of Adi Shankaracharya’s Gita Bhashya.',
    whatYouLearn: [
      'Verse-by-verse commentary across all 700 verses of the Bhagavad Gita',
      'Shankaracharya Bhashya insights into Karma, Bhakti, and Jnana',
      'Upodghat philosophical context and the eternal nature of the Self',
      'Practical contemplation for daily life and spiritual liberation',
    ],
    structure: '18 Chapters with extensive introductory discourses and chapter summaries.',
    sourcePageUrl: 'https://www.vmission.org.in/videos-complete-bhagwad-gita/',
    is_published: true,
    sort_order: 5,
  },
  {
    id: 'kathopanishad-gyana-yagna',
    slug: 'kathopanishad-gyana-yagna',
    canonicalId: 'canonical-001171',
    title: 'Sampoorna Kathopanishad Gyana Yagna',
    subtitle: 'The Dialogue of Nachiketa and Lord Yama on Immortality',
    format: 'Online',
    status: 'AVAILABLE',
    teacher: 'Swami Atmananda Saraswati',
    duration: 'Complete Discourse Series',
    fee: 'Free Public Access',
    eligibility: 'Open to all earnest students of the Upanishads.',
    description:
      'An in-depth scriptural exposition of the sacred Kathopanishad, exploring the three boons granted to young Nachiketa, the critical distinction between Shreyas (the spiritually good) and Preyas (the worldly pleasant), and the direct nature of Atman.',
    whatYouLearn: [
      'The philosophical meaning of Nachiketa’s three boons',
      'Discrimination between Shreyas and Preyas',
      'The chariot analogy of body, mind, intellect, and Atman',
      'Meditation techniques on the mystic syllable OM',
    ],
    structure: 'Systematic lecture series covering both Adhyayas and all Vallys.',
    sourcePageUrl: 'https://www.vmission.org.in/videos-kathopanishad/',
    is_published: true,
    sort_order: 6,
  },
  {
    id: 'upadesh-saar',
    slug: 'upadesh-saar',
    canonicalId: 'canonical-001172',
    title: 'Upadesh Saar Discourses',
    subtitle: 'Bhagavan Ramana Maharshi’s 30 Verses on the Essence of Teaching',
    format: 'Online',
    status: 'AVAILABLE',
    teacher: 'Swamini Amitananda Saraswati',
    duration: 'Multi-part Discourse Series',
    fee: 'Free Public Access',
    eligibility: 'Open to all seekers wishing to understand the synthesis of Karma, Bhakti, Yoga, and Jnana.',
    description:
      'A systematic verse-by-verse analysis of Bhagavan Sri Ramana Maharshi’s Upadesha Sara by P. Swamini Amitananda Saraswati, elucidating how ritual action and devotional surrender culminate in the direct inquiry into the Self (Atma-Vichara).',
    whatYouLearn: [
      'The thirty concise verses of Upadesha Sara in depth',
      'The progression from selfless action to mental japa and inward inquiry',
      'The nature of the mind and its dissolution in the heart of consciousness',
      'Direct meditation on the reality of the Self',
    ],
    structure: 'Structured lecture series with chanting and Sanskrit analysis.',
    sourcePageUrl: 'https://www.vmission.org.in/prakarana-granth-2/',
    is_published: true,
    sort_order: 7,
  },
  {
    id: 'bhaja-govindam',
    slug: 'bhaja-govindam',
    canonicalId: 'canonical-001173',
    title: 'Bhaja Govindam Discourse Series',
    subtitle: 'Adi Shankaracharya’s Moha Mudgara — Shattering Delusion',
    format: 'Online',
    status: 'AVAILABLE',
    teacher: 'Swamini Samatananda Saraswati',
    duration: 'Multi-part Audio Discourse Series',
    fee: 'Free Public Access',
    eligibility: 'Open to all sincere seekers.',
    description:
      'A stirring exposition of Adi Shankaracharya’s celebrated treatise by P. Swamini Samatananda Saraswati, examining the fleeting nature of worldly attachments and awakening seekers to dispassion (Vairagya), prayer, and divine inquiry.',
    whatYouLearn: [
      'Detailed study of all classical verses of Moha Mudgara',
      'Understanding the illusions of wealth, youth, and possessiveness',
      'Cultivating genuine dispassion and discrimination',
      'The supremacy of satsang and spiritual knowledge',
    ],
    structure: 'Comprehensive audio series with verse chanting and Hindi explanation.',
    sourcePageUrl: 'https://www.vmission.org.in/bg/',
    is_published: true,
    sort_order: 8,
  },
  {
    id: 'shiva-mahimna-stotram',
    slug: 'shiva-mahimna-stotram',
    canonicalId: 'canonical-001174',
    title: 'Shiva Mahimna Stotram Series',
    subtitle: 'The Great Hymn of Pushpadanta in Praise of Lord Shiva',
    format: 'Online',
    status: 'AVAILABLE',
    teacher: 'Swamini Samatananda Saraswati',
    duration: 'Multi-part Video & Audio Series',
    fee: 'Free Public Access',
    eligibility: 'Open to all devotees and seekers of Shiva Tattva.',
    description:
      'A rich verse-by-verse commentary on the Pushpadanta Shiva Mahimna Stotram by P. Swamini Samatananda Saraswati, harmonizing intense devotional surrender with the highest non-dual Vedantic vision.',
    whatYouLearn: [
      'Significance and meter of the 43 verses of Shiva Mahimna Stotram',
      'The philosophical symbolism of Lord Shiva’s cosmic form',
      'Harmonizing path of devotion (Bhakti) with non-dual knowledge (Jnana)',
      'Traditional stotram recitation and pronunciation',
    ],
    structure: 'Verse-by-verse video and audio discourses.',
    sourcePageUrl: 'https://www.vmission.org.in/video-shivamahimna-stotram/',
    is_published: true,
    sort_order: 9,
  },
  {
    id: 'bal-samskar-shivir',
    slug: 'bal-samskar-shivir',
    canonicalId: 'canonical-001175',
    title: 'Bal Samskar Shivir',
    subtitle: 'Value Education & Spiritual Foundations for Youth & Children',
    format: 'Camp',
    status: 'ADMISSION_BASED',
    teacher: 'Swamini Poornananda Saraswati',
    duration: 'Annual Multi-Day Residential & Day Camp',
    fee: 'Nominal Registration / Sponsored',
    eligibility: 'Children and adolescents (ages 8–16).',
    description:
      'An annual value-education camp conducted at Vedanta Ashram, Indore, under the direction of P. Swamini Poornananda Saraswati. Children learn Sanskrit stotram chanting, moral stories from Indian epics, daily discipline, yoga, and cultural values in a joyful Gurukula setting.',
    whatYouLearn: [
      'Basic Sanskrit shlokas and daily prayer chanting',
      'Inspiring moral stories from Ramayana and Mahabharata',
      'Simple yogasanas, pranayama, and concentration exercises',
      'Respect for parents, teachers, and cultural heritage',
    ],
    structure: 'Conducted annually during school summer holidays at Vedanta Ashram.',
    sourcePageUrl: 'https://www.vmission.org.in/bal-samskar-shivir/',
    is_published: true,
    sort_order: 10,
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug || c.id === slug || c.canonicalId === slug);
}
