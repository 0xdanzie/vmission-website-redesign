import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { courses, getCourseBySlug, Course } from '@/data/courses';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { dbToCourse } from '@/lib/cms-mappers';
import CourseDetailClient from './CourseDetailClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

async function getLiveCourse(id: string): Promise<Course | undefined> {
  if (!isSupabaseConfigured()) {
    return getCourseBySlug(id) || courses.find((c) => c.id === id || c.canonicalId === id);
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id},canonical_id.eq.${id}`)
      .maybeSingle();

    if (!error && data) {
      return dbToCourse(data);
    }
  } catch (e) {
    console.warn('Supabase getLiveCourse fallback:', e);
  }
  return getCourseBySlug(id) || courses.find((c) => c.id === id || c.canonicalId === id);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const course = await getLiveCourse(resolved.id);
  if (!course) {
    return { title: 'Course Not Found — Learn Vedanta | Vedanta Mission' };
  }
  return {
    title: `${course.title} — Study Programs | Vedanta Mission`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const resolved = await Promise.resolve(params);
  const course = await getLiveCourse(resolved.id);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}
