import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  teachings,
  getTeachingById,
  getRelatedTeachings,
  CANONICAL_CATEGORIES,
  Teaching,
} from '@/data/teachings';
import { acharyas } from '@/data/acharyas';
import TeachingDetailClient from './TeachingDetailClient';
import { createClient } from '@/lib/supabase/server';
import { dbToTeaching } from '@/lib/teachings-mapper';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

async function fetchTeachingRecord(idOrSlug: string): Promise<Teaching | null> {
  try {
    const supabase = createClient();
    const { data: row } = await supabase
      .from('teachings')
      .select('*')
      .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
      .maybeSingle();

    if (row) {
      return dbToTeaching(row);
    }
  } catch (e) {
    console.warn('Supabase fetch teaching detail error:', e);
  }

  // Fallback to static catalog (for pre-built baseline / offline resilience)
  return getTeachingById(idOrSlug) || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const teaching = await fetchTeachingRecord(id);
  if (!teaching) {
    return { title: 'Discourse Not Found — Jnana Ganga | Vedanta Mission' };
  }
  return {
    title: `${teaching.title} — Jnana Ganga Digital Study Desk | Vedanta Mission`,
    description: teaching.description,
  };
}

export default async function TeachingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const teaching = await fetchTeachingRecord(id);

  if (!teaching) {
    notFound();
  }

  const categoryObj = CANONICAL_CATEGORIES.find((c) => c.id === teaching.category);
  const relatedTeachings = getRelatedTeachings(teaching, 3);

  // Derive acharya object if applicable
  const matchedAcharya = acharyas.find((a) =>
    teaching.teacher.toLowerCase().includes(a.name.toLowerCase()) ||
    (a.isFounder && teaching.teacher.toLowerCase().includes('atmananda')) ||
    (!a.isFounder && teaching.teacher.toLowerCase().includes('amitananda') && a.slug.includes('amitananda'))
  );

  return (
    <TeachingDetailClient
      teaching={teaching}
      categoryObj={categoryObj}
      relatedTeachings={relatedTeachings}
      matchedAcharya={matchedAcharya}
      totalTeachings={teachings.length}
    />
  );
}
