import React from 'react';
import { notFound } from 'next/navigation';
import { getAcharyaBySlug, acharyas, Acharya } from '@/data/acharyas';
import { teachings } from '@/data/teachings';
import { createClient } from '@/lib/supabase/server';
import { dbToAcharya } from '@/lib/cms-mappers';
import AcharyaProfileClient from './AcharyaProfileClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

async function getLiveAcharya(slug: string): Promise<Acharya | undefined> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('acharyas')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return dbToAcharya(data);
    }
  } catch (e) {
    console.warn('Supabase getLiveAcharya fallback:', e);
  }
  return getAcharyaBySlug(slug);
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const acharya = await getLiveAcharya(resolvedParams?.slug);
  if (!acharya) return { title: 'Acharya Profile | Vedanta Mission' };
  return {
    title: `${acharya.honorific} ${acharya.name} — ${acharya.role} | Vedanta Mission`,
    description: acharya.shortBio,
  };
}

export default async function AcharyaDetailPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;
  const acharya = await getLiveAcharya(slug);

  if (!acharya) {
    notFound();
  }

  const isFounder = !!acharya.isFounder;

  // Filter authentic related teachings from the master dataset
  const relatedTeachings = teachings.filter(
    (t) =>
      t.teacher.toLowerCase().includes(acharya.name.toLowerCase()) ||
      (isFounder && t.teacher.toLowerCase().includes('atmananda')) ||
      (!isFounder && t.teacher.toLowerCase().includes('amitananda') && acharya.slug.includes('amitananda'))
  );

  const otherAcharyas = acharyas.filter((a) => a.slug !== acharya.slug);

  return (
    <AcharyaProfileClient
      acharya={acharya}
      relatedTeachings={relatedTeachings}
      otherAcharyas={otherAcharyas}
    />
  );
}
