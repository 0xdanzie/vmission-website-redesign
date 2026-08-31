// Data: Teachings — Vedanta Mission
// Audio, Video, and PDF resources based on audit

export type TeachingFormat = 'Audio' | 'Video' | 'PDF' | 'E-Book';
export type TeachingLanguage = 'English' | 'Hindi' | 'Sanskrit' | 'Gujarati';

export interface Teaching {
  id: string;
  title: string;
  scripture: string;
  teacher: string;
  format: TeachingFormat;
  language: TeachingLanguage;
  duration?: string; // e.g. "45 min" or "120 pages"
  description: string;
  topic: string;
  // For Audio/Video: demo source (placeholder)
  src?: string;
  thumbnailSrc?: string;
}

export const teachings: Teaching[] = [
  {
    id: 'drig-drushya-viveka-01',
    title: 'Drig Drushya Viveka — Session 1',
    scripture: 'Drig Drushya Viveka',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Audio',
    language: 'English',
    duration: '52 min',
    topic: 'Prakarana Granth',
    description:
      'An introduction to Drig Drushya Viveka — "Discrimination of the Seer and the Seen" — a classical Sanskrit text attributed to Adi Shankaracharya. This first session introduces the central inquiry: who is the true witness behind all experience?',
    src: '/audio/demo-discourse.mp3',
  },
  {
    id: 'atma-bodha-01',
    title: 'Atma-bodha — Session 1: Introduction',
    scripture: 'Atma-bodha',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Audio',
    language: 'English',
    duration: '48 min',
    topic: 'Prakarana Granth',
    description:
      'Atma-bodha (Self-Knowledge) is a foundational text by Adi Shankaracharya. This session provides an orientation to the text and explores the fundamental question of the nature of the Self (Atman) and its relationship to Brahman.',
    src: '/audio/demo-discourse.mp3',
  },
  {
    id: 'gita-chapter-01',
    title: 'Bhagavad Gita — Chapter 1: Arjuna Vishada Yoga',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Audio',
    language: 'English',
    duration: '61 min',
    topic: 'Bhagavad Gita',
    description:
      'The first chapter of the Bhagavad Gita depicts Arjuna\'s despondency on the battlefield. This discourse explores why Arjuna\'s crisis is not merely personal grief but a profound spiritual turning point — the beginning of true inquiry.',
    src: '/audio/demo-discourse.mp3',
  },
  {
    id: 'upanishad-kena-01',
    title: 'Kena Upanishad — Session 1',
    scripture: 'Kena Upanishad',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Audio',
    language: 'English',
    duration: '55 min',
    topic: 'Upanishads',
    description:
      'The Kena Upanishad begins with a deceptively simple question: "By whom is the mind projected?" — pointing toward the nature of consciousness itself. This session introduces the text\'s central inquiry into the ground of all knowing.',
    src: '/audio/demo-discourse.mp3',
  },
  {
    id: 'hanuman-chalisa-01',
    title: 'Hanuman Chalisa — Session 1',
    scripture: 'Hanuman Chalisa',
    teacher: 'Swamini Amitananda Saraswati',
    format: 'Audio',
    language: 'Hindi',
    duration: '44 min',
    topic: 'Devotional',
    description:
      'An exploration of the Hanuman Chalisa — the devotional hymn of forty verses in praise of Lord Hanuman composed by Goswami Tulsidas. This session explores the deeper philosophical meaning beneath the devotional form.',
    src: '/audio/demo-discourse.mp3',
  },
  {
    id: 'meditation-intro',
    title: 'Introduction to Meditation',
    scripture: '',
    teacher: 'Swamini Amitananda Saraswati',
    format: 'Audio',
    language: 'English',
    duration: '38 min',
    topic: 'Meditation',
    description:
      'A gentle introduction to the practice of meditation in the Vedantic tradition — understanding what meditation is, what it is not, and how stillness of mind supports the deeper work of self-inquiry.',
    src: '/audio/demo-discourse.mp3',
  },
  {
    id: 'tattva-bodha-pdf',
    title: 'Tattva Bodha — Text & Commentary (PDF)',
    scripture: 'Tattva Bodha',
    teacher: 'Swami Atmananda Saraswati',
    format: 'PDF',
    language: 'English',
    duration: '84 pages',
    topic: 'Prakarana Granth',
    description:
      'The complete text of Tattva Bodha by Adi Shankaracharya with an English translation and commentary by Swami Atmananda Saraswati. Suitable for individual study or as a companion to the online course.',
  },
  {
    id: 'gita-talks-video',
    title: 'Bhagavad Gita Chapter 2 — Video Discourse',
    scripture: 'Bhagavad Gita',
    teacher: 'Swami Atmananda Saraswati',
    format: 'Video',
    language: 'English',
    duration: '68 min',
    topic: 'Bhagavad Gita',
    description:
      'A video discourse on Chapter 2 of the Bhagavad Gita — Sankhya Yoga — where Lord Krishna begins the direct teaching of Atma Jnana. This chapter is often called the essence of the entire Gita.',
    thumbnailSrc: '/images/vmission/ashram/teaching-hall-interior.jpg',
  },
];

export function getTeachingsByFormat(format: TeachingFormat): Teaching[] {
  return teachings.filter((t) => t.format === format);
}

export function getTeachingsByTopic(topic: string): Teaching[] {
  return teachings.filter((t) => t.topic === topic);
}

export function getTeachingsByTeacher(teacher: string): Teaching[] {
  return teachings.filter((t) => t.teacher === teacher);
}

export const teachingTopics = [
  'All Topics',
  'Bhagavad Gita',
  'Upanishads',
  'Prakarana Granth',
  'Devotional',
  'Meditation',
];

export const teachingFormats: TeachingFormat[] = ['Audio', 'Video', 'PDF', 'E-Book'];
export const teachingLanguages: TeachingLanguage[] = ['English', 'Hindi', 'Sanskrit', 'Gujarati'];
export const teachingTeachers = [
  'All Teachers',
  'Swami Atmananda Saraswati',
  'Swamini Amitananda Saraswati',
  'Swamini Samatananda Saraswati',
  'Swamini Poornananda Saraswati',
];
