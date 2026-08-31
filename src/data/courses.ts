// Data: Courses — Vedanta Mission
// Source: vmission.org.in audit (Phase 1)

export type CourseFormat = 'Online' | 'Residential' | 'Camp' | 'Study Group';

export interface Lesson {
  number: number;
  title: string;
  description: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  format: CourseFormat;
  teacher: string;
  duration: string;
  fee: string;
  eligibility: string;
  description: string;
  whatYouLearn: string[];
  structure: string;
  dressCode?: string;
  sampleLessons?: Lesson[];
  questionnaire?: string[];
}

export const courses: Course[] = [
  {
    id: 'tattva-bodha',
    slug: 'tattva-bodha',
    title: 'Tattva Bodha',
    subtitle: 'An Introduction to Vedanta',
    format: 'Online',
    teacher: 'Swami Atmananda Saraswati',
    duration: 'Self-paced (4 sessions × 10 lessons)',
    fee: 'Voluntary donation to continue after Lesson 1',
    eligibility: 'Open to all sincere seekers. No prior Vedanta background required.',
    description:
      'Tattva Bodha is a classical introductory text written by Adi Shankaracharya that systematically introduces the fundamental concepts of Advaita Vedanta — the nature of the Self (Atman), the world, and the ultimate Reality (Brahman). This online lesson course makes these timeless teachings accessible to modern seekers through a structured lesson-and-questionnaire format.',
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
  },
  {
    id: 'gita-online',
    slug: 'gita-online',
    title: 'Bhagavad Gita Online Lesson Course',
    subtitle: 'A Complete Study of All 18 Chapters',
    format: 'Online',
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
  },
  {
    id: 'residential-gita',
    slug: 'residential-gita',
    title: 'Residential Gita Course',
    subtitle: 'A 12-Month Full-Time Residential Study Program at Vedanta Ashram',
    format: 'Residential',
    teacher: 'Swami Atmananda Saraswati',
    duration: '12 months (full-time residential)',
    fee: 'Rs 25,000 per month per person (inclusive of accommodation, meals, and course)',
    eligibility:
      'Devoted Sanatani individuals, men or women (couples welcome). Preferred age 45–60. Financially self-supporting, medically insured, and healthy. Must commit to staying for the full duration of the course.',
    description:
      'An immersive twelve-month residential program conducted at Vedanta Ashram in Indore. Students live alongside the Acharyas and the resident monastic community, studying the Bhagavad Gita in its entirety, Sanskrit, chanting, meditation, and ritual. This is a full-time commitment with no external breaks.',
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
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
