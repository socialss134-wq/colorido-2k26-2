'use client';

import { useState, useEffect } from 'react';
import { ScheduleTable } from '@/components/schedule/ScheduleTable';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { getSchedule } from '@/lib/api/schedule';
import type { ScheduleItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/shared/PageHeader';

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dayFilter, setDayFilter] = useState('All');
  const [catFilter, setCatFilter] = useState('All');

  useEffect(() => {
    getSchedule().then((data) => {
      setSchedule(data);
      setLoading(false);
    });
  }, []);

  const days = ['All', '1', '2', '3', '4'];
  const categories = ['All', 'Cultural', 'Sports'];

  const filtered = schedule.filter((item) => {
    if (dayFilter !== 'All' && item.day !== Number(dayFilter)) return false;
    if (catFilter !== 'All' && item.category !== catFilter) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Program" title="Event Schedule" subtitle="March 15-18, 2026 — Four days of action" />

      <section className="py-10 space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Day</p>
          <div className="flex flex-wrap gap-2">
            {days.map((d) => (
              <Button
                key={d}
                variant={dayFilter === d ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDayFilter(d)}
              >
                {d === 'All' ? 'All Days' : `Day ${d}`}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                variant={catFilter === c ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCatFilter(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        {loading ? (
          <LoadingState message="Loading schedule..." />
        ) : filtered.length === 0 ? (
          <EmptyState title="No events found" message="Try adjusting your filters." />
        ) : (
          <ScheduleTable items={filtered} />
        )}
      </section>
    </div>
  );
}
