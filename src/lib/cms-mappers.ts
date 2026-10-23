import { Acharya, AcharyaMilestone } from '@/data/acharyas';
import { Course, CourseFormat, Lesson } from '@/data/courses';
import { VMEvent } from '@/data/events';
import { Publication, PublicationType, PublicationLanguage } from '@/data/publications';

// =============================================================================
// 1. Acharyas Mappers
// =============================================================================

export interface DatabaseAcharyaRow {
  slug: string;
  name: string;
  honorific: string;
  role: string;
  short_bio: string;
  full_bio: string;
  lineage: string;
  image: string;
  teachings?: string[] | null;
  related_audio?: string[] | null;
  programs?: string[] | null;
  is_founder?: boolean | null;
  milestones?: AcharyaMilestone[] | null;
  verification_state: 'SOURCE-VERIFIED' | 'SUMMARY-VERIFIED';
  archival_notice?: string | null;
  sort_order?: number | null;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export function dbToAcharya(row: DatabaseAcharyaRow): Acharya {
  return {
    slug: row.slug,
    name: row.name,
    honorific: row.honorific,
    role: row.role,
    shortBio: row.short_bio,
    fullBio: row.full_bio,
    lineage: row.lineage,
    image: row.image,
    teachings: row.teachings || [],
    relatedAudio: row.related_audio || [],
    programs: row.programs || [],
    isFounder: !!row.is_founder,
    milestones: row.milestones || [],
    verificationState: row.verification_state,
    archivalNotice: row.archival_notice || undefined,
    sort_order: row.sort_order ?? 0,
    is_published: row.is_published,
  };
}

export function acharyaToDb(item: Partial<Acharya>): Partial<DatabaseAcharyaRow> {
  const row: Partial<DatabaseAcharyaRow> = {};
  if (item.slug !== undefined) row.slug = item.slug;
  if (item.name !== undefined) row.name = item.name;
  if (item.honorific !== undefined) row.honorific = item.honorific;
  if (item.role !== undefined) row.role = item.role;
  if (item.shortBio !== undefined) row.short_bio = item.shortBio;
  if (item.fullBio !== undefined) row.full_bio = item.fullBio;
  if (item.lineage !== undefined) row.lineage = item.lineage;
  if (item.image !== undefined) row.image = item.image;
  if (item.teachings !== undefined) row.teachings = item.teachings;
  if (item.relatedAudio !== undefined) row.related_audio = item.relatedAudio;
  if (item.programs !== undefined) row.programs = item.programs;
  if (item.isFounder !== undefined) row.is_founder = item.isFounder;
  if (item.milestones !== undefined) row.milestones = item.milestones;
  if (item.verificationState !== undefined) row.verification_state = item.verificationState;
  if (item.archivalNotice !== undefined) row.archival_notice = item.archivalNotice;
  if (item.sort_order !== undefined) row.sort_order = item.sort_order;
  if (item.is_published !== undefined) row.is_published = item.is_published;
  return row;
}

// =============================================================================
// 2. Courses Mappers
// =============================================================================

export interface DatabaseCourseRow {
  id: string;
  slug: string;
  canonical_id?: string | null;
  title: string;
  subtitle: string;
  format: CourseFormat;
  status?: 'AVAILABLE' | 'ADMISSION_BASED' | 'PARTIAL_DIGITIZING' | 'STUDY_CIRCLE' | null;
  teacher: string;
  duration: string;
  fee: string;
  eligibility: string;
  description: string;
  what_you_learn?: string[] | null;
  structure: string;
  dress_code?: string | null;
  sample_lessons?: Lesson[] | null;
  questionnaire?: string[] | null;
  sort_order?: number | null;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export function dbToCourse(row: DatabaseCourseRow): Course {
  return {
    id: row.id,
    slug: row.slug,
    canonicalId: row.canonical_id || undefined,
    title: row.title,
    subtitle: row.subtitle,
    format: row.format,
    status: row.status || 'AVAILABLE',
    teacher: row.teacher,
    duration: row.duration,
    fee: row.fee,
    eligibility: row.eligibility,
    description: row.description,
    whatYouLearn: row.what_you_learn || [],
    structure: row.structure,
    dressCode: row.dress_code || undefined,
    sampleLessons: row.sample_lessons || undefined,
    questionnaire: row.questionnaire || undefined,
    sort_order: row.sort_order ?? 0,
    is_published: row.is_published,
  };
}

export function courseToDb(item: Partial<Course>): Partial<DatabaseCourseRow> {
  const row: Partial<DatabaseCourseRow> = {};
  if (item.id !== undefined) row.id = item.id;
  if (item.slug !== undefined) row.slug = item.slug;
  if (item.canonicalId !== undefined) row.canonical_id = item.canonicalId;
  if (item.title !== undefined) row.title = item.title;
  if (item.subtitle !== undefined) row.subtitle = item.subtitle;
  if (item.format !== undefined) row.format = item.format;
  if (item.status !== undefined) row.status = item.status;
  if (item.teacher !== undefined) row.teacher = item.teacher;
  if (item.duration !== undefined) row.duration = item.duration;
  if (item.fee !== undefined) row.fee = item.fee;
  if (item.eligibility !== undefined) row.eligibility = item.eligibility;
  if (item.description !== undefined) row.description = item.description;
  if (item.whatYouLearn !== undefined) row.what_you_learn = item.whatYouLearn;
  if (item.structure !== undefined) row.structure = item.structure;
  if (item.dressCode !== undefined) row.dress_code = item.dressCode;
  if (item.sampleLessons !== undefined) row.sample_lessons = item.sampleLessons;
  if (item.questionnaire !== undefined) row.questionnaire = item.questionnaire;
  if (item.sort_order !== undefined) row.sort_order = item.sort_order;
  if (item.is_published !== undefined) row.is_published = item.is_published;
  return row;
}

// =============================================================================
// 3. Events Mappers
// =============================================================================

export interface DatabaseEventRow {
  id: string;
  canonical_id?: string | null;
  title: string;
  type: 'Satsang' | 'Gyana Yagna' | 'Camp' | 'Celebration' | 'Course' | 'Workshop';
  entity_type?: 'event' | 'camp' | 'celebration' | 'course-announcement' | 'ongoing-class' | 'publication-release' | null;
  teacher: string;
  location: string;
  city: string;
  start_date: string;
  end_date: string;
  description: string;
  schedule?: { time: string; activity: string }[] | null;
  registration: 'open' | 'closed' | 'limited';
  fee?: string | null;
  is_past?: boolean;
  is_archival?: boolean;
  source_url?: string | null;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export function dbToEvent(row: DatabaseEventRow): VMEvent {
  return {
    id: row.id,
    canonicalId: row.canonical_id || undefined,
    title: row.title,
    type: row.type,
    entityType: row.entity_type || undefined,
    teacher: row.teacher,
    location: row.location,
    city: row.city,
    startDate: row.start_date,
    endDate: row.end_date,
    description: row.description,
    schedule: row.schedule || undefined,
    registration: row.registration,
    fee: row.fee || undefined,
    isPast: row.is_past,
    isArchival: row.is_archival,
    sourceUrl: row.source_url || undefined,
    is_published: row.is_published,
  };
}

export function eventToDb(item: Partial<VMEvent>): Partial<DatabaseEventRow> {
  const row: Partial<DatabaseEventRow> = {};
  if (item.id !== undefined) row.id = item.id;
  if (item.canonicalId !== undefined) row.canonical_id = item.canonicalId;
  if (item.title !== undefined) row.title = item.title;
  if (item.type !== undefined) row.type = item.type;
  if (item.entityType !== undefined) row.entity_type = item.entityType;
  if (item.teacher !== undefined) row.teacher = item.teacher;
  if (item.location !== undefined) row.location = item.location;
  if (item.city !== undefined) row.city = item.city;
  if (item.startDate !== undefined) row.start_date = item.startDate;
  if (item.endDate !== undefined) row.end_date = item.endDate;
  if (item.description !== undefined) row.description = item.description;
  if (item.schedule !== undefined) row.schedule = item.schedule;
  if (item.registration !== undefined) row.registration = item.registration;
  if (item.fee !== undefined) row.fee = item.fee;
  if (item.isPast !== undefined) row.is_past = item.isPast;
  if (item.isArchival !== undefined) row.is_archival = item.isArchival;
  if (item.sourceUrl !== undefined) row.source_url = item.sourceUrl;
  if (item.is_published !== undefined) row.is_published = item.is_published;
  return row;
}

// =============================================================================
// 4. Publications Mappers
// =============================================================================

export interface DatabasePublicationRow {
  id: string;
  canonical_id?: string | null;
  type: PublicationType;
  title: string;
  month?: string | null;
  year?: number | null;
  cover_image?: string | null;
  language: PublicationLanguage;
  download_url: string;
  archive_url?: string | null;
  read_online_url?: string | null;
  mirrors?: any;
  description?: string | null;
  is_latest?: boolean;
  page_count?: number | null;
  author?: string | null;
  local_cover?: string | null;
  source_cover_url?: string | null;
  canonical_source?: string | null;
  alternate_sources?: string[] | null;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export function dbToPublication(row: DatabasePublicationRow): Publication {
  return {
    id: row.id,
    canonicalId: row.canonical_id || undefined,
    type: row.type,
    title: row.title,
    month: row.month || undefined,
    year: row.year || undefined,
    coverImage: row.cover_image || undefined,
    language: row.language,
    downloadUrl: row.download_url || '#',
    archiveUrl: row.archive_url || undefined,
    readOnlineUrl: row.read_online_url || undefined,
    mirrors: row.mirrors || undefined,
    description: row.description || undefined,
    isLatest: row.is_latest,
    pageCount: row.page_count || undefined,
    author: row.author || undefined,
    localCover: row.local_cover || undefined,
    sourceCoverUrl: row.source_cover_url || undefined,
    canonicalSource: row.canonical_source || undefined,
    alternateSources: row.alternate_sources || undefined,
    is_published: row.is_published,
  };
}

export function publicationToDb(item: Partial<Publication>): Partial<DatabasePublicationRow> {
  const row: Partial<DatabasePublicationRow> = {};
  if (item.id !== undefined) row.id = item.id;
  if (item.canonicalId !== undefined) row.canonical_id = item.canonicalId;
  if (item.type !== undefined) row.type = item.type;
  if (item.title !== undefined) row.title = item.title;
  if (item.month !== undefined) row.month = item.month;
  if (item.year !== undefined) row.year = item.year;
  if (item.coverImage !== undefined) row.cover_image = item.coverImage;
  if (item.language !== undefined) row.language = item.language;
  if (item.downloadUrl !== undefined) row.download_url = item.downloadUrl;
  if (item.archiveUrl !== undefined) row.archive_url = item.archiveUrl;
  if (item.readOnlineUrl !== undefined) row.read_online_url = item.readOnlineUrl;
  if (item.mirrors !== undefined) row.mirrors = item.mirrors;
  if (item.description !== undefined) row.description = item.description;
  if (item.isLatest !== undefined) row.is_latest = item.isLatest;
  if (item.pageCount !== undefined) row.page_count = item.pageCount;
  if (item.author !== undefined) row.author = item.author;
  if (item.localCover !== undefined) row.local_cover = item.localCover;
  if (item.sourceCoverUrl !== undefined) row.source_cover_url = item.sourceCoverUrl;
  if (item.canonicalSource !== undefined) row.canonical_source = item.canonicalSource;
  if (item.alternateSources !== undefined) row.alternate_sources = item.alternateSources;
  if (item.is_published !== undefined) row.is_published = item.is_published;
  return row;
}

// =============================================================================
// 5. Inquiries Mappers
// =============================================================================

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  purpose: string;
  message: string;
  date: string;
  status: 'New' | 'In Review' | 'Resolved';
}

export interface DatabaseInquiryRow {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  purpose: string;
  message: string;
  status: 'New' | 'In Review' | 'Resolved';
  created_at?: string;
  updated_at?: string;
}

export function dbToInquiry(row: DatabaseInquiryRow): Inquiry {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || undefined,
    purpose: row.purpose,
    message: row.message,
    date: row.created_at ? row.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
    status: row.status,
  };
}

export function inquiryToDb(item: Partial<Inquiry>, includeServerControlled = false): Partial<DatabaseInquiryRow> {
  const row: Partial<DatabaseInquiryRow> = {};
  if (includeServerControlled && item.id !== undefined) {
    row.id = item.id;
  }
  if (item.name !== undefined) row.name = item.name;
  if (item.email !== undefined) row.email = item.email;
  if (item.phone !== undefined) row.phone = item.phone || null;
  if (item.purpose !== undefined) row.purpose = item.purpose;
  if (item.message !== undefined) row.message = item.message;
  if (includeServerControlled && item.status !== undefined) {
    row.status = item.status;
  }
  return row;
}

// =============================================================================
// 6. Donations Mappers
// =============================================================================

export type DonationMethod =
  | 'NEFT / RTGS'
  | 'NEFT/RTGS'
  | 'UPI'
  | 'PayTM'
  | 'Cheque'
  | 'PayPal'
  | 'Telegraphic Wire'
  | 'Western Union';

export type DonationVerificationStatus = 'Pending' | 'Verified' | 'Rejected';
export type DonationReceiptStatus = 'Issued' | 'Pending';

export interface DonationRecord {
  id: string;
  donorName: string;
  donorEmail?: string;
  donorPhone?: string;
  donorPan?: string;
  category: string;
  amount: number;
  date: string;
  method: DonationMethod | string;
  utrNumber: string;
  verificationStatus: DonationVerificationStatus;
  receiptStatus?: DonationReceiptStatus;
  notes?: string;
}

export interface DatabaseDonationRow {
  id: string;
  donor_name: string;
  donor_email?: string | null;
  donor_phone?: string | null;
  donor_pan?: string | null;
  category: string;
  amount: number;
  method: string;
  utr_number: string;
  verification_status: DonationVerificationStatus;
  receipt_status?: DonationReceiptStatus | null;
  tx_date: string;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export function dbToDonation(row: DatabaseDonationRow): DonationRecord {
  return {
    id: row.id,
    donorName: row.donor_name,
    donorEmail: row.donor_email || undefined,
    donorPhone: row.donor_phone || undefined,
    donorPan: row.donor_pan || undefined,
    category: row.category,
    amount: typeof row.amount === 'string' ? parseFloat(row.amount) : Number(row.amount),
    date: row.tx_date || (row.created_at ? row.created_at.split('T')[0] : new Date().toISOString().split('T')[0]),
    method: row.method,
    utrNumber: row.utr_number,
    verificationStatus: row.verification_status || 'Pending',
    receiptStatus: (row.receipt_status as DonationReceiptStatus) || undefined,
    notes: row.notes || undefined,
  };
}

export function donationToDb(item: Partial<DonationRecord>, includeServerControlled = false): Partial<DatabaseDonationRow> {
  const row: Partial<DatabaseDonationRow> = {};
  if (includeServerControlled && item.id !== undefined) {
    row.id = item.id;
  }
  if (item.donorName !== undefined) row.donor_name = item.donorName;
  if (item.donorEmail !== undefined) row.donor_email = item.donorEmail || null;
  if (item.donorPhone !== undefined) row.donor_phone = item.donorPhone || null;
  if (item.donorPan !== undefined) row.donor_pan = item.donorPan || null;
  if (item.category !== undefined) row.category = item.category;
  if (item.amount !== undefined) row.amount = item.amount;
  if (item.method !== undefined) row.method = item.method;
  if (item.utrNumber !== undefined) row.utr_number = item.utrNumber;
  if (item.date !== undefined) row.tx_date = item.date;

  if (includeServerControlled) {
    if (item.notes !== undefined) row.notes = item.notes || null;
    if (item.verificationStatus !== undefined) row.verification_status = item.verificationStatus;
    if (item.receiptStatus !== undefined) row.receipt_status = item.receiptStatus;
  }
  return row;
}
