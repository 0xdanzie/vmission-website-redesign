// Data: Events — Vedanta Mission
// Representative data based on audit findings

export interface VMEvent {
  id: string;
  title: string;
  type: 'Satsang' | 'Gyana Yagna' | 'Camp' | 'Celebration' | 'Course' | 'Workshop';
  teacher: string;
  location: string;
  city: string;
  startDate: string; // ISO date string
  endDate: string;
  description: string;
  schedule?: { time: string; activity: string }[];
  registration: 'open' | 'closed' | 'limited';
  fee?: string;
  isPast?: boolean;
}

export const events: VMEvent[] = [
  {
    id: 'guru-poornima-2026',
    title: 'Guru Poornima Celebrations',
    type: 'Celebration',
    teacher: 'Swami Atmananda Saraswati',
    location: 'Vedanta Ashram, Sudama Nagar',
    city: 'Indore',
    startDate: '2026-07-10',
    endDate: '2026-07-10',
    description:
      'Join us at Vedanta Ashram for the annual Guru Poornima celebrations — a day of puja, pravachana, and collective contemplation honoring the tradition of the Guru. The program includes morning puja at the Gangeshwar Mahadev temple, a public discourse by Poojya Guruji, and a communal prasadam distribution.',
    schedule: [
      { time: '7:00 AM', activity: 'Puja at Gangeshwar Mahadev Mandir' },
      { time: '10:00 AM', activity: 'Guru Poornima Discourse by Poojya Guruji' },
      { time: '12:30 PM', activity: 'Prasadam & Annadanam' },
      { time: '5:30 PM', activity: 'Evening Arati & Satsang' },
    ],
    registration: 'open',
    fee: 'No fee — open to all',
    isPast: false,
  },
  {
    id: 'residential-meditation-camp-aug-2026',
    title: 'Residential Meditation & Vedanta Camp',
    type: 'Camp',
    teacher: 'Swamini Amitananda Saraswati',
    location: 'Vedanta Ashram, Sudama Nagar',
    city: 'Indore',
    startDate: '2026-08-26',
    endDate: '2026-08-29',
    description:
      'A four-day residential camp exploring the practical tools of meditation and Vedantic inquiry. Participants stay at the Ashram, follow the daily routine of a dedicated seeker, and attend guided sessions on stillness, self-inquiry, and scriptural study.',
    schedule: [
      { time: '5:30 AM', activity: 'Morning meditation & chanting' },
      { time: '8:00 AM', activity: 'Breakfast (sattwic prasadam)' },
      { time: '9:00 AM', activity: 'Vedanta discourse session' },
      { time: '11:00 AM', activity: 'Scripture study group' },
      { time: '5:30 PM', activity: 'Evening discourse' },
      { time: '7:30 PM', activity: 'Arati & quiet reflection' },
    ],
    registration: 'limited',
    fee: 'Contribution-based (accommodation & meals included)',
    isPast: false,
  },
  {
    id: 'online-gita-course-sep-2026',
    title: 'Bhagavad Gita Online Lesson Course — New Batch',
    type: 'Course',
    teacher: 'Swami Atmananda Saraswati',
    location: 'Online (Email-based course)',
    city: 'Worldwide',
    startDate: '2026-09-15',
    endDate: '2027-03-15',
    description:
      'A new batch of the Bhagavad Gita Online Lesson Course begins. The course covers all 18 chapters of the Bhagavad Gita in 40 structured lessons divided into 4 sessions. Each lesson includes textual study, commentary, and a questionnaire. Suitable for seekers at all levels — the first lesson is freely available to all.',
    schedule: [],
    registration: 'open',
    fee: 'Voluntary donation (to indicate seriousness of study)',
    isPast: false,
  },
  {
    id: 'gyana-yagna-pune-2025',
    title: 'Bhagavad Gita Gyana Yagna',
    type: 'Gyana Yagna',
    teacher: 'Swami Atmananda Saraswati',
    location: 'Chinmaya Mission Ashram',
    city: 'Pune',
    startDate: '2025-12-01',
    endDate: '2025-12-07',
    description:
      'A seven-day intensive Gyana Yagna covering key chapters of the Bhagavad Gita. Public discourses were held every evening, drawing seekers from across Maharashtra.',
    schedule: [],
    registration: 'closed',
    isPast: true,
  },
  {
    id: 'vedanta-camp-indore-jan-2026',
    title: 'Vivekachudamani Study Camp',
    type: 'Camp',
    teacher: 'Swamini Samatananda Saraswati',
    location: 'Vedanta Ashram, Sudama Nagar',
    city: 'Indore',
    startDate: '2026-01-18',
    endDate: '2026-01-22',
    description:
      'A residential study camp on Adi Shankaracharya\'s Vivekachudamani, exploring the viveka (discrimination between real and unreal) through textual study, discussion, and quiet reflection.',
    schedule: [],
    registration: 'closed',
    isPast: true,
  },
];

export function getEventById(id: string): VMEvent | undefined {
  return events.find((e) => e.id === id);
}

export function getUpcomingEvents(): VMEvent[] {
  return events.filter((e) => !e.isPast);
}

export function getPastEvents(): VMEvent[] {
  return events.filter((e) => e.isPast);
}
