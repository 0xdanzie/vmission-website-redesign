import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  teachings,
  getTeachingById,
  getRelatedTeachings,
  CANONICAL_CATEGORIES,
} from '@/data/teachings';
import { acharyas } from '@/data/acharyas';
import TeachingDetailClient from './TeachingDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = teachings.map((t) => ({ id: t.id }));
  const slugs = teachings
    .filter((t) => t.slug && t.slug !== t.id)
    .map((t) => ({ id: t.slug }));
  return [...ids, ...slugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const teaching = getTeachingById(id);
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
  const teaching = getTeachingById(id);

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
