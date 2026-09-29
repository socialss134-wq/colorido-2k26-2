'use client';

import { useState, useEffect } from 'react';
import { ResultCard } from '@/components/results/ResultCard';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { getResults } from '@/lib/api/results';
import type { Result } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/shared/PageHeader';

const categories = ['All', 'Cultural', 'Sports'];

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState('All');
  const [eventFilter, setEventFilter] = useState('All');

  useEffect(() => {
    getResults().then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, []);

  const eventNames = ['All', ...Array.from(new Set(results.map((r) => r.eventName)))];

  const filtered = results.filter((r) => {
    if (catFilter !== 'All' && r.category !== catFilter) return false;
    if (eventFilter !== 'All' && r.eventName !== eventFilter) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Winners" title="Results" subtitle="Celebrating our winners and their achievements" accent="cool" />

      <section className="py-10 space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                variant={catFilter === c ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCatFilter(c)}
                className={cn(catFilter === c && 'bg-gradient-to-r from-[hsl(var(--colorido-blue))] to-[hsl(var(--colorido-green))] text-white')}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Event</p>
          <div className="flex flex-wrap gap-2">
            {eventNames.map((e) => (
              <Button
                key={e}
                variant={eventFilter === e ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEventFilter(e)}
                className={cn(eventFilter === e && 'bg-gradient-to-r from-[hsl(var(--colorido-blue))] to-[hsl(var(--colorido-green))] text-white')}
              >
                {e}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        {loading ? (
          <LoadingState message="Loading results..." />
        ) : filtered.length === 0 ? (
          <EmptyState title="No results found" message="Results for this filter will appear here once published." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {filtered.map((r) => (
              <ResultCard key={r.id} result={r} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
