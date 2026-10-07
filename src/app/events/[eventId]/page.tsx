import React from 'react';
import { events } from '@/data/events';
import EventDetailClient from './EventDetailClient';

export function generateStaticParams() {
  const primaryIds = events.map((e) => ({
    eventId: e.id,
  }));
  const canonicalIds = events
    .filter((e) => e.canonicalId && e.canonicalId !== e.id)
    .map((e) => ({
      eventId: e.canonicalId as string,
    }));
  return [...primaryIds, ...canonicalIds];
}

export default function EventDetailPage({
  params,
}: {
  params: { eventId: string };
}) {
  return <EventDetailClient eventId={params.eventId} />;
}
