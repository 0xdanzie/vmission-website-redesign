import React from 'react';
import type { Metadata } from 'next';
import { events, getEventById, VMEvent } from '@/data/events';
import { createClient } from '@/lib/supabase/server';
import { dbToEvent } from '@/lib/cms-mappers';
import EventDetailClient from './EventDetailClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ eventId: string }> | { eventId: string };
}

async function getLiveEvent(id: string): Promise<VMEvent | undefined> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .or(`id.eq.${id},canonical_id.eq.${id}`)
      .maybeSingle();

    if (!error && data) {
      return dbToEvent(data);
    }
  } catch (e) {
    console.warn('Supabase getLiveEvent fallback:', e);
  }
  return getEventById(id);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const event = await getLiveEvent(resolved.eventId);
  if (!event) {
    return { title: 'Event Not Found — Vedanta Mission' };
  }
  return {
    title: `${event.title} — Vedanta Mission Gatherings & Yagnas`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const resolved = await Promise.resolve(params);
  const event = await getLiveEvent(resolved.eventId);

  return <EventDetailClient eventId={resolved.eventId} initialEvent={event} />;
}
