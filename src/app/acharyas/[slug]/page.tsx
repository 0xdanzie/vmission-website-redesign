import React from 'react';
import { notFound } from 'next/navigation';
import { getAcharyaBySlug, acharyas } from '@/data/acharyas';
import { teachings } from '@/data/teachings';
import AcharyaProfileClient from './AcharyaProfileClient';

export function generateStaticParams() {
  return acharyas.map((a) => ({
    slug: a.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const acharya = getAcharyaBySlug(params?.slug);
  if (!acharya) return { title: 'Acharya Profile | Vedanta Mission' };
  return {
    title: `${acharya.honorific} ${acharya.name} — ${acharya.role} | Vedanta Mission`,
    description: acharya.shortBio,
  };
}

export default function AcharyaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params?.slug;
  const acharya = getAcharyaBySlug(slug);

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
