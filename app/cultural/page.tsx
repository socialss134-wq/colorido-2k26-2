'use client';

import { useState, useEffect } from 'react';
import { EventCard } from '@/components/events/EventCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GridSkeleton } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { getEvents } from '@/lib/api/events';
import type { FestEvent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/shared/PageHeader';

const subCategories = [
  'All', 'Fine Arts', 'Music & Band', 'Dance', 'Choreoday',
  'Dramatics', 'Fashion Show', 'Tekraft Events', 'Literary',
];

const types = ['All', 'Solo', 'Group', 'Individual'];

export default function CulturalPage() {
  const [events, setEvents] = useState<FestEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [subFilter, setSubFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data.filter((e) => e.category === 'Cultural'));
      setLoading(false);
    });
  }, []);

  const filtered = events.filter((e) => {
    if (subFilter !== 'All' && e.subCategory !== subFilter) return false;
    if (typeFilter !== 'All' && e.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Events" title="Cultural Events" subtitle="Express your creativity across music, dance, drama, art, and more" />

      <section className="py-10">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {subCategories.map((cat) => (
                <Button
                  key={cat}
                  variant={subFilter === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSubFilter(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Event Type</p>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <Button
                  key={type}
                  variant={typeFilter === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        {loading ? (
          <GridSkeleton count={6} />
        ) : filtered.length === 0 ? (
          <EmptyState title="No events found" message="Try adjusting your filters to see more events." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
