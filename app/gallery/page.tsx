'use client';

import { useState, useEffect } from 'react';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { getGalleryImages } from '@/lib/api/gallery';
import type { GalleryImage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/shared/PageHeader';

const categories = ['All', 'Cultural', 'Sports', 'Behind the Scenes', 'Previous Events'];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getGalleryImages().then((data) => {
      setImages(data);
      setLoading(false);
    });
  }, []);

  const filtered = images.filter((img) => filter === 'All' || img.category === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Moments" title="Gallery" subtitle="Moments captured from COLORIDO over the years" />

      <section className="py-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      <section className="pb-12">
        {loading ? (
          <LoadingState message="Loading gallery..." />
        ) : filtered.length === 0 ? (
          <EmptyState title="No images found" message="No images in this category yet." />
        ) : (
          <GalleryGrid images={filtered} />
        )}
      </section>
    </div>
  );
}
