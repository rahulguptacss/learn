import { EventItem } from '@/components/types';

export function slugifyEventTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getEventSlug(event: Pick<EventItem, 'title' | 'slug' | 'id'>) {
  return (event.slug as string) || slugifyEventTitle(event.title);
}

export function findEventByParam(events: EventItem[], param: string) {
  const decoded = decodeURIComponent(param).toLowerCase();
  return events.find((event) => {
    const slug = getEventSlug(event).toLowerCase();
    return slug === decoded || String(event.id).toLowerCase() === decoded;
  });
}
