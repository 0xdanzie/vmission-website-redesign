import { Teaching, CanonicalCategorySlug } from '@/data/teachings';

export interface DatabaseTeachingRow {
  id: string;
  slug: string;
  title: string;
  scripture: string;
  teacher: string;
  format: 'Audio' | 'Video' | 'PDF' | 'E-Book';
  language: string;
  duration?: string | null;
  description: string;
  topic: string;
  category_slug: string;
  category_name?: string | null;
  src?: string | null;
  audio_url?: string | null;
  youtube_playlist_id?: string | null;
  youtube_video_id?: string | null;
  source_host?: string | null;
  thumbnail_src?: string | null;
  related_publication_ids?: string[] | null;
  related_study_text?: any;
  source_status?: string | null;
  verification_status?: string | null;
  migration_status?: string | null;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export function dbToTeaching(row: DatabaseTeachingRow): Teaching {
  return {
    id: row.id,
    slug: row.slug || row.id,
    title: row.title,
    scripture: row.scripture,
    teacher: row.teacher,
    format: row.format,
    language: row.language as any,
    duration: row.duration || undefined,
    description: row.description,
    topic: row.topic,
    category: row.category_slug as CanonicalCategorySlug,
    categoryName: row.category_name || undefined,
    src: row.src || undefined,
    audioUrl: row.audio_url || undefined,
    youtubePlaylistId: row.youtube_playlist_id || undefined,
    youtubeVideoId: row.youtube_video_id || undefined,
    sourceHost: row.source_host || undefined,
    thumbnailSrc: row.thumbnail_src || undefined,
    relatedPublicationIds: row.related_publication_ids || [],
    relatedStudyText: row.related_study_text || undefined,
    sourceStatus: (row.source_status as any) || undefined,
    verificationStatus: (row.verification_status as any) || undefined,
    migrationStatus: (row.migration_status as any) || undefined,
    is_published: row.is_published,
  };
}

export function teachingToDb(t: Partial<Teaching> & { id: string; slug: string; title: string; scripture: string; teacher: string; format: string; description: string; topic: string; category: string }): Partial<DatabaseTeachingRow> {
  const row: Partial<DatabaseTeachingRow> = {
    id: t.id,
    slug: t.slug,
    title: t.title,
    scripture: t.scripture,
    teacher: t.teacher,
    format: t.format as any,
    language: t.language || 'Hindi',
    duration: t.duration || null,
    description: t.description,
    topic: t.topic,
    category_slug: t.category,
    category_name: t.categoryName || null,
    src: t.src || null,
    audio_url: t.audioUrl || null,
    youtube_playlist_id: t.youtubePlaylistId || null,
    youtube_video_id: t.youtubeVideoId || null,
    source_host: t.sourceHost || null,
    thumbnail_src: t.thumbnailSrc || null,
    related_publication_ids: t.relatedPublicationIds || [],
    related_study_text: t.relatedStudyText || null,
    source_status: t.sourceStatus || 'SOURCE-VERIFIED',
    verification_status: t.verificationStatus || 'SOURCE-VERIFIED',
  };

  if (typeof t.is_published === 'boolean') {
    row.is_published = t.is_published;
  }

  if (t.migrationStatus) {
    row.migration_status = t.migrationStatus;
  }

  return row;
}
