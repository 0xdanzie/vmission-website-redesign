import React from 'react';
import { events } from '@/data/events';
import EventDetailClient from './EventDetailClient';

export function generateStaticParams() {
  return events.map((e) => ({
    eventId: e.id,
  }));
}

export default function EventDetailPage({
  params,
}: {
  params: { eventId: string };
}) {
  return <EventDetailClient eventId={params.eventId} />;
}
