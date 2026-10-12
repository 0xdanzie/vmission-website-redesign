import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { courses, getCourseBySlug } from '@/data/courses';
import CourseDetailClient from './CourseDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const slugs = courses.map((c) => ({
    id: c.slug,
  }));
  const canonicalIds = courses
    .filter((c) => c.canonicalId && c.canonicalId !== c.slug)
    .map((c) => ({
      id: c.canonicalId as string,
    }));
  return [...slugs, ...canonicalIds];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseBySlug(id) || courses.find((c) => c.id === id || c.canonicalId === id);
  if (!course) {
    return { title: 'Course Not Found — Learn Vedanta | Vedanta Mission' };
  }
  return {
    title: `${course.title} — Study Programs | Vedanta Mission`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const course = getCourseBySlug(id) || courses.find((c) => c.id === id || c.canonicalId === id);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}
