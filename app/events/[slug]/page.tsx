import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/section/Header';
import Breadcrumb from '@/components/section/Breadcrumb';
import EventDetail from '@/components/section/EventDetail';
import Footer from '@/components/section/Footer';
import siteData from '@/components/data/data.json';
import { SiteData, EventsData } from '@/components/types';
import { findEventByParam, getEventSlug } from '@/components/types';

const data = siteData as SiteData;
const template = data.categories.Education.templateComponents['template-1'];
const eventsData = template.sections.events as EventsData;
const events = eventsData.list;

export const dynamicParams = true;

export function generateStaticParams() {
  return events.map((event) => ({ slug: getEventSlug(event) }));
}

export async function generateMetadata({ params }: PageProps<'/events/[slug]'>) {
  const { slug } = await params;
  const event = findEventByParam(events, slug);
  return {
    title: event
      ? `${event.title} | Learnhub`
      : 'Event Detail | Learnhub',
  };
}

export default async function EventDetailPage({ params }: PageProps<'/events/[slug]'>) {
  const { slug } = await params;
  const event = findEventByParam(events, slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header data={data.common.Header} />
      <Breadcrumb 
        title={event.title || "Event Details"}
        pageName="EVENT DETAILS"
        data={data.common.Breadcrumb}
        uppercasePageName={false}
      />
      <EventDetail event={event} />
      <Footer data={data.common.Footer} />
    </main>
  );
}
